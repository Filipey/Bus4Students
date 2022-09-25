import { useContext } from 'react'
import UserContext from '../../../hooks/userContext'
import ActionButton from '../../ActionButton'

function StudentTicketCardActions() {
  return (
    <>
      <ActionButton text="Consultar quantidade atual" href="/user/ticket" />
      <ActionButton
        text="Consultar quantidade total recebida"
        href="/user/ticket"
      />
    </>
  )
}

function AdminTicketCardActions() {
  return (
    <>
      <ActionButton text="Inserir novos Vales" href="/admin/ticket" />
      <ActionButton text="Atualizar Vales" href="/admin/ticket" />
      <ActionButton text="Deletar Vales" href="/admin/ticket" />
      <ActionButton text="Delegar Vales a Estudantes" href="/admin/ticket" />
      <ActionButton text="Consultar Vales" href="/admin/ticket" />
      <ActionButton text="Consultar Vales disponíveis" href="/admin/ticket" />
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
