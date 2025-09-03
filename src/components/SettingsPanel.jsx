import { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { Badge } from './ui/badge'
import { Settings, Palette, Check, ChevronLeft } from 'lucide-react'
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

export function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const { colorPalette, setColorPalette } = useApp()

  return (
    <>
      {/* Toggle Button */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="sm"
          className={`rounded-l-lg rounded-r-none px-2 py-4 transition-all duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-0'
          }`}
          style={{ 
            writingMode: 'vertical-rl',
            textOrientation: 'mixed'
          }}
        >
          <ChevronLeft 
            className={`w-4 h-4 transition-transform duration-300 ${
              isOpen ? 'rotate-0' : 'rotate-180'
            }`}
          />
        </Button>
      </div>

      {/* Settings Panel */}
      <div className={`fixed right-0 top-0 h-full w-80 bg-background/95 backdrop-blur border-l border-border shadow-2xl transform transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-primary" />
              <h3>Personalización</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-auto p-1"
            >
              ×
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Color Palettes Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="w-4 h-4 text-primary" />
                  <Label className="font-medium">Paleta de Colores</Label>
                </div>
                <div className="space-y-3">
                  {colorPalettes.map((palette) => (
                    <div
                      key={palette.id}
                      onClick={() => setColorPalette(palette.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                        colorPalette === palette.id 
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-sm">{palette.name}</p>
                            {colorPalette === palette.id && (
                              <Check className="w-4 h-4 text-primary" />
                            )}
                          </div>
                          <div className="flex gap-2">
                            <div 
                              className="w-6 h-6 rounded-md border shadow-sm"
                              style={{ backgroundColor: palette.primary }}
                              title="Primario"
                            />
                            <div 
                              className="w-6 h-6 rounded-md border shadow-sm"
                              style={{ backgroundColor: palette.secondary }}
                              title="Secundario"
                            />
                            <div 
                              className="w-6 h-6 rounded-md border shadow-sm"
                              style={{ backgroundColor: palette.accent }}
                              title="Acento"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Los colores se aplicarán inmediatamente en toda la interfaz
                </p>
              </div>

              <Separator />

              {/* Additional Settings */}
              <div>
                <Label className="font-medium mb-4 block">Configuraciones Adicionales</Label>
                <div className="space-y-3">
                  <Card className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Animaciones</p>
                        <p className="text-xs text-muted-foreground">Efectos de transición suaves</p>
                      </div>
                      <Badge variant="secondary">Activo</Badge>
                    </div>
                  </Card>
                  
                  <Card className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Sonidos</p>
                        <p className="text-xs text-muted-foreground">Notificaciones sonoras</p>
                      </div>
                      <Badge variant="outline">Inactivo</Badge>
                    </div>
                  </Card>

                  <Card className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Compacto</p>
                        <p className="text-xs text-muted-foreground">Interfaz más compacta</p>
                      </div>
                      <Badge variant="outline">Inactivo</Badge>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                D&C IDEM Sistema Financiero
              </p>
              <p className="text-xs text-muted-foreground">
                v1.0.0
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}