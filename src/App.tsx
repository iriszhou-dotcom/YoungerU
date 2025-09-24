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
  Clock
} from 'lucide-react';

type Screen = 'landing' | 'welcome' | 'quiz-basics' | 'quiz-lifestyle' | 'quiz-diet' | 'quiz-goals' | 'results' | 'email';

interface QuizData {
  age: string;
  gender: string;
  activity: string;
  diet: string;
  goals: string[];
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
  const [email, setEmail] = useState('');

  const updateQuizData = (field: keyof QuizData, value: any) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
  };

  const getQuizProgress = () => {
    const screens = ['quiz-basics', 'quiz-lifestyle', 'quiz-diet', 'quiz-goals'];
    const currentIndex = screens.indexOf(currentScreen as string);
    return currentIndex >= 0 ? ((currentIndex + 1) / screens.length) * 100 : 0;
  };

  const renderLandingPage = () => (
    <div className="min-h-screen bg-white">
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
              className="bg-[#7ED957] hover:bg-[#6BC444] text-[#174C4F] font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            >
              Start Your Plan
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="py-20 bg-gray-50">
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
      <div className="py-20">
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
              onClick={() => setCurrentScreen('welcome')}
              className="bg-[#7ED957] hover:bg-[#6BC444] text-[#174C4F] font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            >
              Join the Waitlist
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-[#174C4F] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
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
                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="py-20 bg-white">
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
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
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

      {/* Footer */}
      <div className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Feel younger, live stronger.</h3>
          <p className="text-gray-300 mb-8 text-lg">
            Be the first to know when we launch and get early access to personalized supplement guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
            />
            <button className="bg-[#7ED957] hover:bg-[#6BC444] text-[#174C4F] font-semibold px-6 py-3 rounded-lg transition-colors duration-300 inline-flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Join the Waitlist
            </button>
          </div>
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
          className="bg-[#7ED957] hover:bg-[#6BC444] text-[#174C4F] font-semibold px-8 py-4 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
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
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
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
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
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
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 ${
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
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 ${
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
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 ${
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
      <div className="min-h-screen bg-gray-50 p-4">
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
                className="text-gray-600 hover:text-[#174C4F] transition-colors duration-300 inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <button 
                onClick={() => setCurrentScreen(screen.next as Screen)}
                disabled={!screen.canProceed}
                className="bg-[#7ED957] hover:bg-[#6BC444] disabled:bg-gray-300 disabled:cursor-not-allowed text-[#174C4F] font-semibold px-6 py-3 rounded-lg transition-all duration-300 inline-flex items-center gap-2"
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
    <div className="min-h-screen bg-gray-50 p-4">
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
            <div className="border-l-4 border-[#7ED957] bg-gray-50 p-6 rounded-r-lg">
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
            <div className="border-l-4 border-[#7ED957] bg-gray-50 p-6 rounded-r-lg">
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
            <div className="border-l-4 border-[#7ED957] bg-gray-50 p-6 rounded-r-lg">
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
              className="bg-[#7ED957] hover:bg-[#6BC444] text-[#174C4F] font-semibold px-8 py-4 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-4 border-2 border-gray-200 rounded-lg focus:border-[#7ED957] focus:outline-none text-lg"
          />
          <button 
            onClick={() => {
              // Simulate email sent
              alert('Plan sent to your email! Check your inbox in a few minutes.');
              setCurrentScreen('landing');
            }}
            className="w-full bg-[#7ED957] hover:bg-[#6BC444] text-[#174C4F] font-semibold px-8 py-4 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
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
          className="text-[#174C4F] hover:text-[#2a7073] transition-colors duration-300"
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