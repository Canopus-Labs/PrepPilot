const StudyGoal = require("../models/StudyGoal");

/**
 * Helper: get the Monday of the current week (ISO week).
 */
function getWeekStart(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Helper: get end of week (Sunday 23:59:59.999).
 */
function getWeekEnd(weekStart) {
  const end = new Date(weekStart);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

/**
 * Helper: archive previous week data if needed.
 */
function maybeArchiveWeek(goal) {
  const currentWeekStart = getWeekStart();
  if (!goal.weekStartDate || goal.weekStartDate.getTime() < currentWeekStart.getTime()) {
    // Previous week is over — archive it
    const prevWeekEnd = new Date(currentWeekStart);
    prevWeekEnd.setDate(prevWeekEnd.getDate() - 1);
    prevWeekEnd.setHours(23, 59, 59, 999);

    const prevWeekStart = new Date(goal.weekStartDate || currentWeekStart);
    prevWeekStart.setHours(0, 0, 0, 0);

    const totalMinutesThisWeek = goal.dailyLog.reduce((sum, log) => sum + log.minutes, 0);
    const completed = totalMinutesThisWeek >= goal.weeklyTargetMinutes;

    goal.weeklyHistory.push({
      weekStart: prevWeekStart,
      weekEnd: prevWeekEnd,
      targetMinutes: goal.weeklyTargetMinutes,
      actualMinutes: totalMinutesThisWeek,
      sessionsLogged: goal.dailyLog.length,
      completed,
    });

    // Keep only last 12 weeks
    if (goal.weeklyHistory.length > 12) {
      goal.weeklyHistory = goal.weeklyHistory.slice(-12);
    }

    if (completed) goal.completedWeeks += 1;
    goal.totalWeeksTracked += 1;

    // Reset for new week
    goal.currentWeekMinutes = 0;
    goal.dailyLog = [];
    goal.weekStartDate = currentWeekStart;
  }
}

// ─── CRUD ────────────────────────────────────────────────────────────────────

exports.createGoal = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, category, weeklyTargetMinutes, color } = req.validatedBody;

    // Limit to 10 active goals per user
    const activeCount = await StudyGoal.countDocuments({
      user: userId,
      isActive: true,
    });
    if (activeCount >= 10) {
      return res.status(400).json({
        success: false,
        message: "Maximum of 10 active goals reached.",
      });
    }

    const goal = await StudyGoal.create({
      user: userId,
      title,
      category,
      weeklyTargetMinutes,
      color,
      weekStartDate: getWeekStart(),
    });

    res.status(201).json({ success: true, goal });
  } catch (error) {
    console.error("Create study goal error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getMyGoals = async (req, res) => {
  try {
    const userId = req.user._id;
    const { active, category } = req.query;

    const filter = { user: userId };
    if (active !== undefined) filter.isActive = active === "true";
    if (category) filter.category = category;

    const goals = await StudyGoal.find(filter).sort({
      isActive: -1,
      createdAt: -1,
    });

    // Auto-archive any stale weeks
    let changed = false;
    for (const goal of goals) {
      const before = goal.currentWeekMinutes;
      maybeArchiveWeek(goal);
      if (goal.isModified()) {
        changed = true;
        await goal.save();
      }
    }

    res.json({ success: true, count: goals.length, goals });
  } catch (error) {
    console.error("Get study goals error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getGoalById = async (req, res) => {
  try {
    const goal = await StudyGoal.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!goal) {
      return res
        .status(404)
        .json({ success: false, message: "Goal not found" });
    }
    maybeArchiveWeek(goal);
    await goal.save();
    res.json({ success: true, goal });
  } catch (error) {
    console.error("Get study goal by id error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateGoal = async (req, res) => {
  try {
    const goal = await StudyGoal.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!goal) {
      return res
        .status(404)
        .json({ success: false, message: "Goal not found" });
    }

    const updates = req.validatedBody;
    Object.assign(goal, updates);
    await goal.save();

    res.json({ success: true, goal });
  } catch (error) {
    console.error("Update study goal error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    const goal = await StudyGoal.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!goal) {
      return res
        .status(404)
        .json({ success: false, message: "Goal not found" });
    }
    res.json({ success: true, message: "Goal deleted successfully" });
  } catch (error) {
    console.error("Delete study goal error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─── SESSION LOGGING ─────────────────────────────────────────────────────────

exports.logSession = async (req, res) => {
  try {
    const goal = await StudyGoal.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!goal) {
      return res
        .status(404)
        .json({ success: false, message: "Goal not found" });
    }
    if (!goal.isActive) {
      return res
        .status(400)
        .json({ success: false, message: "Cannot log to an inactive goal" });
    }

    maybeArchiveWeek(goal);

    const { minutes, notes, date } = req.validatedBody;
    const logDate = date ? new Date(date) : new Date();
    logDate.setHours(0, 0, 0, 0);

    // Find or create daily log entry for this date
    const existingEntry = goal.dailyLog.find(
      (d) => d.date.getTime() === logDate.getTime()
    );
    if (existingEntry) {
      existingEntry.minutes += minutes;
      if (notes) existingEntry.notes = notes;
    } else {
      goal.dailyLog.push({ date: logDate, minutes, notes: notes || "" });
    }

    // Recalculate current week total from dailyLog
    goal.currentWeekMinutes = goal.dailyLog.reduce(
      (sum, log) => sum + log.minutes,
      0
    );

    await goal.save();

    res.json({
      success: true,
      message: "Study session logged",
      goal: {
        _id: goal._id,
        currentWeekMinutes: goal.currentWeekMinutes,
        weeklyTargetMinutes: goal.weeklyTargetMinutes,
        completionPercentage: goal.completionPercentage,
        dailyLog: goal.dailyLog,
      },
    });
  } catch (error) {
    console.error("Log study session error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─── ANALYTICS ───────────────────────────────────────────────────────────────

exports.getAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;
    const goals = await StudyGoal.find({ user: userId });

    let totalMinutesAllTime = 0;
    let totalSessionsAllTime = 0;
    let completedWeeksAllTime = 0;
    let totalWeeksTracked = 0;
    const categoryBreakdown = {};

    for (const goal of goals) {
      maybeArchiveWeek(goal);
      if (goal.isModified()) await goal.save();

      // Count weekly history
      for (const week of goal.weeklyHistory) {
        totalMinutesAllTime += week.actualMinutes;
        totalSessionsAllTime += week.sessionsLogged;
        totalWeeksTracked++;
        if (week.completed) completedWeeksAllTime++;
      }

      // Category breakdown
      if (!categoryBreakdown[goal.category]) {
        categoryBreakdown[goal.category] = {
          totalMinutes: 0,
          goalCount: 0,
          avgCompletion: 0,
        };
      }
      categoryBreakdown[goal.category].goalCount += 1;
      for (const week of goal.weeklyHistory) {
        categoryBreakdown[goal.category].totalMinutes += week.actualMinutes;
      }
    }

    // Average completion rate per category
    for (const cat of Object.keys(categoryBreakdown)) {
      const catGoals = goals.filter((g) => g.category === cat);
      const totalTarget = catGoals.reduce(
        (sum, g) => sum + g.weeklyTargetMinutes * g.totalWeeksTracked,
        0
      );
      const totalActual = categoryBreakdown[cat].totalMinutes;
      categoryBreakdown[cat].avgCompletion =
        totalTarget > 0 ? Math.round((totalActual / totalTarget) * 100) : 0;
    }

    // Overall streak (consecutive weeks with at least one goal met)
    const allWeeksSorted = [];
    for (const goal of goals) {
      for (const week of goal.weeklyHistory) {
        allWeeksSorted.push(week);
      }
    }

    // Compute active goals count
    const activeGoals = goals.filter((g) => g.isActive).length;

    // Current week aggregate across all active goals
    let currentWeekTotalMinutes = 0;
    let currentWeekTargetTotal = 0;
    for (const goal of goals.filter((g) => g.isActive)) {
      currentWeekTotalMinutes += goal.currentWeekMinutes;
      currentWeekTargetTotal += goal.weeklyTargetMinutes;
    }

    res.json({
      success: true,
      analytics: {
        totalGoals: goals.length,
        activeGoals,
        totalMinutesAllTime,
        totalSessionsAllTime,
        completedWeeksAllTime,
        totalWeeksTracked,
        overallCompletionRate:
          totalWeeksTracked > 0
            ? Math.round((completedWeeksAllTime / totalWeeksTracked) * 100)
            : 0,
        currentWeek: {
          totalMinutes: currentWeekTotalMinutes,
          targetMinutes: currentWeekTargetTotal,
          completionPercentage:
            currentWeekTargetTotal > 0
              ? Math.round(
                  (currentWeekTotalMinutes / currentWeekTargetTotal) * 100
                )
              : 0,
        },
        categoryBreakdown,
      },
    });
  } catch (error) {
    console.error("Get analytics error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getWeeklyHistory = async (req, res) => {
  try {
    const goalId = req.params.id;
    const goal = await StudyGoal.findOne({
      _id: goalId,
      user: req.user._id,
    });
    if (!goal) {
      return res
        .status(404)
        .json({ success: false, message: "Goal not found" });
    }

    maybeArchiveWeek(goal);
    await goal.save();

    res.json({
      success: true,
      history: goal.weeklyHistory,
      currentWeek: {
        weekStart: goal.weekStartDate,
        minutes: goal.currentWeekMinutes,
        target: goal.weeklyTargetMinutes,
        dailyLog: goal.dailyLog,
      },
    });
  } catch (error) {
    console.error("Get weekly history error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
