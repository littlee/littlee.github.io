import './index.css'
import React from 'react'

class PageTitle extends React.Component {
  render() {
    return (
      <div className="page-title">
        {this.props.title || '华发集团'}
      </div>
      )
  }
}

export default PageTitle