export const globalStyles = {
    colors: {
      background: '#FAF7F0',    // Light cream - primary background
      surface: '#D8D2C2',       // Warm gray - secondary background
      primary: '#B17457',       // Terracotta - primary actions
      text: '#4A4947',          // Dark gray - text
      
      // Additional semantic colors
      success: '#6B8E23',
      error: '#B22222',
      disabled: '#A9A9A9',
    },
    
    typography: {
      sizes: {
        heading1: 32,
        heading2: 24,
        body: 18,      // Larger default font size for better readability
        caption: 16,
      },
      fontFamily: {
        regular: 'Inter_400Regular',
        medium: 'Inter_500Medium',
        bold: 'Inter_700Bold',
      }
    },
    
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    
    borderRadius: {
      sm: 8,
      md: 12,
      lg: 16,
    },
    shadow: {
      sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    },

    animation: {
      pressScale: 0.98,
    }

    
  };