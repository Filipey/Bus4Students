import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { DrawerListItem } from '../ListItem'

interface DrawerUserProps {
  open: boolean
  setOpenMenu(state: boolean): void
}

export default function DrawerUser({ open, setOpenMenu }: DrawerUserProps) {
  const urls = ['/user', '/user', '/user', '/user', '/user']

  return (
    <Drawer open={open} onClose={() => setOpenMenu(!open)} anchor="left">
      <Box p={2} width="200px" textAlign="center" role="presentation">
        <DrawerListItem urls={urls} />
      </Box>
    </Drawer>
  )
}
