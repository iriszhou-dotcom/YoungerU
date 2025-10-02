import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, MessageCircle, Clock, User, Flag } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../components/Toast'

interface Question {
  id: number
  title: string
  body: string
  tags: string[]
  is_published: boolean
  created_at: string
  user_id: string
}

export default function Community() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [questions, setQuestions] = useState<Question[]>([])
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('All')
  const [showAskModal, setShowAskModal] = useState(false)
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    body: '',
    tags: [] as string[]
  })
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    fetchQuestions()
    
    // Set up realtime subscription
    const channel = supabase
      .channel('rt-questions')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'questions' 
      }, (payload) => {
        const newQuestion = payload.new as Question
        if (newQuestion.is_published) {
          setQuestions(prev => [newQuestion, ...prev])
        }
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  useEffect(() => {
    filterQuestions()
  }, [questions, searchTerm, selectedTag])

  const fetchQuestions = async () => {
    setError(null)
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('id, title, body, tags, is_published, created_at, user_id')
        .eq('is_published', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error:', error)
        if (error.code === 'PGRST301') {
          setError("We couldn't load questions. Please sign in.")
        } else {
          setError("Failed to load questions. Please try again.")
        }
        throw error
      }
      setQuestions(data || [])
    } catch (error) {
      console.error('Error fetching questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterQuestions = () => {
    let filtered = questions

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(question =>
        question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.body.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Tag filter
    if (selectedTag !== 'All') {
      filtered = filtered.filter(question =>
        question.tags && question.tags.includes(selectedTag)
      )
    }

    setFilteredQuestions(filtered)
  }

  const clearSearch = () => {
    setSearchTerm('')
  }

  const availableTags = ['All', 'Energy', 'Focus', 'Recovery', 'Sleep', 'Supplements', 'Diet', 'Exercise']

  const addTag = () => {
    if (tagInput.trim() && !newQuestion.tags.includes(tagInput.trim())) {
      setNewQuestion(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setNewQuestion(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  const askQuestion = async () => {
    if (!user || !newQuestion.title.trim() || !newQuestion.body.trim()) return

    try {
      const { data, error } = await supabase
        .from('questions')
        .insert([{
          user_id: user.id,
          title: newQuestion.title,
          body: newQuestion.body,
          tags: newQuestion.tags,
          is_published: true
        }])
        .select('id, title, body, tags, is_published, created_at, user_id')
        .single()

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      // Optimistically add to local state
      if (data) {
        setQuestions(prev => [data, ...prev])
        
        // Scroll to top and briefly highlight
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }

      showToast('Question posted successfully!', 'success')
      setShowAskModal(false)
      setNewQuestion({ title: '', body: '', tags: [] })
      
      // Also trigger a refetch to ensure consistency
      setTimeout(() => {
        fetchQuestions()
      }, 1000)
    } catch (error) {
      console.error('Error posting question:', error)
      showToast('Failed to post question. Please try again.', 'error')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    const diffInHours = Math.floor(diffInMinutes / 60)

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  const getMaskedEmail = (userId: string) => {
    // Simple masking - in production you'd want to fetch from profiles
    return 'Member'
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7F8] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7ED957]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F7F8] py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7F8] to-white">
      {/* Header Section */}
      <div className="relative bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-[#174C4F] mb-6 leading-tight">
                Community & Expert Q&A
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Get answers from the community and verified experts.
              </p>
              <button
                onClick={() => setShowAskModal(true)}
                className="bg-[#7ED957] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#6BC847] flex items-center gap-3 transition-all duration-200 hover-lift shadow-lg text-lg"
              >
                <Plus className="w-5 h-5" />
                Ask a Question
              </button>
            </div>
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
              <img 
                src="https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Two adults discussing wellness tips over coffee"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-3xl shadow-soft p-8 mb-12 -mt-8 relative z-10">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-[#7ED957] text-base"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {availableTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 font-medium ${
                  selectedTag === tag
                    ? 'bg-[#7ED957] text-white border-[#7ED957]'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-[#7ED957] hover-lift'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Questions List */}
        <div className="pb-24">
        {filteredQuestions.length > 0 ? (
          <div className="space-y-6">
            {filteredQuestions.map((question, index) => (
              <div 
                key={question.id} 
                className={`bg-white rounded-3xl shadow-soft p-8 hover:shadow-lg transition-all duration-300 hover-lift group ${
                  index === 0 && questions[0]?.id === question.id ? 'ring-2 ring-[#7ED957] ring-opacity-50 shadow-lg' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <Link
                    to={`/community/question/${question.id}`}
                    className="flex-1"
                  >
                    <h3 className="font-bold text-[#174C4F] text-xl group-hover:text-[#7ED957] transition-colors leading-tight">
                      {question.title}
                    </h3>
                  </Link>
                  <button className="text-gray-400 hover:text-gray-600 ml-6 p-2">
                    <Flag className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-base text-gray-700 mb-6 line-clamp-2 leading-relaxed">
                  {question.body}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {(question.tags || []).map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-base text-gray-500">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      <span>
                        {getMaskedEmail(question.user_id)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{formatDate(question.created_at)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>0 answers</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-[#174C4F]/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <MessageCircle className="w-12 h-12 text-[#174C4F]/60" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {searchTerm || selectedTag !== 'All' ? 'No questions found' : 'No questions yet'}
            </h3>
            <p className="text-lg text-gray-500 mb-8">
              {searchTerm || selectedTag !== 'All' 
                ? 'Try adjusting your search or filters.' 
                : 'Ask the first question and start the conversation.'}
            </p>
            {!searchTerm && selectedTag === 'All' && (
              <button
                onClick={() => setShowAskModal(true)}
                className="bg-[#7ED957] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#6BC847] transition-all duration-200 hover-lift shadow-lg text-lg"
              >
                Ask the First Question
              </button>
            )}
          </div>
        )}
        </div>

        {/* Ask Question Modal */}
        {showAskModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-[#174C4F] mb-8">
                Ask a Question
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-base font-semibold text-[#174C4F] mb-3">
                    Question Title
                  </label>
                  <input
                    type="text"
                    value={newQuestion.title}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="What's your question about?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-[#7ED957] text-base"
                  />
                </div>

                <div>
                  <label className="block text-base font-semibold text-[#174C4F] mb-3">
                    Question Details
                  </label>
                  <textarea
                    value={newQuestion.body}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, body: e.target.value }))}
                    rows={6}
                    placeholder="Provide more details about your question..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-[#7ED957] text-base resize-none"
                  />
                </div>

                <div>
                  <label className="block text-base font-semibold text-[#174C4F] mb-3">
                    Tags
                  </label>
                  <div className="flex gap-3 mb-4">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      placeholder="Add a tag"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-[#7ED957] text-base"
                    />
                    <button
                      onClick={addTag}
                      className="px-6 py-3 bg-[#7ED957] text-white rounded-xl hover:bg-[#6BC847] font-semibold transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {newQuestion.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-base font-medium"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-gray-500 hover:text-gray-700 text-lg"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setShowAskModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={askQuestion}
                  disabled={!newQuestion.title.trim() || !newQuestion.body.trim()}
                  className="flex-1 px-6 py-3 bg-[#7ED957] text-white rounded-xl hover:bg-[#6BC847] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                  Post Question
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}