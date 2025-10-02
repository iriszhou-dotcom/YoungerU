import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Plus } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface LibraryItem {
  id: number
  slug: string
  title: string
  category: string
  evidence_level: string
  summary: string
  how_to_take: string
  guardrails: string
  tags: string[]
}

export default function Library() {
  const [items, setItems] = useState<LibraryItem[]>([])
  const [filteredItems, setFilteredItems] = useState<LibraryItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const filterOptions = [
    'Energy', 'Focus', 'Recovery', 'Vegan', 'Sleep', 'Evidence A', 'Evidence B', 'Evidence C'
  ]

  useEffect(() => {
    fetchLibraryItems()
  }, [])

  useEffect(() => {
    filterItems()
  }, [items, searchTerm, selectedFilters])

  const fetchLibraryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('library_items')
        .select('*')
        .order('updated_at', { ascending: false })

      if (error) throw error
      setItems(data || [])
    } catch (error) {
      console.error('Error fetching library items:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterItems = () => {
    let filtered = items

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Category and evidence filters
    if (selectedFilters.length > 0) {
      filtered = filtered.filter(item => {
        return selectedFilters.some(filter => {
          if (filter.startsWith('Evidence ')) {
            return item.evidence_level === filter.split(' ')[1]
          }
          return item.tags.includes(filter) || item.category === filter
        })
      })
    }

    setFilteredItems(filtered)
  }

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  const getEvidenceBadgeColor = (level: string) => {
    switch (level) {
      case 'A': return 'bg-green-100 text-green-800'
      case 'B': return 'bg-yellow-100 text-yellow-800'
      case 'C': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7F8] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7ED957]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F7F8] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#174C4F] mb-2">
            Science-Backed Recommendation Library
          </h1>
          <p className="text-gray-600">
            Evidence, explained in plain English.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search supplements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#7ED957] focus:border-[#7ED957]"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {filterOptions.map(filter => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                  selectedFilters.includes(filter)
                    ? 'bg-[#7ED957] text-white border-[#7ED957]'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-[#7ED957]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-[#174C4F] text-lg">{item.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getEvidenceBadgeColor(item.evidence_level)}`}>
                    {item.evidence_level}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{item.category}</p>
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">{item.summary}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <Link
                    to={`/library/${item.slug}`}
                    className="text-sm text-[#7ED957] hover:text-[#6BC847] font-medium"
                  >
                    Learn more →
                  </Link>
                  <button className="text-sm text-[#7ED957] hover:text-[#6BC847] font-medium flex items-center gap-1">
                    <Plus className="w-4 h-4" />
                    Add to Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No items found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}