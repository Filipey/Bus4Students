import { Api } from "../providers"
import { Student } from '../interface'

// requests estudantes

const getAllStudents = () => Api.get<Student[]>('/v1/student');

const getStudentByCpf = (cpf: string) => Api.get<Student>('/v1/student/' + {cpf})

const deleteStudent = (cpf: string) => Api.delete('/v1/student/' + {cpf})

export const RequestsService = {
    getAllStudents,
    getStudentByCpf,
    deleteStudent
}