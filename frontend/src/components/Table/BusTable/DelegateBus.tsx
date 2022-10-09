import { Edit, Visibility } from '@material-ui/icons'
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
import { DelegateBusModal } from '../../Modal/ContentHandlerModal/BusModal'
import { StudentDetailsModal } from '../../Modal/ContentHandlerModal/StudentModal'
import { BreadCrumbStep, TableTitle } from '../Title'

export function DelegateBus() {
  const [students, setStudents] = useState<Student[]>([])
  const [atualStudents, setAtualStudents] = useState<Student[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [openDetailsModal, setOpenDetailsModal] = useState<boolean[]>(
    Array(students.length).fill(false)
  )
  const [openDelegateModal, setOpenDelegateModal] = useState<boolean[]>(
    Array(students.length).fill(false)
  )

  const steps: BreadCrumbStep[] = [
    {
      title: 'Dashboard',
      url: '/admin'
    },
    {
      title: 'Delegar Ônibus',
      url: '/admin/delegate-bus'
    }
  ]

  function fetchData() {
    StudentService.getAllStudents().then(res => setStudents(res.data))
  }

  const handleOpenDetailsModal = (index: number) => {
    setOpenDetailsModal(
      openDetailsModal.map((i, pos) => (pos === index ? true : i))
    )
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
    setOpenDetailsModal(Array(students.length).fill(false))
    setOpenDelegateModal(Array(students.length).fill(false))
  }, [students])

  return (
    <TableTitle title="Delegar Ônibus" steps={steps}>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Cpf</TableCell>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Visualizar</TableCell>
                <TableCell align="center">Delegar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {atualStudents
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((student, index) => (
                  <TableRow key={student.cpf}>
                    <TableCell align="center">{student.cpf}</TableCell>
                    <TableCell align="center">{student.name}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleOpenDetailsModal(index)}
                        id={index.toString()}
                      >
                        <Tooltip title="Visualizar">
                          <Visibility />
                        </Tooltip>
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleOpenDelegateModal(index)}
                        id={index.toString()}
                      >
                        <Tooltip title="Delegar">
                          <Edit color="primary" />
                        </Tooltip>
                      </IconButton>
                    </TableCell>
                    <StudentDetailsModal
                      index={index}
                      student={student}
                      state={openDetailsModal}
                      setState={setOpenDetailsModal}
                    />
                    <DelegateBusModal
                      index={index}
                      student={student}
                      state={openDelegateModal}
                      setState={setOpenDelegateModal}
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
