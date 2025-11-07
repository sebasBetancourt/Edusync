// Type declarations to help TypeScript and the editor resolve shadcn UI component imports

// Allow importing .vue files
declare module "*.vue" {
  import { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Specific declaration for the Button barrel used in imports in the project.
// This matches import { Button } from '~/app/components/ui/button'
declare module "~/app/components/ui/button" {
  import { DefineComponent } from "vue"
  // Named export (barrel) that the index.ts provides
  export const Button: DefineComponent<any, any, any>
  export const buttonVariants: any
  export type ButtonVariants = any
  // Also provide a default export (the .vue component) to be safe
  const _default: DefineComponent<any, any, any>
  export default _default
}

// Fallback for any imports from the app components folder (loose-any)
declare module "~/app/components/*" {
  const content: any
  export default content
}
