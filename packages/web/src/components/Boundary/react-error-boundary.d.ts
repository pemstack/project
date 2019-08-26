declare module 'react-error-boundary' {
  type Props = {
    children?: any
    FallbackComponent: React.ComponentType<any>
    onError?: (error: Error, componentStack: string) => void
  };

  type ErrorInfo = {
    componentStack: string
  }

  type State = {
    error?: Error
    info?: ErrorInfo
  }

  export class ErrorBoundary extends React.Component<Props, State> { }
}
