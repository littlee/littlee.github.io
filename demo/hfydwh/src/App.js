// import 'animate.css'
import './App.css'
import React from 'react'
import cornerTop from './images/corner_top_m.svg'
import cornerBottom from './images/corner_bottom_m.svg'
import Header from './components/Header'
import req from 'superagent'
import Loading from './components/Loading'

function authUrl(redirectUri) {
  return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2490bd5101f5229e&redirect_uri=' + encodeURIComponent(redirectUri) +'&response_type=code&scope=snsapi_base#wechat_redirect'
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 1500)
  }

  render() {
    return (
      <div className="app">
        <div className="app-content">
          <Header/>
          {this.state.loading ? <Loading/> : this.props.children}
        </div>
        <div className="app-corner-top">
          <img src={cornerTop} role="presentation"/>
        </div>
        <div className="app-corner-bottom">
          <img src={cornerBottom} role="presentation"/>
        </div>
      </div>
      )
  }
}

export default App