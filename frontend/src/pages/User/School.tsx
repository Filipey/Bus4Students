import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardContainer } from '../../components/DashboardContainer'
import { SchoolTable } from '../../components/Table/SchoolTable'
import UserContext from '../../hooks/userContext'
import { validateSession } from '../../utils/userSession'

export function UserMySchool() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    validateSession(navigate, setUser, 'STUDENT')
  }, [])

  return (
    <DashboardContainer>
      <SchoolTable mode="my" />
    </DashboardContainer>
  )
}

export function UserAllSchool() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    validateSession(navigate, setUser, 'STUDENT')
  }, [])

  return (
    <DashboardContainer>
      <SchoolTable mode="all" />
    </DashboardContainer>
  )
}
