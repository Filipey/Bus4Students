import { Api } from '../providers'
import { PersonResponseDTO, User, UserDTO } from '../schemas'

const validateLogin = (user: UserDTO) =>
  Api.post<PersonResponseDTO>('/user/login', user)

const getDataByCpf = (cpf: string) => Api.get(`/${cpf}`)

const insertNewUser = (user: User) => Api.post('/user', user)

export const UserService = {
  validateLogin,
  getDataByCpf,
  insertNewUser
}
