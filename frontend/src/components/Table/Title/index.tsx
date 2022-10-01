import { Add, NavigateNext } from '@material-ui/icons'
import {
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  Typography
} from '@mui/material'
import { ReactNode, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../../hooks/userContext'

export interface BreadCrumbStep {
  title: string
  url: string
}

interface TableTitleProps {
  title: string
  steps: BreadCrumbStep[]
  buttonAction?(): void
  buttonTitle?: string
  children: ReactNode
}

export function TableTitle({
  title,
  steps,
  buttonAction,
  buttonTitle,
  children
}: TableTitleProps) {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const isUserAdmin = user.role === 'ADMIN'

  const handleGoToBreadCrumb = (step: BreadCrumbStep) => navigate(step.url)

  return (
    <Container style={{ width: '100%', height: '100%', marginTop: '50px' }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid sx={{ pl: '40px', pt: '20px', pb: '20px' }} item>
          <Typography
            variant="h4"
            style={{ color: '#0288d1' }}
            fontSize="1.5rem"
          >
            {title}
          </Typography>
          <Breadcrumbs separator={<NavigateNext />}>
            {steps.map((step, index) => (
              <Link
                sx={{ cursor: 'pointer' }}
                color="inherit"
                key={index}
                underline="hover"
                onClick={() => handleGoToBreadCrumb(step)}
              >
                {step.title}
              </Link>
            ))}
          </Breadcrumbs>
        </Grid>

        <Grid item sx={{ pl: '40px', pt: '40px', pb: '20px' }}>
          {isUserAdmin && buttonTitle && (
            <Button
              onClick={buttonAction}
              color="info"
              startIcon={<Add />}
              variant="contained"
            >
              {buttonTitle}
            </Button>
          )}
        </Grid>
      </Grid>
      <Divider />
      <Grid
        sx={{ pt: '20px' }}
        spacing={6}
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          item
          style={{ width: '100%', height: '100%' }}
          sx={{ pl: '24px', pt: '24px' }}
        >
          {children}
        </Grid>
      </Grid>
    </Container>
  )
}
