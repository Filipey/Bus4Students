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
import {
  AdminAllStudentPass,
  AdminStudentPass
} from './pages/Admin/StudentPass'
import { AdminStudents } from './pages/Admin/Students'
import { AdminTickets } from './pages/Admin/Ticket'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import User from './pages/User'
import { UserAllBus, UserMyBus } from './pages/User/Bus'
import { UserAllSchool, UserMySchool } from './pages/User/School'
import { UserMyData, UserMyPass } from './pages/User/Student'
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
            <Route element={<UserMyData />} path="user/me" />
            <Route element={<UserMyPass />} path="user/me/pass" />
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
            <Route element={<AdminStudentPass />} path="/admin/student/pass" />
            <Route
              element={<AdminAllStudentPass />}
              path="/admin/student/pass/all"
            />
            <Route element={<AdminTickets />} path="/admin/ticket" />
          </Routes>
        </UserContextProvider>
      </ThemeProvider>
    </>
  )
}
