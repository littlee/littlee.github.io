import './index.css'
import React from 'react'
import req from 'superagent'

function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}

class LuckyAudi extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    addClass(document.body, 'lucky-audi-body')
    req
      .get(window.__API_DOMAIN__ + '/q/showRewarders')
      .end((err, res) => {
        if (err) {
          return err
        }

        this.setState({
          list: res.body
        })
      })
  }

  componentWillUnmount() {
    removeClass(document.body, 'lucky-audi-body')
  }

  render() {
    return (
      <div className="lucky-audi">
        <h1 className="app-d-title">幸运观众</h1>
        <ul className="lucky-audi-list">
          {
            this.state.list.map((item, index) => {
              return (<li key={index} className="lucky-audi-item">
                <img src={item.avatar} width="75" height="75" alt="avatar"/>
                <span title={item.name}>{item.name}</span>
              </li>)
            })
          }
        </ul>
      </div>
      )
  }
}

export default LuckyAudi