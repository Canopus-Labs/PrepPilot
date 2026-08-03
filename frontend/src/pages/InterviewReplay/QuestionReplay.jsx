import React from "react";
import {
  MessageSquare,
  User,
  Bot,
  Star,
} from "lucide-react";

const QuestionReplay = ({ questions }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">

      <div className="flex items-center gap-3 mb-6">

        <div className="bg-violet-100 dark:bg-violet-900/20 p-3 rounded-full">
          <MessageSquare
            size={24}
            className="text-violet-600 dark:text-violet-400"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Question Replay
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            Review every interview question with your answer.
          </p>
        </div>

      </div>

      <div className="space-y-6">

        {questions.map((item, index) => (

          <div
            key={index}
            className="rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 p-5"
          >

            <div className="flex items-center gap-2 mb-3">

              <MessageSquare
                size={18}
                className="text-violet-600"
              />

              <h3 className="font-bold text-gray-900 dark:text-white">
                Question {index + 1}
              </h3>

            </div>

            <p className="font-medium text-gray-800 dark:text-gray-200">
              {item.question}
            </p>

            <div className="mt-5 flex gap-3">

              <User
                size={20}
                className="text-blue-500 mt-1"
              />

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Your Answer
                </h4>

                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {item.answer}
                </p>
              </div>

            </div>

            <div className="mt-5 flex gap-3">

              <Bot
                size={20}
                className="text-green-500 mt-1"
              />

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  AI Feedback
                </h4>

                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {item.feedback}
                </p>
              </div>

            </div>

            <div className="mt-5 flex items-center gap-2">

              <Star
                size={18}
                className="text-yellow-500"
              />

              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Performance Rating: 4.5 / 5
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default QuestionReplay;