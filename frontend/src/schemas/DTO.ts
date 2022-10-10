export interface StudentPassDTO {
  expirationDate: Date
  schoolName: string
  studentCpf: string
}

export interface StudentDTO {
  cpf: string
  name: string
  address: string
  enrollment: string
}

export interface StudentResponseDTO {
  cpf: string
  nome: string
  endereco: string
  comprovante_de_matricula: string
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

export interface SchoolDTO {
  active: boolean
  campus: string
  location: string
  name: string
}

export interface TicketDTO {
  expirationDate: Date
  sink: string
  source: string
  value: number
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
