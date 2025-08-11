import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  EnvelopeIcon, 
  ArrowPathIcon, 
  CheckCircleIcon,
  PhoneIcon,
  MapPinIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';
import AppFooter from './Footer';
import GlassNavbar from './Nav';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSent(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const resetForm = () => {
    setSent(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-pink-50">
      {/* Header */}
     <GlassNavbar/>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-blue-600 mb-4">
                <ChatBubbleBottomCenterTextIcon className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">We're here to help</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                Get in <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">touch</span>
              </h1>
              <p className="mt-3 text-lg text-slate-600">
                Have questions or feedback? We typically reply within 24 hours.
              </p>
            </div>

            {sent ? (
              <div className="mt-10 bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  Message sent successfully!
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                  We've received your message and will get back to you soon.
                </p>
                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium py-2 px-6 rounded-lg hover:shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center"
                >
                  <ArrowPathIcon className="w-4 h-4 mr-2" />
                  Send another message
                </button>
              </div>
            ) : (
            //   <form  action={"https://formspree.io/f/xwpqogbe"} method='post' className="mt-10 bg-white rounded-xl shadow-lg p-8 space-y-6 hover:shadow-xl transition-all">
            //     <div>
            //       <label className="block text-sm font-medium text-slate-700 mb-1">Your name</label>
            //       <input
            //         type="text"
            //         required
            //         className="mt-1 w-full rounded-lg border-slate-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 py-3 px-4 transition-all"
            //         placeholder="John Doe"
            //       />
            //     </div>
            //     <div>
            //       <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
            //       <input
            //         type="email"
            //         required
            //         className="mt-1 w-full rounded-lg border-slate-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 py-3 px-4 transition-all"
            //         placeholder="you@example.com"
            //       />
            //     </div>
           
            //     <div>
            //       <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
            //       <textarea
            //         rows={5}
            //         required
            //         className="mt-1 w-full rounded-lg border-slate-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 py-3 px-4 transition-all"
            //         placeholder="Tell us about your project or question..."
            //       />
            //     </div>
            //    
            //   </form>
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
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all hover:scale-[1.02] ${
                    isSubmitting
                      ? 'bg-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <EnvelopeIcon className="w-4 h-4 mr-2" />
                      Send Message
                    </span>
                  )}
                </button>
          </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="order-1 lg:order-2">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 h-full text-white">
              <div className="flex items-center mb-6">
                <EnvelopeIcon className="w-8 h-8 mr-3" />
                <h2 className="text-2xl font-bold">Contact Information</h2>
              </div>
              
              <p className="mb-8 text-blue-100">
                Have questions about our product or need support? Reach out through any of these channels.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-white/20 p-2 rounded-lg">
                    <EnvelopeIcon className="w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-blue-50">Email us</h3>
                    <a 
                      href="mailto:support@taskforge.com" 
                      className="text-base hover:text-white transition-colors"
                    >
                      support@taskforge.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-white/20 p-2 rounded-lg">
                    <PhoneIcon className="w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-blue-50">Call us</h3>
                    <a 
                      href="tel:+18005551234" 
                      className="text-base hover:text-white transition-colors"
                    >
                      +1 (800) 555-1234
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-white/20 p-2 rounded-lg">
                    <MapPinIcon className="w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-blue-50">Visit us</h3>
                    <p className="text-base">
                      123 Productivity Lane<br />
                      San Francisco, CA 94107
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-blue-400/30">
                <h3 className="text-sm font-medium text-blue-50 mb-4">Join our community</h3>
                <div className="flex space-x-4">
                  {['Twitter', 'Discord', 'LinkedIn'].map((platform) => (
                    <div 
                      key={platform}
                      className="bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer"
                    >
                      {platform}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-12">
          Frequently asked questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              question: "What's your typical response time?",
              answer: "We aim to respond to all inquiries within 24 hours during business days. Premium support subscribers get responses within 4 hours."
            },
            {
              question: "Do you offer enterprise support?",
              answer: "Yes! We have dedicated support plans for teams of 10+. Contact our sales team for custom solutions."
            },
            {
              question: "Can I schedule a demo call?",
              answer: "Absolutely! Use our calendar link to book a 30-minute demo session with our product specialists."
            },
            {
              question: "Where can I find documentation?",
              answer: "Our comprehensive knowledge base is available at docs.taskforge.com with tutorials and API references."
            }
          ].map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all border border-white/50"
            >
              <h3 className="font-medium text-slate-900 mb-2">{faq.question}</h3>
              <p className="text-sm text-slate-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
     <AppFooter/>
    </div>
  );
}