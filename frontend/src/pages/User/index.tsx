import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Cards } from '../../components/Cards'
import { DashboardContainer } from '../../components/DashboardContainer'
import UserContext from '../../hooks/userContext'
import { validateSession } from '../../utils/userSession'

export default function User() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    validateSession(navigate, setUser, 'STUDENT')
  }, [])

  return (
    <DashboardContainer>
      <Cards />
    </DashboardContainer>
  )
}
