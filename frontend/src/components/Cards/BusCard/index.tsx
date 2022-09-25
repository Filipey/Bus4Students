import { Typography } from '@mui/material'
import { useContext } from 'react'
import UserContext from '../../../hooks/userContext'

function AdminBusCardActions() {
  return (
    <>
      <Typography>Adicionar Onibus</Typography>
      <Typography>Excluir Onibus</Typography>
      <Typography>Consultar todos os Onibus</Typography>
      <Typography>Atualizar Onibus</Typography>
      <Typography>Delegar Onibus</Typography>
    </>
  )
}

function StudentBusCardActions() {
  return (
    <>
      <Typography>Consultar meus Onbius</Typography>
      <Typography>Consultar todos os Onibus</Typography>
    </>
  )
}

export function BusCard() {
  const { user } = useContext(UserContext)
  const isUserAdmin = user.role === 'ADMIN'

  if (isUserAdmin) {
    return <AdminBusCardActions />
  } else {
    return <StudentBusCardActions />
  }
}
