import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardContainer } from '../../components/DashboardContainer'
import { BusTable } from '../../components/Table/BusTable'
import { DelegateBus } from '../../components/Table/BusTable/DelegateBus'
import UserContext from '../../hooks/userContext'
import { validateSession } from '../../utils/userSession'

export function AdminBus() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    validateSession(navigate, setUser, 'ADMIN')
  }, [])
  return (
    <DashboardContainer>
      <BusTable mode="all" />
    </DashboardContainer>
  )
}

export function DelegateBusPage() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    validateSession(navigate, setUser, 'ADMIN')
  }, [])

  return (
    <DashboardContainer>
      <DelegateBus />
    </DashboardContainer>
  )
}
