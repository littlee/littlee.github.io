import './index.css'
import React from 'react'
import { Link } from 'react-router'
import PageTitle from '../../components/PageTitle'
import ShareModal from '../../components/ShareModal'
import data from './data.json'

import iconShare from '../../images/icon_share_m.png'
import iconPlaying from '../../images/icon_playing_m.svg'
import iconRule from '../../images/icon_rule_m.png'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false
    }
  } 

  render() {
    return (
      <div className="home">
        <PageTitle title="节目单"/>
        <table className="home-table">
          <thead>
            <tr>
              <th></th>
              <th>节目名称</th>
              <th>表演单位</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.shower}</td>
                  </tr>
                  )
              })
            }
          </tbody>
        </table>

        <div className="home-btns">
          <div className="home-btn" onClick={this._share}>
            <div className="home-btn-icon">
              <img src={iconShare} role="presentation" className="home-btn-icon-share" style={{
                visibility: this.state.modalOpen ? 'hidden' : 'visible'
              }}/>
            </div>
            <div className="home-btn-text">
              分&nbsp;享
            </div>
          </div>
          <Link to="playing" className="home-btn">
            <div className="home-btn-icon">
              <img src={iconPlaying} role="presentation" className="home-btn-icon-playing" style={{
                visibility: this.state.modalOpen ? 'hidden' : 'visible'
              }}/>
            </div>
            <div className="home-btn-text">
              正在表演
            </div>
          </Link>
          <Link to="rule" className="home-btn">
            <div className="home-btn-icon">
              <img src={iconRule} role="presentation" className="home-btn-icon-rule" style={{
                visibility: this.state.modalOpen ? 'hidden' : 'visible'
              }}/>
            </div>
            <div className="home-btn-text">
              活动规则
            </div>
          </Link>
        </div>

        <ShareModal modalOpen={this.state.modalOpen} closeModal={this._closeModal} location={this.props.location}/>
      </div>
      )
  }

  _share = () => {
    this.setState({
      modalOpen: true
    })
  }

  _closeModal = () => {
    this.setState({
      modalOpen: false
    })
  }
}

export default Home