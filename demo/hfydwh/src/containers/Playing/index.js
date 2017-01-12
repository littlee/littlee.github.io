import './index.css'
import Loading from '../../components/Loading'
import PlayingItem from './PlayingItem'
import React from 'react'
import req from 'superagent'
import ShareModal from '../../components/ShareModal'
import Alert from '../../components/Alert'
import ReactSwipe from 'react-swipe'
import data from './data.json'

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

class Playing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      modalOpen: false,
      currentShowId: null,
      shows: [],
      showAlert: false,
      alertText: ''
    }
  }

  componentDidMount() {
    addClass(document.body, 'playing-body')
    // var token = localStorage.getItem('wx_token')
    // req
    //   .get(window.__API_DOMAIN__ + '/q/showList')
    //   .query({
    //     token: token
    //   })
    //   .end((err, res) => {
    //     if (err) {
    //       return err
    //     }

    //     this.setState({
    //       loading: false,
    //       ...res.body
    //     })
    //   })
    setTimeout(() => {
      this.setState({
        loading: false,
        ...data
      })
    }, 500)
  }

  componentWillUnmount() {
    removeClass(document.body, 'playing-body')
  }

  render() {
    return (
      <div className="playing">
        {
          !this.state.loading ?
          <ReactSwipe ref="swipe" swipeOptions={{
            startSlide: this.state.currentShowId - 1
          }}>
            {
              this.state.shows.map((item, index) => {
                return (
                  <div key={index}>
                    <PlayingItem
                      clickShare={this._share}
                      currentShowId={this.state.currentShowId}
                      isLiked={item.isLiked}
                      number={index + 1}
                      openAlert={this._openAlert}
                      performer={item.shower}
                      showId={item.showId}
                      status={item.status}
                      title={item.name}
                      img={item.img}/>
                  </div>)
              })
            }
          </ReactSwipe> : <Loading />
        }
        <ShareModal modalOpen={this.state.modalOpen} closeModal={this._closeModal} location={this.props.location}/>
        <Alert isOpen={this.state.showAlert} onRequestClose={this._closeAlert} text={this.state.alertText}/>
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

  _openAlert = (text) => {
    this.setState({
      showAlert: true,
      alertText: text
    })
  }

  _closeAlert = () => {
    this.setState({
      showAlert: false,
      alertText: ''
    })
  }
}

export default Playing