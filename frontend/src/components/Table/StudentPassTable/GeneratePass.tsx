import { AddCard } from '@mui/icons-material'
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
  TableRow
} from '@mui/material'
import { useEffect, useState } from 'react'
import { StudentResponseDTO } from '../../../schemas'
import { StudentPassService } from '../../../services/StudentPassService'
import { formatCpf } from '../../../utils/formatter'
import { StudentPassModal } from '../../Modal/ContentHandlerModal/StudentPass'
import { BreadCrumbStep, TableTitle } from '../Title'

export function GenerateStudentPassTable() {
  const [studentsWithNoPass, setStudentsWithNoPass] = useState<
    StudentResponseDTO[]
  >([])
  const [atualStudents, setAtualStudents] = useState<StudentResponseDTO[]>([])
  const [openPassModal, setOpenPassModal] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  function fetchData() {
    StudentPassService.getStudentsWithNoPass().then(res =>
      setStudentsWithNoPass(res.data)
    )
  }

  const steps: BreadCrumbStep[] = [
    {
      title: 'Dashboard',
      url: '/admin'
    },
    {
      title: 'Gerar Carteiras de Transporte',
      url: '/admin/student/pass'
    }
  ]

  const handleRowsPerPageChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(e.target.value))
    setPage(0)
  }

  const handleOpenPassModal = (index: number) => {
    setOpenPassModal(openPassModal.map((i, pos) => (pos === index ? true : i)))
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setAtualStudents(studentsWithNoPass)
  }, [studentsWithNoPass])

  useEffect(() => {
    setOpenPassModal(Array(studentsWithNoPass.length).fill(false))
  }, [atualStudents])

  return (
    <TableTitle title="Carteiras de Transporte" steps={steps}>
      <Grid
        item
        sx={{ pl: '20px', pt: '24px' }}
        style={{ width: '100%', height: '100%' }}
      >
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">CPF</TableCell>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Matrícula</TableCell>
                  <TableCell align="center">Gerar Carteira</TableCell>
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
                      <TableCell align="center">{student.nome}</TableCell>
                      <TableCell align="center">
                        {student.comprovante_de_matricula}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => handleOpenPassModal(index)}>
                          <AddCard color="primary" />
                        </IconButton>
                      </TableCell>
                      <StudentPassModal
                        index={index}
                        state={openPassModal}
                        setState={setOpenPassModal}
                        studentCpf={student.cpf}
                      />
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              sx={{ justifyContent: 'flex-end' }}
              count={atualStudents.length}
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
