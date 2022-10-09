import { useContext } from 'react'
import UserContext from '../../../hooks/userContext'
import ActionButton from '../../ActionButton'

function AdminStudentCardActions() {
  return (
    <>
      <ActionButton text="Gerenciar Estudantes" href="/admin/student" />
      <ActionButton
        text="Gerar Carteira de Transporte"
        href="/admin/student/pass"
      />
      <ActionButton
        text="Consultar Carteiras de Transporte"
        href="/admin/student/pass/all"
      />
    </>
  )
}

function StudentCardActions() {
  return (
    <>
      <ActionButton text="Gerenciar meus Dados" href="/user/me" />
      <ActionButton
        text="Consultar Carteira de Transporte"
        href="/user/me/pass"
      />
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
