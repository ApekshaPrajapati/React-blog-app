import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'
function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (<div className='min-h-screen flex flex-col content-between bg-slate-100'>
   
    <Header />
    <main className='flex-grow text-center m-4'>
      <p className='text-2xl font-bold'>Todo:</p>
      <Outlet></Outlet>
    </main>
    <Footer />
    
  </div>) : null




}

export default App
