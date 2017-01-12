import './index.css'
import React from 'react'
import boomImg from '../../images/fw300.png'
import classNames from 'classnames'

class Boom extends React.Component {
  render() {
    return (
      <div className="boom">
        <img src={boomImg} role="presentation" className={classNames({
          'boom-boom': this.props.boom
        })}/>
      </div>
      )
  }
}

export default Boom
