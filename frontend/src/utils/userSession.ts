import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../hooks/userContext'

const navigate = useNavigate()
const { setUser } = useContext(UserContext)

export function validateSession() {
  const storedUser = window.localStorage.getItem('USER')
  storedUser === null ? navigate('/') : setUser(JSON.parse(storedUser))
}
