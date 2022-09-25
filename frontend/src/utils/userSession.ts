import { User } from '../hooks/userContext'

export function setUserStorage(user: User) {
  window.sessionStorage.setItem('USER', JSON.stringify(user))
}

export function getUserStorage(): User {
  return JSON.parse(window.sessionStorage.getItem('USER')!)
}

export function validateSession(
  navigate: (url: string) => void,
  setUser: (user: User) => void,
  availableRole: string
) {
  const storedUser = getUserStorage()
  if (storedUser === null) {
    navigate('/')
    return
  }
  setUser(storedUser)

  if (storedUser.role !== availableRole) {
    navigate('/')
  }
}
