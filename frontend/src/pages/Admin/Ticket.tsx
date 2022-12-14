import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardContainer } from '../../components/DashboardContainer'
import { ManageTickets } from '../../components/Table/TicketTable'
import { DelegateTicket } from '../../components/Table/TicketTable/DelegateTicket'
import UserContext from '../../hooks/userContext'
import { validateSession } from '../../utils/userSession'

export function AdminTickets() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    validateSession(navigate, setUser, 'ADMIN')
  }, [])

  return (
    <DashboardContainer>
      <ManageTickets />
    </DashboardContainer>
  )
}

export function AdminDelegateTicket() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    validateSession(navigate, setUser, 'ADMIN')
  }, [])

  return (
    <DashboardContainer>
      <DelegateTicket />
    </DashboardContainer>
  )
}
