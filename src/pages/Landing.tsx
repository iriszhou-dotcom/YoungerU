import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Star, Users, Shield, Zap } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7F8] to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#174C4F] to-[#174C4F]/90 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-[#174C4F] via-[#174C4F]/95 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="animate-fade-in-up">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Feel younger, live stronger.
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                Personalized, science-backed supplement guidance in 3 minutes.
              </p>
              
              {/* Benefit Chips */}
              <div className="flex flex-wrap gap-3 mb-10">
                {['Energy', 'Focus', 'Recovery'].map(benefit => (
                  <span key={benefit} className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                    {benefit}
                  </span>
                ))}
              </div>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  to="/app"
                  className="bg-[#7ED957] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#6BC847] transition-all duration-200 hover-lift shadow-xl text-lg inline-flex items-center justify-center gap-2"
                >
                  Start Your Plan
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-200 text-lg">
                  See How It Works
                </button>
              </div>
              
              {/* Trust Line */}
              <p className="text-white/70 text-sm">
                Science-based. No hype.
              </p>
            </div>
            
            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/7640744/pexels-photo-7640744.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Smiling midlife couple walking outdoors, looking energetic and confident"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#174C4F]/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#174C4F] mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get personalized recommendations in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Take the quick quiz",
                description: "Answer questions about your lifestyle, goals, and health",
                image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400",
                alt: "Person using phone to take a short health quiz"
              },
              {
                step: "2", 
                title: "Get your simple plan",
                description: "Receive science-backed supplement recommendations tailored to you",
                image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400",
                alt: "Simple plan on a screen with two supplement cards"
              },
              {
                step: "3",
                title: "Build habits that last", 
                description: "Track your progress and build sustainable wellness routines",
                image: "https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400",
                alt: "Calendar with daily check marks showing a streak"
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="aspect-square w-24 h-24 mx-auto rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <img 
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#7ED957] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#174C4F] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-[#F5F7F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#174C4F] mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A complete wellness platform designed for your success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-[#7ED957]" />,
                title: "AI Supplement Planner",
                description: "Get personalized recommendations based on your unique lifestyle and goals"
              },
              {
                icon: <Shield className="w-8 h-8 text-[#7ED957]" />,
                title: "Science-Backed Library",
                description: "Access evidence-based information with A/B/C ratings for every supplement"
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-[#7ED957]" />,
                title: "Habit Tracker",
                description: "Build lasting routines with streak tracking and smart reminders"
              },
              {
                icon: <Star className="w-8 h-8 text-[#7ED957]" />,
                title: "Wellness Forecast",
                description: "Visualize your potential progress with consistent healthy habits"
              },
              {
                icon: <Shield className="w-8 h-8 text-[#7ED957]" />,
                title: "Safety Checker",
                description: "Identify potential interactions between supplements and medications"
              },
              {
                icon: <Users className="w-8 h-8 text-[#7ED957]" />,
                title: "Community Q&A",
                description: "Get answers from experts and connect with like-minded individuals"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-soft p-8 hover:shadow-xl transition-all duration-300 hover-lift">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#174C4F] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#174C4F] mb-6">
            Ready to Feel Your Best?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands who've transformed their wellness with personalized, science-backed guidance.
          </p>
          <Link
            to="/app"
            className="bg-[#7ED957] text-white px-12 py-5 rounded-2xl font-semibold hover:bg-[#6BC847] transition-all duration-200 hover-lift shadow-xl text-xl inline-flex items-center gap-3"
          >
            Start Your Plan Today
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#174C4F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">YoungerU</h3>
              <p className="text-white/80">Science-based wellness guidance</p>
            </div>
            <p className="text-white/60 mb-4">
              Educational, not medical advice.
            </p>
            <p className="text-sm text-white/40">
              © 2024 YoungerU. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}