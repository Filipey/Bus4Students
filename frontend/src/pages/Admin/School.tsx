import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardContainer } from '../../components/DashboardContainer'
import { SchoolTable } from '../../components/Table/SchoolTable'
import { StudentsFromSchool } from '../../components/Table/SchoolTable/StudentsFromSchool'
import UserContext from '../../hooks/userContext'
import { validateSession } from '../../utils/userSession'

export function AdminSchool() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    validateSession(navigate, setUser, 'ADMIN')
  }, [])

  return (
    <DashboardContainer>
      <SchoolTable mode="all" />
    </DashboardContainer>
  )
}

export function AdminStudentsFromSchool() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    validateSession(navigate, setUser, 'ADMIN')
  }, [])

  return (
    <DashboardContainer>
      <StudentsFromSchool />
    </DashboardContainer>
  )
}
