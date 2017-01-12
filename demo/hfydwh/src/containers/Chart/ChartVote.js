import React from 'react'
import Chart from 'chart.js'
import req from 'superagent'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import Fireworks from '../../components/Fireworks'

class ChartVote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showFireworks: false,
      enableClick: false
    }
  }

  componentDidMount() {
    Chart.defaults.global.animation.duration = 10000
    Chart.defaults.global.defaultFontColor = '#ffe6a9'
    Chart.defaults.global.defaultFontSize = 16
    this._getData()
  }

  render() {
    var clickHandler = this.state.enableClick ? this._redirect : null
    return (
      <div className="chart-vote" onClick={clickHandler}>
        { this.state.showFireworks ? <Fireworks duration={10000} onEnd={this._onEnd}/> : null }
        <canvas id="chart-vote-canvas" width="1000" height="300" />
      </div>
      )
  }

  _redirect = () => {
    browserHistory.push({
      pathname: '/d/pop-show'
    })
  }

  _onEnd = () => {
    this.setState({
      enableClick: true
    })
  }

  _getData = () => {
    req
      .get(window.__API_DOMAIN__ + '/q/showListWithCount')
      .end((err, res) => {

        if (err) {
          return err
        }

        var resData = res.body
        this.chart = new Chart(document.getElementById('chart-vote-canvas'), {
          type: 'bar',
          data: {
            labels: resData.map((item) => (item.name)),
            datasets: [{
              label: '点赞',
              data: resData.map((item) => (item.likedCount)),
              backgroundColor: 'rgba(255, 230, 169, 0.8)'
            }]
          },
          options: {
            legend: {
              display: false
            },
            tooltips: {
              displayColors: false
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            },
            animation: {
              onComplete: () => {
                this.setState({
                  showFireworks: true
                })
              }
            }
          }
        })
      })
  }
}

export default ChartVote