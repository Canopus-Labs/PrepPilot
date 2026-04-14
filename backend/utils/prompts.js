
const questionAnswerPrompt = ({ role, experience, topicsToFocus, numberOfQuestions }) => `
You are an AI trained to generate technical interview questions and answers.

Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Write ${numberOfQuestions} interview questions
- For each question, generate a concise, beginner-friendly answer using rich markdown formatting:
    - Keep the answer brief and straight to the point (2-3 short paragraphs maximum).
    - If the answer naturally requires a code example, include exactly ONE short, simple code block.
    - Use basic markdown formatting (bold, italics, bullet points).
    - DO NOT generate excessively long explanations; the user will request more details separately if needed.
- Return a pure JSON array like:
[
  {
    "question": "Question here?",
    "answer": "Answer here in markdown."
  },
  ...
]

Important: Do NOT add any extra text. Only return valid JSON.
`;

const conceptExplainPrompt = (question) => (`
You are an AI trained to generate explanations for a given interview question.

Task:
- Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
- Question: "${question}"
- After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
- If the explanation includes a code example, provide a small code block.
- Keep the formatting very clean and clear.
- Return the result as a vaild JSON object in the followinf format:
{
    "title": "Short title here?",
    "explanation": "Explanation here."
}

Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.

`)

module.exports = { questionAnswerPrompt, conceptExplainPrompt };