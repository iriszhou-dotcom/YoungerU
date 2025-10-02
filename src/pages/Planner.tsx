import { useState } from 'react'
import { Sparkles, Save } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../components/Toast'

interface PlannerInputs {
  goals: string[]
  diet: string
  fishIntake: string
  sunExposure: string
  sleepQuality: number
  stress: number
  budget: string
  sensitivities: string[]
  medsConditions: string
}

interface Recommendation {
  category: string
  why: string
  dose: string
  timing: string
  evidence: string
  guardrails: string
  foodFirst: string
}

export default function Planner() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [inputs, setInputs] = useState<PlannerInputs>({
    goals: [],
    diet: '',
    fishIntake: '',
    sunExposure: '',
    sleepQuality: 3,
    stress: 3,
    budget: '',
    sensitivities: [],
    medsConditions: ''
  })
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  const handleGoalChange = (goal: string) => {
    setInputs(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }))
  }

  const handleSensitivityChange = (sensitivity: string) => {
    setInputs(prev => ({
      ...prev,
      sensitivities: prev.sensitivities.includes(sensitivity)
        ? prev.sensitivities.filter(s => s !== sensitivity)
        : [...prev.sensitivities, sensitivity]
    }))
  }

  const generatePlan = async () => {
    if (!user) return
    
    setLoading(true)
    
    // Simple rule-based recommendations (in a real app, this would be more sophisticated)
    const newRecommendations: Recommendation[] = []
    
    if (inputs.goals.includes('Energy')) {
      newRecommendations.push({
        category: 'Vitamin D3',
        why: 'Low sun exposure and energy goals suggest potential deficiency',
        dose: '2000-4000 IU daily',
        timing: 'With breakfast (fat-soluble)',
        evidence: 'A',
        guardrails: 'Monitor levels if taking >4000 IU long-term',
        foodFirst: 'Fatty fish, egg yolks, fortified foods'
      })
    }
    
    if (inputs.goals.includes('Focus')) {
      newRecommendations.push({
        category: 'Omega-3 (EPA/DHA)',
        why: 'Brain health support for focus and cognitive function',
        dose: '1-2g combined EPA/DHA daily',
        timing: 'With meals to improve absorption',
        evidence: 'A',
        guardrails: 'Consult doctor if on blood thinners',
        foodFirst: 'Fatty fish 2-3x per week'
      })
    }
    
    if (inputs.goals.includes('Recovery') || inputs.sleepQuality < 3) {
      newRecommendations.push({
        category: 'Magnesium Glycinate',
        why: 'Supports muscle recovery and sleep quality',
        dose: '200-400mg before bed',
        timing: '30-60 minutes before sleep',
        evidence: 'B',
        guardrails: 'Start low, may cause loose stools in some',
        foodFirst: 'Dark leafy greens, nuts, seeds'
      })
    }

    setRecommendations(newRecommendations)
    
    // Save to database
    try {
      await supabase
        .from('planner_sessions')
        .insert({
          user_id: user.id,
          inputs,
          output: newRecommendations
        })
      
      showToast('Plan generated successfully!', 'success')
    } catch (error) {
      console.error('Error saving plan:', error)
      showToast('Plan generated, but failed to save', 'error')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#F5F7F8] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#174C4F] mb-2">
            AI Supplement & Wellness Planner
          </h1>
          <p className="text-gray-600">
            Tell us about you. We'll build a simple, science-aligned plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Column */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <form className="space-y-6">
              {/* Goals */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Primary Goals (select all that apply)
                </label>
                <div className="space-y-2">
                  {['Energy', 'Focus', 'Recovery'].map(goal => (
                    <label key={goal} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={inputs.goals.includes(goal)}
                        onChange={() => handleGoalChange(goal)}
                        className="rounded border-gray-300 text-[#7ED957] focus:ring-[#7ED957]"
                      />
                      <span className="ml-2 text-sm text-gray-700">{goal}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Diet */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Diet Pattern
                </label>
                <select
                  value={inputs.diet}
                  onChange={(e) => setInputs(prev => ({ ...prev, diet: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#7ED957] focus:border-[#7ED957]"
                >
                  <option value="">Select diet pattern</option>
                  <option value="omnivore">Omnivore</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>

              {/* Fish Intake */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Fish Intake (servings per week)
                </label>
                <select
                  value={inputs.fishIntake}
                  onChange={(e) => setInputs(prev => ({ ...prev, fishIntake: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#7ED957] focus:border-[#7ED957]"
                >
                  <option value="">Select fish intake</option>
                  <option value="0-1">0-1 servings</option>
                  <option value="2-3">2-3 servings</option>
                  <option value="4+">4+ servings</option>
                </select>
              </div>

              {/* Sun Exposure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Sun Exposure
                </label>
                <select
                  value={inputs.sunExposure}
                  onChange={(e) => setInputs(prev => ({ ...prev, sunExposure: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#7ED957] focus:border-[#7ED957]"
                >
                  <option value="">Select sun exposure</option>
                  <option value="low">Low (mostly indoors)</option>
                  <option value="medium">Medium (some outdoor time)</option>
                  <option value="high">High (outdoors frequently)</option>
                </select>
              </div>

              {/* Sleep Quality */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Sleep Quality (1-5 scale)
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={inputs.sleepQuality}
                  onChange={(e) => setInputs(prev => ({ ...prev, sleepQuality: parseInt(e.target.value) }))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Current: {inputs.sleepQuality}</p>
              </div>

              {/* Stress */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Stress Level (1-5 scale)
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={inputs.stress}
                  onChange={(e) => setInputs(prev => ({ ...prev, stress: parseInt(e.target.value) }))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Current: {inputs.stress}</p>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Monthly Budget
                </label>
                <select
                  value={inputs.budget}
                  onChange={(e) => setInputs(prev => ({ ...prev, budget: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#7ED957] focus:border-[#7ED957]"
                >
                  <option value="">Select budget range</option>
                  <option value="low">Low ($20-50)</option>
                  <option value="medium">Medium ($50-100)</option>
                  <option value="high">High ($100+)</option>
                </select>
              </div>

              {/* Sensitivities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Sensitivities (select all that apply)
                </label>
                <div className="space-y-2">
                  {['GI sensitive', 'Caffeine sensitive'].map(sensitivity => (
                    <label key={sensitivity} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={inputs.sensitivities.includes(sensitivity)}
                        onChange={() => handleSensitivityChange(sensitivity)}
                        className="rounded border-gray-300 text-[#7ED957] focus:ring-[#7ED957]"
                      />
                      <span className="ml-2 text-sm text-gray-700">{sensitivity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Medications/Conditions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Current Medications or Health Conditions
                </label>
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-3">
                  <p className="text-sm text-yellow-800">
                    ⚠️ If you're pregnant, nursing, on medications, or have a condition, talk to your clinician.
                  </p>
                </div>
                <textarea
                  value={inputs.medsConditions}
                  onChange={(e) => setInputs(prev => ({ ...prev, medsConditions: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#7ED957] focus:border-[#7ED957]"
                  placeholder="List any medications or health conditions..."
                />
              </div>

              <button
                type="button"
                onClick={generatePlan}
                disabled={loading || inputs.goals.length === 0}
                data-track="planner_generate"
                className="w-full bg-[#7ED957] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#6BC847] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate My Plan
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Column */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {recommendations.length > 0 ? (
              <div>
                <h3 className="text-lg font-semibold text-[#174C4F] mb-4">
                  Your Personalized Plan
                </h3>
                <div className="space-y-6">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-[#174C4F]">{rec.category}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          rec.evidence === 'A' ? 'bg-green-100 text-green-800' :
                          rec.evidence === 'B' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          Evidence: {rec.evidence}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <p><strong>Why you got this:</strong> {rec.why}</p>
                        <p><strong>Dose range:</strong> {rec.dose}</p>
                        <p><strong>Timing:</strong> {rec.timing}</p>
                        <p><strong>Guardrails:</strong> {rec.guardrails}</p>
                        <p><strong>Food-first alternative:</strong> {rec.foodFirst}</p>
                      </div>
                      
                      <button className="mt-3 text-sm text-[#7ED957] hover:text-[#6BC847] font-medium flex items-center gap-1">
                        <Save className="w-4 h-4" />
                        Save to Library
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Generate your first plan
                </h3>
                <p className="text-gray-500">
                  Fill out the form and click "Generate My Plan" to get personalized recommendations.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}