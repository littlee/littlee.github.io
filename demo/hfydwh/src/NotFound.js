import React from 'react'

class NotFound extends React.Component {
  render() {
    return (
      <div style={{
        textAlign: 'center',
        fontSize: '36px',
        color: 'white'
      }} onClick={() => {
        localStorage.removeItem('wx_token')
        alert('token removed')
      }}>
        404
      </div>
      )
  }
}

export default NotFound