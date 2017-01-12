import './App.Desktop.css'
import React from 'react'
import Logo from './images/logo_m.svg'

class AppDesktop extends React.Component {
  render() {
    return (
      <div className="app-d">
        <div className="app-d-platform-bg" />
        <div id="app-d-platform" className="app-d-platform" />
        <div className="app-d-content">
          <img src={Logo} alt="logo" className="app-d-logo"/>
          {this.props.children}
        </div>
      </div>
      )
  }

}

export default AppDesktop