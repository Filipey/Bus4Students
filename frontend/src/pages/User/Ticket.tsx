import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardContainer } from '../../components/DashboardContainer'
import { UserTickets } from '../../components/Table/TicketTable/UserTickets'
import UserContext from '../../hooks/userContext'
import { validateSession } from '../../utils/userSession'

export function UserHandleTickets() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    validateSession(navigate, setUser, 'STUDENT')
  }, [])

  return (
    <DashboardContainer>
      <UserTickets />
    </DashboardContainer>
  )
}
