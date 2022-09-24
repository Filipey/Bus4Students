export const THEME = {
  COLORS: {
    BACKGROUND_900: '',
    BACKGROUND_800: '',

    TEXT: '#FFFFFF',

    CAPTION_500: '#71717A',
    CAPTION_400: '#A1A1AA',
    CAPTION_300: '#D4D4D8',

    SHAPE: '#2A2634',

    COLOR1: '#7686ea',
    COLOR2: '#6176d7',
    COLOR3: '#4b66c5',
    COLOR4: '#3655b2',
    COLOR5: '#20459f',

    SUCCESS: '#34D399',
    ALERT: '#F87171',

    FOOTER: '',
    OVERLAY: ''
  },

  FONT_FAMILY: {
    REGULAR: '',
    SEMI_BOLD: '',
    BOLD: '',
    BLACK: ''
  },

  FONT_SIZE: {
    SM: 14,
    MD: 16,
    LG: 24
  }
}
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      light: '#7686ea',
      main: '#4b66c5',
      dark: '#20459f'
    },
    secondary: {
      light: 'rgb(112, 112, 112)',
      main: '#ffff',
      dark: 'rgb(53, 53, 53)'
    },
    error: {
      light: '#ef5350',
      main: '#d32f2f',
      dark: '#c62828'
    },
    warning: {
      light: '#ff9800',
      main: '#ed6c02',
      dark: '#e65100'
    },
    info: {
      light: '#03a9f4',
      main: '#0288d1',
      dark: '#01579b'
    },
    success: {
      light: '#4caf50',
      main: '#2e7d32',
      dark: '#1b5e20'
    }
  }
})
