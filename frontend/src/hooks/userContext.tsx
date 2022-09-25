import React, { createContext, ReactNode, useState } from 'react'

export type User = {
  cpf: string
  name: string
  address: string
  role: string
}

type UserContextProps = {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}

interface UserContextProviderProps {
  children?: ReactNode
}

const DEFAULT_VALUE = {
  user: {
    cpf: '',
    name: '',
    address: '',
    role: ''
  },
  setUser: () => {}
}

const UserContext = createContext<UserContextProps>(DEFAULT_VALUE)

function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState(DEFAULT_VALUE.user)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContextProvider }
export default UserContext
