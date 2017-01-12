import './index.css'
import React from 'react'
import ChartVote from './ChartVote'
import ChartTime from './ChartTime'

class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 10,
      showTime: true,
      boom: false
    }
  }

  render() {
    return (
      <div className="chart">
        { this.state.showTime ? <h1 className="app-d-title">最受欢迎节目揭晓倒计时</h1> : null }
        {
          this.state.showTime ?
          <div style={{ position: 'relative' }}>
            <ChartTime time={this.state.time} onTimeUp={this._timeUp}/>
          </div>
          :
          <ChartVote />
        }
        
      </div>
      )
  }

  _timeUp = () => {
    this.setState({
      showTime: false
    })
  }
}

export default Chart