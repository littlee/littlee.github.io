import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'

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

class ChartTime extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      started: false,
      time: this.props.time
    }

    this.int = null
  }

  componentDidMount() {
    addClass(document.body, 'body-in-chart-time')
    addClass(document.getElementById('app-d-platform'), 'app-d-platform-shadow')
  }

  componentWillUnmount() {
    if (this.int) {
      clearInterval(this.int)
    }
    removeClass(document.body, 'body-in-chart-time')
    removeClass(document.getElementById('app-d-platform'), 'app-d-platform-shadow')
  }

  render() {
    var onClick = !this.state.started ? this._start : null
    return (
      <div className="chart-time" onClick={onClick}>
        {
          _.range(this.props.time + 1).map((item) => {
            var num = this.props.time - item
            return (<div key={item} className={
              classNames({
                'chart-time-item': true,
                'chart-time-past': this.state.time < num,
                'chart-time-active': this.state.time === num
              })}>{num}</div>)
          })
        }
      </div>
      )
  }

  _start = () => {
    this.setState({
      started: true
    })
    this.int = setInterval(this._tick, 1000)

    this.props.onStart && this.props.onStart()
  }

  _tick = () => {
    if (this.state.time - 1 <= 0) {
      this.setState({
        time: 0
      })
      clearInterval(this.int)
      setTimeout(() => {
        this.props.onTimeUp && this.props.onTimeUp()
      }, 1000)
    }
    else {
      this.setState(function(prevState, props) {
        return {
          time: prevState.time - 1
        }
      })
    }
  }
}

export default ChartTime