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
import { BreadCrumbStep, TableTitle } from '../Title'

export function DelegateBus() {
  const [students, setStudents] = useState<Student[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [openDetailsModal, setOpenDetailsModal] = useState<boolean[]>(
    Array(students.length).fill(false)
  )
  const [openHandleModal, setOpenHandleModal] = useState<boolean[]>(
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

  const handleOpenHandleModal = (index: number) => {
    setOpenHandleModal(
      openHandleModal.map((i, pos) => (pos === index ? true : i))
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
              {students
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
                        onClick={() => handleOpenHandleModal(index)}
                        id={index.toString()}
                      >
                        <Tooltip title="Delegar">
                          <Edit color="primary" />
                        </Tooltip>
                      </IconButton>
                    </TableCell>
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
