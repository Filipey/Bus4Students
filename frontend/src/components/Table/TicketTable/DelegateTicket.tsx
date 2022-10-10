import { AddCard } from '@mui/icons-material'
import {
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
import { Student } from '../../../schemas'
import { StudentService } from '../../../services/StudentService'
import { formatCpf } from '../../../utils/formatter'
import { DelegateTicketModal } from '../../Modal/ContentHandlerModal/TicketModal'
import { BreadCrumbStep, TableTitle } from '../Title'

export function DelegateTicket() {
  const [students, setStudents] = useState<Student[]>([])
  const [atualStudents, setAtualStudents] = useState<Student[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [openDelegateModal, setOpenDelegateModal] = useState<boolean[]>(
    Array(students.length).fill(false)
  )

  const steps: BreadCrumbStep[] = [
    {
      title: 'Dashboard',
      url: '/admin'
    },
    {
      title: 'Delegate Vales',
      url: '/admin/delegate-ticket'
    }
  ]

  function fetchData() {
    StudentService.getAllStudents().then(res => setStudents(res.data))
  }

  const handleOpenDelegateModal = (index: number) => {
    setOpenDelegateModal(
      openDelegateModal.map((i, pos) => (pos === index ? true : i))
    )
  }

  const handleRowsPerPageChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(e.target.value))
    setPage(0)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setAtualStudents(students)
    setOpenDelegateModal(Array(students.length).fill(false))
  }, [students])

  return (
    <TableTitle title="Delegar Vale Transporte" steps={steps}>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Cpf</TableCell>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Delegar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {atualStudents
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((student, index) => (
                  <TableRow key={student.cpf}>
                    <TableCell align="center">
                      {formatCpf(student.cpf)}
                    </TableCell>
                    <TableCell align="center">{student.name}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleOpenDelegateModal(index)}
                        id={index.toString()}
                      >
                        <Tooltip title="Delegar">
                          <AddCard color="primary" />
                        </Tooltip>
                      </IconButton>
                    </TableCell>
                    <DelegateTicketModal
                      index={index}
                      state={openDelegateModal}
                      setState={setOpenDelegateModal}
                      student={student}
                    />
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            sx={{ justifyContent: 'flex-end' }}
            count={students.length}
            page={page}
            labelRowsPerPage="Dados por página"
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 15]}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </TableContainer>
      </Paper>
    </TableTitle>
  )
}
