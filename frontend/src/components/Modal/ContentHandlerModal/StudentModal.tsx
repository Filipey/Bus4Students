import {
  AccountBalance,
  ArrowForward,
  Close,
  Commute,
  DirectionsBus,
  Domain,
  Home,
  Person,
  Place,
  School,
  Security
} from '@material-ui/icons'
import { CalendarMonth, Numbers } from '@mui/icons-material'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import { Fragment, useState } from 'react'
import { Student } from '../../../schemas'
import { isHallBus } from '../../../utils/getType'
import { InfoAccorion } from '../../Accordion'
import { InfoTextField } from '../../InfoTextField'
import { BusTransferList } from '../../TransferList'

interface StudentDetailsModalProps {
  student: Student
  state: boolean[]
  setState(state: boolean[]): void
  index: number
}

export function StudentDetailsModal({
  student,
  state,
  setState,
  index
}: StudentDetailsModalProps) {
  const handleCloseModal = () => {
    setState(state.map((i, pos) => (pos === index ? false : i)))
  }

  return (
    <Dialog
      style={{ width: '100%', height: '100%' }}
      open={state[index]}
      fullWidth
    >
      <DialogTitle color="#03a9f4">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>Estudante {student.cpf}</Grid>
          <Grid item>
            <IconButton onClick={handleCloseModal} size="small">
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
              defaultValue={student.name}
              disabled={true}
              fullWidth={true}
              icon={<Person />}
            />
            <InfoTextField
              label="CPF"
              defaultValue={student.cpf}
              disabled={true}
              fullWidth={true}
              icon={<Security />}
            />
            <InfoTextField
              label="Endereço"
              defaultValue={student.address}
              disabled={true}
              fullWidth={true}
              icon={<Home />}
            />
            <InfoTextField
              label="Matrícula"
              defaultValue={student.enrollment}
              fullWidth={true}
              disabled={true}
              icon={<Numbers />}
            />
            <InfoAccorion title="Insituições de Ensino">
              {student.schools.length !== 0 ? (
                student.schools.map(school => (
                  <Fragment key={school.name}>
                    <InfoTextField
                      label="Nome"
                      defaultValue={school.name}
                      fullWidth={true}
                      disabled={true}
                      icon={<Domain />}
                    />
                    <InfoTextField
                      label="Campus"
                      defaultValue={school.campus}
                      fullWidth={true}
                      disabled={true}
                      icon={<School />}
                    />
                    <InfoTextField
                      label="Localização"
                      defaultValue={school.location}
                      fullWidth={true}
                      disabled={true}
                      icon={<Place />}
                    />
                    <InfoTextField
                      label="Período letivo"
                      defaultValue={school.active ? 'Sim' : 'Não'}
                      fullWidth={true}
                      disabled={true}
                      icon={<CalendarMonth />}
                    />
                  </Fragment>
                ))
              ) : (
                <Typography>
                  Este estudante não está matriculado em nenhuma Instituição de
                  Ensino
                </Typography>
              )}
            </InfoAccorion>
            <InfoAccorion title="Transportes Utilizados">
              {student.buses.length !== 0 ? (
                student.buses.map(bus => (
                  <Fragment key={bus.plate}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <InfoTextField
                        label="Placa"
                        defaultValue={bus.plate}
                        disabled={true}
                        icon={<DirectionsBus />}
                      />
                      <ArrowForward htmlColor="#03a9f4" />
                      {isHallBus(bus) ? (
                        <InfoTextField
                          label="Fornecedor"
                          defaultValue="Prefeitura"
                          disabled={true}
                          icon={<AccountBalance />}
                        />
                      ) : (
                        <InfoTextField
                          label="Fornecedor"
                          defaultValue="Escon"
                          disabled={true}
                          icon={<Commute />}
                        />
                      )}
                    </Grid>
                  </Fragment>
                ))
              ) : (
                <Typography>
                  Este estudante não está alocado a nenhum Transporte Escolar
                </Typography>
              )}
            </InfoAccorion>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export function DelegateBusModal({
  student,
  index,
  state,
  setState
}: StudentDetailsModalProps) {
  const [option, setOption] = useState('Prefeitura')

  const handleCloseModal = () => {
    setState(state.map((i, pos) => (pos === index ? false : i)))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption((event.target as HTMLInputElement).value)
  }

  return (
    <Dialog
      style={{ width: '100%', height: '100%' }}
      open={state[index]}
      fullWidth
    >
      <DialogTitle color="#03a9f4">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>Estudante {student.cpf}</Grid>
          <Grid item>
            <IconButton onClick={handleCloseModal} size="small">
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
              defaultValue={student.name}
              disabled={true}
              fullWidth={true}
              icon={<Person />}
            />
            <InfoTextField
              label="CPF"
              defaultValue={student.cpf}
              disabled={true}
              fullWidth={true}
              icon={<Security />}
            />
            <FormControl>
              <FormLabel>Fornecedor </FormLabel>
              <RadioGroup onChange={handleChange} value={option} row>
                <FormControlLabel
                  label="Prefeitura"
                  control={<Radio />}
                  value="Prefeitura"
                />
                <FormControlLabel
                  label="Escon"
                  control={<Radio />}
                  value="Escon"
                />
              </RadioGroup>
            </FormControl>
            <BusTransferList student={student} option={option} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
