import React, { FunctionComponent } from 'react'
import Team from './misc/team.png'
import { Row, Col } from 'antd';
import './LandingPage.css'
import { LinkButton } from 'components';
import { useTranslation } from 'react-i18next';

export const LandingPage: FunctionComponent = () => {
  const { t } = useTranslation()
  return (
    <div className='LandingPage'>
      <Row gutter={10} className='center'>
        <Col span={12} xs={20} sm={12} md={12} lg={12} className='Welcome'>
          <h2>{t('LandingPage.title')}</h2>
          <p>{t('LandingPage.text')}</p>
          <p><strong>{t('LandingPage.alpha')}</strong></p>
          <LinkButton to='/user/login' className='LandingPage__button'>
            Get Started
          </LinkButton>
        </Col>
        <Col span={12} xs={4} sm={12} md={12} lg={12} className='Illustration'>
          <img src={Team} width='450' height='400' />
        </Col>
      </Row>
    </div>
  )
}
