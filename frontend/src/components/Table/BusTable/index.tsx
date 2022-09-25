import { Delete, Edit, Visibility } from '@material-ui/icons'
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../../hooks/userContext'
import { Bus, EsconBus, HallBus } from '../../../schemas'
import { BusService } from '../../../services/BusService'
import { StudentService } from '../../../services/StudentService'
import { WarningField } from '../../WarningField'
import { BreadCrumbStep, TableTitle } from '../Title'

interface BusTableProps {
  mode: 'all' | 'my'
}

export function BusTable({ mode }: BusTableProps) {
  const { user } = useContext(UserContext)
  const isUserAdmin = user.role === 'ADMIN'

  const [buses, setBuses] = useState<Bus[]>([])
  const [esconBuses, setEsconBuses] = useState<EsconBus[]>([])
  const [hallBuses, setHallBuses] = useState<HallBus[]>([])
  const userAdivce =
    (!isUserAdmin && buses === undefined) ||
    (!isUserAdmin && buses.length === 0 && mode === 'my')

  const steps: BreadCrumbStep[] = [
    {
      title: 'Dashboard',
      url: user.role === 'ADMIN' ? '/admin' : '/user'
    },
    {
      title: 'Onibus',
      url: user.role === 'ADMIN' ? '/admin/bus' : '/user/bus'
    }
  ]

  useEffect(() => {
    if (isUserAdmin || (!isUserAdmin && mode === 'all')) {
      BusService.getAllEsconBuses().then(res => setEsconBuses(res.data))
      BusService.getAllHallBuses().then(res => setHallBuses(res.data))
      return
    }

    StudentService.getStudentByCpf(user.cpf).then(res => {
      setBuses(res.data.buses)
    })
  }, [])

  return (
    <TableTitle
      title="Onibus"
      steps={steps}
      buttonTitle="Adicionar Onibus"
      buttonAction={() => console.log('todo')}
    >
      <Grid
        item
        sx={{ pl: '20px', pt: '24px' }}
        style={{ width: '100%', height: '100%' }}
      >
        {userAdivce ? (
          <WarningField
            severity="warning"
            title="Ausencia de Onibus"
            message="Atualmente você não está alocado a nenhum Transporte Escolar, caso essa informação esteja incorreta entre em contato com um Administrador."
          />
        ) : (
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Placa</TableCell>
                    <TableCell align="center">Horário de Saída</TableCell>
                    <TableCell align="center">Linha</TableCell>
                    <TableCell align="center">Fornecedor</TableCell>
                    <TableCell align="center">Visualizar</TableCell>
                    <TableCell align="center">Editar</TableCell>
                    <TableCell align="center">Excluir</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!isUserAdmin &&
                    buses.map((bus, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{bus.plate}</TableCell>
                        <TableCell align="center">
                          {bus.departureTime}
                        </TableCell>
                        <TableCell align="center">Não há</TableCell>
                        <TableCell align="center">Não documentado</TableCell>
                        <TableCell align="center">Não há</TableCell>
                        <TableCell align="center">
                          <IconButton>
                            <Visibility />
                          </IconButton>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton>
                            <Edit />
                          </IconButton>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  {esconBuses.map((bus, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{bus.plate}</TableCell>
                      <TableCell align="center">{bus.departureTime}</TableCell>
                      <TableCell align="center">{bus.line}</TableCell>
                      <TableCell align="center">Escon</TableCell>
                      <TableCell align="center">
                        <IconButton>
                          <Tooltip title="Visualizar">
                            <Visibility />
                          </Tooltip>
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton>
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
                  {hallBuses.map((bus, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{bus.plate}</TableCell>
                      <TableCell align="center">{bus.departureTime}</TableCell>
                      <TableCell align="center">Não Há</TableCell>
                      <TableCell align="center">Prefeitura</TableCell>
                      <TableCell align="center">
                        <IconButton>
                          <Tooltip title="Visualizar">
                            <Visibility />
                          </Tooltip>
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton>
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
            </TableContainer>
          </Paper>
        )}
      </Grid>
    </TableTitle>
  )
}
