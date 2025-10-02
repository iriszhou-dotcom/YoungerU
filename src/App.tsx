import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import { ToastProvider } from './components/Toast'
import Navigation from './components/Navigation'
import RequireAuth from './components/RequireAuth'

// Pages
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Planner from './pages/Planner'
import Library from './pages/Library'
import LibraryDetail from './pages/LibraryDetail'
import Habits from './pages/Habits'
import Forecast from './pages/Forecast'
import Safety from './pages/Safety'
import Community from './pages/Community'

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div className="min-h-screen bg-[#F5F7F8]">
            <Navigation />
            
            <Routes>
              {/* Public routes */}
              <Route path="/auth/sign-in" element={<SignIn />} />
              <Route path="/auth/sign-up" element={<SignUp />} />
              
              {/* Protected routes */}
              <Route path="/planner" element={
                <RequireAuth>
                  <Planner />
                </RequireAuth>
              } />
              
              <Route path="/library" element={<Library />} />
              <Route path="/library/:slug" element={<LibraryDetail />} />
              
              <Route path="/habits" element={
                <RequireAuth>
                  <Habits />
                </RequireAuth>
              } />
              
              <Route path="/forecast" element={
                <RequireAuth>
                  <Forecast />
                </RequireAuth>
              } />
              
              <Route path="/safety" element={
                <RequireAuth>
                  <Safety />
                </RequireAuth>
              } />
              
              <Route path="/community" element={
                <RequireAuth>
                  <Community />
                </RequireAuth>
              } />
              
              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/planner" replace />} />
            </Routes>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-8 mt-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Educational, not medical advice.
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    © 2024 YoungerU. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  )
}