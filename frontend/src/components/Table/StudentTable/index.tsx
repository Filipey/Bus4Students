import { Delete, Edit, FilterList, Visibility } from '@material-ui/icons'
import {
  Autocomplete,
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
  TextField,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Student } from '../../../schemas'
import { SchoolService } from '../../../services/SchoolService'
import { StudentService } from '../../../services/StudentService'
import {
  HandleEditStudentModal,
  StudentDetailsModal
} from '../../Modal/ContentHandlerModal/StudentModal'
import { InsertStudentModal } from '../../Modal/InsertModal/Student'
import { BreadCrumbStep, TableTitle } from '../Title'

export function StudentTable() {
  const [allStudents, setAllStudents] = useState<Student[]>([])
  const [atualStudents, setAtualStudents] = useState<Student[]>([])
  const [subtitle, setSubtitle] = useState('Todos Estudantes')
  const [schoolsName, setSchoolsName] = useState([])
  const [filterOptions, setFilterOptions] = useState(['Sem Vínculo'])
  const [openModal, setOpenModal] = useState<boolean[]>(
    Array(allStudents.length).fill(false)
  )
  const [openDetailsModal, setOpenDetailsModal] = useState<boolean[]>(
    Array(allStudents.length).fill(false)
  )
  const [insertStudent, setInsertStudent] = useState(false)
  const [modalView, setModalView] = useState<'edit' | 'delete'>('edit')
  const [openFilter, setOpenFilter] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleOpenModal = (index: number, newModalView: 'delete' | 'edit') => {
    setOpenModal(openModal.map((i, pos) => (pos === index ? true : i)))
    setModalView(newModalView)
  }

  const steps: BreadCrumbStep[] = [
    {
      title: 'Dashboard',
      url: '/admin'
    },
    {
      title: 'Estudantes',
      url: '/admin/student'
    }
  ]

  function fetchData() {
    StudentService.getAllStudents().then(res => setAllStudents(res.data))
    SchoolService.getAllSchools().then(res => {
      const schools = res.data
      const names = Array.from(new Set(schools.map(school => school.name)))
      setSchoolsName(names)
    })
  }

  const handleRowsPerPageChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(e.target.value))
    setPage(0)
  }

  const handleChangeFilter = (
    e: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    if (value === null) {
      setOpenFilter(false)
      setAtualStudents(allStudents)
      setSubtitle('Todos Estudantes')
      return
    }
    if (value === 'Sem Vínculo') {
      const noSchoolsStudents = allStudents.filter(
        student => student.schools.length === 0
      )
      setAtualStudents(noSchoolsStudents)
      setSubtitle('Estudantes sem vínculos')
      return
    }
    const filteredStudents = allStudents.filter(student =>
      student.schools.find(school => school.name === value)
    )
    setAtualStudents(filteredStudents)
    setSubtitle(`Estudantes - ${value}`)
  }

  const handleOpenDetailsModal = (index: number) => {
    setOpenDetailsModal(
      openDetailsModal.map((i, pos) => (pos === index ? true : i))
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setAtualStudents(allStudents)
    setOpenModal(Array(allStudents.length).fill(false))
    setOpenDetailsModal(Array(allStudents.length).fill(false))
  }, [allStudents])

  useEffect(() => {
    setFilterOptions([...schoolsName, ...filterOptions])
  }, [schoolsName])

  return (
    <TableTitle
      title="Estudantes"
      buttonTitle="Adicionar Estudante"
      steps={steps}
      buttonAction={() => setInsertStudent(true)}
    >
      <InsertStudentModal state={insertStudent} setState={setInsertStudent} />
      <Grid
        item
        sx={{ pl: '20px', pt: '24px' }}
        style={{ width: '100%', height: '100%' }}
      >
        <Paper>
          <Toolbar
            sx={{
              display: 'flex',
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="h6" color="#0288d1">
              {subtitle}
            </Typography>
            {!openFilter && (
              <Tooltip title="Filtrar por nome">
                <IconButton size="small" onClick={() => setOpenFilter(true)}>
                  <FilterList />
                </IconButton>
              </Tooltip>
            )}
            {openFilter && (
              <Autocomplete
                onChange={handleChangeFilter}
                sx={{ width: '200px' }}
                options={filterOptions}
                renderInput={params => (
                  <TextField variant="standard" {...params} />
                )}
              />
            )}
          </Toolbar>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">CPF</TableCell>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Matrícula</TableCell>
                  <TableCell align="center">Visualizar</TableCell>
                  <TableCell align="center">Editar</TableCell>
                  <TableCell align="center">Excluir</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {atualStudents
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student, index) => (
                    <TableRow key={student.cpf}>
                      <TableCell align="center">{student.cpf}</TableCell>
                      <TableCell align="center">{student.name}</TableCell>
                      <TableCell align="center">{student.enrollment}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleOpenDetailsModal(index)}
                        >
                          <Tooltip title="Visualizar">
                            <Visibility />
                          </Tooltip>
                        </IconButton>
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
                      <HandleEditStudentModal
                        index={index}
                        state={openModal}
                        setState={setOpenModal}
                        student={student}
                        mode={modalView}
                      />
                      <StudentDetailsModal
                        index={index}
                        state={openDetailsModal}
                        setState={setOpenDetailsModal}
                        student={student}
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
