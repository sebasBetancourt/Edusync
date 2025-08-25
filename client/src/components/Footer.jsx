import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Desarrollado con</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>por</span>
            <span className="font-medium text-foreground">D&C IDEM COMUNICACIONES S.A.S.</span>
            <span>2025</span>
          </div>
          <div className="text-xs text-muted-foreground">
            v1.0.0 | Todos los derechos reservados
          </div>
        </div>
      </div>
    </footer>
  )
}