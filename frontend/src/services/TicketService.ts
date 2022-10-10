import { Api } from '../providers'
import { Ticket, TicketDTO } from '../schemas'

const getTicketByID = (id: number) => Api.get<Ticket>(`/ticket/${id}`)

const getAllDisponibleTicket = () => Api.get<Ticket[]>('/ticket')

const getTicketsByOwner = (cpf: string) =>
  Api.get<Ticket[]>(`/ticket/owner/${cpf}`)

const createTicket = (ticket: TicketDTO) => Api.post('/ticket', ticket)

const updateTicketInfo = (id: number, ticket: TicketDTO) =>
  Api.put(`./ticket/${id}`, ticket)

const deleteTicket = (id: number) => Api.delete(`/ticket/${id}`)

const delegateTicket = (id: number, studentCpf: string, admCpf: string) =>
  Api.post(`/ticket/${admCpf}/${id}`, studentCpf)

export const TicketService = {
  getTicketByID,
  getAllDisponibleTicket,
  getTicketsByOwner,
  delegateTicket,
  createTicket,
  updateTicketInfo,
  deleteTicket
}
