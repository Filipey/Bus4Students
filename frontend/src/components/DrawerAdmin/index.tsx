import { IconButton } from '@material-ui/core'
import HomeIcon from '@mui/icons-material/Home'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import { DrawerListItem } from '../ListItem'

interface DrawerAdminProps {
  open: boolean
  setOpenMenu(state: boolean): void
}

export default function DrawerAdmin({ open, setOpenMenu }: DrawerAdminProps) {
  const urls = ['/admin', '/admin', '/admin', '/admin', '/admin']

  return (
    <Drawer open={open} onClose={() => setOpenMenu(!open)} anchor="left">
      <Box p={2} width="200px" textAlign="center" role="presentation">
        <Divider />
        <IconButton aria-label="inicio" href="/">
          <HomeIcon />
        </IconButton>
        <Divider />

        <DrawerListItem urls={urls} />
      </Box>
    </Drawer>
  )
}
