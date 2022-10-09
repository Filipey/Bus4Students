export type Bus = {
  departureTime: string
  plate: string
}

export interface EsconBus extends Bus {
  line: number
}

export interface HallBus extends Bus {
  driver: string
  passengersLimit: number
}

export interface School {
  active: boolean
  campus: string
  location: string
  name: string
  students: Student[]
}

export interface Student {
  cpf: string
  name: string
  address: string
  enrollment: string
  schools: School[]
  buses: Bus[]
}

export interface StudentPass {
  expirationDate: Date
  id: number
  owner: Student
  schoolName: string
}

export interface Ticket {
  expirationDate: string
  id: number
  sink: string
  source: string
  value: number
}

export interface User {
  cpf: string
  password: string
  isAdmin: boolean
}

export enum UserRoles {
  STUDENT,
  ADMIN,
  SYS_ADMIN,
  NONE
}
