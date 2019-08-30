import { ErrorLike } from '@pema/utils'
import React, { FunctionComponent } from 'react'
import { Result } from 'antd'
import { ResultStatusType } from 'antd/lib/result'
import { useTranslation } from 'react-i18next'
import { LinkButton } from 'components';

interface DerivedError {
  status: ResultStatusType
  title: string
  message?: string
}

// tslint:disable: triple-equals
// eslint:disable: eqeqeq

function deriveError(
  t: (key: string) => string,
  code?: number,
  error?: ErrorLike
): DerivedError {
  if (typeof code === 'undefined' && error) {
    code = (error as any).statusCode || (error as any).status as number
  }

  if (code == 401 || code == 403) {
    return {
      status: '403',
      title: t('error.403')
    }
  } else if (code == 404) {
    return {
      status: '404',
      title: t('error.404')
    }
  } else if (code == 500) {
    return {
      status: '500',
      title: t('error.general')
    }
  } else {
    return {
      status: 'error',
      title: t('error.general')
    }
  }
}

export interface RouteErrorProps {
  code?: number
  error?: ErrorLike
  backButton?: boolean
}

export const RouteError: FunctionComponent<RouteErrorProps> = ({
  code,
  error,
  backButton = true
}) => {
  const { t } = useTranslation()
  const data = deriveError(t, code, error)
  return (
    <div className='RouteError'>
      <Result
        status={data.status}
        title={data.title}
        subTitle={data.message}
        extra={backButton && (
          <LinkButton type='primary' to='/'>{t('RouteError.back')}</LinkButton>
        )}
      />
    </div>
  )
}
