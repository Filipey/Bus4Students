import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardContainer } from '../../components/DashboardContainer'
import { StudentPassTable } from '../../components/Table/StudentPassTable'
import { GenerateStudentPassTable } from '../../components/Table/StudentPassTable/GeneratePass'
import UserContext from '../../hooks/userContext'
import { validateSession } from '../../utils/userSession'

export function AdminStudentPass() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    validateSession(navigate, setUser, 'ADMIN')
  }, [])

  return (
    <DashboardContainer>
      <GenerateStudentPassTable />
    </DashboardContainer>
  )
}

export function AdminAllStudentPass() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    validateSession(navigate, setUser, 'ADMIN')
  }, [])

  return (
    <DashboardContainer>
      <StudentPassTable />
    </DashboardContainer>
  )
}
