import { ThemeProvider } from '@mui/material/styles'
import { Route, Routes } from 'react-router-dom'
import { UserContextProvider } from './hooks/userContext'

import Admin from './pages/Admin'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import User from './pages/User'
import { theme } from './utils/theme'

export function Router() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<User />} path="/user" />
            <Route element={<Admin />} path="/admin" />
          </Routes>
        </UserContextProvider>
      </ThemeProvider>
    </>
  )
}
