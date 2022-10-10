import { Delete, Edit } from '@material-ui/icons'
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Ticket } from '../../../schemas'
import { TicketService } from '../../../services/TicketService'
import { formatUserDate } from '../../../utils/formatter'
import { TicketModal } from '../../Modal/ContentHandlerModal/TicketModal'
import { InsertTicketModal } from '../../Modal/InsertModal/Ticket'
import { BreadCrumbStep, TableTitle } from '../Title'

export function ManageTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [modalView, setModalView] = useState<'delete' | 'edit'>('edit')
  const [openModal, setOpenModal] = useState<boolean[]>([])
  const [insertModal, setInsertModal] = useState(false)

  const handleRowsPerPageChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(e.target.value))
    setPage(0)
  }

  const steps: BreadCrumbStep[] = [
    {
      title: 'Dashboard',
      url: '/admin'
    },
    {
      title: 'Vales Disponíveis',
      url: '/admin/ticket'
    }
  ]

  const handleOpenModal = (index: number, newModalView: 'delete' | 'edit') => {
    setOpenModal(openModal.map((i, pos) => (pos === index ? true : i)))
    setModalView(newModalView)
  }

  useEffect(() => {
    TicketService.getAllDisponibleTicket().then(res => setTickets(res.data))
  }, [])

  useEffect(() => {
    setOpenModal(Array(tickets.length).fill(false))
  }, [tickets])

  return (
    <TableTitle
      title="Vales Transporte disponíveis"
      buttonTitle="Adicionar Vale Transporte"
      steps={steps}
      buttonAction={() => setInsertModal(true)}
    >
      <Grid
        item
        sx={{ pl: '20px', pt: '24px' }}
        style={{ width: '100%', height: '100%' }}
      >
        <InsertTicketModal state={insertModal} setState={setInsertModal} />
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Origem</TableCell>
                  <TableCell align="center">Destino</TableCell>
                  <TableCell align="center">Valor</TableCell>
                  <TableCell align="center">Data de Validade</TableCell>
                  <TableCell align="center">Editar</TableCell>
                  <TableCell align="center">Excluir</TableCell>
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
                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleOpenModal(index, 'edit')}
                        >
                          <Tooltip title="Editar">
                            <Edit color="primary" />
                          </Tooltip>
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleOpenModal(index, 'delete')}
                        >
                          <Tooltip title="Deletar">
                            <Delete color="error" />
                          </Tooltip>
                        </IconButton>
                      </TableCell>
                      <TicketModal
                        index={index}
                        mode={modalView}
                        state={openModal}
                        setState={setOpenModal}
                        ticket={ticket}
                      />
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
      </Grid>
    </TableTitle>
  )
}
