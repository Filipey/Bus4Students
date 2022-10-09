import { Api } from '../providers'
import { StudentPass, StudentPassDTO, StudentResponseDTO } from '../schemas'

const createStudentPass = (pass: StudentPassDTO, adminCpf: string) =>
  Api.post(`/pass/${adminCpf}`, pass)

const deleteStudentPass = (passId: number) => Api.delete(`/pass/${passId}`)

const getAllStudentPasses = () => Api.get('/pass')

const getPassByOwner = (cpf: string) => Api.get<StudentPass>(`/pass/${cpf}`)

const updatePass = (pass: StudentPassDTO, passId: number) =>
  Api.put(`/pass/${passId}`, pass)

const getStudentsWithNoPass = () =>
  Api.get<StudentResponseDTO[]>('/pass/students')

export const StudentPassService = {
  createStudentPass,
  deleteStudentPass,
  getAllStudentPasses,
  getPassByOwner,
  updatePass,
  getStudentsWithNoPass
}
