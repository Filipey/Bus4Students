import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import { Student } from '../../schemas'
import { SchoolService } from '../../services/SchoolService'
import { WarningField } from '../WarningField'

interface SchoolTransferListProps {
  student: Student
}

function not(x: string[], y: string[]) {
  return x.filter(value => y.indexOf(value) === -1)
}

function union(x: string[], y: string[]) {
  return [...x, ...not(y, x)]
}

function intersection(x: string[], y: string[]) {
  return x.filter(value => y.indexOf(value) !== -1)
}

export function SchoolsTransferList({ student }: SchoolTransferListProps) {
  const [allCampus, setAllCampus] = useState<string[]>([])
  const [checked, setChecked] = useState([])
  const [studentCampus, setStudentCampus] = useState(
    student.schools.map(school => school.campus)
  )
  const [initialStudentCampus] = useState(studentCampus)
  const [originalStudentCampus] = useState(
    student.schools.map(school => school.campus)
  )
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const leftChecked = intersection(checked, allCampus)
  const rightChecked = intersection(checked, studentCampus)

  function fetchData() {
    SchoolService.getAllSchools().then(res => {
      const allCampuses = res.data.map(school => school.campus)
      const availableCampuses = allCampuses.filter(
        campus => !studentCampus.includes(campus)
      )
      setAllCampus(availableCampuses)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleToggle = (value: string) => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]
    currentIndex === -1
      ? newChecked.push(value)
      : newChecked.splice(currentIndex, 1)
    setChecked(newChecked)
  }

  const numberOfChecked = (items: string[]) =>
    intersection(checked, items).length

  const handleToggleAll = (items: string[]) => {
    numberOfChecked(items) === items.length
      ? setChecked(not(checked, items))
      : setChecked(union(checked, items))
  }

  const handleCheckStudentCampus = () => {
    setStudentCampus(studentCampus.concat(leftChecked))
    setAllCampus(not(allCampus, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckAllCampuses = () => {
    setAllCampus(allCampus.concat(rightChecked))
    setStudentCampus(not(studentCampus, rightChecked))
    setChecked(not(checked, rightChecked))
  }

  const handleSubmitChanges = () => {
    const originalCampus = student.schools.map(school => school.campus)
    const removedCampuses = originalCampus.map(campus =>
      originalCampus.includes(campus) && !studentCampus.includes(campus)
        ? campus
        : null
    )
    const addedCampuses = studentCampus.map(campus =>
      !originalCampus.includes(campus) && studentCampus.includes(campus)
        ? campus
        : null
    )
    if (initialStudentCampus.length > 0) {
      initialStudentCampus.map(campus => {
        if (addedCampuses.includes(campus)) {
          SchoolService.insertStudentInSchool(student.cpf, campus)
        } else if (removedCampuses.includes(campus)) {
          SchoolService.removeStudentFromCampus(student.cpf, campus)
        }
      })
      setSuccess(true)
      return
    }
    addedCampuses.map(campus => {
      SchoolService.insertStudentInSchool(student.cpf, campus)
      setSuccess(true)
    })
  }

  const customList = (title: ReactNode, items: string[]) => (
    <Card>
      <CardHeader
        sx={{}}
        avatar={
          <Checkbox
            onClick={() => handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected'
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selecionados`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 250,
          bgcolor: 'background.paper',
          overflow: 'auto'
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value: string) => {
          const labelId = `transfer-list-all-item-${value}-label`

          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={() => handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItemButton>
          )
        })}
        <ListItem />
      </List>
    </Card>
  )

  return (
    <Grid
      style={{ width: '100%' }}
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>{customList('Opções', allCampus)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckStudentCampus}
            disabled={leftChecked.length === 0}
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckAllCampuses}
            disabled={rightChecked.length === 0}
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Selecionados', studentCampus)}</Grid>
      {JSON.stringify(originalStudentCampus) !==
        JSON.stringify(studentCampus) && (
        <Grid
          container
          sx={{ pt: 2 }}
          spacing={10}
          alignContent="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Button variant="contained" color="error">
              Cancelar
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={handleSubmitChanges}
              variant="contained"
              color="success"
            >
              Confirmar
            </Button>
          </Grid>
        </Grid>
      )}
      {success && (
        <WarningField
          title="Recurso alocado com sucesso!"
          message={`O aluno ${student.name} teve suas Instituições de Ensino ajustadas com sucesso!`}
          severity="success"
        />
      )}
    </Grid>
  )
}
