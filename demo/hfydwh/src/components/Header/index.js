import './index.css'
import React from 'react'
import logo from '../../images/logo_m.svg'

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <img src={logo} alt="logo" />
      </div>
      )
  }
}

export default Header