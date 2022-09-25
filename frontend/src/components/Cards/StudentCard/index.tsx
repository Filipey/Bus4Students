import { useContext } from 'react'
import UserContext from '../../../hooks/userContext'
import ActionButton from '../../ActionButton'

function AdminStudentCardActions() {
  return (
    <>
      <ActionButton text="Obter estudante" href="/admin/student" />
      <ActionButton text="Listar estudantes" href="/admin/student" />
      <ActionButton text="Atualizar estudante" href="/admin/student" />
      <ActionButton text="Delegar transporte" href="/admin/student" />
      <ActionButton text="Gerar Carteira de Transporte" href="/admin/student" />
    </>
  )
}

function StudentCardActions() {
  return (
    <>
      <ActionButton text="Consultar meus dados" href="/user/me" />
      <ActionButton text="Atualizar Informações" href="/user/me" />
      <ActionButton text="Consultar Carteira de Transporte" href="/user/me" />
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
