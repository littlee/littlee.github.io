import './index.css'
import React from 'react'
import Modal from 'react-modal'

class Alert extends React.Component {
  render() {
    return (
      <Modal
        contentLabel="alert"
        className="alert"
        overlayClassName="alert-overlay"
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        >
        <div className="alert-body">
          {this.props.text}
        </div>
        <button type="button" className="alert-ok" onClick={this.props.onRequestClose}>好</button>
      </Modal>
      )
  }
}

export default Alert