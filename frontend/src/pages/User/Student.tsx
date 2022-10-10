import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardContainer } from '../../components/DashboardContainer'
import { StudentPasses } from '../../components/Table/StudentPassTable/StudentPasses'
import { UserTable } from '../../components/Table/UserTable'
import UserContext from '../../hooks/userContext'
import { validateSession } from '../../utils/userSession'

export function UserMyData() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    validateSession(navigate, setUser, 'STUDENT')
  }, [])

  return (
    <DashboardContainer>
      <UserTable actualUser="student" />
    </DashboardContainer>
  )
}

export function UserMyPass() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    validateSession(navigate, setUser, 'STUDENT')
  }, [])

  return (
    <DashboardContainer>
      <StudentPasses />
    </DashboardContainer>
  )
}
