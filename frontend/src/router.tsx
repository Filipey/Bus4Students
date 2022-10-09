import { ThemeProvider } from '@mui/material/styles'
import { Route, Routes } from 'react-router-dom'
import { UserContextProvider } from './hooks/userContext'

import Admin from './pages/Admin'
import { AdminBus, DelegateBusPage } from './pages/Admin/Bus'
import {
  AdminDelegateSchool,
  AdminSchool,
  AdminStudentsFromSchool
} from './pages/Admin/School'
import { AdminStudents } from './pages/Admin/Students'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import User from './pages/User'
import { UserAllBus, UserMyBus } from './pages/User/Bus'
import { UserAllSchool, UserMySchool } from './pages/User/School'
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
            <Route element={<UserAllBus />} path="/user/bus/all" />
            <Route element={<UserMyBus />} path="user/bus/my" />
            <Route element={<UserAllSchool />} path="user/school/all" />
            <Route element={<UserMySchool />} path="user/school/my" />
            <Route element={<Admin />} path="/admin" />
            <Route element={<AdminBus />} path="/admin/bus" />
            <Route element={<DelegateBusPage />} path="/admin/delegate-bus" />
            <Route element={<AdminSchool />} path="/admin/school" />
            <Route
              element={<AdminStudentsFromSchool />}
              path="/admin/school/students/all"
            />
            <Route
              element={<AdminDelegateSchool />}
              path="/admin/school/students"
            />
            <Route element={<AdminStudents />} path="/admin/student" />
          </Routes>
        </UserContextProvider>
      </ThemeProvider>
    </>
  )
}
