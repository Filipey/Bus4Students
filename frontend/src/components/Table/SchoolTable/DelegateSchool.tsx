import { Edit, FilterList } from '@material-ui/icons'
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
import { HandleEditStudentModal } from '../../Modal/ContentHandlerModal/StudentModal'
import { BreadCrumbStep, TableTitle } from '../Title'

export function DelegateSchool() {
  const [allStudents, setAllStudents] = useState<Student[]>([])
  const [atualStudents, setAtualStudents] = useState<Student[]>([])
  const [subtitle, setSubtitle] = useState('Todos Estudantes')
  const [schoolsName, setSchoolsName] = useState([])
  const [filterOptions, setFilterOptions] = useState(schoolsName)
  const [openModal, setOpenModal] = useState<boolean[]>(
    Array(allStudents.length).fill(false)
  )
  const [openFilter, setOpenFilter] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleOpenModal = (index: number) =>
    setOpenModal(openModal.map((i, pos) => (pos === index ? true : i)))

  const steps: BreadCrumbStep[] = [
    {
      title: 'Dashboard',
      url: '/admin'
    },
    {
      title: 'Estudantes e Instituiçoes',
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
      setAllStudents(allStudents)
      setSubtitle('Todos Estudantes')
      return
    }
    setSubtitle(`Estudantes - ${value}`)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setAtualStudents(allStudents)
    setOpenModal(Array(allStudents.length).fill(false))
  }, [allStudents])

  useEffect(() => {
    setFilterOptions(schoolsName)
  }, [schoolsName])

  return (
    <TableTitle title="Estudantes" steps={steps}>
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
                      <TableCell align="center">{student.enrollment}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => handleOpenModal(index)}>
                          <Tooltip title="Editar">
                            <Edit color="primary" />
                          </Tooltip>
                        </IconButton>
                      </TableCell>
                      <HandleEditStudentModal
                        index={index}
                        state={openModal}
                        setState={setOpenModal}
                        student={student}
                        mode="delegate"
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
