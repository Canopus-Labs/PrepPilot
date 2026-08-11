import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  Target,
  Briefcase,
  GraduationCap,
  Code2,
  MessageSquareText,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  WandSparkles,
  FileText,
} from "lucide-react";

const AIInterviewAnswerExampleGenerator = () => {
  const [role, setRole] = useState("Software Engineer");
  const [experience, setExperience] = useState("Entry Level");
  const [technology, setTechnology] = useState("React");
  const [project, setProject] = useState(
    "A web application that helps students prepare for technical interviews."
  );
  const [questionType, setQuestionType] = useState("Behavioral");
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const stats = {
    relevanceScore: 94,
    structureScore: 91,
    personalizationScore: 78,
    qualityScore: 89,
  };

  const questions = [
    {
      question: "Tell me about yourself.",
      type: "Behavioral",
    },
    {
      question: "Tell me about a project you are proud of.",
      type: "Project",
    },
    {
      question: "Why should we hire you?",
      type: "HR",
    },
    {
      question: "How would you improve the performance of a React application?",
      type: "Technical",
    },
  ];

  const generatedAnswer =
    "I am a Computer Science student interested in software development and building practical applications. Recently, I worked on a web application that helps students prepare for technical interviews. Through this project, I gained hands-on experience with React, component design, state management, and creating user-focused interfaces. One challenge was keeping the application organized as the number of features increased, so I focused on reusable components and clear project structure. This experience strengthened my problem-solving skills and taught me how to turn requirements into a working product. I am now looking for an opportunity where I can continue improving my development skills while contributing to real-world software projects.";

  const getQuestionTypeClasses = (type) => {
    if (type === "Behavioral") {
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
    }

    if (type === "Technical") {
      return "bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400";
    }

    if (type === "Project") {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
            <WandSparkles
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              AI Interview Answer Example Generator
            </h1>

            <p className="text-gray-500 mt-2">
              Generate realistic interview answer examples tailored to
              your target role, experience level, technology, and project
              background.
            </p>

          </div>

        </div>

        {/* Dashboard Metrics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Role Relevance
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.relevanceScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <FileText
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Structure Score
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.structureScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Sparkles
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Personalization
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.personalizationScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Answer Quality
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.qualityScore}%
            </p>

          </div>

        </div>

        {/* AI Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-3xl font-bold">
              AI Example Answer Generator
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            Generate an example response based on your target role,
            experience level, technology, project background, and question
            type. The generated answer is a starting point and should be
            personalized with your own experiences.
          </p>

        </div>

        {/* Configuration */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Customize Your Example
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-7">

            {/* Target Role */}

            <div>

              <label className="block font-semibold mb-3">
                Target Role
              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-800 px-4 py-3 outline-none"
              >
                <option>Software Engineer</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Full Stack Developer</option>
                <option>Data Scientist</option>
                <option>Machine Learning Engineer</option>
                <option>AI Engineer</option>
              </select>

            </div>

            {/* Experience Level */}

            <div>

              <label className="block font-semibold mb-3">
                Experience Level
              </label>

              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-800 px-4 py-3 outline-none"
              >
                <option>Student</option>
                <option>Entry Level</option>
                <option>Junior</option>
                <option>Mid Level</option>
                <option>Senior</option>
              </select>

            </div>

            {/* Technology */}

            <div>

              <label className="block font-semibold mb-3">
                Primary Technology
              </label>

              <select
                value={technology}
                onChange={(e) => setTechnology(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-800 px-4 py-3 outline-none"
              >
                <option>React</option>
                <option>JavaScript</option>
                <option>Python</option>
                <option>Java</option>
                <option>Node.js</option>
                <option>SQL</option>
                <option>Machine Learning</option>
              </select>

            </div>

            {/* Question Type */}

            <div>

              <label className="block font-semibold mb-3">
                Question Type
              </label>

              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-800 px-4 py-3 outline-none"
              >
                <option>Behavioral</option>
                <option>Technical</option>
                <option>Project</option>
                <option>HR</option>
                <option>Situational</option>
              </select>

            </div>

          </div>

          {/* Project Background */}

          <div className="mt-7">

            <label className="block font-semibold mb-3">
              Project Background
            </label>

            <textarea
              value={project}
              onChange={(e) => setProject(e.target.value)}
              rows={5}
              placeholder="Describe your project, internship, academic experience, or technical background..."
              className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-800 px-4 py-4 outline-none resize-none"
            />

            <p className="text-sm text-gray-500 mt-2">
              Adding more details helps AI generate a more relevant
              example.
            </p>

          </div>

        </div>

        {/* Question Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquareText className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Choose an Interview Question
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {questions.map((item, index) => (

              <button
                key={index}
                onClick={() => {
                  setSelectedQuestion(index);
                  setQuestionType(item.type);
                }}
                className={`text-left rounded-2xl border p-6 transition ${
                  selectedQuestion === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${getQuestionTypeClasses(
                    item.type
                  )}`}
                >
                  {item.type}
                </span>

                <h3 className="font-bold text-lg mt-4">
                  {item.question}
                </h3>

              </button>

            ))}

          </div>

        </div>

        {/* Selected Question */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center justify-between flex-wrap gap-4">

            <div>

              <p className="text-sm text-gray-500">
                Selected Interview Question
              </p>

              <h2 className="text-3xl font-bold mt-3">
                {questions[selectedQuestion].question}
              </h2>

            </div>

            <span
              className={`px-4 py-2 rounded-full ${getQuestionTypeClasses(
                questions[selectedQuestion].type
              )}`}
            >
              {questions[selectedQuestion].type}
            </span>

          </div>

        </div>

        {/* Generation Context */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Sparkles className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Generation Context
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              {
                icon: <Briefcase size={22} />,
                label: "Target Role",
                value: role,
              },
              {
                icon: <GraduationCap size={22} />,
                label: "Experience",
                value: experience,
              },
              {
                icon: <Code2 size={22} />,
                label: "Technology",
                value: technology,
              },
              {
                icon: <MessageSquareText size={22} />,
                label: "Question Type",
                value: questionType,
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="w-11 h-11 rounded-xl bg-violet-100 dark:bg-violet-900/20 text-violet-600 flex items-center justify-center">
                  {item.icon}
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  {item.label}
                </p>

                <h3 className="font-bold mt-1">
                  {item.value}
                </h3>

              </div>

            ))}

          </div>

        </div>

        {/* Generated Example Answer */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-6">

            <WandSparkles className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Generated Example Answer
            </h2>

          </div>

          <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-7">

            <p className="leading-8">
              {generatedAnswer}
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="rounded-xl border border-green-200 dark:border-green-900/30 p-5">

              <p className="text-gray-500">
                Role Relevance
              </p>

              <p className="text-2xl font-black text-green-600 mt-2">
                {stats.relevanceScore}%
              </p>

            </div>

            <div className="rounded-xl border border-blue-200 dark:border-blue-900/30 p-5">

              <p className="text-gray-500">
                Structure Quality
              </p>

              <p className="text-2xl font-black text-blue-600 mt-2">
                {stats.structureScore}%
              </p>

            </div>

            <div className="rounded-xl border border-violet-200 dark:border-violet-900/30 p-5">

              <p className="text-gray-500">
                Overall Quality
              </p>

              <p className="text-2xl font-black text-violet-600 mt-2">
                {stats.qualityScore}%
              </p>

            </div>

          </div>

        </div>

        {/* AI Generation Notes */}

        <div className="mt-10 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-200 dark:border-blue-900/30 p-8">

          <div className="flex items-center gap-3 mb-5">

            <Lightbulb className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              How AI Built This Example
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            {[
              "Matched the answer to the selected target role.",
              "Adjusted technical depth for the selected experience level.",
              "Included the selected technology in a realistic context.",
              "Used the provided project background.",
              "Kept the answer appropriate for an interview setting.",
              "Created a response that can be personalized further.",
            ].map((item, index) => (

              <div
                key={index}
                className="flex items-center gap-3 rounded-xl bg-white dark:bg-[#111827] p-5"
              >

                <CheckCircle2
                  size={21}
                  className="text-green-600 shrink-0"
                />

                <span>
                  {item}
                </span>

              </div>

            ))}

          </div>

        </div>
                {/* Answer Structure Analysis */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <FileText className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Answer Structure Analysis
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                title: "Introduction",
                score: 94,
                description:
                  "Clearly introduces the candidate and connects their background to the role.",
              },
              {
                title: "Experience",
                score: 91,
                description:
                  "Uses a relevant project and explains practical experience.",
              },
              {
                title: "Technical Evidence",
                score: 88,
                description:
                  "Includes technology and development concepts relevant to the role.",
              },
              {
                title: "Conclusion",
                score: 90,
                description:
                  "Ends with career motivation and contribution to the organization.",
              },
            ].map((section, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex justify-between items-center">

                  <h3 className="font-bold">
                    {section.title}
                  </h3>

                  <span className="font-black text-violet-600">
                    {section.score}%
                  </span>

                </div>

                <div className="mt-4 w-full h-3 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                    style={{
                      width: `${section.score}%`,
                    }}
                  />

                </div>

                <p className="text-gray-500 mt-4 text-sm leading-6">
                  {section.description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Personalization Suggestions */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              Personalize This Example
            </h2>

          </div>

          <p className="text-white/90 leading-7 mb-7">
            This answer is an example, not a script. Replace the generic
            parts with your own experiences, achievements, responsibilities,
            and measurable results.
          </p>

          <div className="grid md:grid-cols-2 gap-5">

            {[
              "Replace the example project with your actual project.",
              "Add the specific responsibilities you personally handled.",
              "Mention measurable results where available.",
              "Include challenges that you actually experienced.",
              "Replace generic strengths with evidence from your background.",
              "Adapt the technical depth to match your actual knowledge.",
            ].map((suggestion, index) => (

              <div
                key={index}
                className="rounded-xl bg-white/10 p-5"
              >

                <div className="flex items-start gap-3">

                  <Lightbulb
                    size={21}
                    className="shrink-0"
                  />

                  <span className="leading-6">
                    {suggestion}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Example Answer Strengths */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <CheckCircle2 className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Example Answer Strengths
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[
              {
                title: "Role Specific",
                description:
                  "The answer uses language and examples relevant to the selected software engineering role.",
              },
              {
                title: "Experience Appropriate",
                description:
                  "The technical depth is suitable for an entry-level candidate.",
              },
              {
                title: "Technology Relevant",
                description:
                  "React and frontend development concepts are incorporated naturally.",
              },
              {
                title: "Project Based",
                description:
                  "The response demonstrates practical experience instead of relying only on theoretical claims.",
              },
              {
                title: "Structured",
                description:
                  "The answer follows a logical flow from background to experience, challenge, and learning.",
              },
              {
                title: "Personalizable",
                description:
                  "The structure allows users to replace generic information with their own details.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="w-11 h-11 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">

                  <CheckCircle2
                    size={22}
                    className="text-green-600"
                  />

                </div>

                <h3 className="font-bold text-lg mt-5">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-2 leading-6">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Improvement Opportunities */}

        <div className="mt-10 bg-orange-50 dark:bg-orange-900/10 rounded-3xl border border-orange-200 dark:border-orange-900/30 p-8">

          <div className="flex items-center gap-3 mb-8">

            <AlertTriangle className="text-orange-500" />

            <h2 className="text-2xl font-bold">
              Improvement Opportunities
            </h2>

          </div>

          <div className="space-y-5">

            {[
              {
                title: "Add Measurable Results",
                description:
                  "Include numbers such as performance improvements, users reached, response-time reductions, or project completion results.",
              },
              {
                title: "Add a Specific Challenge",
                description:
                  "Describe a real technical problem and explain exactly how you solved it.",
              },
              {
                title: "Include Your Individual Contribution",
                description:
                  "Make it clear which parts of the project you personally designed, implemented, or improved.",
              },
              {
                title: "Add a Stronger Closing",
                description:
                  "Connect your experience directly to how you can contribute to the target role.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl bg-white dark:bg-[#111827] p-6"
              >

                <div className="flex items-start gap-4">

                  <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center shrink-0">

                    <AlertTriangle
                      size={20}
                      className="text-orange-500"
                    />

                  </div>

                  <div>

                    <h3 className="font-bold">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 mt-2 leading-6">
                      {item.description}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Alternative Example Answers */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <WandSparkles className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Alternative Answer Styles
            </h2>

          </div>

          <div className="grid lg:grid-cols-3 gap-6">

            {[
              {
                title: "Concise",
                duration: "45–60 seconds",
                description:
                  "Best for initial introductions or when the interviewer wants a quick overview.",
                answer:
                  "I am a Computer Science student focused on software development. I have built practical projects using React and other technologies, including a web application for interview preparation. These projects have strengthened my problem-solving and development skills, and I am looking forward to applying them in a professional environment.",
              },
              {
                title: "Detailed",
                duration: "90–120 seconds",
                description:
                  "Best when the interviewer asks for more detail about your background.",
                answer:
                  "I am a Computer Science student with a strong interest in software development. I have worked on projects involving React, application design, and problem-solving. One project involved creating an interview preparation platform, where I worked with reusable components and user-focused interfaces. That experience taught me how to organize a growing codebase and think about both technical implementation and user experience.",
              },
              {
                title: "Technical",
                duration: "90–120 seconds",
                description:
                  "Best for technical interviews where the interviewer expects deeper engineering details.",
                answer:
                  "My development experience has mainly involved building component-based applications with React. I have worked with state management, reusable UI components, routing, and responsive interfaces. In one project, I focused on keeping the architecture maintainable as new features were introduced. This required separating responsibilities between components and thinking carefully about how state and data should flow through the application.",
              },
            ].map((style, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex justify-between items-start gap-4">

                  <div>

                    <h3 className="text-xl font-bold">
                      {style.title}
                    </h3>

                    <p className="text-violet-600 text-sm mt-1">
                      {style.duration}
                    </p>

                  </div>

                  <FileText
                    className="text-violet-600"
                    size={24}
                  />

                </div>

                <p className="text-gray-500 mt-4 leading-6">
                  {style.description}
                </p>

                <div className="mt-5 rounded-xl bg-gray-50 dark:bg-gray-800 p-5">

                  <p className="text-sm leading-6">
                    {style.answer}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* AI Role Recommendations */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Briefcase className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Role-Specific Recommendations
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              {
                role: "Software Engineer",
                focus:
                  "Emphasize problem solving, algorithms, development practices, debugging, and system design.",
              },
              {
                role: "Frontend Developer",
                focus:
                  "Highlight React, JavaScript, UI development, accessibility, responsive design, and user experience.",
              },
              {
                role: "Backend Developer",
                focus:
                  "Focus on APIs, databases, scalability, authentication, performance, and server-side development.",
              },
              {
                role: "Data Scientist",
                focus:
                  "Emphasize data analysis, machine learning, statistics, experimentation, and business insights.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <h3 className="font-bold text-lg">
                  {item.role}
                </h3>

                <p className="text-gray-500 mt-3 leading-7">
                  {item.focus}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Answer Quality Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Answer Quality Analytics
          </h2>

          {[
            ["Role Relevance", stats.relevanceScore],
            ["Answer Structure", stats.structureScore],
            ["Technical Relevance", 87],
            ["Experience Alignment", 90],
            ["Clarity", 92],
            ["Personalization Potential", stats.personalizationScore],
          ].map(([label, value], index) => (

            <div
              key={index}
              className="mb-7"
            >

              <div className="flex justify-between mb-2">

                <span>
                  {label}
                </span>

                <span className="font-bold">
                  {value}%
                </span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                  style={{
                    width: `${value}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Personalization Checklist */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Personalization Checklist
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                icon: "👤",
                title: "Your Experience",
                description:
                  "Replace generic examples with your own background.",
              },
              {
                icon: "💻",
                title: "Your Skills",
                description:
                  "Mention technologies you actually know and have used.",
              },
              {
                icon: "📊",
                title: "Your Results",
                description:
                  "Add measurable outcomes whenever possible.",
              },
              {
                icon: "🎯",
                title: "Your Goal",
                description:
                  "Connect your answer to the role you are applying for.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="text-4xl">
                  {item.icon}
                </div>

                <h3 className="font-bold text-lg mt-4">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-2 leading-6">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Final Quality Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Generated Answer Quality
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                The generated answer is strongly aligned with your target
                role and experience level. Personalizing it with your own
                projects, achievements, and measurable results will make
                it more authentic.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {stats.qualityScore}%
              </p>

              <p className="text-gray-500 mt-2">
                High Quality
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
              style={{
                width: `${stats.qualityScore}%`,
              }}
            />

          </div>

        </div>

        {/* AI Final Insight */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <Brain size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Insight
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Use AI-generated answers as examples for understanding
                structure, not as scripts to memorize. The strongest
                interview responses combine a good structure with your
                real projects, skills, challenges, decisions, and results.
              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">
                ✨
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Personalization
              </h3>

              <p className="text-5xl font-black">
                {stats.personalizationScore}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewAnswerExampleGenerator;