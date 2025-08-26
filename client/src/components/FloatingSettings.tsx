import { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { Badge } from './ui/badge'
import { Settings, Palette, Check } from 'lucide-react'
import { useApp } from './AppContext'

const colorPalettes = [
  {
    id: 'default',
    name: 'Azul Corporativo',
    primary: '#3b82f6',
    secondary: '#1e40af',
    accent: '#60a5fa'
  },
  {
    id: 'green',
    name: 'Verde Financiero',
    primary: '#059669',
    secondary: '#047857',
    accent: '#34d399'
  },
  {
    id: 'purple',
    name: 'Púrpura Elegante',
    primary: '#7c3aed',
    secondary: '#5b21b6',
    accent: '#a78bfa'
  },
  {
    id: 'orange',
    name: 'Naranja Energético',
    primary: '#ea580c',
    secondary: '#c2410c',
    accent: '#fb923c'
  },
  {
    id: 'teal',
    name: 'Turquesa Moderno',
    primary: '#0d9488',
    secondary: '#0f766e',
    accent: '#5eead4'
  }
]

export function FloatingSettings() {
  const [isOpen, setIsOpen] = useState(false)
  const { colorPalette, setColorPalette } = useApp()

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <Card className="absolute bottom-16 right-0 w-80 p-4 shadow-lg border">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Personalización</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                ×
              </Button>
            </div>
            
            <Separator />
            
            <div>
              <Label className="text-sm font-medium mb-3 block">
                <Palette className="w-4 h-4 inline mr-2" />
                Paleta de Colores
              </Label>
              <div className="grid grid-cols-1 gap-2">
                {colorPalettes.map((palette) => (
                  <div
                    key={palette.id}
                    onClick={() => setColorPalette(palette.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                      colorPalette === palette.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{palette.name}</p>
                        <div className="flex gap-2 mt-2">
                          <div 
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: palette.primary }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: palette.secondary }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: palette.accent }}
                          />
                        </div>
                      </div>
                      {colorPalette === palette.id && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
      
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="sm"
        className="w-12 h-12 rounded-full shadow-lg"
      >
        <Settings className="w-5 h-5" />
      </Button>
    </div>
  )
}