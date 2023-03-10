import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './components/Auth/Auth'

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import PublicRoute from './components/PublicRoute/PublicRoute'
import Home from './pages/Home/Home'
import { useLoading } from './context/LoadingContext'
import Collections from './pages/Collections/Collections'

function App() {
  const { loading } = useLoading()
  if (loading) {
    return (
      <span className='spinner'>
        <h1>Loading...</h1>
      </span>
    )
  }
  return (
    <div className='App'>
      {/* <Navbar /> */}
      <Routes>
        <Route>
          <Route
            path='/auth'
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }
          />
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/collections/:contentTypeId'
            element={
              <ProtectedRoute>
                <Collections />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  )
}

export default App
