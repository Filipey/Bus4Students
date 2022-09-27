import { useContext } from 'react'
import UserContext from '../../../hooks/userContext'
import ActionButton from '../../ActionButton'

function AdminBusCardActions() {
  return (
    <>
      <ActionButton text="Gerenciar Transportes" href="/admin/bus" />
      <ActionButton text="Delegar Transporte a Estudante" href="/admin/bus" />
    </>
  )
}

function StudentBusCardActions() {
  return (
    <>
      <ActionButton text="Consultar meus Onibus" href="/user/bus/my" />
      <ActionButton text="Consultar todos os Onibus" href="/user/bus/all" />
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
