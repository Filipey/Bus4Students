import { Api } from "../providers"
import { Bus, HallBus, HallBusDTO, Student, StudentDTO, Ticket } from '../schemas'

// Requests estudent-controller

const getAllStudents = () => Api.get<Student[]>('/student');

const getStudentByCpf = (cpf: string) => Api.get<Student>('/student/' + { cpf })

const deleteStudent = (cpf: string) => Api.delete('/student/' + { cpf })

const getTotalStudents = () => Api.get('/student/total')

const insertNewStudent = (student: StudentDTO) => Api.post('/student', student)

// Requests admin

const delegateNewBus = (cpf: string, plate: string) => Api.post('/student/' + { cpf }, {
    plate: plate
})

const delegateTicket = (ticket: Ticket) => Api.post('/ticket', ticket)

// Requests ticket-controller

const getTicketByID = (id: number) => Api.get('/ticket/' + { id })

const getAllDisponibleTicket = () => Api.get('/ticket')

const createTicket = (ticket: Ticket) => Api.post('/ticket', ticket)

const updateTicketInfo = (id: number, ticket: Ticket) => Api.put('./ticket/' + { id }, ticket)

const deleTicket = (id: number) => Api.delete('./ticket/' + { id })

// Requests hall-bus-controller

const getAllHallBuses = () => Api.get('./hall')

const insertNewHallBus = (hallBus: HallBus) => Api.post('./hall', hallBus)

const getHallBusByPlate = (plate: string) => Api.get('./hall/' + { plate })

const updateHallBus = (plate: string, hallBus: HallBusDTO) => Api.put('./hall/' + { plate }, hallBus)

const deleteHallBus = (plate: string) => Api.delete('./hall/' + { plate })

// Requests escon-controller

const getAllEsconBuses = () => Api.get('./escon')

const createEsconBus = (bus: Bus) => Api.post('./escon', bus)

const getEsconBusInfo = (plate: string) => Api.get('./escon/' + { plate })

const deleteEsconBus = (plate: string) => Api.delete('./escon/' + { plate })

const updateEsconBusLine = (line: string, plate: string) => Api.patch('/escon/' + { plate }, line)

export const StudentService = {
    getTotalStudents,
    getAllStudents,
    getStudentByCpf,
    deleteStudent,
    insertNewStudent,
    delegateNewBus,
    delegateTicket,
    getTicketByID,
    getAllDisponibleTicket,
    createTicket,
    updateTicketInfo,
    deleTicket,
    getAllHallBuses,
    insertNewHallBus,
    getHallBusByPlate,
    updateHallBus,
    deleteHallBus,
    getAllEsconBuses,
    createEsconBus,
    getEsconBusInfo,
    deleteEsconBus,
    updateEsconBusLine
}