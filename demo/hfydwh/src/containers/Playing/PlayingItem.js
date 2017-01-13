import React from 'react'
import req from 'superagent'
import classNames from 'classnames'
import { hashHistory } from 'react-router'

import iconShare from '../../images/icon_share_m.svg'
import iconLike from '../../images/icon_like_m.svg'
import iconList from '../../images/icon_list_m.svg'
import company from '../../images/company.svg'

// import iconEd from '../../images/icon_ed_m.png'
// import iconIng from '../../images/icon_ing_m.png'
// import iconSoon from '../../images/icon_soon_m.png'

class PlayingItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showEffect: false,
      isLiked: this.props.isLiked
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isLiked: nextProps.isLiked
    })
  }

  render() {
    return (
      <div className="playing-item">
        <div className="playing-item-num">
          {this.props.number}
        </div>
        <div className="playing-item-title">
          {this.props.title}
        </div>
        <div className="playing-item-img">
          <img src={this.props.img || '/show.jpg'} alt="show" width="100%"/>
        </div>
        <div className={
          classNames({
            'playing-item-performer': true,
            'playing-item-played': this.props.status === 3,
            'playing-item-playing': this.props.status === 2,
            'playing-item-playsoon': this.props.status === 1
          })}>
          <img src={company} role="presentation" width="16" height="16" className="playing-item-performer-logo"/>
          {this.props.performer}
        </div>

        <div className="playing-btns">
          <div className="playing-btn" onClick={this.props.clickShare}>
            <div className="playing-btn-icon">
              <img src={iconShare} role="presentation" className="playing-btn-icon-share" />
            </div>
            <div className="playing-btn-text">
              {'分 享'}
            </div>
          </div>
          <div className="playing-btn" onClick={this._clickLike}>
            <div className="playing-btn-icon">
              <img src={iconLike} role="presentation" className="playing-btn-icon-like" />
            </div>
            <div className="playing-btn-text">
              { this.state.isLiked ? '已点赞':'点 赞'}
            </div>
            {
              this.state.showEffect ?
              <div className="playing-btn-effect" onAnimationEnd={this._endOfEffect}>
                <img src={iconLike} role="presentation"/>
              </div> : null
            }
          </div>
          <div className="playing-btn" onClick={() => {
            hashHistory.goBack()
          }}>
            <div className="playing-btn-icon">
              <img src={iconList} role="presentation" className="playing-btn-icon-list" />
            </div>
            <div className="playing-btn-text">
              节目单
            </div>
          </div>
        </div>
      </div>
      )
  }

  
  _clickLike = () => {
    function canClickLike(currentShowId, id) {
      return currentShowId - id <= 4 && currentShowId - id >= 0
    }

    if (this.state.isLiked) {
      return false
    }

    if (!canClickLike(this.props.currentShowId, this.props.showId)) {
      this.props.openAlert('该节目不能点赞')
      return false
    }

    // var token = localStorage.getItem('wx_token')
    // req
    //   .get(window.__API_DOMAIN__ + '/q/likeShow')
    //   .query({
    //     token: token,
    //     showId: this.props.showId
    //   })
    //   .end((err, res) => {
    //     if (err) {
    //       return err
    //     }

    //     if (res.body.status === 'over5') {
    //       this.props.openAlert('最多只能为 5 个节目点赞')
    //       return
    //     }

    //     if (res.body.status === 'liked') {
    //       this.props.openAlert('您已为该节目点赞过一次')
    //       return
    //     }

    //     this.setState({
    //       showEffect: true,
    //       isLiked: true
    //     })
    //   })

    this.setState({
      showEffect: true,
      isLiked: true
    })
  }

  _endOfEffect = () => {
    this.setState({
      showEffect: false
    })
  }
}

export default PlayingItem