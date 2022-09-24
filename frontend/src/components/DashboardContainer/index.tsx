import { Box, Container, CssBaseline, Grid } from '@mui/material'
import { useContext, useState } from 'react'
import UserContext from '../../hooks/userContext'
import { adminUrls, studentUrls } from '../../utils/urls'
import { AppBar } from '../AppBar'
import { Drawer } from '../Drawer'

interface DashboardContainerProps {
  children?: React.ReactNode
}

export function DashboardContainer({ children }: DashboardContainerProps) {
  const [open, setOpen] = useState(false)
  const { user } = useContext(UserContext)
  const toggleDrawer = () => setOpen(!open)

  const urls = user.role === 'STUDENT' ? studentUrls : adminUrls

  return (
    <Box display="flex">
      <CssBaseline />
      <AppBar open={open} toggleDrawer={toggleDrawer} />
      <Drawer open={open} toggleDrawer={toggleDrawer} urls={urls} />
      <Box
        component="main"
        sx={{ flexGrow: 1, height: '100vh', overflow: 'auto' }}
      >
        <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
          <Grid container spacing={3}>
            {children}
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
