import { useContext } from 'react'
import UserContext from '../../../hooks/userContext'
import ActionButton from '../../ActionButton'

function StudentTicketCardActions() {
  return (
    <>
      <ActionButton text="Vales Recebidos" href="/user/ticket" />
    </>
  )
}

function AdminTicketCardActions() {
  return (
    <>
      <ActionButton text="Gerenciar Vales" href="/admin/ticket" />
      <ActionButton
        text="Delegar Vales a Estudantes"
        href="/admin/delegate-ticket"
      />
    </>
  )
}

export function TicketCard() {
  const { user } = useContext(UserContext)
  const isUserAdmin = user.role === 'ADMIN'

  if (isUserAdmin) {
    return <AdminTicketCardActions />
  } else {
    return <StudentTicketCardActions />
  }
}
