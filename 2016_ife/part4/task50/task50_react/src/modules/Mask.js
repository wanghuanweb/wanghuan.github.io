import React from 'react'
import ReactDOM from 'react'
/**
 * [Mask component] 01-2
 */
var Mask = React.createClass({
    // getInitialState:function(){//不用state来操控，直接通过控制class来操作
    //     return {
    //         display:false,
    //     }
    // },
    handleClick:function(){
        // this.setState({display: !this.state.display});
        document.getElementById("maskControl").className = "hide";
    },
    render:function(){
        var isShow = "hide";
        // var isShow = ""; 
        // if(this.state.display==true){
        //     isShow = "show";
        // }else{
        //     isShow = "hide";
        // }
        return (
            <div id="maskControl" className={isShow}>
                <div className="mask"></div>
                <div className="alert">
                    <div className="alert-top">
                        <span>提示</span>
                        <span className="close" onClick={this.handleClick} >X</span>
                    </div>
                    <div className="alert-bottom">
                        <p>确认要删除此问卷？</p>
                        <div>
                            <input type="button" value="确定" />
                            <input type="button" value="取消" onClick={this.handleClick}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})
module.exports = Mask;