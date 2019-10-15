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
      <h2>{t('LandingPage.title')}</h2>
      <img src={Team} width='450' height='400' />
      <p>{t('LandingPage.text')}</p>
      <p><strong>{t('LandingPage.alpha')}</strong></p>
      <LinkButton to='/user/login' className='LandingPage__button'>
        {t('LandingPage.getStarted')}
      </LinkButton>
    </div>
  )
}
