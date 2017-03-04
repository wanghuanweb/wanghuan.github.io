//用来组合各部件
import React from 'react'
import { Link } from 'react-router'
import HeaderContent from './HeaderContent'
import Mask from './Mask'

export default React.createClass({
  render() {
    return (
      <div>
        <HeaderContent/>
        <div id="container" className="container">
            {this.props.children}
        </div>
        <Mask/>
      </div>
    )
  }
})
