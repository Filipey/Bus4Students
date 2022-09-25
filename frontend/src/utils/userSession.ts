import { User } from '../hooks/userContext'

export function validateSession(
  navigate: (url: string) => void,
  setUser: (user: User) => void
) {
  const storedUser = window.localStorage.getItem('USER')
  storedUser === null ? navigate('/') : setUser(JSON.parse(storedUser))
}
