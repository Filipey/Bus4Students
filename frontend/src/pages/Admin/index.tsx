import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Cards } from '../../components/Cards'
import { DashboardContainer } from '../../components/DashboardContainer'
import UserContext from '../../hooks/userContext'
import { validateSession } from '../../utils/userSession'

export default function Admin() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    validateSession(navigate, setUser, 'ADMIN')
  }, [])

  return (
    <DashboardContainer>
      <Cards />
    </DashboardContainer>
  )
}
