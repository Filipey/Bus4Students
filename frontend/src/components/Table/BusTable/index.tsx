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
import { isEsconBus, isHallBus } from '../../../utils/getType'
import { BusContentModal } from '../../Modal/ContentHandlerModal/BusModal'
import { InsertBusModal } from '../../Modal/InsertModal/Bus'
import { WarningField } from '../../WarningField'
import { BreadCrumbStep, TableTitle } from '../Title'

interface BusTableProps {
  mode: 'all' | 'my'
}

export function BusTable({ mode }: BusTableProps) {
  const { user } = useContext(UserContext)
  const isUserAdmin = user.role === 'ADMIN'

  const [allBuses, setAllBuses] = useState<Bus[]>([])
  const [esconBuses, setEsconBuses] = useState<EsconBus[]>([])
  const [hallBuses, setHallBuses] = useState<HallBus[]>([])
  const [openModal, setOpenModal] = useState<boolean[]>(
    Array(allBuses.concat(hallBuses).concat(esconBuses).length).fill(false)
  )
  const [modalMode, setModalMode] = useState<'handle' | 'view'>('view')
  const [insertBus, setInsertBus] = useState(false)

  const handleOpenModal = (newModalMode: 'handle' | 'view', index: number) => {
    if (newModalMode === 'handle' && !isUserAdmin) {
      return
    }

    setModalMode(newModalMode)
    setOpenModal(openModal.map((i, pos) => (pos === index ? true : i)))
  }

  const userAdivce =
    (!isUserAdmin && (hallBuses === undefined || esconBuses === undefined)) ||
    (!isUserAdmin &&
      (hallBuses.length === 0 || esconBuses.length === 0) &&
      mode === 'my')

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

  function fetchData() {
    if (isUserAdmin || (!isUserAdmin && mode === 'all')) {
      BusService.getAllEsconBuses().then(res => setEsconBuses(res.data))
      BusService.getAllHallBuses().then(res => setHallBuses(res.data))
      return
    }

    StudentService.getStudentByCpf(user.cpf).then(res => {
      res.data.buses.map(bus => {
        if (isHallBus(bus)) {
          setHallBuses([...hallBuses, bus])
        } else if (isEsconBus(bus)) {
          setEsconBuses([...esconBuses, bus])
        }
      })
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const mergedBuses = [...esconBuses, ...hallBuses]
    setAllBuses(mergedBuses)
    setOpenModal(Array(mergedBuses.length).fill(false))
  }, [hallBuses, esconBuses])

  return (
    <TableTitle
      title="Onibus"
      steps={steps}
      buttonTitle="Adicionar Onibus"
      buttonAction={() => setInsertBus(true)}
    >
      <InsertBusModal state={insertBus} setState={setInsertBus} />
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
                  {allBuses.map((bus, index) => (
                    <TableRow key={bus.plate}>
                      <TableCell align="center">{bus.plate}</TableCell>
                      <TableCell align="center">{bus.departureTime}</TableCell>
                      {isHallBus(bus) ? (
                        <>
                          <TableCell align="center">Não Há</TableCell>
                          <TableCell align="center">Prefeitura</TableCell>
                          <TableCell align="center">
                            <IconButton
                              id={index.toString()}
                              onClick={() => handleOpenModal('view', index)}
                            >
                              <Tooltip title="Visualizar">
                                <Visibility />
                              </Tooltip>
                            </IconButton>
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              id={index.toString()}
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
                            <IconButton
                              id={index.toString()}
                              onClick={() => handleOpenModal('handle', index)}
                            >
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
                          <BusContentModal
                            mode={modalMode}
                            state={openModal}
                            setState={setOpenModal}
                            bus={bus}
                            index={index}
                          />
                        </>
                      ) : (
                        <>
                          {isEsconBus(bus) ? (
                            <>
                              <TableCell align="center">{bus.line}</TableCell>
                              <TableCell align="center">Escon</TableCell>
                              <TableCell align="center">
                                <IconButton
                                  id={bus.plate}
                                  onClick={() => handleOpenModal('view', index)}
                                >
                                  <Tooltip title="Visualizar">
                                    <Visibility />
                                  </Tooltip>
                                </IconButton>
                              </TableCell>
                              <TableCell align="center">
                                <IconButton
                                  id={index.toString()}
                                  onClick={() =>
                                    handleOpenModal('handle', index)
                                  }
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
                                <IconButton
                                  id={index.toString()}
                                  onClick={() =>
                                    handleOpenModal('handle', index)
                                  }
                                >
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
                              <BusContentModal
                                mode={modalMode}
                                state={openModal}
                                setState={setOpenModal}
                                bus={bus}
                                index={index}
                              />
                            </>
                          ) : (
                            ''
                          )}
                        </>
                      )}
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
