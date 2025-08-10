// // gemini.js
// const API_KEY = import.meta.env.VITE_GEMINI_KEY;

// const SYSTEM_PROMPT = `
// You are a task extractor.  
// Return ONLY valid JSON with the following structure:

// [
//   {
//     "id": "taskify-id must be unique with numbers and letters",
//     "title": "Short title",
//     "description": "One-line summary of the paragraph",
//     "createdAt": "2024-07-27T12:00:00Z",
//     "tags": ["tag1","tag2"],
//     "tasks": [
//       {
//         "id": "t-1",
//         "title": "Wake up at 5 am",
//         "description": "",
//         "status": "To-Do"
//       },
//       {
//         "id": "t-2",
//         "title": "Solve LeetCode array duplicate problem",
//         "description": "",
//         "status": "To-Do"
//       },
//       {
//         "id": "t-3",
//         "title": "Plan startup tasks",
//         "description": "",
//         "status": "To-Do"
//       }
//     ]
//   }
// ]

// Rules:
// 1. Every task must have a unique id (simple slug is fine, e.g. "t-1", "t-2").  
// 2. Default status for all tasks is "To-Do" unless the text explicitly says otherwise ("in progress", "done", etc.).  
// 3. Keep descriptions short; omit if empty.  
// 4. Do NOT wrap the JSON in markdown backticks.
// `;

// export async function extractListFromParagraph(paragraph) {
//   const payload = {
//     contents: [
//       {
//         parts: [
//           { text: SYSTEM_PROMPT },
//           { text: paragraph },
//         ],
//       },
//     ],
//   };

//   const res = await fetch(
//     `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     }
//   );

//   if (!res.ok) {
//     const err = await res.text();
//     throw new Error(`Gemini error ${res.status}: ${err}`);
//   }

//   const data = await res.json();
//   const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

//   // Gemini sometimes wraps in ```json … ```
//   const jsonStr = raw.replace(/```(?:json)?/g, "").trim();
//   return JSON.parse(jsonStr);   // <- returns the array
// }

//cohore
// cohere.js

const API_KEY = import.meta.env.VITE_COHERE_KEY;
function generateUniqueId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-taskify`;
}

const SYSTEM_PROMPT = `
You are a task extractor.  
Return ONLY valid JSON with the following structure:

[
  {
    "id": "${generateUniqueId()}",
    "title": " title at least 4 words",
    "description": "One-line summary of the paragraph",
    "createdAt": "today's date in ISO format",
    "tags": ["tag1","tag2"],
    "tasks": [
    {
  "id": "t-1",
  "title": "Short title 3 words only", 
  "description": "Detailed explanation of the task, including any relevant links or notes.",
  "status": "To-Do",                // or "In-Progress", "Done"
  "priority": "high",               // low, medium, high
  "dueDate": "2025-08-12",          // ISO date format
  "createdAt": "2025-08-09T10:00:00Z",
  "updatedAt": "2025-08-09T10:00:00Z",
  "tags": ["frontend", "UI"],       // easy filtering/search
 
},
       {
  "id": "t-2",
  "title": "Short title 3 words only", 
  "description": "Detailed explanation of the task, including any relevant links or notes.",
  "status": "To-Do",                // or "In-Progress", "Done"
  "priority": "high",               // low, medium, high
  "dueDate": "2025-08-12",          // ISO date format
  "createdAt": "2025-08-09T10:00:00Z",
  "updatedAt": "2025-08-09T10:00:00Z",
  "tags": ["frontend", "UI"],       // easy filtering/search
 
},
       {
  "id": "t-3",
  "title": "Short title 3 words only", 
  "description": "Detailed explanation of the task, including any relevant links or notes.",
  "status": "To-Do",                // or "In-Progress", "Done"
  "priority": "high",               // low, medium, high
  "dueDate": "2025-08-12",          // ISO date format
  "createdAt": "2025-08-09T10:00:00Z",
  "updatedAt": "2025-08-09T10:00:00Z",
  "tags": ["frontend", "UI"],       // easy filtering/search
 
},
    ]
  }
]

Rules:
1.  Each task must be clear and to the point .
2. Every task must have a unique id (simple slug is fine, e.g. "t-1", "t-2").  
3. Default status for all tasks is "To-Do" unless the text explicitly says otherwise ("in progress", "done", etc.).  
5. Keep descriptions short but meaningful and productive (no longer than 9 words); omit if empty.  
6. Use ISO date format for dates (e.g., "2024-07-27T12:00:00Z").
7. Use tags to categorize tasks (e.g., ["frontend", "UI"]).
8. Use priority to prioritize tasks (e.g., "high", "medium", "low").
9. Do NOT wrap the JSON in markdown backticks.

`;

export async function extractListFromParagraph(paragraph) {
  const response = await fetch('https://api.cohere.ai/v1/chat', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'command-r-plus',
      temperature: 0.3,
      chat_history: [],
      message: paragraph,
      preamble: SYSTEM_PROMPT,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Cohere error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const raw = data.text ?? '';

  // Remove markdown wrapping (```json ... ```)
  const jsonStr = raw.replace(/```(?:json)?/g, '').replace(/```/g, '').trim();

  try {
    return JSON.parse(jsonStr);
  } catch (err) {
    throw new Error(`Failed to parse JSON from Cohere response:\n${jsonStr}`);
  }
}
