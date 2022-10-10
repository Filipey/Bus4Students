import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import { useEffect, useState } from 'react'
import { User } from '../../../hooks/userContext'
import { Ticket } from '../../../schemas'
import { TicketService } from '../../../services/TicketService'
import { formatUserDate } from '../../../utils/formatter'
import { WarningField } from '../../WarningField'
import { BreadCrumbStep, TableTitle } from '../Title'

export function UserTickets() {
  const user: User = JSON.parse(window.sessionStorage.getItem('USER'))
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleRowsPerPageChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(e.target.value))
    setPage(0)
  }

  const steps: BreadCrumbStep[] = [
    {
      title: 'Dashboard',
      url: '/user'
    },
    {
      title: 'Meus Vales',
      url: '/user/ticket'
    }
  ]

  useEffect(() => {
    TicketService.getTicketsByOwner(user.cpf).then(res => setTickets(res.data))
  }, [])

  return (
    <TableTitle title="Meus Vales Transporte" steps={steps}>
      <Grid
        item
        sx={{ pl: '20px', pt: '24px' }}
        style={{ width: '100%', height: '100%' }}
      >
        {tickets.length > 0 ? (
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Origem</TableCell>
                    <TableCell align="center">Destino</TableCell>
                    <TableCell align="center">Valor</TableCell>
                    <TableCell align="center">Data de Validade</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tickets
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((ticket, index) => (
                      <TableRow key={ticket.id}>
                        <TableCell align="center">{ticket.source}</TableCell>
                        <TableCell align="center">{ticket.sink}</TableCell>
                        <TableCell align="center">{ticket.value}</TableCell>
                        <TableCell align="center">
                          {formatUserDate(ticket.expirationDate)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                sx={{ justifyContent: 'flex-end' }}
                count={tickets.length}
                page={page}
                labelRowsPerPage="Dados por página"
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 15]}
                onPageChange={(e, page) => setPage(page)}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </TableContainer>
          </Paper>
        ) : (
          <WarningField
            title="Ausência de Dados"
            severity="warning"
            message="Atualmente você não recebeu nenhum vale. Consulte um Administrador para obter mais informações."
          />
        )}
      </Grid>
    </TableTitle>
  )
}
