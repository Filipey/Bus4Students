import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardContainer } from '../../components/DashboardContainer'
import { StudentTable } from '../../components/Table/StudentTable'
import UserContext from '../../hooks/userContext'
import { validateSession } from '../../utils/userSession'

export function AdminStudents() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    validateSession(navigate, setUser, 'ADMIN')
  }, [])

  return (
    <DashboardContainer>
      <StudentTable />
    </DashboardContainer>
  )
}
