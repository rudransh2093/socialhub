import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: `'Plus Jakarta Sans', sans-serif`,
    body: `'Plus Jakarta Sans', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: '#080B11',
        color: 'gray.100',
        fontFamily: `'Plus Jakarta Sans', sans-serif`,
        minHeight: '100vh',
        overflowX: 'hidden',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'full',
        fontWeight: '600',
        transition: 'all 0.2s cubic-bezier(.08,.52,.52,1)',
      },
      variants: {
        solid: {
          bg: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
          color: 'white',
          _hover: {
            bg: 'linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)',
            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
            transform: 'translateY(-1.5px)',
          },
          _active: {
            transform: 'translateY(0.5px)',
          },
        },
        outline: {
          border: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.12)',
          color: 'gray.200',
          bg: 'rgba(255, 255, 255, 0.02)',
          _hover: {
            bg: 'rgba(255, 255, 255, 0.08)',
            transform: 'translateY(-1px)',
            borderColor: 'rgba(255, 255, 255, 0.2)',
          },
          _active: {
            transform: 'translateY(1px)',
          },
        },
        ghost: {
          color: 'gray.200',
          _hover: {
            bg: 'rgba(255, 255, 255, 0.06)',
          },
        },
        danger: {
          bg: 'red.500',
          color: 'white',
          _hover: {
            bg: 'red.600',
            boxShadow: '0 4px 15px rgba(229, 62, 62, 0.4)',
            transform: 'translateY(-1.5px)',
          },
          _active: {
            transform: 'translateY(0.5px)',
          },
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            bg: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid',
            borderColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 'xl',
            color: 'white',
            _hover: {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            _focus: {
              borderColor: '#6366F1',
              boxShadow: '0 0 0 1px #6366F1',
              bg: 'rgba(255, 255, 255, 0.06)',
            },
            _placeholder: {
              color: 'gray.500',
            },
          },
        },
      },
    },
  },
});

export default theme;
