import { Link } from "react-router-dom";
import {
  SparklesIcon,
  ClipboardDocumentListIcon,
  PresentationChartLineIcon,
  ClockIcon,
  CalendarDaysIcon,
  TrophyIcon,
  ArrowPathIcon,
  BoltIcon,
  PuzzlePieceIcon
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import GlassNavbar from "./Nav";
import AppFooter from "./Footer";

const features = [
  {
    icon: ClipboardDocumentListIcon,
    title: "From Paragraph → Kanban",
    desc: "Paste raw text and watch AI build an instant interactive board.",
    animation: "hover:animate-pulse"
  },
  {
    icon: PresentationChartLineIcon,
    title: "Table & Board Views (soon)",
    desc: "Switch to tables or timeline boards for different workflows.",
    animation: "hover:animate-bounce"
  },
  {
    icon: ClockIcon,
    title: "Pomodoro Timer (soon)",
    desc: "Stay focused with built-in 25-min sprints right inside tasks.",
    animation: "hover:animate-spin-slow"
  },
  {
    icon: CalendarDaysIcon,
    title: "Google Calendar Sync (soon)",
    desc: "Drag a task onto your calendar and block time automatically.",
    animation: "hover:animate-ping"
  },
  {
    icon: SparklesIcon,
    title: "Weekly PDF Reports (soon)",
    desc: "Download beautiful PDF summaries of daily or weekly progress.",
    animation: "hover:animate-pulse"
  },
  {
    icon: TrophyIcon,
    title: "Achievement Rewards (soon)",
    desc: "Earn badges & streaks every time you clear your list.",
    animation: "hover:animate-bounce"
  }
];

const testimonials = [
  {
    quote: "This transformed how I organize my research. The AI kanban is magical!",
    author: "Sarah K., UX Designer"
  },
  {
    quote: "Finally a tool that adapts to my workflow instead of the other way around.",
    author: "Miguel T., Project Manager"
  },
  {
    quote: "The upcoming calendar integration will save me hours every week.",
    author: "Priya N., Software Engineer"
  }
];

export default function FeaturesPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isHovering, setIsHovering] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-pink-50">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 opacity-30"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <GlassNavbar/>


      {/* Intro Section */}
      <section className="max-w-3xl mx-auto text-center pt-16 mt-4 pb-12 px-4 relative z-10">
        <div className="inline-block mb-4 px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-blue-600 shadow-sm hover:scale-105 transition-transform">
          <div className="flex items-center">
            <SparklesIcon className="w-4 h-4 mr-1" />
            <span>New features launching weekly</span>
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Power up your workflow with{" "}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            AI-powered tools
          </span>
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Organize, plan, and track — all in one place. More features are
          arriving every week.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="relative overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-3 text-white font-medium shadow hover:shadow-lg transition-all hover:scale-[1.03] group"
          >
            <span className="relative z-10">Get Started Free</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
          <Link
            to="/"
            className="relative overflow-hidden rounded-full bg-white px-6 py-3 text-slate-800 font-medium shadow-sm hover:shadow transition-all hover:scale-[1.03] group border border-slate-200"
          >
            <span className="relative z-10 flex items-center justify-center">
              <PuzzlePieceIcon className="w-4 h-4 mr-2" />
              See integrations
            </span>
            <span className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-2xl mx-auto px-4 py-8 relative z-10">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-white/50 hover:shadow-md transition-all">
          <div className="text-center">
            <SparklesIcon className="w-6 h-6 mx-auto text-purple-500 mb-2" />
            <p className="text-lg italic text-slate-700 mb-2">
              "{testimonials[currentTestimonial].quote}"
            </p>
            <p className="text-sm text-slate-500">
              — {testimonials[currentTestimonial].author}
            </p>
            <div className="flex justify-center mt-4 space-x-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === currentTestimonial ? 'bg-gradient-to-r from-blue-500 to-pink-500' : 'bg-slate-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, index) => (
            <div
              key={f.title}
              className={`group relative bg-white/70 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-white/50 hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden ${f.animation}`}
              onMouseEnter={() => setIsHovering(index)}
              onMouseLeave={() => setIsHovering(null)}
            >
              {isHovering === index && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
              )}
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-600">{f.desc}</p>
                {f.title.includes("(soon)") && (
                  <div className="mt-3 inline-flex items-center text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                    <ClockIcon className="w-3 h-3 mr-1" />
                    Coming soon
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center relative z-10">
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-0.5 shadow-xl">
          <div className="bg-white rounded-xl p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Ready to transform your productivity?
            </h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Join thousands of professionals who are already working smarter with TaskForge.
            </p>
            <Link
              to="/"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-8 py-3 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:scale-[1.03]"
            >
              <SparklesIcon className="w-5 h-5 mr-2" />
              Start your free trial
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
<AppFooter/>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
        .hover\\:animate-spin-slow:hover {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
}