import React from 'react'
import _ from 'lodash'

function radixRandom(radix) {
  return _.random(-1 * radix, radix)
}

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

class ChartSpark extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      t: 0
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        t: 1
      })
    }, 0)

    addClass(document.body, 'body-in-chart-time')
  }

  componentWillUnmount() {
    removeClass(document.body, 'body-in-chart-time')
  }

  render() {
    var t = this.state.t
    var radix = this.props.translateRadix
    return (
      <div className="chart-spark">
        {
          _.range(250).map((item) => {
            return (
              <span className={'chart-spark-item' + (t ? ' chart-spark-item-fade' : '')} key={item} style={{
                backgroundColor: `rgba(${_.random(0, 255)},${_.random(0, 255)},${_.random(0, 255)}, 1)`,
                width: _.random(10, 50),
                height: _.random(10, 50),
                opacity: _.random(0.5, 1.0),
                WebkitTransitionDelay: _.random(0, 1.5) + 's',
                transitionDelay: _.random(0, 1.5) + 's',
                WebkitTransform: 'translate(' + (radixRandom(radix) * t) + 'px, ' + (radixRandom(radix) * t) + 'px) rotate(' + _.random(0, 90) + 'deg)',
                transform: 'translate(' + (radixRandom(radix) * t) + 'px, ' + (radixRandom(radix) * t) + 'px) rotate(' + _.random(0, 90) + 'deg)'
              }} onAnimationEnd={item === 0 ? this._end : null}/>
              )
          })
        }
      </div>
      )
  }

  _end = () => {
    this.props.onAnimationEnd && this.props.onAnimationEnd()
  }
}

ChartSpark.defaultProps = {
  translateRadix: 1000
}

export default ChartSpark