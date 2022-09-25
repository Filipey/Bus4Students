import { useEffect } from 'react'
import { DashboardContainer } from '../../components/DashboardContainer'
import { validateSession } from '../../utils/userSession'

export default function Admin() {
  useEffect(() => {
    validateSession()
  }, [])

  return <DashboardContainer />
}
