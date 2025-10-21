import { useState } from 'react'
import { Sparkles, CheckCircle, ArrowRight, User, Zap, Shield, TrendingUp, Heart, Brain, Star, Clock, Award } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Landing() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      })

      if (signUpError) throw signUpError

      if (data.user) {
        setSubmitted(true)
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign up')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A1F21] via-[#174C4F] to-[#0D3436] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7ED957] rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#6BC847] rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="max-w-lg w-full bg-gradient-to-br from-white via-white to-[#F0FFF4] rounded-3xl shadow-2xl p-10 text-center relative border-4 border-[#7ED957]/20 animate-fade-in-up">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 bg-gradient-to-br from-[#7ED957] to-[#6BC847] rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
              <CheckCircle className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-4xl font-bold text-[#174C4F] mb-4 bg-gradient-to-r from-[#174C4F] to-[#1A5A5E] bg-clip-text text-transparent">
              Welcome, {name}!
            </h2>
            <p className="text-xl text-gray-700 mb-6 font-medium">
              Your wellness journey starts now
            </p>
            <div className="bg-[#7ED957]/10 border-2 border-[#7ED957]/30 rounded-2xl p-6 mb-8">
              <p className="text-gray-700 leading-relaxed">
                Your account has been created successfully. Check your email to verify your account and unlock your personalized wellness plan.
              </p>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full bg-gradient-to-r from-[#7ED957] to-[#6BC847] text-white py-4 px-8 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 shadow-lg text-lg hover:scale-105 flex items-center justify-center gap-3"
            >
              <Sparkles className="w-5 h-5" />
              Explore YoungerU
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A1F21] text-white relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#7ED95710_1px,transparent_1px),linear-gradient(to_bottom,#7ED95710_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#7ED957]/5 via-transparent to-[#6BC847]/5"></div>
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-[#7ED957] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-[600px] h-[600px] bg-[#6BC847] rounded-full mix-blend-screen filter blur-[120px] opacity-15 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-[550px] h-[550px] bg-[#7ED957] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-[#7ED957] to-[#6BC847] rounded-2xl flex items-center justify-center shadow-lg shadow-[#7ED957]/20 group-hover:shadow-xl group-hover:shadow-[#7ED957]/30 transition-all duration-300 group-hover:scale-110">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-[#7ED957] bg-clip-text text-transparent">
              YoungerU
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="relative z-10 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#7ED957]/20 to-[#6BC847]/20 backdrop-blur-md rounded-full text-sm font-bold border-2 border-[#7ED957]/40 mb-8 shadow-lg shadow-[#7ED957]/10">
                <Star className="w-4 h-4 text-[#7ED957] fill-[#7ED957]" />
                <span className="bg-gradient-to-r from-white to-[#7ED957] bg-clip-text text-transparent">Trusted by 10,000+ users</span>
              </div>

              <h1 className="text-6xl lg:text-8xl font-black mb-8 leading-[0.95] tracking-tight">
                <span className="block bg-gradient-to-r from-white via-white to-[#7ED957] bg-clip-text text-transparent">Feel younger,</span>
                <span className="block bg-gradient-to-r from-[#7ED957] to-[#6BC847] bg-clip-text text-transparent">live stronger.</span>
              </h1>

              <p className="text-2xl lg:text-3xl text-white/90 mb-10 leading-relaxed font-medium">
                Get <span className="relative inline-block">
                  <span className="relative z-10 text-[#7ED957] font-bold">personalized</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#7ED957]/20 -rotate-1"></span>
                </span>, science-backed supplement guidance in just 3 minutes.
              </p>

              {/* Enhanced Benefit Pills */}
              <div className="flex flex-wrap gap-4 mb-12">
                {[
                  { icon: <Zap className="w-5 h-5" />, label: 'Boost Energy', gradient: 'from-yellow-400 to-orange-500' },
                  { icon: <Brain className="w-5 h-5" />, label: 'Sharpen Focus', gradient: 'from-blue-400 to-cyan-500' },
                  { icon: <Heart className="w-5 h-5" />, label: 'Speed Recovery', gradient: 'from-pink-400 to-rose-500' }
                ].map(benefit => (
                  <div key={benefit.label} className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300`}></div>
                    <span className="relative flex items-center gap-3 px-6 py-3.5 bg-white/10 backdrop-blur-xl rounded-2xl text-base font-bold border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer">
                      <span className={`bg-gradient-to-r ${benefit.gradient} bg-clip-text text-transparent`}>{benefit.icon}</span>
                      <span>{benefit.label}</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* Enhanced Stats Row */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { value: '98%', label: 'Satisfaction', icon: <Award className="w-6 h-6" /> },
                  { value: '10k+', label: 'Active Users', icon: <TrendingUp className="w-6 h-6" /> },
                  { value: '3min', label: 'Quick Start', icon: <Clock className="w-6 h-6" /> }
                ].map((stat, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7ED957]/20 to-[#6BC847]/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                    <div className="relative bg-white/5 backdrop-blur-md border-2 border-white/10 rounded-2xl p-5 hover:border-[#7ED957]/40 transition-all duration-300 hover:scale-105">
                      <div className="text-[#7ED957] mb-2">{stat.icon}</div>
                      <div className="text-4xl font-black text-white mb-1 bg-gradient-to-r from-white to-[#7ED957] bg-clip-text text-transparent">{stat.value}</div>
                      <div className="text-sm text-white/70 font-medium">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Sign Up Form */}
            <div className="relative z-10 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#7ED957] via-[#6BC847] to-[#7ED957] rounded-[2rem] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-white via-white to-[#F0FFF4] backdrop-blur-xl rounded-[2rem] shadow-2xl p-10 lg:p-12 border-4 border-white/50">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#7ED957] to-[#6BC847] rounded-3xl flex items-center justify-center shadow-2xl shadow-[#7ED957]/30 border-4 border-white animate-bounce-slow">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="text-center mb-10 relative pt-6">
                  <h2 className="text-4xl font-black text-[#174C4F] mb-3 bg-gradient-to-r from-[#174C4F] to-[#1A5A5E] bg-clip-text text-transparent">
                    Start Your Journey
                  </h2>
                  <p className="text-gray-700 text-xl font-semibold">
                    Get your personalized wellness plan
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7ED957] to-[#6BC847] border-2 border-white"></div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 font-medium ml-2">Join 10,000+ users</span>
                  </div>
                </div>

              <form onSubmit={handleSubmit} className="space-y-6 relative">
                {error && (
                  <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 text-red-800 px-5 py-4 rounded-2xl text-sm font-semibold shadow-lg animate-shake">
                    {error}
                  </div>
                )}

                <div className="group">
                  <label htmlFor="name" className="block text-sm font-black text-[#174C4F] mb-3 uppercase tracking-wide">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                      className="w-full px-5 py-4 border-3 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#7ED957]/30 focus:border-[#7ED957] text-lg bg-white text-black transition-all duration-300 hover:border-[#7ED957]/50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-sm hover:shadow-md"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="email" className="block text-sm font-black text-[#174C4F] mb-3 uppercase tracking-wide">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      className="w-full px-5 py-4 border-3 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#7ED957]/30 focus:border-[#7ED957] text-lg bg-white text-black transition-all duration-300 hover:border-[#7ED957]/50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-sm hover:shadow-md"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="password" className="block text-sm font-black text-[#174C4F] mb-3 uppercase tracking-wide">
                    Create Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      minLength={6}
                      className="w-full px-5 py-4 border-3 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#7ED957]/30 focus:border-[#7ED957] text-lg bg-white text-black transition-all duration-300 hover:border-[#7ED957]/50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-sm hover:shadow-md"
                      placeholder="Min 6 characters"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full group/btn mt-8"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#7ED957] via-[#6BC847] to-[#7ED957] rounded-2xl blur-lg opacity-70 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-r from-[#7ED957] to-[#6BC847] text-white py-5 px-8 rounded-2xl font-black hover:shadow-2xl transition-all duration-300 shadow-xl text-xl flex items-center justify-center gap-4 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border-2 border-white/20">
                    <Sparkles className="w-6 h-6" />
                    {loading ? 'Creating Account...' : 'Get My Personalized Plan'}
                    <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </button>
              </form>

              <p className="text-center text-xs text-gray-500 mt-8 font-medium">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-32 bg-gradient-to-b from-[#0D2628] via-[#0F3234] to-[#0A1F21] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#7ED95708_1px,transparent_1px),linear-gradient(to_bottom,#7ED95708_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#7ED957] rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7ED957]/20 to-[#6BC847]/20 backdrop-blur-md rounded-full text-sm font-black uppercase tracking-wider border-2 border-[#7ED957]/40 mb-8 shadow-lg shadow-[#7ED957]/10">
              <TrendingUp className="w-5 h-5 text-[#7ED957]" />
              <span className="bg-gradient-to-r from-white to-[#7ED957] bg-clip-text text-transparent">Proven Results</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 bg-gradient-to-r from-white via-white to-[#7ED957] bg-clip-text text-transparent">
              Why Choose YoungerU?
            </h2>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-medium">
              Science-backed recommendations tailored to your unique needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <User className="w-10 h-10" />,
                title: "Personalized for You",
                description: "Every recommendation is tailored to your lifestyle, goals, and health profile",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Zap className="w-10 h-10" />,
                title: "Science-Backed",
                description: "All recommendations are based on peer-reviewed research and clinical evidence",
                color: "from-[#7ED957] to-[#6BC847]"
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: "Safety First",
                description: "Built-in safety checks for interactions and contraindications",
                color: "from-pink-500 to-rose-500"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className={`absolute -inset-1 bg-gradient-to-br ${feature.color} rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 border-2 border-white/20 hover:border-white/40">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mb-8 text-white shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-3xl font-black text-white mb-5 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-lg font-medium">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-32 bg-gradient-to-br from-[#0A1F21] via-[#0D2628] to-[#0A1F21] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#7ED95708_1px,transparent_1px),linear-gradient(to_bottom,#7ED95708_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7ED957] rounded-full mix-blend-screen filter blur-[200px] opacity-20 animate-pulse"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#7ED957] via-[#6BC847] to-[#7ED957] rounded-[3rem] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-[3rem] p-16 border-2 border-white/20">
              <div className="w-24 h-24 bg-gradient-to-br from-[#7ED957] to-[#6BC847] rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-[#7ED957]/30 animate-bounce-slow">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-6xl lg:text-7xl font-black text-white mb-8 bg-gradient-to-r from-white via-white to-[#7ED957] bg-clip-text text-transparent">
                Ready to Feel Your Best?
              </h2>
              <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
                Join thousands who've already started their wellness transformation
              </p>
              <a
                href="#signup"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex relative group/btn"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-[#7ED957] via-[#6BC847] to-[#7ED957] rounded-full blur-2xl opacity-70 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-[#7ED957] to-[#6BC847] text-white px-12 py-6 rounded-full font-black hover:shadow-2xl transition-all duration-300 shadow-xl text-2xl flex items-center gap-4 hover:scale-110 border-4 border-white/20">
                  Start Your Plan
                  <ArrowRight className="w-7 h-7 group-hover/btn:translate-x-2 transition-transform" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0A1F21] text-white py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#7ED957] to-[#6BC847] rounded-2xl flex items-center justify-center shadow-lg shadow-[#7ED957]/20">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl font-black bg-gradient-to-r from-white to-[#7ED957] bg-clip-text text-transparent">YoungerU</h3>
              </div>
              <p className="text-xl text-white/70 font-medium">Science-based wellness guidance</p>
            </div>
            <div className="border-t border-white/10 pt-8">
              <p className="text-base text-white/60 font-medium mb-2">
                Educational, not medical advice.
              </p>
              <p className="text-sm text-white/50">
                © 2024 YoungerU. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}