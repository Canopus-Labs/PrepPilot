import React, { useEffect, useState } from "react";

const questions = [
  {
    code: "let x = 5;\nconsole.log(x + 2);",
    options: ["5", "7", "52", "undefined"],
    answer: "7",
    explanation: "The variable x contains 5, so 5 + 2 equals 7.",
  },
  {
    code: "console.log(typeof null);",
    options: ["null", "object", "undefined", "number"],
    answer: "object",
    explanation:
      "In JavaScript, typeof null returns 'object'. This is a well-known behavior of JavaScript.",
  },
  {
    code:
      "for (let i = 0; i < 3; i++) {\n  console.log(i);\n}",
    options: ["0 1 2", "1 2 3", "0 1 2 3", "3"],
    answer: "0 1 2",
    explanation:
      "The loop starts at 0 and continues while i is less than 3, so it prints 0, 1, and 2.",
  },
  {
    code: 'console.log("5" + 2);',
    options: ["7", "52", "Error", "NaN"],
    answer: "52",
    explanation:
      "The + operator performs string concatenation when one operand is a string. Therefore, '5' + 2 produces '52'.",
  },
  {
    code: 'console.log("5" - 2);',
    options: ["3", "52", "NaN", "Error"],
    answer: "3",
    explanation:
      "The - operator converts the string '5' into the number 5, so 5 - 2 equals 3.",
  },
  {
    code:
      "function add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(3, 4));",
    options: ["34", "7", "undefined", "Error"],
    answer: "7",
    explanation:
      "The function adds 3 and 4, so the returned result is 7.",
  },
  {
    code: "let arr = [1, 2, 3];\nconsole.log(arr.length);",
    options: ["2", "3", "4", "undefined"],
    answer: "3",
    explanation:
      "The array contains three elements, so its length is 3.",
  },
  {
    code:
      'const obj = { name: "John" };\nconsole.log(obj.name);',
    options: ["John", "name", "undefined", "Error"],
    answer: "John",
    explanation:
      "Dot notation accesses the value stored in the name property, which is 'John'.",
  },
  {
    code:
      "function fact(n) {\n  if (n === 1) return 1;\n  return n * fact(n - 1);\n}\n\nconsole.log(fact(3));",
    options: ["3", "6", "9", "1"],
    answer: "6",
    explanation:
      "The recursive calculation is 3 × 2 × 1, which equals 6.",
  },
  {
    code: "let a;\nconsole.log(a);",
    options: ["null", "0", "undefined", "Error"],
    answer: "undefined",
    explanation:
      "The variable a is declared without assigning a value, so its value is undefined.",
  },
  {
    code:
      "function outer() {\n  let x = 10;\n\n  return function inner() {\n    console.log(x);\n  };\n}\n\nconst fn = outer();\nfn();",
    options: ["10", "undefined", "Error", "null"],
    answer: "10",
    explanation:
      "The inner function remembers the variable x from the outer function. This behavior is called a closure.",
  },
];

const createRound = () => {
  return [...questions]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);
};

const CodeOutputGame = () => {
  const [gameQuestions, setGameQuestions] = useState(createRound);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  const question = gameQuestions[currentQuestion];

  const handleAnswer = (option) => {
    if (selectedAnswer !== null || !question) {
      return;
    }

    setSelectedAnswer(option);

    if (option === question.answer) {
      setScore((previousScore) => previousScore + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < gameQuestions.length - 1) {
      setCurrentQuestion((previousQuestion) => previousQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setGameQuestions(createRound());
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
  };

  useEffect(() => {
    if (gameOver || selectedAnswer !== null) {
      return;
    }

    if (timeLeft === 0) {
      nextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((previousTime) => previousTime - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, gameOver, selectedAnswer]);

  if (gameOver) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          🎉 Game Completed
        </h2>

        <p className="text-xl mb-6 text-gray-700 dark:text-gray-300">
          Your Score: {score} / {gameQuestions.length}
        </p>

        <button
          type="button"
          className="bg-violet-600 text-white px-5 py-2 rounded-lg hover:bg-violet-700"
          onClick={restartGame}
        >
          Play Again
        </button>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600">
          Unable to load the question.
        </p>

        <button
          type="button"
          className="mt-4 bg-violet-600 text-white px-5 py-2 rounded-lg"
          onClick={restartGame}
        >
          Restart Game
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Code Output Prediction
        </h1>

        <div className="flex gap-4 text-sm font-semibold">
          <span className="text-gray-700 dark:text-gray-300">
            Score: {score}
          </span>

          <span className="text-gray-700 dark:text-gray-300">
            Time: {timeLeft}s
          </span>

          <span className="text-gray-700 dark:text-gray-300">
            Question: {currentQuestion + 1}/{gameQuestions.length}
          </span>
        </div>
      </div>

      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-6">
        <code className="text-sm md:text-base">
          {question.code}
        </code>
      </pre>

      <div className="space-y-2">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === question.answer;

          let buttonClass =
            "border p-3 block w-full rounded-lg text-left transition-colors";

          if (selectedAnswer === null) {
            buttonClass +=
              " hover:bg-violet-100 dark:hover:bg-violet-700";
          } else if (isCorrect) {
            buttonClass +=
              " border-green-500 bg-green-100 dark:bg-green-900";
          } else if (isSelected) {
            buttonClass +=
              " border-red-500 bg-red-100 dark:bg-red-900";
          } else {
            buttonClass += " opacity-60";
          }

          return (
            <button
              key={`${currentQuestion}-${index}`}
              type="button"
              disabled={selectedAnswer !== null}
              className={buttonClass}
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selectedAnswer !== null && (
        <div className="mt-6 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
          {selectedAnswer === question.answer ? (
            <p className="font-semibold text-green-600 mb-2">
              ✅ Correct Answer!
            </p>
          ) : (
            <p className="font-semibold text-red-600 mb-2">
              ❌ Incorrect Answer
            </p>
          )}

          <p className="mb-2 text-gray-800 dark:text-gray-200">
            <strong>Correct Answer:</strong> {question.answer}
          </p>

          <p className="text-gray-800 dark:text-gray-200">
            <strong>Explanation:</strong> {question.explanation}
          </p>

          <button
            type="button"
            className="mt-4 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
            onClick={nextQuestion}
          >
            {currentQuestion < gameQuestions.length - 1
              ? "Next Question →"
              : "Finish Game"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CodeOutputGame;
