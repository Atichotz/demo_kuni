import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const KuniniPreset = definePreset(Aura, {
  primitive: {
    kuniniRed: {
      50: '#fff1f2',
      100: '#ffe1e4',
      200: '#ffc8ce',
      300: '#ff9aa5',
      400: '#f85f70',
      500: '#d93647',
      600: '#b01d2a', // Brand Red
      700: '#931824',
      800: '#7a1721',
      900: '#681720',
      950: '#3b080e'
    },
    kuniniBlue: {
      50: '#effaff',
      100: '#dff4ff',
      200: '#b8ebff',
      300: '#78dcff',
      400: '#31c9ff',
      500: '#06aeea',
      600: '#0088c2', // Accent Blue
      700: '#036c9a',
      800: '#0a5a7f',
      900: '#0e4b69',
      950: '#092f46'
    },
    kuniniGreen: {
      50: '#eefaf8',
      100: '#d6f3ef',
      200: '#b0e7df',
      300: '#80d4c9',
      400: '#55b1a5', // Accent Green
      500: '#399e92',
      600: '#2b7f76',
      700: '#266760',
      800: '#24534f',
      900: '#214743',
      950: '#102927'
    },
    kuniniGrey: {
      0: '#ffffff',
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#dcddde', // Light Grey
      300: '#c7c9cc',
      400: '#a7a9ac', // Mid Grey
      500: '#85878a',
      600: '#666769',
      700: '#414142', // Dark Grey
      800: '#2f2f30',
      900: '#1d1d1e',
      950: '#0b0b0c'
    }
  },

  semantic: {
    primary: {
      50: '{kuniniRed.50}',
      100: '{kuniniRed.100}',
      200: '{kuniniRed.200}',
      300: '{kuniniRed.300}',
      400: '{kuniniRed.400}',
      500: '{kuniniRed.500}',
      600: '{kuniniRed.600}',
      700: '{kuniniRed.700}',
      800: '{kuniniRed.800}',
      900: '{kuniniRed.900}',
      950: '{kuniniRed.950}'
    },

    focusRing: {
      width: '2px',
      style: 'solid',
      color: '{primary.500}',
      offset: '2px'
    },

    colorScheme: {
      light: {
        primary: {
          color: '{primary.600}',
          inverseColor: '#ffffff',
          hoverColor: '{primary.700}',
          activeColor: '{primary.800}'
        },
        highlight: {
          background: '{primary.50}',
          focusBackground: '{primary.100}',
          color: '{primary.700}',
          focusColor: '{primary.800}'
        },
        surface: {
          0: '{kuniniGrey.0}',
          50: '{kuniniGrey.50}',
          100: '{kuniniGrey.100}',
          200: '{kuniniGrey.200}',
          300: '{kuniniGrey.300}',
          400: '{kuniniGrey.400}',
          500: '{kuniniGrey.500}',
          600: '{kuniniGrey.600}',
          700: '{kuniniGrey.700}',
          800: '{kuniniGrey.800}',
          900: '{kuniniGrey.900}',
          950: '{kuniniGrey.950}'
        },
        formField: {
          hoverBorderColor: '{primary.400}',
          focusBorderColor: '{primary.600}'
        }
      },

      dark: {
        primary: {
          color: '{primary.400}',
          inverseColor: '{kuniniGrey.950}',
          hoverColor: '{primary.300}',
          activeColor: '{primary.200}'
        },
        highlight: {
          background: 'rgba(176, 29, 42, 0.18)',
          focusBackground: 'rgba(176, 29, 42, 0.28)',
          color: '{primary.100}',
          focusColor: '{primary.50}'
        },
        surface: {
          0: '#ffffff',
          50: '#f6f6f6',
          100: '#e7e7e8',
          200: '#c9c9cc',
          300: '#a7a9ac',
          400: '#7f8083',
          500: '#666769',
          600: '#4f5052',
          700: '#414142',
          800: '#2a2a2b',
          900: '#181819',
          950: '#0b0b0c'
        },
        formField: {
          hoverBorderColor: '{primary.400}',
          focusBorderColor: '{primary.400}'
        }
      }
    }
  }
});

export default KuniniPreset;