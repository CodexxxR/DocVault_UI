
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import CallbackPage from './pages/Callback'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import DocumentPreviewUpload from './pages/DocPreviewUpload'
import Profile from './pages/Profile'
import AdminPage from './pages/AdminPage'
import { getUserRoles } from './utils/getUserRoles'
import { useEffect, useState } from 'react'
import { userManager } from './auth/AuthService'

const App = () => {
  const [user, setUser] = useState<any>(null);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
      />
      <Route path="/preview" element={
            <PrivateRoute>
              <DocumentPreviewUpload />
            </PrivateRoute>
          }
      />
      <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
      />
      <Route path="/adminpage" element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
      />
    </Routes>
  )
}

export default App
