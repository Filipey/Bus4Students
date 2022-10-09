import { Api } from '../providers'
import { Student, StudentDTO } from '../schemas'

export const config = { headers: { 'Content-Type': 'text' } }

const getAllStudents = () => Api.get<Student[]>('/student')

const getStudentByCpf = (cpf: string) => Api.get<Student>(`/student/${cpf}`)

const deleteStudent = (cpf: string) => Api.delete(`/student/${cpf}`)

const getTotalStudents = () => Api.get<number>('/student/total')

const insertNewStudent = (student: StudentDTO) => Api.post('/student', student)

const delegateBus = (cpf: string, plate: string) =>
  Api.post(`/student/delegate/${cpf}/${plate}`)

const removeBusFromStudent = (cpf: string, plate: string) =>
  Api.delete(`/student/delegate/${cpf}/${plate}`)

const updateStudent = (cpf: string, student: StudentDTO) =>
  Api.put(`/student/${cpf}`, student)

export const StudentService = {
  getAllStudents,
  getStudentByCpf,
  deleteStudent,
  getTotalStudents,
  insertNewStudent,
  delegateBus,
  removeBusFromStudent,
  updateStudent
}
