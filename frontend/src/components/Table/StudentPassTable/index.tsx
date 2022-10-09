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
import { StudentPass } from '../../../schemas'
import { SchoolService } from '../../../services/SchoolService'
import { StudentPassService } from '../../../services/StudentPassService'
import { formatCpf, formatUserDate } from '../../../utils/formatter'
import { StudentPassDetailsModal } from '../../Modal/ContentHandlerModal/StudentPass'
import { BreadCrumbStep, TableTitle } from '../Title'

export function StudentPassTable() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [studentPasses, setStudentPasses] = useState<StudentPass[]>([])
  const [atualPasses, setAtualPasses] = useState<StudentPass[]>([])
  const [openModal, setOpenModal] = useState([])
  const [subtitle, setSubtitle] = useState('Todas Carteiras')
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'delete'>('view')
  const [openFilter, setOpenFilter] = useState(false)
  const [filterOptions, setFilterOptions] = useState([])

  function fetchData() {
    StudentPassService.getAllStudentPasses().then(res =>
      setStudentPasses(res.data)
    )
    SchoolService.getAllSchoolsNames().then(res => setFilterOptions(res.data))
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
      setAtualPasses(studentPasses)
      setSubtitle('Todos as Carteiras')
      return
    }

    setAtualPasses(studentPasses.filter(pass => pass.schoolName === value))
    setSubtitle(`Carteiras - ${value}`)
  }

  const handleOpenModal = (
    newModalMode: 'view' | 'edit' | 'delete',
    index: number
  ) => {
    setModalMode(newModalMode)
    setOpenModal(openModal.map((i, pos) => (pos === index ? true : i)))
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setAtualPasses(studentPasses)
    setOpenModal(Array(studentPasses.length).fill(false))
  }, [studentPasses])

  const steps: BreadCrumbStep[] = [
    {
      title: 'Dashboard',
      url: '/admin'
    },
    {
      title: 'Todas Carteiras de Transporte',
      url: '/admin/student/pass/all'
    }
  ]

  return (
    <TableTitle steps={steps} title="Todas Carteiras de Transporte">
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
                  <TableCell align="center">Instituição de Ensino</TableCell>
                  <TableCell align="center">Data de Validade</TableCell>
                  <TableCell align="center">CPF Estudante</TableCell>
                  <TableCell align="center">Visualizar</TableCell>
                  <TableCell align="center">Editar</TableCell>
                  <TableCell align="center">Excluir</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {atualPasses
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((pass, index) => (
                    <TableRow key={pass.id}>
                      <TableCell align="center">{pass.schoolName}</TableCell>
                      <TableCell align="center">
                        {formatUserDate(pass.expirationDate)}
                      </TableCell>
                      <TableCell align="center">
                        {formatCpf(pass.owner.cpf)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleOpenModal('view', index)}
                        >
                          <Tooltip title="Visualizar">
                            <Visibility />
                          </Tooltip>
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleOpenModal('edit', index)}
                        >
                          <Tooltip title="Editar">
                            <Edit color="primary" />
                          </Tooltip>
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleOpenModal('delete', index)}
                        >
                          <Tooltip title="Deletar">
                            <Delete color="error" />
                          </Tooltip>
                        </IconButton>
                      </TableCell>
                      <StudentPassDetailsModal
                        index={index}
                        mode={modalMode}
                        pass={pass}
                        state={openModal}
                        setState={setOpenModal}
                        student={pass.owner}
                      />
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              sx={{ justifyContent: 'flex-end' }}
              count={atualPasses.length}
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
