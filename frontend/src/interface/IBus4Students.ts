export interface Bus {
  departureTime: string
  plate: string

}

export interface EsconBus {
  departureTime: string,
  // line: integer($int32),
  line: number;
  plate: string
}

export interface HallBus {
  departureTime: string,
  driver: string,
  // passengersLimit: integer($int32),
  passengersLimit: number,
  plate: string
}

export interface HallBusDTO {
  driver: string,
  // passengersLimit:	integer($int32),
  passengersLimit: number;

}

export interface School {
  active: boolean,
  campus: string,
  location: string,
  name: string,
  students: Student[]
}

export interface Student {
  cpf: string;
  name: string;
  address: string;
  enrollment: string;
  schools: School[];
  buses: Bus[];
}

export interface StudentPass {
  // expirationDate:	string($date),
  // id:	integer($int64),
  expirationDate: string,
  id: number,
  owner: Student,
  schoolName: string
}

export interface StudentPassDTO {
  // expirationDate: string($date-time),
  expirationDate: string,
  schoolName: string,
  studentCpf: string,
}

export interface Ticket {
  // expirationDate:	string($date),
  // id:	integer($int32),
  expirationDate: string,
  id: number,
  sink: string,
  source: string,
  value: number
}



