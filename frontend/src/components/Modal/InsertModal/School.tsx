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
import { useEffect, useState } from 'react'
import { SchoolService } from '../../../services/SchoolService'
import { InfoTextField } from '../../InfoTextField'
import { WarningField } from '../../WarningField'

interface InsertSchoolModalProps {
  state: boolean
  setState(state: boolean): void
}

export function InsertSchoolModal({ state, setState }: InsertSchoolModalProps) {
  const [name, setName] = useState('')
  const [campus, setCampus] = useState('')
  const [active, setActive] = useState(false)
  const [location, setLocation] = useState('')
  const [submit, setSubmit] = useState(false)
  const [badRequest, setBadRequest] = useState(false)

  const handleSubmit = () => {
    SchoolService.insert({ name, campus, active, location })
    setSubmit(true)
  }

  useEffect(() => {
    areFieldsAcceptable()
  }, [name, campus, active, location])

  const handleCancel = () => {
    setSubmit(false)
    setBadRequest(false)
    setName('')
    setCampus('')
    setActive(false)
    setLocation('')
    setState(false)
  }

  const areFieldsAcceptable = () => {
    return name !== '' && campus !== '' && location !== ''
  }

  const handleChangeActive = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value

    setActive(value === 'Sim' ? true : false)
  }

  return (
    <Dialog open={state} scroll="body" fullWidth>
      <DialogTitle color="#03a9f4">
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>Nova Instituição de Ensino</Grid>
          <Grid item>
            <IconButton sx={{ size: 'small' }} onClick={handleCancel}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container flexDirection="column" item sx={{ pt: 2 }}>
          <InfoTextField
            label="Nome"
            defaultValue={name}
            fullWidth={true}
            icon={<SchoolIcon />}
            onChange={e => setName(e.target.value)}
          />
          <InfoTextField
            label="Campus"
            defaultValue={campus}
            fullWidth={true}
            icon={<Domain />}
            onChange={e => setCampus(e.target.value)}
          />
          <InfoTextField
            label="Localização"
            defaultValue={campus}
            fullWidth={true}
            icon={<LocationOn />}
            onChange={e => setLocation(e.target.value)}
          />
          <FormControl>
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
          {submit && (
            <WarningField
              severity="success"
              title="Cadastro realizado com sucesso!"
              message={`O Campus ${campus} da Instituição ${name} foi realizado com sucesso!`}
            />
          )}

          {!submit && areFieldsAcceptable() && (
            <Grid
              container
              sx={{ pt: 2 }}
              spacing={10}
              alignContent="center"
              justifyContent="space-between"
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                >
                  Salvar
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          )}
          {badRequest && !submit && (
            <WarningField
              title="Entrada de dados inválida!"
              severity="error"
              message={`Este campus desta instituição já consta na base de dados! Verifique a integridade das entradas.`}
            />
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
