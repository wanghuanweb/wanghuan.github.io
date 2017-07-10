<!-- 思路：
https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651551218&idx=1&sn=04d735ec778b2e046f1ae7e2f4d20c62&mpshare=1&scene=1&srcid=0708KL4WwwIuGgAB5AuKQyFa&pass_ticket=oLqbrG%2Fa6dX%2B%2BGvdIMmTjc%2FiehbUsQ%2FZrIiJXC0q16mMYjnqbd11D8tYMf88lkPq#rd
https://github.com/keepfool/vue-tutorials/blob/master/02.Components/Part-2/demo/step04.html
1.表格组件，其中使用父组件属性。 'dataList','columns','searchKey。完成基本的删除功能
2.创建模态框，组件-->
<div id="app">
    <div class="container">
        <label>search:</label>
        <input type="text" v-model="search">
    </div>

    <div class="container">
        <simple-grid :data-list="people" :columns="columns" :search-key="search">
        </simple-grid>
    </div>
</div>

<!--  表格组件  -->
<template id="grid-template">
    <table>
        <thead>
            <tr>
                <th v-for="col in columns">
                    {{col.name | capitalize}}
                </th>
                <th>
                    Delete
                </th>
            </tr>
            <tr v-for="(index,entry) in dataList" | filterBy search>
                <td v-for="col in columns">
                    <!-- 遍历列表数据时，使用v-if指令判断当前列是否为主键列，如果是主键列，则给主键列添加链接，然后给链接绑定click事件，click事件用于打开修改数据的对话框。 -->
                    <span v-if="col.isKey"><a href="javascript:void(0)" @click="openEditItemDialog(entry[col.name])">{{entry[col.name]}}</a></span>
					<span v-else>{{entry[col.name]}}</span>
                </td>
                <td>
                    <button type="button" name="button" @click="deleteItem(entry)">delete</button>
                </td>
            </tr>
        </thead>
    </table>
    <!-- 2.调用模态对话框
            title表示对话框的标题内容
            fields表示对话框要显示的数据字段数组
            item用于绑定表单字段，它是一个对象-->
    <!-- 添加一个Create按钮，绑定click事件到openNewItemDiaolog()方法，该方法用于打开modal-dialog组件，并将模式设置为新建模式。
         在<modal-dialog>标签上给sample-grid绑定一个自定义事件create-item，后面在$dispatch派发事件时会用到。 -->
    <div class="container">
        <button type="button" name="button" class="btn" @click="openNewItemDialog('create new item')"></button>
    </div>
    <modal-dialog :mode="mode" :title="title" :fields="columns" :item="item" v-on:create-item="createItem" v-on:update-item="updateItem">
   </modal-dialog>
</template>

<!--  2:创建模态对话框
        模态对话框有两种模式，新建模式和修改模式，分别用于新建一条数据和修改指定的数据。
        由于对话框的内容来源于具体的数据，所以我们可以考虑将对话框作为simple-grid组件的一个子组件。
    ps：由于modal-dialog是一个子组件，它仅用于simple-grid组件的新增或修改模式，所以modal-dialog的template没有使用<slot>元素-->
<template id="dialog-template">
    <div class="dialogs">
        <div class="dialog" v-bind:class="{'dialog-active':show}">
            <div class="dialog-content">
                <header class="dialog-header">
                    <h1 class="dialog-title">{{title}}</h1>
                </header>

                <div class="dialog-body">
                    <div class="form-group" v-for="field in fields">
                        <label>{{field.namae}}</label>
                    </div>
                    <select v-if="field.dataSoruce" v-model="item[field.name]">
                        <option v-for="opt in field.dataSoruce" :value="opt">{{opt}}</option>
                    </select>
                    <input v-else type="text" v-model="item[field.name]" :disabled="mode === 2 && field.isKey">
                </div>
                <footer class="dialog-footer">
                    <div class="form-group">
                        <label></label>
                        <button type="button" name="button" v-on:click="save">save</button>
                        <button type="button" name="button" v-on:click="cancel">cancel</button>
                    </div>
                </footer>
            </div>
        </div>
        <div class="dialog-overlay"></div>
    </div>
</template>

<script>
    Vue.component('simple-grid',{
        // 组件，创建表格
        template:"#grid-template",
        data:function () {
            return{
                mode:0,
                title:'',
                item:{},
                keyColumn: ''
            }
        }
        ready: function() {
			for(var i = 0; i < this.columns.length; i++) {
				if(this.columns[i].isKey) {
					this.keyColumn = this.columns[i]['name']
					break;
				}
			}
		},
        props:['dataList','columns','searchKey'],
        methods:{
            deleteItem:function (entry) {
                var data = this.dataList
                data.forEach(function(item,i){
                    if(item == entry){
                        data.splice(i,1)
                        return
                    }
                })
            }

            openNewItemDialog: function(title) {
				// 对话框的标题
				this.title = title
				// mode = 1表示新建模式
				this.mode = 1
				// 初始化this.item
				this.item = {}
				// 广播事件，showDialog是modal-dialog组件的一个方法，传入参数true表示显示对话框
				this.$broadcast('showDialog', true)
			},
            openEditItemDialog: function(key) {
				// 根据主键查找当前修改的数据
				var currentItem = this.findItemByKey(key)
					// 对话框的标题
				this.title = 'Edit Item - ' + key
					// mode = 2表示修改模式
				this.mode = 2
					// 初始化this.item
				this.item = {}
					// 将选中的数据拷贝到this.item
				this.item = this.initItemForUpdate(currentItem)
					// 广播事件，传入参数true表示显示对话框
				this.$broadcast('showDialog', true)
			},
			// 弹出修改数据的对话框时，使用对象的深拷贝
			initItemForUpdate: function(p) {
				var c = c || {};
				for(var i in p) {
					// 属性i是否为p对象的自有属性
					if(p.hasOwnProperty(i)) {
						if(typeof p[i] === 'object') {
							c[i] = Array.isArray(p[i]) ? [] : {}
							deepCopy(p[i], c[i])
						} else {
							// 属性是基础类型时，直接拷贝
							c[i] = p[i]
						}
					}
				}
				return c;
			},
			findItemByKey: function(key) {
				var keyColumn = this.keyColumn
				for(var i = 0; i < this.dataList.length; i++) {
					if(this.dataList[i][keyColumn] === key) {
						return this.dataList[i]
					}
				}
			},
			createItem: function() {
				// 将item追加到dataList
				this.dataList.push(this.item)
					// 广播事件，传入参数false表示隐藏对话框
				this.$broadcast('showDialog', false)
					// 新建完数据后，重置item对象
				this.item = {}
			},
            updateItem: function() {
				// 获取主键列
				var keyColumn = this.keyColumn
				for(var i = 0; i < this.dataList.length; i++) {
					// 根据主键查找要修改的数据，然后将this.item数据更新到this.dataList[i]
					if(this.dataList[i][keyColumn] === this.item[keyColumn]) {
						for(var j in this.item) {
							this.dataList[i][j] = this.item[j]
						}
						break;
					}
				}
				// 广播事件，传入参数false表示隐藏对话框
				this.$broadcast('showDialog', false)
					// 修改完数据后，重置item对象
				this.item = {}
			},

        }
        // 2:创建模态框，框是在表格组件之内
        data:function(){
            return{

            }
        }
        components:{
            'modal-dialog':{
                template:'#dialog-template',
                data:function(){
                    return {
                        show:false;
                    }
                }
                // :mode="mode" :title="title" :fields="columns" :item="item"
                // mode模式是新建和修改，title是模态框的标题，field表示模态框显示的字段，item是上述组件传下来用于绑定表单字段
                props:['mode','title,'fields,'item']
                methods:{
                    save:function() {
                        //新建模式
						if(this.mode === 1) {
							// 使用$dispatch调用simple-grid的create-item事件
							this.$dispatch('create-item')
						} else if(this.mode === 2) {
							// 使用$dispatch调用simple-grid的update-item事件
							this.$dispatch('update-item')
						}
					},
                    cancel:function() {
                        this.show = false;
                    }
                },
                events:{
                    'showDialog':function () {
                        this.show = show;
                    }
                }
            }

        }
    })
    new Vue({
        el:"#app",
        data:{
            people:[{
                name:'w',
                age:'30',
                sex:'male'
            },{
                name:'ww',
                age:'30',
                sex:'male'
            }.{
                name:'www',
                age:'30',
                sex:'male'
            }],
            columns:[{
                    name:'name'
                    //3.实现数据新建功能：为’name’列追加一个isKey属性，并设置为true，表示该列为主键列。
                    //为’sex’列追加一个dataSoruce属性，并设置为[‘Male’, ‘Female’]，表示新增或修改数据时选择性别的下拉框数据源。
                    isKey:true
                },{
                    name:'age'
                },{
                    name:'sex'
                    dataSource:['male','female']
                }
            ],
            search:''
        }

    })
</script>
