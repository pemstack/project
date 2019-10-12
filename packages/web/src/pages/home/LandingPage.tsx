import React, { FunctionComponent } from 'react'
import Team from './misc/team.png'
import { Row, Col } from 'antd';
import './LandingPage.css'

export const LandingPage: FunctionComponent = () => {
  return (
    <div className='LandingPage'>
      <Row gutter={10} className='center'>
        <Col span={12} xs={20} sm={12} md={12} lg={12} className='Welcome'>
          <h2>Welcome</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
            Quidem facilis atque laboriosam dolorem assumenda perspiciatis dolor qui sunt aliquid.
            Commodi modi neque dolorum quaerat facilis mollitia, natus blanditiis sed dicta?
          </p>
          <button id="myBtn">
            Get Started
          </button>
        </Col>
        <Col span={12} xs={4} sm={12} md={12} lg={12} className='Illustration'>
          <img src={Team} width='450' height='400'/>
        </Col>
        </Row>
    </div>
  )
}
