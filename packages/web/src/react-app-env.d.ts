/// <reference types="react-scripts" />
declare module 'load-script2' {
  export default function loadScript(src: string): Promise<void>
}
declare module 'remark-math' { }
declare module '@matejmazur/react-katex' {
  import { ComponentType } from 'react'
  export interface TeXProps {
    math: string
    block?: boolean
  }
  declare const TeX: ComponentType<TeXProps>
  export default TeX
}
