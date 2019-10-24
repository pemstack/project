import { Col, Row } from 'antd'
import { LinkButton } from 'components'
import { useBodyClass } from 'hooks'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import './LandingPage.css'
import Team from './misc/team.png'

export const LandingPage: FunctionComponent = () => {
  const { t } = useTranslation()
  useBodyClass('LandingPage')
  return (
    <div className='LandingPage'>
      <Row type='flex' align='middle' justify='center'>
        <Col xs={22} md={12}>
          <h2>{t('LandingPage.title')}</h2>
          <p className='LandingPage__description'>{t('LandingPage.text')}</p>
          <LinkButton
            type='danger'
            size='large'
            to='/user/login'
            className='LandingPage__button'
          >
            {t('LandingPage.getStarted')}
          </LinkButton>
        </Col>
        <Col xs={22} md={10}>
          <div className='LandingPage__img-wrapper'>
            <img className='LandingPage__img' src={Team} />
          </div>
        </Col>
      </Row>
      <Row type='flex' align='middle' justify='center'>
        <Col xs={22} md={12}>
          <p className='LandingPage__alpha'>{t('LandingPage.alpha')}</p>
        </Col>
      </Row>
    </div>
  )
}
