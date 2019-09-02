import React, { FunctionComponent } from 'react'
import TeX from '@matejmazur/react-katex'
import 'katex/dist/katex.min.css'

export interface MathRendererProps {
  value: string
  block?: boolean
}

export const MathRenderer: FunctionComponent<MathRendererProps> = ({
  value,
  block
}) => {
  return (
    <TeX math={value} block={block} />
  )
}

export default MathRenderer
