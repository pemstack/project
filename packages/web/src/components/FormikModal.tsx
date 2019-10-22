import { Modal } from 'antd'
import { Formik, FormikConfig } from 'formik'
import React, { useRef, useState, useEffect } from 'react'

export interface ModalControllerConfig {
  initialVisible?: boolean
  initialLoading?: boolean
}

export interface ModalController {
  readonly visible: boolean
  readonly loading: boolean
  readonly key: number
  open(): void
  close(): void
  setLoading(loading: boolean): void
}

export function useModalController(config: ModalControllerConfig = {}): ModalController {
  const {
    initialVisible = false,
    initialLoading = false
  } = config
  const [state, setState] = useState({
    visible: initialVisible,
    loading: initialLoading,
    key: 1
  })

  const refs = useRef({
    visible: state.visible,
    loading: state.loading,
    key: state.key
  })

  refs.current = {
    visible: state.visible,
    loading: state.loading,
    key: state.key
  }

  const controllerRef = useRef({
    get visible() {
      return refs.current.visible
    },
    get loading() {
      return refs.current.loading
    },
    get key() {
      return refs.current.key
    },
    open() {
      setState(({ key, loading }) => ({
        visible: true,
        key,
        loading
      }))
    },
    close() {
      setState(({ key, loading }) => ({
        visible: false,
        key: key + 1,
        loading
      }))
    },
    setLoading(loading: boolean) {
      setState(({ visible, key }) => ({
        visible,
        key,
        loading
      }))
    }
  })

  return controllerRef.current
}

export function useControllerLoading(controller: ModalController, loading: boolean) {
  useEffect(() => {
    controller.setLoading(loading)
  }, [loading])
}

export interface FormikModalProps<Values> extends FormikConfig<Values> {
  controller: ModalController
  title?: string
  okType?: 'primary' | 'ghost' | 'dashed' | 'danger' | 'link' | 'default'
  okText?: string
  cancelText?: string
}

export function FormikModal<Values = any>({
  controller,
  title,
  okType,
  okText,
  cancelText,
  render,
  children,
  ...props
}: FormikModalProps<Values>) {
  const renderer = render || children
  return (
    <Formik
      key={controller.key}
      render={formikProps => (
        <Modal
          title={title}
          visible={controller.visible}
          onCancel={controller.close}
          onOk={() => {
            formikProps.submitForm()
          }}
          okText={okText}
          okType={okType}
          cancelText={cancelText}
        >
          {
            typeof renderer === 'function'
              ? renderer(formikProps)
              : renderer
          }
        </Modal>
      )}
      {...props}
    />
  )
}
