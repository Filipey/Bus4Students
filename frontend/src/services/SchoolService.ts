import { Api } from '../providers'
import { School, SchoolDTO, StudentResponseDTO } from '../schemas'

const config = { headers: { 'Content-Type': 'text/plain' } }

const getAllSchools = () => Api.get<School[]>('/school')

const getActiveSchools = () => Api.get<School[]>('/school/active')

const getNotActiveSchools = () => Api.get<School[]>('/school/notactive')

const getSchoolByNameLike = (name: string) => Api.get<School>(`/school/${name}`)

const getSchoolByCampusLike = (campus: string) =>
  Api.get<School>(`/school/campus/${campus}`)

const getStudentsByCampusLike = (campus: string) =>
  Api.get<StudentResponseDTO[]>(`/school/student/${campus}`)

const getTotalSchools = () => Api.get<number>('/school/total')

const getAllSchoolsNames = () => Api.get<string[]>('/school/names')

const createNewSchool = (school: School) => Api.post('/school', school)

const insertStudentInSchool = (studentCpf: string, campus: string) =>
  Api.post(`/school/student/${studentCpf}`, campus, {
    headers: { 'Content-Type': 'text/plain' }
  })

const insert = (school: SchoolDTO) => Api.post(`/school`, school)

const updateSchool = (campus: string, school: School) =>
  Api.put(`/school/${campus}`, school)

const deleteByCampus = (campus: string) =>
  Api.delete(`/school/campus/${campus}`)

const deleteByName = (name: string) => Api.delete(`/school/${name}`)

const removeStudentFromCampus = (studentCpf: string, campus: string) => {
  Api.delete(`/school/student/${studentCpf}`, {
    data: campus,
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}

export const SchoolService = {
  getAllSchools,
  getActiveSchools,
  getNotActiveSchools,
  getSchoolByNameLike,
  getSchoolByCampusLike,
  getStudentsByCampusLike,
  getTotalSchools,
  getAllSchoolsNames,
  createNewSchool,
  insertStudentInSchool,
  insert,
  updateSchool,
  deleteByCampus,
  deleteByName,
  removeStudentFromCampus
}
