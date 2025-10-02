import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import { ToastProvider } from './components/Toast'
import AppNavigation from './components/AppNavigation'
import RequireAuth from './components/RequireAuth'

// Pages
import Landing from './pages/Landing'
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
          <Routes>
            {/* Landing Page Route */}
            <Route path="/" element={<Landing />} />
            
            {/* Auth routes */}
            <Route path="/auth/sign-in" element={<SignIn />} />
            <Route path="/auth/sign-up" element={<SignUp />} />
            
            {/* App routes with navigation */}
            <Route path="/app/*" element={
              <div className="min-h-screen bg-[#F5F7F8]">
                <AppNavigation />
                <Routes>
                  <Route path="/" element={<Navigate to="/app/planner" replace />} />
                  
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
                </Routes>
                
                {/* Footer */}
                <footer className="bg-white border-t border-gray-100 py-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-[#174C4F] mb-2">YoungerU</h3>
                        <p className="text-lg text-gray-600">Science-based wellness guidance</p>
                      </div>
                      <p className="text-base text-gray-500 font-medium">
                        Educational, not medical advice.
                      </p>
                      <p className="text-sm text-gray-400 mt-4">
                        © 2024 YoungerU. All rights reserved.
                      </p>
                    </div>
                  </div>
                </footer>
              </div>
            } />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  )
}