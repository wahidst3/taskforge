export default function AboutSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            About Our <span className="text-indigo-600">Mission</span>
          </h2>
          <p className="text-slate-600 mb-6">
            We're transforming productivity with AI-powered task extraction.
          </p>
          <button className="inline-flex items-center px-4 py-2 border border-indigo-600 cursor-pointer text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
         <a href="https://www.linkedin.com/in/wahid-ali-467855235/"> Meet the Team</a>  
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img 
            src="https://edexec.co.uk/wp-content/uploads/2024/09/iStock-1343389492-678x381.jpg" 
            alt="Team collaborating" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}