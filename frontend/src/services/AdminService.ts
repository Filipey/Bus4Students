import { Api } from '../providers'
import { Ticket } from '../schemas'

const delegateNewBus = (cpf: string, plate: string) =>
  Api.post('/student/' + { cpf }, {
    plate: plate
  })

const delegateTicket = (ticket: Ticket) => Api.post('/ticket', ticket)

export const AdminService = {
  delegateNewBus,
  delegateTicket
}
