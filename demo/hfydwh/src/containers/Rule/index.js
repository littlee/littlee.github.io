import './index.css'
import React from 'react'
import PageTitle from '../../components/PageTitle'
import { hashHistory } from 'react-router'

class Rule extends React.Component {
  render() {
    return (
      <div className="rule">
        <PageTitle title="活动规则"/>
        <div className="rule-content">
          <p>1、进入企业号后点击“节目评选”，可查看节目表以及正在进行的表演节目。</p>
          <p>2、点击页面点赞按钮可为当前节目点赞，仅当前节目和当前节目前4个节目可点赞评选（即同时有五个节目可选择点赞，根据表演节目的推进以此类推）；</p>
          <p>3、节目页面可转发拉票，转发朋友圈号召好友一同为该节目点赞，每人最多可赞5个节目；</p>
          <p>4、晚会结束后由后台提供节目评选结果，获得点赞数最高的前三名节目即为晚会最受欢迎节目，获得组委会奖励；</p>
          <p>5、系统自动识别为3个最受欢迎节目点赞的员工，获得幸运观众大抽奖。</p>
        </div>
        <div className="rule-btns">
          <div className="rule-btn" onClick={() => {
            hashHistory.goBack()
          }}>
            <div className="rule-btn-icon rule-btn-icon-return" />
            <div className="rule-btn-text">
              返&nbsp;回
            </div>
          </div>
        </div>
      </div>
      )
  }
}

export default Rule