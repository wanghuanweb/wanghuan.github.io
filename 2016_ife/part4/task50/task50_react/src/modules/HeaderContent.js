import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return  <div className='header'>
                <img src="../src/imgs/log_50x50.png" />
                <h3>问卷管理</h3>
                <Link to="/"><span>我的问卷</span></Link>
            </div>
  }
})
