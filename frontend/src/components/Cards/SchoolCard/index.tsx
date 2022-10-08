import { useContext } from 'react'
import UserContext from '../../../hooks/userContext'
import ActionButton from '../../ActionButton'

function StudentSchoolActions() {
  return (
    <>
      <ActionButton
        text="Participar de Instituição de Ensino"
        href="/user/school"
      />
      <ActionButton
        text="Consultar Instituição de Ensino"
        href="/user/school"
      />
      <ActionButton text="Sair de Instituição de Ensino" href="/user/school" />
    </>
  )
}

function AdminSchoolActions() {
  return (
    <>
      <ActionButton
        text="Gerenciar Instituições de Ensino"
        href="/admin/school"
      />
      <ActionButton
        text="Obter Estudantes de Instituição de Ensino"
        href="/admin/school/students"
      />
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
