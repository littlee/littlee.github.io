import './index.css'
import React from 'react'
import req from 'superagent'
import { browserHistory } from 'react-router'

class PopShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    req
      .get(window.__API_DOMAIN__ + '/q/showListTop3')
      .end((err, res) => {
        if (err) {
          return err
        }

        this.setState({
          list: res.body
        })
      })
  }

  render() {
    return (
      <div className="pop-show">
        <h1 className="app-d-title">最受欢迎节目</h1>

        <ul className="pop-show-list" onClick={this._redirect}>
          {
            this.state.list.map((item, index) => {
              return (<li key={index} className="pop-show-item">
                  <img src={item.img || '/show.jpg'} className="pop-show-img" role="presentation"/>
                  <div className="pop-show-name">{item.name}</div>
                  <div className="pop-show-shower">{item.shower}</div>
                </li>)
            })
          }
        </ul>
      </div>
      )
  }

  _redirect = () => {
    browserHistory.push({
      pathname: '/d/lucky-audi'
    })
  }
}

export default PopShow