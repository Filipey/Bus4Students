export interface StudentPassDTO {
  // expirationDate: string($date-time),
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
  // passengersLimit:	integer($int32),
  passengersLimit: number
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
