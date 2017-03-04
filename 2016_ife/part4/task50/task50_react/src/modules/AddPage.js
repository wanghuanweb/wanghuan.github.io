import React from 'react'
import { Link } from 'react-router'
/**
 * [Add component] 新建问卷页 02-1
 */
var Add = React.createClass({
    render:function(){
        return (
            <div className="add">
                <div className="add-icon"><img src="../src/imgs/add-32.png" alt="add"/></div>
                <Link to="EditPage">新建问卷</Link>
            </div>
        )
    }
});
module.exports = Add;