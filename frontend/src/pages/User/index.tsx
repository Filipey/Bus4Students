import { useEffect } from 'react'
import { DashboardContainer } from '../../components/DashboardContainer'
import { validateSession } from '../../utils/userSession'

export default function User() {
  useEffect(() => {
    validateSession()
  }, [])

  return <DashboardContainer />
}
