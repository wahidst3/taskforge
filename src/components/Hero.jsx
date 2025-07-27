// // Hero.jsx
// import { useState } from "react";
// import { ArrowRightIcon } from "@heroicons/react/24/outline";

// export default function Hero({ onGenerate }) {
//   const [text, setText] = useState("");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-50 via-slate-50 to-sky-100 flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
//       {/* Subtle animated blob behind the card */}
//       <div className="absolute inset-0 overflow-hidden -z-0">
//         <div className="blob absolute -top-40 -left-40 w-96 h-96 bg-sky-300/30 rounded-full blur-3xl animate-pulse" />
//         <div className="blob absolute -bottom-40 -right-40 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
//       </div>

//       <div className="relative z-10 max-w-3xl w-full text-center space-y-10">
//         {/* Heading */}
//         <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
//           From messy paragraph to
//           <span className="text-sky-600"> crystal-clear tasks</span>
//         </h1>

//         {/* Sub-heading */}
//         <p className="max-w-xl mx-auto text-lg text-slate-600">
//           Paste any wall of text—emails, meeting notes, brain dumps—and watch AI
//           extract tasks, deadlines, and categories in seconds.
//         </p>

//         {/* Input card */}
//         <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl p-6 space-y-4">
//           <textarea
//             rows={4}
//             className="w-full resize-none rounded-lg outline-0 p-2 border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-500 transition"
//             placeholder="Type or paste your paragraph here..."
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//           />
//           <button
//             onClick={() => {onGenerate(text) ,setText("")}}
//             disabled={!text.trim()}
//             className="w-full flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 py-3 text-lg font-semibold text-white shadow-md hover:bg-sky-700 disabled:bg-sky-300 disabled:cursor-not-allowed transition-all duration-200 group"
//           >
//             Generate my list
//             <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//           </button>
//         </div>

//         {/* Micro-testimonials / trust row */}
//         <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
//           <span className="flex items-center gap-1">
//             <span className="inline-block w-2 h-2 bg-green-500 rounded-full" />
//             Free to start
//           </span>
//           <span className="flex items-center gap-1">
//             <span className="inline-block w-2 h-2 bg-green-500 rounded-full" />
//             No credit card
//           </span>
//           <span className="flex items-center gap-1">
//             <span className="inline-block w-2 h-2 bg-green-500 rounded-full" />
//             2 000+ happy users
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }
// Hero.jsx
import { useState, useEffect } from "react";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { ClipboardDocumentIcon, LightBulbIcon } from "@heroicons/react/24/outline";

export default function Hero({ onGenerate, isLoading }) {
  const [text, setText] = useState("");
  const [showExample, setShowExample] = useState(false);

  // Load saved text from localStorage
  useEffect(() => {
    const savedText = localStorage.getItem('taskExtractorText');
    if (savedText) setText(savedText);
  }, []);

  // Save text to localStorage
  useEffect(() => {
    if (text) {
      localStorage.setItem('taskExtractorText', text);
    }
  }, [text]);

  const handleGenerate = () => {
    onGenerate(text);
    // Don't clear text so user can reference it
  };

  const loadExample = () => {
    setText(`Team meeting notes:
- Need to finish the quarterly report by Friday EOD
- Schedule demo with client for next Wednesday
- Follow up with marketing about the new campaign assets
- Bug in login page needs fixing (priority)
- Order new office supplies (pens, notebooks)`);
    setShowExample(false);
  };

  return (
    <div id="hero" className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating abstract shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-100 rounded-full opacity-20 blur-xl animate-float1" />
        <div className="absolute top-1/3 right-20 w-40 h-40 bg-indigo-100 rounded-lg opacity-30 blur-xl rotate-45 animate-float2" />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-100 rounded-full opacity-25 blur-xl animate-float3" />
        
        {/* Clipart-style illustrations */}
        <div className="absolute bottom-10 right-10 w-48 h-48 opacity-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#6366F1" d="M45.2,-58.2C59.1,-49.2,71.3,-36.9,73.9,-22.3C76.5,-7.7,69.5,9.2,60.1,24.7C50.7,40.2,38.9,54.3,23.6,63.1C8.3,71.9,-10.5,75.4,-26.4,68.8C-42.3,62.2,-55.3,45.5,-62.1,27.3C-68.9,9.1,-69.5,-10.6,-62.7,-27.2C-55.9,-43.8,-41.7,-57.3,-26.8,-65.9C-11.9,-74.5,3.7,-78.2,18.1,-73.8C32.5,-69.4,45.6,-56.9,45.2,-58.2Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-3xl w-full text-center space-y-10">
        {/* Heading with new font style */}
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-800 tracking-tight font-[Inter]">
            Transform <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">Text to Tasks</span>
          </h1>
          
          {/* Sub-heading */}
          <p className="max-w-xl mx-auto text-xl text-slate-600 font-medium">
            AI-powered extraction of actionable items from any text
            <span className="inline-block ml-2">
              <SparklesIcon className="w-5 h-5 text-amber-400" />
            </span>
          </p>
        </div>

        {/* Input card */}
        <div className="bg-white/90 backdrop-blur-lg border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-4 transform transition-all hover:shadow-xl">
          <div className="flex justify-between items-center">
            <label htmlFor="input-text" className="block text-sm font-medium text-slate-500 mb-1">
              Paste your text below
            </label>
            <span className="text-xs text-slate-400">
              {text.length} characters
            </span>
          </div>
          
          <textarea
            id="input-text"
            rows={5}
            className="w-full resize-none rounded-xl outline-none p-4 border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition font-[Inter] text-slate-700"
            placeholder="Meeting notes, emails, brain dumps..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleGenerate}
              disabled={!text.trim() || isLoading}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3.5 text-lg font-semibold text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group"
            >
              {isLoading ? (
                'Processing...'
              ) : (
                <>
                  Extract Tasks
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
            {!text.trim() && (
              <button
                onClick={loadExample}
                className="flex items-center justify-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 hover:bg-amber-100 transition-colors"
              >
                <LightBulbIcon className="w-4 h-4" />
                Try Example
              </button>
            )}
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          <div className="bg-white/50 backdrop-blur-sm border border-slate-200 rounded-lg p-3 flex items-center gap-2">
            <ClipboardDocumentIcon className="w-4 h-4 text-indigo-500" />
            <span>No signup needed</span>
          </div>
          <div className="bg-white/50 backdrop-blur-sm border border-slate-200 rounded-lg p-3 flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-amber-500" />
            <span>AI-powered</span>
          </div>
          <div className="bg-white/50 backdrop-blur-sm border border-slate-200 rounded-lg p-3 flex items-center gap-2 sm:flex hidden">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Free to use</span>
          </div>
        </div>
      </div>

      {/* Add custom animation styles */}
      <style jsx global>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) translateX(0) rotate(45deg); }
          50% { transform: translateY(15px) translateX(-15px) rotate(45deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(20px) translateX(5px); }
        }
        .animate-float1 { animation: float1 8s ease-in-out infinite; }
        .animate-float2 { animation: float2 10s ease-in-out infinite; }
        .animate-float3 { animation: float3 7s ease-in-out infinite; }
      `}</style>
    </div>
  );
}