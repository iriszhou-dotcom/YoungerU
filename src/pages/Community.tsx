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
        question.tags.includes(selectedTag)
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
    <div className="min-h-screen bg-[#F5F7F8] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#174C4F] mb-2">
            Community & Expert Q&A
          </h1>
          <p className="text-gray-600">
            Get answers from the community and verified experts.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#7ED957] focus:border-[#7ED957]"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                  selectedTag === tag
                    ? 'bg-[#7ED957] text-white border-[#7ED957]'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-[#7ED957]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Ask Question Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowAskModal(true)}
            className="bg-[#7ED957] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#6BC847] flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Ask a Question
          </button>
        </div>

        {/* Questions List */}
        {filteredQuestions.length > 0 ? (
          <div className="space-y-4">
            {filteredQuestions.map((question, index) => (
              <div 
                key={question.id} 
                className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all ${
                  index === 0 && questions[0]?.id === question.id ? 'ring-2 ring-[#7ED957] ring-opacity-50' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <Link
                    to={`/community/question/${question.id}`}
                    className="flex-1"
                  >
                    <h3 className="font-semibold text-[#174C4F] text-lg hover:text-[#7ED957] transition-colors">
                      {question.title}
                    </h3>
                  </Link>
                  <button className="text-gray-400 hover:text-gray-600 ml-4">
                    <Flag className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">
                  {question.body}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {question.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>
                        {getMaskedEmail(question.user_id)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDate(question.created_at)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>0 answers</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || selectedTag !== 'All' ? 'No questions found' : 'No questions yet'}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedTag !== 'All' 
                ? 'Try adjusting your search or filters.' 
                : 'Ask the first question and start the conversation.'}
            </p>
            {!searchTerm && selectedTag === 'All' && (
              <button
                onClick={() => setShowAskModal(true)}
                className="bg-[#7ED957] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#6BC847]"
              >
                Ask the First Question
              </button>
            )}
          </div>
        )}

        {/* Ask Question Modal */}
        {showAskModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold text-[#174C4F] mb-4">
                Ask a Question
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Title
                  </label>
                  <input
                    type="text"
                    value={newQuestion.title}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="What's your question about?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#7ED957] focus:border-[#7ED957]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Details
                  </label>
                  <textarea
                    value={newQuestion.body}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, body: e.target.value }))}
                    rows={6}
                    placeholder="Provide more details about your question..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#7ED957] focus:border-[#7ED957]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      placeholder="Add a tag"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#7ED957] focus:border-[#7ED957]"
                    />
                    <button
                      onClick={addTag}
                      className="px-4 py-2 bg-[#7ED957] text-white rounded-md hover:bg-[#6BC847]"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newQuestion.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAskModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={askQuestion}
                  disabled={!newQuestion.title.trim() || !newQuestion.body.trim()}
                  className="flex-1 px-4 py-2 bg-[#7ED957] text-white rounded-md hover:bg-[#6BC847] disabled:opacity-50 disabled:cursor-not-allowed"
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