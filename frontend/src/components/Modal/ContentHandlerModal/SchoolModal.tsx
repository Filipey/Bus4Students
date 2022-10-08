import {
  Close,
  Domain,
  LocationOn,
  School as SchoolIcon
} from '@material-ui/icons'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../../hooks/userContext'
import { School } from '../../../schemas'
import { SchoolService } from '../../../services/SchoolService'
import { InfoTextField } from '../../InfoTextField'
import { WarningField } from '../../WarningField'

interface SchoolContentModalProps {
  school: School
  mode: 'view' | 'edit' | 'delete'
  state: boolean[]
  setState(state: boolean[]): void
  index: number
}

export function SchoolContentModal({
  school,
  mode,
  state,
  setState,
  index
}: SchoolContentModalProps) {
  const { user } = useContext(UserContext)
  const [name, setName] = useState(school.name)
  const [campus, setCampus] = useState(school.campus)
  const [active, setActive] = useState(school.active)
  const [location, setLocation] = useState(school.location)
  const [permission, setPermission] = useState(userPermission())
  const [changes, setChanges] = useState<string[]>([])
  const [changesWarning, setChangesWarning] = useState(false)
  const [successWarning, setSuccessWarning] = useState(false)
  const [deleteOption, setDeleteOption] = useState('campus')
  const [confirmDelete, setConfirmDelete] = useState(false)

  function userPermission() {
    if (mode === 'view') return true
    if ((mode === 'edit' || mode === 'delete') && user.role === 'ADMIN')
      return false
    return true
  }

  function hasChanged() {
    if (name !== school.name) {
      changes.find(c => c === 'Nome') ? null : setChanges([...changes, 'Nome'])
    }
    if (campus !== school.campus) {
      changes.find(c => c === 'Campus')
        ? null
        : setChanges([...changes, 'Campus'])
    }
    if (active !== school.active) {
      changes.find(c => c === 'Período Letivo')
        ? null
        : setChanges([...changes, 'Período Letivo'])
    }
    if (location !== school.location) {
      changes.find(c => c === 'Localização')
        ? null
        : setChanges([...changes, 'Localização'])
    }
  }

  function handleSubmitChanges() {
    const students = school.students

    SchoolService.updateSchool(school.campus, {
      name,
      campus,
      active,
      location,
      students
    })
    setChangesWarning(false)
    setSuccessWarning(true)
  }

  function handleDelete() {
    deleteOption === 'nome'
      ? SchoolService.deleteByName(name)
      : SchoolService.deleteByCampus(campus)
    setChangesWarning(false)
    setSuccessWarning(true)
    setConfirmDelete(false)
  }

  const handleCloseModal = () => {
    setPermission(true)
    setName(school.name)
    setCampus(school.campus)
    setActive(school.active)
    setLocation(school.location)
    setChanges([])
    setChangesWarning(false)
    setSuccessWarning(false)
    setConfirmDelete(false)
    setState(state.map((i, pos) => (pos === index ? false : i)))
  }

  const handleChangeActive = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value

    setActive(value === 'Sim' ? true : false)
  }

  const handleChangeDeleteOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value

    setDeleteOption(value)
  }

  useEffect(() => {
    hasChanged()
  }, [name, campus, school, active, location])

  return (
    <Dialog
      style={{ width: '100%', height: '100%' }}
      onClose={handleCloseModal}
      fullWidth
      open={state[index]}
    >
      <DialogTitle color="#03a9f4">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            {school.name} - {school.campus}
          </Grid>
          <Grid item>
            <IconButton size="small" onClick={handleCloseModal}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid container flexDirection="column" item sx={{ pt: 2 }}>
            <InfoTextField
              label="Nome"
              defaultValue={school.name}
              disabled
              fullWidth
              icon={<SchoolIcon />}
            />
            <InfoTextField
              label="Campus"
              defaultValue={school.campus}
              fullWidth
              disabled={permission}
              icon={<Domain />}
              onChange={e => setCampus(e.target.value)}
            />
            <InfoTextField
              label="Localização"
              defaultValue={school.location}
              fullWidth
              disabled={permission}
              icon={<LocationOn />}
              onChange={e => setLocation(e.target.value)}
            />
            <FormControl disabled={permission}>
              <FormLabel>Período Letivo</FormLabel>
              <RadioGroup
                row
                onChange={handleChangeActive}
                value={active ? 'Sim' : 'Não'}
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        {mode !== 'view' && (
          <>
            <Grid
              container
              sx={{ pt: 2 }}
              spacing={10}
              alignContent="center"
              justifyContent="space-between"
            >
              {mode === 'edit' && (
                <Grid item>
                  <Button
                    onClick={() => setPermission(!permission)}
                    variant="contained"
                    color="info"
                  >
                    Editar
                  </Button>
                </Grid>
              )}

              {mode === 'delete' && (
                <Grid item>
                  <Button
                    onClick={() => setConfirmDelete(true)}
                    variant="contained"
                    color="error"
                  >
                    Deletar
                  </Button>
                </Grid>
              )}

              {changes.length > 0 && (
                <Grid item>
                  <Button
                    onClick={() => setChangesWarning(true)}
                    variant="contained"
                    color="success"
                  >
                    Salvar
                  </Button>
                </Grid>
              )}
            </Grid>
            {changesWarning && (
              <>
                <WarningField
                  severity="warning"
                  title="Tem certeza?"
                  message={`Os seguintes campos foram alterados: ${changes.map(
                    change => change
                  )}`}
                />
                <Button
                  onClick={handleSubmitChanges}
                  variant="contained"
                  color="inherit"
                >
                  Confirmar
                </Button>
              </>
            )}
            {successWarning && (
              <WarningField
                severity="success"
                title="Mudanças realizadas com sucesso"
                message="Volte para a página para observar as mudanças"
              />
            )}
            {confirmDelete && (
              <>
                <WarningField
                  severity="warning"
                  title="Escolha a forma de exclusão"
                  message={`Nome: Todos os Campus desta Instituição serão deletados.${'\n'}
                  Campus: Apenas este Campus será deletado.`}
                />
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <FormControl>
                    <FormLabel>Forma de Deleção</FormLabel>
                    <RadioGroup
                      onChange={handleChangeDeleteOption}
                      row
                      value={deleteOption}
                    >
                      <FormControlLabel
                        value="nome"
                        control={<Radio />}
                        label="Nome"
                      />
                      <FormControlLabel
                        value="campus"
                        control={<Radio />}
                        label="Campus"
                      />
                    </RadioGroup>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={handleDelete}
                  >
                    Confirmar
                  </Button>
                </Grid>
              </>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
