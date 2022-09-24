import { Api } from '../providers'
import { Student, StudentDTO } from '../schemas'

const getAllStudents = () => Api.get<Student[]>('/student')

const getStudentByCpf = (cpf: string) => Api.get<Student>('/student/' + { cpf })

const deleteStudent = (cpf: string) => Api.delete('/student/' + { cpf })

const getTotalStudents = () => Api.get<number>('/student/total')

const insertNewStudent = (student: StudentDTO) => Api.post('/student', student)

export const StudentService = {
  getAllStudents,
  getStudentByCpf,
  deleteStudent,
  getTotalStudents,
  insertNewStudent
}
