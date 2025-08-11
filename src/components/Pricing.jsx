import { Link } from 'react-router-dom';
import { 
  CheckIcon, 
  BoltIcon, 
  SparklesIcon, 
  ArrowPathIcon,
  GiftIcon,
  CalendarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import AppFooter from './Footer';
import GlassNavbar from './Nav';

const tiers = [
  {
    name: 'Guest',
    price: '$0',
    badge: 'Forever Free',
    features: [
      '10 tasks / month', 
      'Kanban view', 
      'No sign-up required',
      'Basic AI organization',
      'Email support'
    ],
    cta: 'Current Plan',
    popular: false,
    icon: SparklesIcon
  },
  {
    name: 'Starter',
    price: '$0.89',
    badge: 'Early-Bird Special',
    features: [
      'Unlimited tasks & projects',
      'Kanban + upcoming Table & Board',
      'Weekly PDF reports',
      'Pomodoro timer integration',
      'Google Calendar sync',
      'Achievements & rewards',
      'Priority feature requests',
      'Early access to new tools'
    ],
    cta: 'Join Early Access',
    popular: true,
    icon: BoltIcon
  }
];

const testimonials = [
  {
    quote: "The free tier has everything I need for personal projects. Incredible value!",
    author: "Maya R., Freelance Designer",
    plan: "Guest"
  },
  {
    quote: "Early access features have transformed our team's productivity. Can't wait to see what's next!",
    author: "James L., Startup Founder",
    plan: "Starter"
  }
];

export default function PricingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isHovering, setIsHovering] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-pink-50">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 opacity-20"
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

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-blue-600 mb-4">
            <GiftIcon className="w-4 h-4 mr-1" />
            No credit card required
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900">
            Pricing built for{' '}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              everyone
            </span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Everything is free during our early access period. Premium features will remain free for early adopters.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-8 border transition-all hover:shadow-xl hover:-translate-y-1 ${
                tier.popular
                  ? 'border-purple-300 ring-1 ring-purple-200'
                  : 'border-white/50'
              }`}
              onMouseEnter={() => setIsHovering(index)}
              onMouseLeave={() => setIsHovering(null)}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}
              
              {isHovering === index && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse rounded-xl"></div>
              )}

              <div className="relative z-10">
                {/* Plan Icon */}
                <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${
                  tier.popular 
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-md'
                    : 'bg-slate-100'
                }`}>
                  <tier.icon className={`w-6 h-6 ${
                    tier.popular ? 'text-white' : 'text-purple-500'
                  }`} />
                </div>

                {/* Price & Badge */}
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-slate-900">{tier.price}</span>
                  <span className="ml-2 text-sm font-semibold text-slate-500">/month</span>
                  <span className={`ml-auto inline-block text-xs font-semibold px-2 py-1 rounded-full shadow ${
                    tier.popular
                      ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {tier.badge}
                  </span>
                </div>

                {/* Plan Name */}
                <h3 className="mt-4 text-2xl font-bold text-slate-900">{tier.name}</h3>

                {/* Features */}
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckIcon className={`w-5 h-5 shrink-0 mt-0.5 ${
                        tier.popular ? 'text-green-500' : 'text-slate-400'
                      }`} />
                      <span className={`ml-2 ${
                        tier.popular ? 'text-slate-800' : 'text-slate-600'
                      }`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`mt-8 w-full rounded-full font-semibold py-3 px-6 transition-all hover:scale-[1.02] ${
                    tier.popular
                      ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
                      : 'bg-white text-slate-800 border border-slate-200 shadow hover:shadow-md'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-24 max-w-3xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm p-8 border border-white/50 hover:shadow-md transition-all">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {testimonials.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full mx-1 transition-colors ${
                      i === currentTestimonial
                        ? 'bg-gradient-to-r from-blue-500 to-pink-500 w-4'
                        : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-lg italic text-slate-700 mb-4">
                "{testimonials[currentTestimonial].quote}"
              </p>
              <div className="flex items-center justify-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  testimonials[currentTestimonial].plan === 'Starter'
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
                    : 'bg-slate-200'
                }`}>
                  {testimonials[currentTestimonial].plan === 'Starter' ? (
                    <BoltIcon className="w-4 h-4 text-white" />
                  ) : (
                    <SparklesIcon className="w-4 h-4 text-slate-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <p className="text-xs text-slate-500">
                    {testimonials[currentTestimonial].plan} Plan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {[
              {
                question: "How long will early access last?",
                answer: "We anticipate early access to continue through 2023. All features added during this period will remain free for early adopters."
              },
              {
                question: "What happens when you launch paid plans?",
                answer: "Early adopters will keep all their current features at no cost. Paid plans will only apply to new premium features developed after our official launch."
              },
              {
                question: "Can I upgrade later if I start with Guest?",
                answer: "Absolutely! You can switch to Starter at any time with one click, no data migration needed."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-lg p-5 border border-white/50 hover:shadow-sm transition-all">
                <h3 className="font-medium text-slate-900">{faq.question}</h3>
                <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-16 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to supercharge your productivity?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of early adopters who are already transforming how they work.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/"
              className="bg-white text-slate-900 font-semibold rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all hover:scale-[1.03] flex items-center justify-center"
            >
              <BoltIcon className="w-5 h-5 mr-2" />
              Get Started Free
            </Link>
            <Link
              to="/features"
              className="bg-transparent border-2 border-white text-white font-semibold rounded-full px-6 py-3 hover:bg-white/10 transition-all hover:scale-[1.03] flex items-center justify-center"
            >
              <SparklesIcon className="w-5 h-5 mr-2" />
              Explore Features
            </Link>
          </div>
        </div>
      </div>

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
      `}</style>
    </div>
  );
}