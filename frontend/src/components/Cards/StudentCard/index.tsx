import { Typography } from '@mui/material'
import { useContext } from 'react'
import UserContext from '../../../hooks/userContext'

function AdminStudentCardActions() {
  return (
    <>
      <Typography>Obter estudante</Typography>
      <Typography>Listar estudantes</Typography>
      <Typography>Atualizar estudante</Typography>
      <Typography>Delegar transporte a estudante</Typography>
      <Typography>Criar carteira de transporte</Typography>
    </>
  )
}

function StudentCardActions() {
  return (
    <>
      <Typography>Consultar meus dados</Typography>
      <Typography>Atualizar informações</Typography>
      <Typography>Consultar carteira de transporte</Typography>
    </>
  )
}

export function StudentCard() {
  const { user } = useContext(UserContext)
  const isUserAdmin = user.role === 'ADMIN'

  if (isUserAdmin) {
    return <AdminStudentCardActions />
  } else {
    return <StudentCardActions />
  }
}
