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
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../../hooks/userContext'
import { School } from '../../../schemas'
import { SchoolService } from '../../../services/SchoolService'
import { StudentService } from '../../../services/StudentService'
import { WarningField } from '../../WarningField'
import { BreadCrumbStep, TableTitle } from '../Title'

interface SchoolTableProps {
  mode: 'all' | 'my'
}

export function SchoolTable({ mode }: SchoolTableProps) {
  const { user } = useContext(UserContext)
  const isUserAdmin = user.role === 'ADMIN'

  const [allSchools, setAllSchools] = useState<School[]>([])
  const [openModal, setOpenModal] = useState<boolean[]>(
    Array(allSchools.length).fill(false)
  )
  const [modalMode, setModalMode] = useState<'handle' | 'view'>('view')
  const [insertSchool, setInsertSchool] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleOpenModal = (newModalMode: 'handle' | 'view', index: number) => {
    if (newModalMode === 'handle' && !isUserAdmin) {
      return
    }

    setModalMode(newModalMode)
    setOpenModal(openModal.map((i, pos) => (pos === index ? true : i)))
  }

  const userAdvice =
    (!isUserAdmin && allSchools === undefined) ||
    (!isUserAdmin && allSchools.length === 0 && mode === 'my')

  const steps: BreadCrumbStep[] = [
    {
      title: 'Dashboard',
      url: user.role === 'ADMIN' ? '/admin' : '/user'
    },
    {
      title: 'Instituições de Ensino',
      url: user.role === 'ADMIN' ? '/admin/schools' : '/user/schools'
    }
  ]

  function fetchData() {
    if (isUserAdmin || (!isUserAdmin && mode === 'all')) {
      SchoolService.getAllSchools().then(res => setAllSchools(res.data))
      return
    }

    StudentService.getStudentByCpf(user.cpf).then(res =>
      setAllSchools(res.data.schools)
    )
  }

  const handleRowsPerPageChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(e.target.value))
    setPage(0)
  }

  const filterOptions = Array.from(
    new Set(allSchools.map(school => school.name))
  )

  const handleChangeFilter = (
    e: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    if (value === null) {
      setOpenFilter(false)
      setAllSchools(allSchools)
      return
    }

    setAllSchools(allSchools.filter(school => school.name === value))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <TableTitle
      steps={steps}
      buttonTitle="Adicionar Instituição de Ensino"
      buttonAction={() => setInsertSchool(true)}
      title="Instituição de Ensino"
    >
      <Grid
        item
        sx={{ pl: '20px', pt: '24px' }}
        style={{ width: '100%', height: '100%' }}
      >
        {userAdvice ? (
          <WarningField
            severity="warning"
            title="Estudante não matrículado"
            message="Atualmente você não está matriculado em nenhuma Instituição de Ensino registrada no Bus4Students. Caso esta informação esteja incorreta, entre em contato com um Administrador"
          />
        ) : (
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
                Instituições de Ensino
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
                    <TableCell align="center">Nome</TableCell>
                    <TableCell align="center">Campus</TableCell>
                    <TableCell align="center">Período Letivo</TableCell>
                    <TableCell align="center">Visualizar</TableCell>
                    <TableCell align="center">Editar</TableCell>
                    <TableCell align="center">Excluir</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {allSchools
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((school, index) => (
                      <TableRow key={school.campus}>
                        <TableCell align="center">{school.name}</TableCell>
                        <TableCell align="center">{school.campus}</TableCell>
                        <TableCell align="center">
                          {school.active ? 'Sim' : 'Não'}
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
                            onClick={() => handleOpenModal('handle', index)}
                          >
                            <Tooltip
                              title={
                                isUserAdmin
                                  ? 'Editar'
                                  : 'Você não possui permissão'
                              }
                            >
                              <Edit color="primary" />
                            </Tooltip>
                          </IconButton>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton>
                            <Tooltip
                              title={
                                isUserAdmin
                                  ? 'Deletar'
                                  : 'Você não possui permissão'
                              }
                            >
                              <Delete color="error" />
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
                count={allSchools.length}
                page={page}
                labelRowsPerPage="Dados por página"
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 15]}
                onPageChange={(e, page) => setPage(page)}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </TableContainer>
          </Paper>
        )}
      </Grid>
    </TableTitle>
  )
}
