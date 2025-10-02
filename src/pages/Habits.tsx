import { useState, useEffect } from 'react'
import { Plus, Flame, Calendar, Check } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../components/Toast'

interface Habit {
  id: number
  title: string
  schedule: any
  reminder_time: string | null
  created_at: string
}

interface HabitLog {
  id: number
  habit_id: number
  date: string
  done: boolean
}

export default function Habits() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [habits, setHabits] = useState<Habit[]>([])
  const [habitLogs, setHabitLogs] = useState<HabitLog[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [newHabit, setNewHabit] = useState({
    title: '',
    schedule: { type: 'daily' },
    reminder_time: ''
  })

  useEffect(() => {
    if (user) {
      fetchHabits()
      fetchHabitLogs()
    }
  }, [user])

  const fetchHabits = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setHabits(data || [])
    } catch (error) {
      console.error('Error fetching habits:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchHabitLogs = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('habit_logs')
        .select('*')
        .eq('user_id', user.id)

      if (error) throw error
      setHabitLogs(data || [])
    } catch (error) {
      console.error('Error fetching habit logs:', error)
    }
  }

  const createHabit = async () => {
    if (!user || !newHabit.title.trim()) return

    try {
      const { error } = await supabase
        .from('habits')
        .insert({
          user_id: user.id,
          title: newHabit.title,
          schedule: newHabit.schedule,
          reminder_time: newHabit.reminder_time || null
        })

      if (error) throw error

      showToast('Habit created successfully!', 'success')
      setShowCreateModal(false)
      setNewHabit({ title: '', schedule: { type: 'daily' }, reminder_time: '' })
      fetchHabits()
    } catch (error) {
      console.error('Error creating habit:', error)
      showToast('Failed to create habit', 'error')
    }
  }

  const toggleHabitToday = async (habitId: number) => {
    if (!user) return

    const today = new Date().toISOString().split('T')[0]
    const existingLog = habitLogs.find(log => 
      log.habit_id === habitId && log.date === today
    )

    try {
      if (existingLog) {
        // Update existing log
        const { error } = await supabase
          .from('habit_logs')
          .update({ done: !existingLog.done })
          .eq('id', existingLog.id)

        if (error) throw error
      } else {
        // Create new log
        const { error } = await supabase
          .from('habit_logs')
          .insert({
            habit_id: habitId,
            user_id: user.id,
            date: today,
            done: true
          })

        if (error) throw error
      }

      fetchHabitLogs()
      showToast('Habit updated!', 'success')
    } catch (error) {
      console.error('Error updating habit log:', error)
      showToast('Failed to update habit', 'error')
    }
  }

  const getStreak = (habitId: number) => {
    const logs = habitLogs
      .filter(log => log.habit_id === habitId && log.done)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    let streak = 0
    const today = new Date()
    
    for (let i = 0; i < logs.length; i++) {
      const logDate = new Date(logs[i].date)
      const expectedDate = new Date(today)
      expectedDate.setDate(today.getDate() - i)
      
      if (logDate.toDateString() === expectedDate.toDateString()) {
        streak++
      } else {
        break
      }
    }

    return streak
  }

  const isHabitDoneToday = (habitId: number) => {
    const today = new Date().toISOString().split('T')[0]
    const todayLog = habitLogs.find(log => 
      log.habit_id === habitId && log.date === today
    )
    return todayLog?.done || false
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#174C4F] mb-2">
            Habit Builder & Streak Tracker
          </h1>
          <p className="text-gray-600">
            Small, consistent steps beat all-or-nothing.
          </p>
        </div>

        {/* Create Habit Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowCreateModal(true)}
            data-track="habit_create"
            className="bg-[#7ED957] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#6BC847] flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Habit
          </button>
        </div>

        {/* Habits List */}
        {habits.length > 0 ? (
          <div className="space-y-4">
            {habits.map(habit => (
              <div key={habit.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleHabitToday(habit.id)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isHabitDoneToday(habit.id)
                          ? 'bg-[#7ED957] border-[#7ED957] text-white'
                          : 'border-gray-300 hover:border-[#7ED957]'
                      }`}
                    >
                      {isHabitDoneToday(habit.id) && <Check className="w-4 h-4" />}
                    </button>
                    
                    <div>
                      <h3 className="font-semibold text-[#174C4F]">{habit.title}</h3>
                      {habit.reminder_time && (
                        <p className="text-sm text-gray-500">Reminder: {habit.reminder_time}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-500" />
                      <span className="font-semibold text-orange-500">
                        {getStreak(habit.id)}
                      </span>
                    </div>
                    
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Plus className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Create your first habit
            </h3>
            <p className="text-gray-500 mb-4">
              Start building healthy routines that stick.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-[#7ED957] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#6BC847]"
            >
              Get Started
            </button>
          </div>
        )}

        {/* Create Habit Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-[#174C4F] mb-4">
                Create New Habit
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Habit Title
                  </label>
                  <input
                    type="text"
                    value={newHabit.title}
                    onChange={(e) => setNewHabit(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Take Vitamin D"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#7ED957] focus:border-[#7ED957]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reminder Time (optional)
                  </label>
                  <input
                    type="time"
                    value={newHabit.reminder_time}
                    onChange={(e) => setNewHabit(prev => ({ ...prev, reminder_time: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#7ED957] focus:border-[#7ED957]"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={createHabit}
                  disabled={!newHabit.title.trim()}
                  className="flex-1 px-4 py-2 bg-[#7ED957] text-white rounded-md hover:bg-[#6BC847] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Habit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}