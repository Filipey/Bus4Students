import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardContainer } from '../../components/DashboardContainer'
import UserContext from '../../hooks/userContext'
import { validateSession } from '../../utils/userSession'

export default function User() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    validateSession(navigate, setUser)
  }, [])

  return <DashboardContainer />
}
