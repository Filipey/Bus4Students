import { Api } from '../providers'
import { Ticket } from '../schemas'

const getTicketByID = (id: number) => Api.get('/ticket/' + { id })

const getAllDisponibleTicket = () => Api.get('/ticket')

const createTicket = (ticket: Ticket) => Api.post('/ticket', ticket)

const updateTicketInfo = (id: number, ticket: Ticket) =>
  Api.put('./ticket/' + { id }, ticket)

const deleteTicket = (id: number) => Api.delete('./ticket/' + { id })

export const TicketService = {
  getTicketByID,
  getAllDisponibleTicket,
  createTicket,
  updateTicketInfo,
  deleteTicket
}
