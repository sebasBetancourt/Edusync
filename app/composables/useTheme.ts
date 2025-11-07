import { useColorMode } from '#imports'
import { computed } from 'vue'

export const useTheme = () => {
  const colorMode = useColorMode()
  
  const isDark = computed(() => colorMode.value === 'dark')
  
  const toggleTheme = () => {
    colorMode.preference = isDark.value ? 'light' : 'dark'
  }

  return {
    isDark,
    toggleTheme,
    colorMode
  }
}