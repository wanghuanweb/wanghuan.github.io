import React from 'react'
import { Link } from 'react-router'
/**
 * [Detail component] 01-3
 */
var Detail = React.createClass({
    render:function(){
        return (
            <div className="datail">
                <div className="detail-header">
                    <Link to="/"><span className="detail-header-wrap"><img src="../src/imgs/back-16.png" alt="back"/>返回</span></Link>
                    <div>
                        <h2>这里是标题</h2>
                        <p>此统计分析只包含完整回收的数据</p>
                    </div>
                </div>
                <div className="detail-boxes">
                    <div className="detail-box">
                        <div>
                            <span>Q1</span>
                            <dl>
                                <dt>单选题</dt>
                                <dd>选项一</dd>
                                <dd>选项二</dd>
                            </dl>
                        </div>
                        <div className="detail-chart">
                            <p>数据占比</p>
                            <div>
                                这里是图标
                            </div>
                        </div>
                    </div>
                    <div className="detail-box">
                        <div>
                            <span>Q2</span>
                            <dl>
                                <dt>多选题</dt>
                                <dd>选项一</dd>
                                <dd>选项二</dd>
                                <dd>选项三</dd>
                                <dd>选项四</dd>
                            </dl>
                        </div>
                        <div className="detail-chart">
                            <p>数据占比</p>
                            <div>
                                这里是图标
                            </div>
                        </div>
                    </div>
                    <div className="detail-box">
                        <div>
                            <span>Q3</span>
                            <dl>
                                <dt>单选题</dt>
                                <dd>选项一</dd>
                                <dd>选项二</dd>
                            </dl>
                        </div>
                        <div className="detail-chart">
                            <p>数据占比</p>
                            <div>
                                这里是图标
                            </div>
                        </div>
                    </div>
                    <div className="detail-box">
                        <div>
                            <span>Q4</span>
                            <dl>
                                <dt>文本题</dt>
                                <dd>选项一</dd>
                                <dd>选项二</dd>
                            </dl>
                        </div>
                        <div className="detail-chart">
                            <p>有效回答占比</p>
                            <div>
                                这里是图标
                            </div>
                        </div>
                    </div>
                </div>
                <Link to="/"><div className="detail-bottom" >
                    <img src="../src/imgs/back-32.png" alt="back"/>
                    <span>返回</span>
                </div></Link>
                
            </div>
        )
    }
})
module.exports = Detail;