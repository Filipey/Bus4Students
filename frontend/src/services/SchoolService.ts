import { Api } from '../providers'
import { School, Student } from '../schemas'

const getAllSchools = () => Api.get<School[]>('/school')

const getActiveSchools = () => Api.get<School[]>('/school/active')

const getNotActiveSchools = () => Api.get<School[]>('/school/notactive')

const getSchoolByNameLike = (name: string) => Api.get<School>(`/school/${name}`)

const getSchoolByCampusLike = (campus: string) =>
  Api.get<School>(`/school/campus/${campus}`)

const getStudentsByCampusLike = (campus: string) =>
  Api.get<Student[]>(`/school/student/${campus}`)

const getTotalSchools = () => Api.get<number>('/school/total')

const createNewSchool = (school: School) => Api.post('/school', school)

const insertStudentInSchool = (studentCpf: string, campus: string) =>
  Api.post(`/school/${studentCpf}`, campus)

const updateSchool = (campus: string, school: School) =>
  Api.put(`/school/${campus}`, school)

const deleteByCampus = (campus: string) =>
  Api.delete(`/school/campus/${campus}`)

const deleteByName = (name: string) => Api.delete(`/school/${name}`)

export const SchoolService = {
  getAllSchools,
  getActiveSchools,
  getNotActiveSchools,
  getSchoolByNameLike,
  getSchoolByCampusLike,
  getStudentsByCampusLike,
  getTotalSchools,
  createNewSchool,
  insertStudentInSchool,
  updateSchool,
  deleteByCampus,
  deleteByName
}
