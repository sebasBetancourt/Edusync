import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(undefined)

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode')
      return saved ? JSON.parse(saved) : false
    }
    return false
  })
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarCollapsed')
      return saved ? JSON.parse(saved) : false
    }
    return false
  })
  
  const [currency, setCurrencyState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('currency')
      return saved || 'COP'
    }
    return 'COP'
  })

  const [colorPalette, setColorPaletteState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('colorPalette')
      return saved || 'default'
    }
    return 'default'
  })
  
  const [activeSection, setActiveSection] = useState('dashboard')

  const user = {
    name: 'Juan Carlos Admin',
    email: 'admin@dcidecomunicaciones.com',
    role: 'Administrador',
    avatar: 'JC'
  }

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', JSON.stringify(newMode))
    
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed
    setSidebarCollapsed(newState)
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState))
  }

  const setCurrency = (newCurrency) => {
    setCurrencyState(newCurrency)
    localStorage.setItem('currency', newCurrency)
  }

  const setColorPalette = (palette) => {
    setColorPaletteState(palette)
    localStorage.setItem('colorPalette', palette)
    
    // Apply color palette to document
    document.documentElement.setAttribute('data-palette', palette)
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    document.documentElement.setAttribute('data-palette', colorPalette)
  }, [colorPalette])

  return (
    <AppContext.Provider value={{
      darkMode,
      toggleDarkMode,
      sidebarCollapsed,
      toggleSidebar,
      activeSection,
      setActiveSection,
      currency,
      setCurrency,
      colorPalette,
      setColorPalette,
      user
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}