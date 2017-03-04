import React from 'react'
import { Link } from 'react-router'
/**
 * [List component] 01-1
 */
var List = React.createClass({
    getInitialState:function(){
        return {
            checked:false,
        }
    },
    handleChange:function(){
        this.setState({checked: !this.state.checked});
    },
    handleClick:function(event){
        if(event.target.parentNode.parentNode.className=="checked"){
            event.target.parentNode.parentNode.className="";
        }else{
            event.target.parentNode.parentNode.className="checked";
            isChecked = "checked";
        }
    },
    delete:function(){
        document.getElementById("maskControl").className = "show";
    },
    render:function(){
        var ifChecked = "",
            isChecked = "";
        if(this.state.checked){
            ifChecked = "checked";
            isChecked = "checked";
        }else{
            ifChecked = "";
        }
        return (
            <table className="list-table">
                <thead>
                <tr>
                    <th></th>
                    <th>标题</th>
                    <th>时间</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr className={ifChecked}>
                    <td><input type="checkbox" name="myQN" onChange={this.handleClick} checked={isChecked} /></td>
                    <td>这是我的第一份问卷</td>
                    <td>2016-05-12 11:15:56</td>
                    <td className="pubing">发布中</td>
                    <td>
                        <Link to="/EditPage"><input type="button" value="编辑" /></Link>
                        <input type="button" value="删除" onClick={this.delete}/ >
                        <Link to="/DetailPage"><input type="button" value="查看数据" /></Link>
                    </td>
                </tr>
                <tr className={ifChecked}>
                    <td><input type="checkbox" name="myQN" onChange={this.handleClick} checked={isChecked} /></td>
                    <td>这是我的第二份问卷</td>
                    <td>2016-05-12 11:15:56</td>
                    <td className="unpub">未发布</td>
                    <td>
                        <Link to="/EditPage"><input type="button" value="编辑" /></Link>
                        <input type="button" value="删除" onClick={this.delete}/ >
                        <Link to="/DetailPage"><input type="button" value="查看数据" /></Link>
                    </td>
                </tr>
                <tr className={ifChecked}>
                    <td><input type="checkbox" name="myQN" onChange={this.handleClick} checked={isChecked} /></td>
                    <td>这是我的第二份问卷</td>
                    <td>2016-05-12 11:15:56</td>
                    <td className="pubed">已发布</td>
                    <td>
                        <Link to="/EditPage"><input type="button" value="编辑" /></Link>
                        <input type="button" value="删除" onClick={this.delete}/ >
                        <Link to="/DetailPage"><input type="button" value="查看数据" /></Link>
                    </td>
                </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td><input type="checkbox" id="selectAll" onChange={this.handleChange}/>全选</td>
                        <td><input type="button" value="删除" onClick={this.delete}/></td>
                        <td><Link to="/AddPage"><input type="button" id="addQn" value="+ 新增问卷"/></Link></td>
                    </tr>
                </tfoot>
            </table>
        )
    }
})
module.exports = List;