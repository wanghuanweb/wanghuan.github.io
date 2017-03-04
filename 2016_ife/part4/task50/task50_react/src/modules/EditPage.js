import React from 'react'
import ReactDOM from 'react'

/**
 * [Edit component] 问卷编辑页 03-1
 */
var Edit = React.createClass({
    getInitialState:function(){
        return {
            value:"这里是标题",
            display:false,
            data:[],
            questType:"单选题",
            www:"<dd>单选一</dd><dd>单选二</dd>",
        }
    },
    handleClick:function(){
        this.setState({display:!this.state.display})
    },
    handleChange:function(event){
        this.setState({value:event.target.value})
    },
    makeChoice:function(event){
        if(event.target.innerHTML == "单选"){
            this.setState({questType:"单选题"});
        }else if(event.target.innerHTML == "多选"){
            this.setState({questType:"多选题"});
        }else{
            this.setState({questType:"文本题"});
        }
    },
    render:function(){
        var questIndex,moveUp,moveDown,copy,dele,choiceType;
        var value = this.state.value,isShow="";
        if(this.state.display){
            isShow = "show";
        }else{
            isShow = "hide";
        }

        if(this.state.questType=="单选题"){
            choiceType = this.state.www;
        }else if(this.state.questType=="多选题"){
            choiceType = "<dd>选项一</dd><dd>选项二</dd><dd>选项三</dd><dd>选项四</dd>"
        }else if(this.state.questType=="文本题"){
            choiceType = "<dd><textarea></textarea></dd>";
        }else{
            return;
        }

        return (
            <div className="edit">
                <div className="edit-header">
                    <input type="text" value={value} onChange={this.handleChange}/>
                </div>
                <div className="edit-qbox">
                    <span>{questIndex}</span>
                    <dl>
                        <dt>{this.state.questType}</dt>
                        <dd>{choiceType}</dd>
                    </dl>
                    <div>
                        <span>{moveUp}</span>
                        <span>{moveDown}</span>
                        <span>{copy}</span>
                        <span>{dele}</span>
                    </div>
                </div>
                <div className="edit-body">
                    <ul className={isShow}>
                        <li onClick={this.makeChoice}><img src="../src/imgs/radio-16.png" alt="q-icon"/><span>单选</span></li>
                        <li onClick={this.makeChoice}><img src="../src/imgs/check-16.png" alt="q-icon"/><span>多选</span></li>
                        <li onClick={this.makeChoice}><img src="../src/imgs/text-16.png" alt="q-icon"/><span>文本题</span></li>
                    </ul>
                    <span onClick={this.handleClick}>+ 添加问题</span>
                </div>
                <div className="edit-footer">
                    <div>
                        <span>问卷截至日期</span>
                        <input type="text" />
                    </div>
                    <div>
                        <input type="button" value="保存问卷"/>
                        <input type="button" value="发布问卷"/>
                    </div>
                </div>
            </div>
        )
    }
})
module.exports = Edit;