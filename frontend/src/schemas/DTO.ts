export interface StudentPassDTO {
  expirationDate: string
  schoolName: string
  studentCpf: string
}

export interface StudentDTO {
  cpf: string
  name: string
  address: string
  enrollment: string
}

export interface HallBusDTO {
  driver: string
  passengersLimit: number
  departureTime: string
}

export interface EsconBusDTO {
  line: number
  departureTime: string
}

export interface PersonResponseDTO {
  cpf: string
  name: string
  address: string
  enrollment: string
  idAdmin: number
  role: string
}

export interface UserDTO {
  cpf: string
  password: string
}
