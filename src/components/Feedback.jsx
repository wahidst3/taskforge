import { useState } from "react";

export default function SuggestionForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    suggestion: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle actual submission (e.g., send to backend or Google Form endpoint)
    console.log("Submitted suggestion:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", suggestion: "" });
  };

  return (
    <div className="bg-[#F8FAFC] min-h-full py-16 px-4 text-slate-800">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center"> Suggest a Feature</h2>
        <p className="mb-8 text-center text-slate-600">
          Have an idea or feedback? We’d love to hear it!
        </p>

        {submitted ? (
          <div className="bg-green-100 text-green-700 p-4 rounded shadow text-center">
             Thanks for your suggestion! We’ll review it soon.
          </div>
        ) : (
          <form
           
            action={"https://formspree.io/f/xwpqogbe"}
            method="POST"
            className="bg-white p-6 rounded-xl shadow space-y-4"
          >
            <div>
              <label className="block text-sm font-medium">Name (optional)</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email (optional)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Your Suggestion *</label>
              <textarea
                name="suggestion"
                required
                rows="4"
                value={formData.suggestion}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                placeholder="Tell us what you'd like to see..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Submit Suggestion
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
