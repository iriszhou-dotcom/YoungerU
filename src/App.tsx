import React, { useState } from 'react';
import { 
  ChevronRight, 
  ArrowRight, 
  Zap, 
  Brain, 
  Activity,
  CheckCircle,
  Mail,
  ArrowLeft,
  Star,
  Shield,
  Clock,
  ChevronDown,
  X,
  Download,
  Menu
} from 'lucide-react';

type Screen = 'landing' | 'welcome' | 'quiz-basics' | 'quiz-lifestyle' | 'quiz-diet' | 'quiz-goals' | 'results' | 'email';

interface QuizData {
  age: string;
  gender: string;
  activity: string;
  diet: string;
  goals: string[];
}

interface FormData {
  email: string;
  firstName: string;
}

interface FormErrors {
  email?: string;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [quizData, setQuizData] = useState<QuizData>({
    age: '',
    gender: '',
    activity: '',
    diet: '',
    goals: []
  });
  
  const [inlineFormData, setInlineFormData] = useState<FormData>({ email: '', firstName: '' });
  const [footerFormData, setFooterFormData] = useState<FormData>({ email: '', firstName: '' });
  const [inlineFormErrors, setInlineFormErrors] = useState<FormErrors>({});
  const [footerFormErrors, setFooterFormErrors] = useState<FormErrors>({});
  const [inlineFormSuccess, setInlineFormSuccess] = useState(false);
  const [footerFormSuccess, setFooterFormSuccess] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const validateEmail = (email: string): string | undefined => {
    if (!email) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email';
    return undefined;
  };

  const handleFormSubmit = (
    formData: FormData,
    setFormData: React.Dispatch<React.SetStateAction<FormData>>,
    setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>,
    setFormSuccess: React.Dispatch<React.SetStateAction<boolean>>,
    trackingId: string
  ) => {
    const emailError = validateEmail(formData.email);
    
    if (emailError) {
      setFormErrors({ email: emailError });
      return;
    }

    setFormErrors({});
    setFormSuccess(true);
    setShowGuideModal(true);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({ email: '', firstName: '' });
      setFormSuccess(false);
    }, 3000);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const updateQuizData = (field: keyof QuizData, value: any) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
  };

  const getQuizProgress = () => {
    const screens = ['quiz-basics', 'quiz-lifestyle', 'quiz-diet', 'quiz-goals'];
    const currentIndex = screens.indexOf(currentScreen as string);
    return currentIndex >= 0 ? ((currentIndex + 1) / screens.length) * 100 : 0;
  };

  const faqItems = [
    {
      question: "Is this medical advice?",
      answer: "No. YoungerU provides educational, science-based guidance. Always talk to your clinician if you're pregnant, nursing, have a condition, or take medications."
    },
    {
      question: "How long does it take to see results?",
      answer: "Some people notice changes in 2–4 weeks with consistent use. We recommend starting one supplement at a time and tracking how you feel."
    },
    {
      question: "Do you sell supplements?",
      answer: "Not today. We focus on clarity and recommendations. We may add a curated marketplace later."
    },
    {
      question: "What does the quiz ask?",
      answer: "Basics like age range, lifestyle, diet, and goals (energy, focus, recovery). It takes about 2–3 minutes."
    },
    {
      question: "Is my data private?",
      answer: "Yes. We collect only what's needed to create your plan and you can request deletion anytime. See our Privacy Policy."
    }
  ];

  const renderNavigation = () => (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#7ED957] rounded-full flex items-center justify-center mr-3">
              <Zap className="w-5 h-5 text-[#174C4F]" />
            </div>
            <span className="text-xl font-bold text-[#174C4F]">YoungerU</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('solution')} className="text-gray-600 hover:text-[#174C4F] transition-colors">
              Solution
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-[#174C4F] transition-colors">
              Pricing
            </button>
            <button onClick={() => scrollToSection('progress-stories')} className="text-gray-600 hover:text-[#174C4F] transition-colors">
              Stories
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-gray-600 hover:text-[#174C4F] transition-colors">
              FAQ
            </button>
            <button 
              onClick={() => scrollToSection('waitlist-inline')} 
              className="bg-[#7ED957] hover:bg-[#6BC444] text-white font-semibold px-4 py-2 rounded-full transition-colors"
            >
              Join
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            <Menu className="w-6 h-6 text-[#174C4F]" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('solution')} className="text-left text-gray-600 hover:text-[#174C4F] transition-colors">
                Solution
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-left text-gray-600 hover:text-[#174C4F] transition-colors">
                Pricing
              </button>
              <button onClick={() => scrollToSection('progress-stories')} className="text-left text-gray-600 hover:text-[#174C4F] transition-colors">
                Stories
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-left text-gray-600 hover:text-[#174C4F] transition-colors">
                FAQ
              </button>
              <button 
                onClick={() => scrollToSection('waitlist-inline')} 
                className="bg-[#7ED957] hover:bg-[#6BC444] text-white font-semibold px-4 py-2 rounded-full transition-colors text-center"
              >
                Join
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  const renderGuideModal = () => {
    if (!showGuideModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-[#174C4F]">Your Supplement Clarity Guide</h3>
            <button 
              onClick={() => setShowGuideModal(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h4 className="text-xl font-semibold mb-4 text-[#174C4F]">What to Try First</h4>
            <div className="space-y-3 text-gray-700">
              <p><strong>Start Simple:</strong> Begin with one supplement at a time to track how you feel.</p>
              <p><strong>Foundation First:</strong> Consider Vitamin D3, Omega-3, and a quality multivitamin as your base.</p>
              <p><strong>Track Progress:</strong> Keep a simple journal of energy, sleep, and mood for 2-4 weeks.</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h4 className="text-xl font-semibold mb-4 text-[#174C4F]">Timing & Safety Basics</h4>
            <div className="space-y-3 text-gray-700">
              <p><strong>With Food:</strong> Most supplements absorb better with meals, especially fat-soluble vitamins.</p>
              <p><strong>Morning vs Evening:</strong> Energy supplements in AM, calming ones like magnesium in PM.</p>
              <p><strong>Check Interactions:</strong> Always consult your healthcare provider about medication interactions.</p>
            </div>
          </div>

          <button className="w-full bg-[#7ED957] hover:bg-[#6BC444] text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Download Full PDF Guide
          </button>
        </div>
      </div>
    );
  };

  const renderLandingPage = () => (
    <div className="min-h-screen bg-white">
      {renderNavigation()}
      {renderGuideModal()}

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#174C4F] to-[#2a7073] text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/7592374/pexels-photo-7592374.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundBlendMode: 'multiply'
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Feel younger, <br />
              live stronger.
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
              Personalized, science-backed supplement guidance in 3 minutes.
            </p>
            <p className="text-lg lg:text-xl mb-8 opacity-80 leading-relaxed">
              Boost energy, focus, and recovery at any age.
            </p>
            <button 
              onClick={() => setCurrentScreen('welcome')}
              className="bg-[#7ED957] hover:bg-[#6BC444] text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-[#7ED957]/50"
            >
              Start Your Plan
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="py-20 bg-[#F5F7F8]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-lg">
            <blockquote className="text-2xl lg:text-3xl text-gray-800 italic leading-relaxed">
              "I'm hitting 40 soon and starting to feel it — energy's dipping, recovery is slower, and my focus isn't what it used to be."
            </blockquote>
            <p className="text-gray-600 mt-6 text-lg">— Sound familiar?</p>
            <p className="text-gray-700 mt-4 text-xl font-medium">
              Most people waste money on supplements that don't work because they aren't personalized.
            </p>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div id="solution" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 text-[#174C4F]">
            Clarity, not confusion.
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Skip the guesswork with our simple, science-backed approach to supplement guidance.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Take Quiz', desc: 'Answer 4 simple questions about your lifestyle and goals', icon: CheckCircle },
              { step: '2', title: 'Get Personalized Plan', desc: 'Receive science-backed supplement recommendations tailored to you', icon: Star },
              { step: '3', title: 'Feel Younger', desc: 'Experience improved energy, focus, and recovery in weeks', icon: Zap }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-[#7ED957] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-10 h-10 text-[#174C4F]" />
                </div>
                <div className="text-2xl font-bold text-[#7ED957] mb-2">Step {item.step}</div>
                <h3 className="text-2xl font-bold mb-4 text-[#174C4F]">{item.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{item.desc}</p>
                {index < 2 && (
                  <ChevronRight className="w-6 h-6 text-[#7ED957] mx-auto mt-6 hidden md:block" />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button 
              onClick={() => scrollToSection('waitlist-inline')}
              className="bg-[#7ED957] hover:bg-[#6BC444] text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-[#7ED957]/50"
            >
              Join the Waitlist
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Inline Email Capture / Waitlist */}
      <div id="waitlist-inline" className="py-20 bg-[#174C4F] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Get your free Supplement Clarity Guide
          </h2>
          <p className="text-xl mb-12 opacity-90 leading-relaxed max-w-3xl mx-auto">
            Join the waitlist and we'll send a 2-page starter guide: what to try first, how to time supplements, and safety basics.
          </p>
          
          {inlineFormSuccess ? (
            <div className="bg-[#7ED957]/20 border border-[#7ED957] rounded-lg p-6 max-w-md mx-auto">
              <p className="text-lg">🎉 Check your inbox! Your guide is on the way. You're on the YoungerU waitlist.</p>
            </div>
          ) : (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit(inlineFormData, setInlineFormData, setInlineFormErrors, setInlineFormSuccess, 'waitlist-inline-submit');
              }}
              className="max-w-md mx-auto space-y-4"
            >
              <div>
                <input
                  type="text"
                  placeholder="First name (optional)"
                  value={inlineFormData.firstName}
                  onChange={(e) => setInlineFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={inlineFormData.email}
                  onChange={(e) => setInlineFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 ${
                    inlineFormErrors.email ? 'ring-2 ring-red-500' : 'focus:ring-[#7ED957]'
                  }`}
                />
                {inlineFormErrors.email && (
                  <p className="text-red-300 text-sm mt-1 text-left">{inlineFormErrors.email}</p>
                )}
              </div>
              <button 
                type="submit"
                data-track="waitlist-inline-submit"
                className="w-full bg-[#7ED957] hover:bg-[#6BC444] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-[#7ED957]/50"
              >
                Send My Free Guide
              </button>
            </form>
          )}
          
          <p className="text-sm opacity-70 mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 text-[#174C4F]">
            Targeted benefits for your goals
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Energy', desc: 'Improve daily energy without the guesswork.' },
              { icon: Brain, title: 'Focus', desc: 'Sharpen concentration and clarity.' },
              { icon: Activity, title: 'Recovery', desc: 'Recover faster, feel stronger.' }
            ].map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-[#7ED957] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8 text-[#174C4F]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#174C4F]">{benefit.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="py-20 bg-[#F5F7F8]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[#174C4F]">
              Grounded in science. Explained in plain English.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our recommendations are based on peer-reviewed research and clinical studies, 
              but delivered in language you can actually understand.
            </p>
          </div>
          
          {/* Testimonial Placeholders */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { name: 'Sarah M.', age: '42', quote: 'Finally, supplement advice that makes sense for my lifestyle.' },
              { name: 'Mike R.', age: '48', quote: 'My energy levels are back to where they were 10 years ago.' },
              { name: 'Lisa K.', age: '39', quote: 'No more guessing what supplements I actually need.' }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#7ED957] rounded-full flex items-center justify-center mr-4">
                    <span className="text-[#174C4F] font-bold">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#174C4F]">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">Age {testimonial.age}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>

          {/* Logo Placeholders */}
          <div className="text-center">
            <p className="text-gray-500 mb-6">Trusted by health professionals</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                <Shield className="w-6 h-6 text-gray-400" />
              </div>
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                <Star className="w-6 h-6 text-gray-400" />
              </div>
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing / Future Plan Section */}
      <div id="pricing" className="py-20 bg-[#174C4F] text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
            What's next
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Basic (Free)</h3>
              <p className="text-lg opacity-90 leading-relaxed">
                Quick quiz + personalized supplement categories, evidence snapshots, and safety notes.
              </p>
            </div>
            <div className="bg-white/10 p-8 rounded-2xl relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#7ED957] text-[#174C4F] px-4 py-1 rounded-full text-sm font-semibold">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium</h3>
              <p className="text-lg opacity-90 leading-relaxed mb-6">
                Weekly check-ins, progress insights, and deeper personalization. Advanced guidance without the guesswork.
              </p>
              <button 
                onClick={() => scrollToSection('waitlist-inline')}
                className="bg-[#7ED957] hover:bg-[#6BC444] text-white font-semibold px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-[#7ED957]/50"
              >
                Join the Waitlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Stories Section */}
      <div id="progress-stories" className="py-20 bg-[#F5F7F8]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[#174C4F]">
              Progress, not guesswork
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Early users are finding clarity and feeling better with a simple, personalized plan.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Alex, 41', 
                quote: 'My afternoon energy slump is getting shorter.',
                week: 'Week 3',
                image: 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=400'
              },
              { 
                name: 'Priya, 39', 
                quote: 'I\'m sleeping deeper and waking up clearer.',
                week: 'Week 4',
                image: 'https://images.pexels.com/photos/3768997/pexels-photo-3768997.jpeg?auto=compress&cs=tinysrgb&w=400'
              },
              { 
                name: 'Dan, 45', 
                quote: 'Recovery after workouts isn\'t crushing me anymore.',
                week: 'Week 5',
                image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=400'
              }
            ].map((story, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div 
                  className="w-full h-48 bg-cover bg-center rounded-lg mb-4"
                  style={{ backgroundImage: `url(${story.image})` }}
                  role="img"
                  aria-label={`Photo of ${story.name}`}
                ></div>
                <div className="text-sm text-[#7ED957] font-semibold mb-2">{story.week}</div>
                <blockquote className="text-lg text-gray-800 italic mb-3">
                  "{story.quote}"
                </blockquote>
                <p className="text-gray-600 font-medium">— {story.name}</p>
                <p className="text-xs text-gray-500 mt-3">
                  Results vary. Educational, not medical advice.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 text-[#174C4F]">
            FAQ
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:ring-inset"
                  aria-expanded={openFaqIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-lg font-semibold text-[#174C4F]">{item.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div 
                    id={`faq-answer-${index}`}
                    className="px-6 pb-4"
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to feel younger?</h3>
          <p className="text-gray-300 mb-8 text-lg">
            Join the waitlist and get the Supplement Clarity Guide.
          </p>
          
          {footerFormSuccess ? (
            <div className="bg-[#7ED957]/20 border border-[#7ED957] rounded-lg p-6 max-w-md mx-auto">
              <p className="text-lg">🎉 Check your inbox! Your guide is on the way. You're on the YoungerU waitlist.</p>
            </div>
          ) : (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit(footerFormData, setFooterFormData, setFooterFormErrors, setFooterFormSuccess, 'waitlist-footer-submit');
              }}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="First name (optional)"
                  value={footerFormData.firstName}
                  onChange={(e) => setFooterFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7ED957] mb-2 sm:mb-0"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={footerFormData.email}
                  onChange={(e) => setFooterFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 ${
                    footerFormErrors.email ? 'ring-2 ring-red-500' : 'focus:ring-[#7ED957]'
                  }`}
                />
                {footerFormErrors.email && (
                  <p className="text-red-300 text-sm mt-1 text-left">{footerFormErrors.email}</p>
                )}
              </div>
              <button 
                type="submit"
                data-track="waitlist-footer-submit"
                className="bg-[#7ED957] hover:bg-[#6BC444] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-[#7ED957]/50"
              >
                <Mail className="w-5 h-5" />
                Join & Get the Guide
              </button>
            </form>
          )}
          
          <p className="text-sm text-gray-400 mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );

  const renderWelcome = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#174C4F] to-[#2a7073] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 lg:p-12 max-w-2xl w-full text-center shadow-2xl">
        <div className="w-20 h-20 bg-[#7ED957] rounded-full flex items-center justify-center mx-auto mb-8">
          <Star className="w-10 h-10 text-[#174C4F]" />
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-[#174C4F]">
          Welcome to YoungerU
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Ready to discover your personalized supplement plan? This quick quiz takes just 3 minutes and will give you science-backed recommendations tailored specifically to your goals and lifestyle.
        </p>
        <button 
          onClick={() => setCurrentScreen('quiz-basics')}
          className="bg-[#7ED957] hover:bg-[#6BC444] text-white font-semibold px-8 py-4 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-[#7ED957]/50"
        >
          Start Quiz
          <ArrowRight className="w-6 h-6" />
        </button>
        <button 
          onClick={() => setCurrentScreen('landing')}
          className="block mx-auto mt-6 text-[#174C4F] hover:text-[#2a7073] transition-colors duration-300"
        >
          ← Back to home
        </button>
      </div>
    </div>
  );

  const renderQuizScreen = () => {
    const screens = {
      'quiz-basics': {
        title: 'Tell us about yourself',
        fields: (
          <>
            <div>
              <label className="block text-lg font-semibold mb-3 text-[#174C4F]">Age Range</label>
              <div className="grid grid-cols-2 gap-3">
                {['35-40', '41-45', '46-50', '51-55'].map(age => (
                  <button
                    key={age}
                    onClick={() => updateQuizData('age', age)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7ED957] ${
                      quizData.age === age 
                        ? 'border-[#7ED957] bg-[#7ED957]/10 text-[#174C4F]' 
                        : 'border-gray-200 hover:border-[#7ED957] text-gray-700'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-lg font-semibold mb-3 text-[#174C4F]">Gender</label>
              <div className="grid grid-cols-2 gap-3">
                {['Male', 'Female'].map(gender => (
                  <button
                    key={gender}
                    onClick={() => updateQuizData('gender', gender)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7ED957] ${
                      quizData.gender === gender 
                        ? 'border-[#7ED957] bg-[#7ED957]/10 text-[#174C4F]' 
                        : 'border-gray-200 hover:border-[#7ED957] text-gray-700'
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>
          </>
        ),
        next: 'quiz-lifestyle',
        canProceed: quizData.age && quizData.gender
      },
      'quiz-lifestyle': {
        title: 'What\'s your activity level?',
        fields: (
          <div>
            <div className="space-y-3">
              {[
                'Sedentary (desk job, minimal exercise)',
                'Lightly active (light exercise 1-3 days/week)',
                'Moderately active (moderate exercise 3-5 days/week)',
                'Very active (hard exercise 6-7 days/week)'
              ].map(activity => (
                <button
                  key={activity}
                  onClick={() => updateQuizData('activity', activity)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7ED957] ${
                    quizData.activity === activity 
                      ? 'border-[#7ED957] bg-[#7ED957]/10 text-[#174C4F]' 
                      : 'border-gray-200 hover:border-[#7ED957] text-gray-700'
                  }`}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>
        ),
        next: 'quiz-diet',
        canProceed: quizData.activity
      },
      'quiz-diet': {
        title: 'How would you describe your diet?',
        fields: (
          <div>
            <div className="space-y-3">
              {[
                'Standard American Diet (processed foods, fast food)',
                'Balanced (mix of whole foods and processed)',
                'Health-conscious (mostly whole foods)',
                'Strict (paleo, keto, vegan, etc.)'
              ].map(diet => (
                <button
                  key={diet}
                  onClick={() => updateQuizData('diet', diet)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7ED957] ${
                    quizData.diet === diet 
                      ? 'border-[#7ED957] bg-[#7ED957]/10 text-[#174C4F]' 
                      : 'border-gray-200 hover:border-[#7ED957] text-gray-700'
                    }`}
                >
                  {diet}
                </button>
              ))}
            </div>
          </div>
        ),
        next: 'quiz-goals',
        canProceed: quizData.diet
      },
      'quiz-goals': {
        title: 'What are your main health goals?',
        fields: (
          <div>
            <p className="text-gray-600 mb-4">Select all that apply:</p>
            <div className="space-y-3">
              {[
                'Increase energy levels',
                'Improve mental focus',
                'Better recovery from exercise',
                'Support immune system',
                'Better sleep quality',
                'Maintain healthy weight'
              ].map(goal => (
                <button
                  key={goal}
                  onClick={() => {
                    const currentGoals = quizData.goals || [];
                    if (currentGoals.includes(goal)) {
                      updateQuizData('goals', currentGoals.filter(g => g !== goal));
                    } else {
                      updateQuizData('goals', [...currentGoals, goal]);
                    }
                  }}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7ED957] ${
                    (quizData.goals || []).includes(goal)
                      ? 'border-[#7ED957] bg-[#7ED957]/10 text-[#174C4F]' 
                      : 'border-gray-200 hover:border-[#7ED957] text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <CheckCircle className={`w-5 h-5 mr-3 ${
                      (quizData.goals || []).includes(goal) ? 'text-[#7ED957]' : 'text-gray-300'
                    }`} />
                    {goal}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ),
        next: 'results',
        canProceed: (quizData.goals || []).length > 0
      }
    };

    const screen = screens[currentScreen as keyof typeof screens];
    if (!screen) return null;

    return (
      <div className="min-h-screen bg-[#F5F7F8] p-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Progress</span>
              <span className="text-sm font-medium text-[#174C4F]">{Math.round(getQuizProgress())}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#7ED957] h-2 rounded-full transition-all duration-500"
                style={{ width: `${getQuizProgress()}%` }}
              ></div>
            </div>
          </div>

          {/* Quiz Content */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-8 text-[#174C4F]">{screen.title}</h2>
            <div className="space-y-6">
              {screen.fields}
            </div>
            <div className="flex justify-between mt-8">
              <button 
                onClick={() => {
                  const screens = ['quiz-basics', 'quiz-lifestyle', 'quiz-diet', 'quiz-goals'];
                  const currentIndex = screens.indexOf(currentScreen as string);
                  if (currentIndex > 0) {
                    setCurrentScreen(screens[currentIndex - 1] as Screen);
                  } else {
                    setCurrentScreen('welcome');
                  }
                }}
                className="text-gray-600 hover:text-[#174C4F] transition-colors duration-300 inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#7ED957] rounded-lg px-3 py-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <button 
                onClick={() => setCurrentScreen(screen.next as Screen)}
                disabled={!screen.canProceed}
                className="bg-[#7ED957] hover:bg-[#6BC444] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 inline-flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-[#7ED957]/50"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => (
    <div className="min-h-screen bg-[#F5F7F8] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#7ED957] rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-[#174C4F]" />
            </div>
            <h1 className="text-4xl font-bold text-[#174C4F] mb-4">Your Personalized Plan</h1>
            <p className="text-xl text-gray-600">Based on your answers, here are your top supplement recommendations</p>
          </div>

          <div className="space-y-6">
            {/* Energy Support */}
            <div className="border-l-4 border-[#7ED957] bg-[#F5F7F8] p-6 rounded-r-lg">
              <h3 className="text-2xl font-bold text-[#174C4F] mb-3 flex items-center gap-3">
                <Zap className="w-6 h-6 text-[#7ED957]" />
                Energy Support
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-[#174C4F] mb-2">Why</h4>
                  <p className="text-gray-600">Your age range and activity level indicate you could benefit from cellular energy support and mitochondrial function optimization.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#174C4F] mb-2">How</h4>
                  <p className="text-gray-600">CoQ10 (100mg), B-Complex vitamins, and Magnesium taken with breakfast for sustained energy throughout the day.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#174C4F] mb-2">Guardrails</h4>
                  <p className="text-gray-600">Start with half dose for first week. Avoid taking after 3 PM to prevent sleep interference.</p>
                </div>
              </div>
            </div>

            {/* Cognitive Function */}
            <div className="border-l-4 border-[#7ED957] bg-[#F5F7F8] p-6 rounded-r-lg">
              <h3 className="text-2xl font-bold text-[#174C4F] mb-3 flex items-center gap-3">
                <Brain className="w-6 h-6 text-[#7ED957]" />
                Cognitive Function
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-[#174C4F] mb-2">Why</h4>
                  <p className="text-gray-600">Focus and mental clarity naturally decline with age. Your lifestyle indicates stress that can impact cognitive performance.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#174C4F] mb-2">How</h4>
                  <p className="text-gray-600">Omega-3 (EPA/DHA), Lion's Mane mushroom, and Rhodiola rosea taken with your morning meal.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#174C4F] mb-2">Guardrails</h4>
                  <p className="text-gray-600">Allow 2-4 weeks for noticeable effects. Rhodiola may cause jitteriness - reduce dose if needed.</p>
                </div>
              </div>
            </div>

            {/* Recovery Support */}
            <div className="border-l-4 border-[#7ED957] bg-[#F5F7F8] p-6 rounded-r-lg">
              <h3 className="text-2xl font-bold text-[#174C4F] mb-3 flex items-center gap-3">
                <Activity className="w-6 h-6 text-[#7ED957]" />
                Recovery Support
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-[#174C4F] mb-2">Why</h4>
                  <p className="text-gray-600">Your activity level requires enhanced recovery support. Age-related inflammation can slow healing processes.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#174C4F] mb-2">How</h4>
                  <p className="text-gray-600">Curcumin with black pepper, Vitamin D3, and Zinc taken with dinner for overnight recovery.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#174C4F] mb-2">Guardrails</h4>
                  <p className="text-gray-600">Take with fat for better absorption. Monitor for stomach upset with curcumin - take with food if needed.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button 
              onClick={() => setCurrentScreen('email')}
              className="bg-[#7ED957] hover:bg-[#6BC444] text-white font-semibold px-8 py-4 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-[#7ED957]/50"
            >
              <Mail className="w-6 h-6" />
              Email Me My Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmail = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#174C4F] to-[#2a7073] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 lg:p-12 max-w-2xl w-full text-center shadow-2xl">
        <div className="w-20 h-20 bg-[#7ED957] rounded-full flex items-center justify-center mx-auto mb-8">
          <Mail className="w-10 h-10 text-[#174C4F]" />
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-[#174C4F]">
          Get Your Personalized Plan
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Enter your email to receive your complete supplement plan as a detailed PDF with dosage recommendations, timing guidelines, and safety information.
        </p>
        <div className="space-y-4 mb-8">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-6 py-4 border-2 border-gray-200 rounded-lg focus:border-[#7ED957] focus:outline-none text-lg"
          />
          <button 
            onClick={() => {
              // Simulate email sent
              alert('Plan sent to your email! Check your inbox in a few minutes.');
              setCurrentScreen('landing');
            }}
            className="w-full bg-[#7ED957] hover:bg-[#6BC444] text-white font-semibold px-8 py-4 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-[#7ED957]/50"
          >
            Send My Plan
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 text-gray-500 mb-6">
          <Shield className="w-5 h-5" />
          <span>We respect your privacy. No spam, ever.</span>
        </div>
        <button 
          onClick={() => setCurrentScreen('results')}
          className="text-[#174C4F] hover:text-[#2a7073] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#7ED957] rounded-lg px-3 py-2"
        >
          ← Back to results
        </button>
      </div>
    </div>
  );

  return (
    <div className="font-['Inter',sans-serif]">
      {currentScreen === 'landing' && renderLandingPage()}
      {currentScreen === 'welcome' && renderWelcome()}
      {['quiz-basics', 'quiz-lifestyle', 'quiz-diet', 'quiz-goals'].includes(currentScreen) && renderQuizScreen()}
      {currentScreen === 'results' && renderResults()}
      {currentScreen === 'email' && renderEmail()}
    </div>
  );
}

export default App;