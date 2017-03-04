//入口文件，渲染Router
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute} from 'react-router'


import ListPage from './modules/ListPage'
import DetailPage from './modules/DetailPage'
import AddPage from './modules/AddPage'
import EditPage from './modules/EditPage'
import App from './modules/App'

require('./styles/main.css')

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={ListPage}/>//默认页面
        <Route path="/ListPage" component={ListPage}/>
        <Route path="/DetailPage" component={DetailPage}/>
        <Route path="/AddPage" component={AddPage}/>
        <Route path="/EditPage" component={EditPage}/>
    </Route>
  </Router>
), document.getElementById('app'))
