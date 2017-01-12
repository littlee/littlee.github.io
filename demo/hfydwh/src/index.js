window.__API_DOMAIN__ = 'http://showapi.super13.club'


import 'normalize.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// mobile
import App from './App'
import Home from './containers/Home'
import Playing from './containers/Playing'
import Rule from './containers/Rule'
import NotFound from './NotFound'

// desktop
import AppDesktop from './App.Desktop'
import Chart from './containers/Chart'
import LuckyAudi from './containers/LuckyAudi'
import PopShow from './containers/PopShow'

// demo
import Demo from './containers/Demo'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/demo" component={Demo} />
    <Route path="/d" component={AppDesktop}>
      <IndexRoute component={Chart} />
      <Route path="lucky-audi" component={LuckyAudi} />
      <Route path="pop-show" component={PopShow} />
    </Route>
    
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="playing" component={Playing} />
      <Route path="rule" component={Rule} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>,
  document.getElementById('root')
)