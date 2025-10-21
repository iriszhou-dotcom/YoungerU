import { useState } from 'react'
import { Sparkles, CheckCircle, ArrowRight, User, Zap, Shield, TrendingUp, Heart, Brain } from 'lucide-react'

export default function Landing() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Customer info:', { name, email, password })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#174C4F] to-[#174C4F]/90 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-[#7ED957] mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-[#174C4F] mb-4">
            Thank you, {name}!
          </h2>
          <p className="text-gray-600 mb-8">
            We've received your information and our team will be in touch soon to help you start your wellness journey.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="w-full bg-[#7ED957] text-white py-3 px-6 rounded-2xl font-semibold hover:bg-[#6BC847] transition-all duration-200 hover-lift shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F2D2F] via-[#174C4F] to-[#1A5A5E] text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#7ED957] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-[#7ED957] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-[#7ED957] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#7ED957] to-[#6BC847] rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold tracking-tight">
              YoungerU
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="relative z-10 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7ED957]/20 backdrop-blur-sm rounded-full text-sm font-medium border border-[#7ED957]/30 mb-6">
                <Sparkles className="w-4 h-4 text-[#7ED957]" />
                <span>Trusted by 10,000+ users</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Feel younger,<br/>live stronger.
              </h1>

              <p className="text-xl lg:text-2xl text-white/80 mb-8 leading-relaxed">
                Get <span className="text-[#7ED957] font-semibold">personalized, science-backed</span> supplement guidance in just 3 minutes.
              </p>

              {/* Benefit Pills with Icons */}
              <div className="flex flex-wrap gap-3 mb-10">
                {[
                  { icon: <Zap className="w-4 h-4" />, label: 'Energy' },
                  { icon: <Brain className="w-4 h-4" />, label: 'Focus' },
                  { icon: <Heart className="w-4 h-4" />, label: 'Recovery' }
                ].map(benefit => (
                  <span key={benefit.label} className="px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold border border-white/20 flex items-center gap-2 hover:bg-white/20 transition-all duration-200 hover:scale-105">
                    {benefit.icon}
                    {benefit.label}
                  </span>
                ))}
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-8 mb-8">
                <div>
                  <div className="text-3xl font-bold text-[#7ED957]">98%</div>
                  <div className="text-sm text-white/60">Satisfaction Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#7ED957]">10k+</div>
                  <div className="text-sm text-white/60">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#7ED957]">500+</div>
                  <div className="text-sm text-white/60">5-Star Reviews</div>
                </div>
              </div>
            </div>

            {/* Enhanced Sign Up Form */}
            <div className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/20">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#7ED957] to-[#6BC847] rounded-3xl opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#7ED957] to-[#6BC847] rounded-3xl opacity-20 blur-2xl"></div>

              <div className="text-center mb-8 relative">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#7ED957] to-[#6BC847] rounded-2xl mb-4">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-[#174C4F] mb-2">
                  Start Your Journey
                </h2>
                <p className="text-gray-600 text-lg">
                  Get your personalized wellness plan
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 relative">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-[#174C4F] mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-[#7ED957] text-base bg-white text-black transition-all duration-200 hover:border-gray-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-[#174C4F] mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-[#7ED957] text-base bg-white text-black transition-all duration-200 hover:border-gray-300"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-bold text-[#174C4F] mb-2">
                    Create Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-[#7ED957] text-base bg-white text-black transition-all duration-200 hover:border-gray-300"
                    placeholder="Create a secure password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#7ED957] to-[#6BC847] text-white py-4 px-6 rounded-xl font-bold hover:shadow-2xl transition-all duration-200 hover-lift shadow-lg text-lg flex items-center justify-center gap-3 hover:scale-105"
                >
                  <Sparkles className="w-5 h-5" />
                  Get My Personalized Plan
                </button>
              </form>

              <p className="text-center text-xs text-gray-500 mt-6">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-b from-white to-[#F5F7F8] text-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM3RUQ5NTciIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAtNC40MTggMy41ODItOCA4LThzOCAzLjU4MiA4IDgtMy41ODIgOC04IDgtOC0zLjU4Mi04LTh6TTIwIDQ0YzAtNC40MTggMy41ODItOCA4LThzOCAzLjU4MiA4IDgtMy41ODIgOC04IDgtOC0zLjU4Mi04LTh6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7ED957]/10 rounded-full text-sm font-semibold text-[#174C4F] mb-6">
              <TrendingUp className="w-4 h-4 text-[#7ED957]" />
              Proven Results
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#174C4F] mb-6">
              Why Choose YoungerU?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Science-backed recommendations tailored to your unique needs
            </p>
          </div>

          {/* Hero Image with Overlay Stats */}
          <div className="mb-20 rounded-3xl overflow-hidden shadow-2xl max-w-5xl mx-auto relative group">
            <img
              src="https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Happy person enjoying active lifestyle with wellness supplements"
              className="w-full h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#174C4F]/80 via-[#174C4F]/20 to-transparent flex items-end p-8">
              <div className="grid grid-cols-3 gap-6 w-full">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">3min</div>
                  <div className="text-sm text-white/80">Quick Assessment</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-white/80">Personalized</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">24/7</div>
                  <div className="text-sm text-white/80">Support</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <User className="w-8 h-8" />,
                title: "Personalized for You",
                description: "Every recommendation is tailored to your lifestyle, goals, and health profile",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Science-Backed",
                description: "All recommendations are based on peer-reviewed research and clinical evidence",
                color: "from-[#7ED957] to-[#6BC847]"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Safety First",
                description: "Built-in safety checks for interactions and contraindications",
                color: "from-purple-500 to-pink-500"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="bg-white rounded-3xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[#174C4F] mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-br from-[#174C4F] via-[#1A5A5E] to-[#174C4F] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#7ED957] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-[#7ED957] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10">
            <Sparkles className="w-16 h-16 text-[#7ED957] mx-auto mb-6" />
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Feel Your Best?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Join thousands who've already started their wellness transformation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#signup"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="bg-gradient-to-r from-[#7ED957] to-[#6BC847] text-white px-10 py-5 rounded-full font-bold hover:shadow-2xl transition-all duration-200 hover-lift shadow-lg text-lg flex items-center justify-center gap-3 hover:scale-105"
              >
                Start Your Plan
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#174C4F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">YoungerU</h3>
              <p className="text-lg text-white/80">Science-based wellness guidance</p>
            </div>
            <p className="text-base text-white/70 font-medium">
              Educational, not medical advice.
            </p>
            <p className="text-sm text-white/60 mt-4">
              © 2024 YoungerU. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}