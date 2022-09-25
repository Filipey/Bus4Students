import { Typography } from '@mui/material'
import { useContext } from 'react'
import UserContext from '../../../hooks/userContext'

function StudentTicketCardActions() {
  return (
    <>
      <Typography>Consultar quantidade atual de vales</Typography>
      <Typography>Consultar quantidade total recebida</Typography>
    </>
  )
}

function AdminTicketCardActions() {
  return (
    <>
      <Typography>Inserir novos vales</Typography>
      <Typography>Atualizar vales</Typography>
      <Typography>Deletar vales</Typography>
      <Typography>Delegar vales a estudantes</Typography>
      <Typography>Consultar vale</Typography>
      <Typography>Consultar vales disponíveis</Typography>
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
