import './index.css'
import React from 'react'
import req from 'superagent'

function authUrl(redirectUri) {
  return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2490bd5101f5229e&redirect_uri=' + encodeURIComponent(redirectUri) +'&response_type=code&scope=snsapi_base#wechat_redirect'
}

class ShareModal extends React.Component {
  componentDidMount() {
    // this._wx()
  }

  render() {
    if (this.props.modalOpen) {
      return (<div className="share-modal" onClick={this.props.closeModal}/>)
    }
    return null
  }

  _wx = () => {
    // var url = window.location.origin + window.location.pathname
    var url = window.location.href.replace(window.location.hash, '')
    req
      .get(window.__API_DOMAIN__ + '/q/genSignature')
      .query({
        timestamp: 1423535235,
        nonceStr: 'gofuckyourself',
        url: url
      })
      .end(function(err, res) {
        if (err) {
          return err
        }

        window.wx.config({
          // debug: true,
          appId: 'wx2490bd5101f5229e',
          timestamp: 1423535235,
          nonceStr: 'gofuckyourself',
          signature: res.text,
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
        })

        window.wx.ready(function(){
          window.wx.onMenuShareTimeline({
            title: '华发集团元旦晚会',
            link: authUrl(url),
            imgUrl: window.location.origin + '/wx.jpg',
            success: function () {},
            cancel: function () {}
          })

          window.wx.onMenuShareAppMessage({
            title: '华发集团元旦晚会',
            desc: '华发集团元旦晚会',
            link: authUrl(url),
            imgUrl: window.location.origin + '/wx.jpg',
            type: 'link',
            success: function () {},
            cancel: function () {}
          });
        })
      })
  }

}

export default ShareModal