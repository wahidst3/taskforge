import { useState, useEffect } from "react";
import { signInAsGuest } from "../utilis/firebase";
import { UserIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../utilis/firebase";


// const db = getFirestore();

// export const saveGuestUser = async () => {
//   const user = auth.currentUser;
//   if (!user) return;

//   const userRef = doc(db, "users", user.uid);
//   await setDoc(userRef, {
//     uid: user.uid,
//     isGuest: true,
//     lists: [],
//     listsCount: 0,
//     createdAt: serverTimestamp(),
//     lastLogin: serverTimestamp()
//   }, { merge: true });
// };

export default function Guest({ saveGuestUser,handleGuestLogin,loading,showGuestLogin,setLoading,setShowGuestLogin }) {


 

 
  if (!showGuestLogin) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4">
      <div
        className="w-full max-w-md p-8 rounded-2xl shadow-2xl text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.9), rgba(236,72,153,0.9))",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
        }}
      >
        {/* Decorative glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

        {/* Logo */}
        <div className="mb-6 relative z-10">
          <h1 className="text-4xl font-bold text-white">TaskForgeAI</h1>
          <p className="text-white/80 mt-1">Organize your tasks effortlessly</p>
        </div>

        {/* Guest Info */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-sm text-white/90 mb-6 relative z-10">
          <div className="flex items-center justify-center gap-2 mb-1">
            <SparklesIcon className="w-5 h-5 text-yellow-300" />
            <span className="font-semibold">Guest Mode Benefits</span>
          </div>
          <ul className="text-left list-disc list-inside space-y-1 text-white/80">
            <li>Access up to <span className="font-semibold">12 boards/day</span></li>
            <li>Save tasks temporarily (local only)</li>
            <li>No sign-up required</li>
          </ul>
        </div>

        {/* Guest Login Button */}
        <button
          onClick={handleGuestLogin}
          disabled={loading}
          className="relative z-10 w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-white/20 text-white font-semibold border border-white/30 hover:bg-white/30 transition disabled:opacity-50"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span>Logging in as Guest…</span>
            </>
          ) : (
            <>
              <UserIcon className="w-5 h-5 text-white" />
              Continue as Guest
            </>
          )}
        </button>
      </div>
    </div>
  );
}
