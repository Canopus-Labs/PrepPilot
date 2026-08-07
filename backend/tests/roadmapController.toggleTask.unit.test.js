import { describe, it, expect, vi, beforeEach } from 'vitest';

// ---------------------------------------------------------------------------
// Uses the real RoadmapProject model (no DB connection needed): we stub the
// static findOne and the instance save, then drive toggleTask and assert on
// the in-memory roadmap after recomputeProgress() runs.
// ---------------------------------------------------------------------------

const RoadmapProject = require('../models/RoadmapProject');
const { toggleTask } = require('../controllers/roadmapController');

const VALID_USER_ID = '507f1f77bcf86cd799439011';

function makeRoadmap(milestones) {
  const roadmap = new RoadmapProject({
    userId: VALID_USER_ID,
    projectIdea: 'Test project',
    milestones,
    testingChecklist: [],
  });
  roadmap.save = vi.fn().mockResolvedValue(roadmap);
  return roadmap;
}

function makeReq(body, roadmap) {
  return {
    params: { id: 'roadmap-1' },
    user: { _id: VALID_USER_ID },
    body,
    roadmap, // test helper to inject the found roadmap
  };
}

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

const milestone = (overrides = {}) => ({
  id: 'm1',
  title: 'Milestone',
  description: '',
  order: 0,
  completed: false,
  status: 'todo',
  notes: '',
  subtasks: [],
  ...overrides,
});

beforeEach(() => {
  RoadmapProject.findOne = vi.fn();
});

describe('toggleTask — subtask-less milestone (issue #1448)', () => {
  it('persists completed: true and reports a completed roadmap', async () => {
    const roadmap = makeRoadmap([milestone()]);
    RoadmapProject.findOne.mockResolvedValue(roadmap);

    const res = makeRes();
    await toggleTask(makeReq({ type: 'milestone', milestoneId: 'm1', completed: true }, roadmap), res);

    const sent = res.json.mock.calls[0][0];
    expect(sent.success).toBe(true);
    expect(sent.roadmap.milestones[0].completed).toBe(true);
    expect(sent.roadmap.milestones[0].status).toBe('done');
    expect(sent.roadmap.progressPercent).toBe(100);
    expect(sent.roadmap.status).toBe('completed');
    expect(roadmap.save).toHaveBeenCalledTimes(1);
  });

  it('persists completed: false on a done milestone and reverts progress', async () => {
    const roadmap = makeRoadmap([
      milestone({ completed: true, status: 'done' }),
    ]);
    RoadmapProject.findOne.mockResolvedValue(roadmap);

    const res = makeRes();
    await toggleTask(makeReq({ type: 'milestone', milestoneId: 'm1', completed: false }, roadmap), res);

    const sent = res.json.mock.calls[0][0];
    expect(sent.success).toBe(true);
    expect(sent.roadmap.milestones[0].completed).toBe(false);
    expect(sent.roadmap.milestones[0].status).toBe('todo');
    expect(sent.roadmap.progressPercent).toBe(0);
    expect(sent.roadmap.status).toBe('planning');
  });

  it('still honors an explicit status change', async () => {
    const roadmap = makeRoadmap([milestone()]);
    RoadmapProject.findOne.mockResolvedValue(roadmap);

    const res = makeRes();
    await toggleTask(
      makeReq({ type: 'milestone', milestoneId: 'm1', status: 'in-progress' }, roadmap),
      res,
    );

    const sent = res.json.mock.calls[0][0];
    expect(sent.roadmap.milestones[0].status).toBe('in-progress');
    expect(sent.roadmap.milestones[0].completed).toBe(false);
  });
});

describe('toggleTask — milestone with subtasks (regression guard)', () => {
  it('derives completed/status from the cascaded subtasks', async () => {
    const roadmap = makeRoadmap([
      milestone({
        subtasks: [
          { id: 's1', title: 'A', completed: false },
          { id: 's2', title: 'B', completed: false },
        ],
      }),
    ]);
    RoadmapProject.findOne.mockResolvedValue(roadmap);

    const res = makeRes();
    await toggleTask(makeReq({ type: 'milestone', milestoneId: 'm1', completed: true }, roadmap), res);

    const sent = res.json.mock.calls[0][0];
    const m = sent.roadmap.milestones[0];
    expect(m.subtasks.every((s) => s.completed)).toBe(true);
    expect(m.completed).toBe(true);
    expect(m.status).toBe('done');
    expect(sent.roadmap.progressPercent).toBe(100);
    expect(sent.roadmap.status).toBe('completed');
  });
});
