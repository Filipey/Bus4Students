import { ExpandMoreOutlined } from '@material-ui/icons'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  IconButtonProps,
  styled,
  Typography
} from '@mui/material'
import { useState } from 'react'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

interface InfoCardProps {
  title: string
  info: string
  mediaLink?: string
  collapseContent: JSX.Element
}

export function InfoCard({
  title,
  info,
  collapseContent,
  mediaLink
}: InfoCardProps) {
  const [expanded, setExpanded] = useState(false)
  const handleExpandClick = () => setExpanded(!expanded)

  return (
    <Card sx={{ marginTop: '80px', width: '100%' }}>
      <CardHeader title={title} />
      {mediaLink && (
        <CardMedia component="img" height={200} image={mediaLink} />
      )}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {info}
        </Typography>
      </CardContent>
      <CardActions>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Mostrar mais"
        >
          <ExpandMoreOutlined />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Box
            flexDirection="column"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {collapseContent}
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  )
}
