import { Typography } from '@mui/material'
import { useContext } from 'react'
import UserContext from '../../../hooks/userContext'

function StudentSchoolActions() {
  return (
    <>
      <Typography>Participar de Insituição de Ensino</Typography>
      <Typography>Consultar Instituição de Ensino</Typography>
      <Typography>Sair de Instituição de Ensino</Typography>
    </>
  )
}

function AdminSchoolActions() {
  return (
    <>
      <Typography>Adicinar Instituição de Ensino</Typography>
      <Typography>Consultar Instituições de Ensino</Typography>
      <Typography>Deletar Instituição de Ensino</Typography>
      <Typography>Atualizar Instituição de Ensino</Typography>
      <Typography>Obter Estudante de Instituição de Ensino</Typography>
    </>
  )
}

export function SchoolCard() {
  const { user } = useContext(UserContext)
  const isUserAdmin = user.role === 'ADMIN'

  if (isUserAdmin) {
    return <AdminSchoolActions />
  } else {
    return <StudentSchoolActions />
  }
}
