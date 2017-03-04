/*不要再去计算平年闰年的方法以及switch语句去计算月份天数了,浪费了Date对象强大的功能!*/

function Calendar(options){
	this.options = options;
	console.log(this.options)
	var date = new Date();
	// 需要使用日历功能的文本框
	this.input = document.querySelector('[data-calendar]');
	//哪一年
	this.year = date.getFullYear();
	//几月
	this.month = date.getMonth()+1;
	//几号
	this.day = date.getDate();
	//星期几
	this.init();
}
Calendar.prototype = {
	init : function(){
		this.initDom();
		this.initProperty();
		this.paint(this.year, this.month)
		this.initEvent();
		// this.bindClick();
	},
	initEvent : function(){

		var self = this;
		//输入框有焦点时弹出日历
		this.input.onfocus = function(){
			document.querySelector("#calendar").style.display = "block";
		}
		document.querySelector("#month").addEventListener("change",function(){
			var calen = document.querySelector("#calendar");
			var yearBox = document.querySelector("#year");
			var yearIndex = yearBox.selectedIndex;
			var yearText = yearBox[yearIndex].text;

			var monthBox = document.querySelector("#month");
			var monthIndex = monthBox.selectedIndex;
			var monthText = monthBox[monthIndex].text;

			var index = this.selectedIndex;//获取选中的索引
			var text = this[index].text;//选中的文本
			
			self.day = this[index].text //把day改为选中的日期

			calen.removeChild(calen.lastChild);
			self.paint(yearText,monthText);

			self.input.value = yearText+"-"+monthText+"-"+text;
		},false)
		document.querySelector("#day").addEventListener("change",function(){
			var calen = document.querySelector("#calendar");
			var yearBox = document.querySelector("#year");
			var yearIndex = yearBox.selectedIndex;
			var yearText = yearBox[yearIndex].text;

			var monthBox = document.querySelector("#month");
			var monthIndex = monthBox.selectedIndex;
			var monthText = monthBox[monthIndex].text;

			var index = this.selectedIndex;//获取选中的索引
			var text = this[index].text;//选中的文本
			
			self.day = this[index].text //把day改为选中的日期

			calen.removeChild(calen.lastChild);
			self.paint(yearText,monthText);

			self.input.value = yearText+"-"+monthText+"-"+text;
			calen.style.display = "none";
		},false)
	},
	// 搁置一会
	// bindClick:function(){
	// 	var self = this;
	// 	var tdUsed = document.getElementsByClassName('used');
	// 	for(var i=0;i<tdUsed.length;i++){
	// 		tdUsed[i].onclick=function(){
	// 			var calen = document.querySelector("#calendar");
	// 			var yearBox = document.querySelector("#year");
	// 			var yearIndex = yearBox.selectedIndex;
	// 			var yearText = yearBox[yearIndex].text;

	// 			var monthBox = document.querySelector("#month");
	// 			var monthIndex = monthBox.selectedIndex;
	// 			var monthText = monthBox[monthIndex].text;

	// 			var text = this;//选中的文本
	// 			var index = this.innerHTML-1;//获取选中的索引

	// 			self.day = this //把day改为选中的日期

	// 			// calen.removeChild(calen.lastChild);
	// 			// self.paint(yearText,monthText);

	// 			self.input.value = yearText+"-"+monthText+"-"+text.innerHTML;
	// 			var dayIndex = document.querySelector("#day").selectedIndex = text.innerHTML;
	// 			document.querySelector("#day")[dayIndex].text = text.innerHTML

	// 			this.className +=' active'
	// 			console.log(self.selectedIndex)
	// 		}
	// 	}
	// },
	initProperty : function(){
		var str = '今日是' + this.year + '/' + this.month + '/' + this.day;
		this.input.placeholder = str;
	},
	initDom : function(){
		var calendar = document.createElement('div');
		calendar.id = 'calendar';
		calendar.className = this.options.calendarClass;
		calendar.style.display = "none";
		var selectBox = document.createElement('div');
		var selectYear = document.createElement('select');
		selectYear.id = 'year';
		for(i = 2017 ; i < 2030 ; i ++){
			var option = document.createElement('option')
			option.value = i;
			option.innerHTML = i;
			selectYear.appendChild(option)
		}
		var selectMonth = document.createElement('select');
		selectMonth.id = 'month';
		// for(var i = this.month ; i < 13 ; i ++){
		for(var i = 1 ; i < 13 ; i ++){
			var option = document.createElement('option')
			option.value = i;
			option.innerHTML = i;
			selectMonth.appendChild(option)
		}

		var selectDay = document.createElement('select');
		selectDay.id = 'day';
		var monthLength = this.getMonthLength();
		// for(var i = this.day ; i < monthLength ; i ++){
		for(var i = 1 ; i < monthLength ; i ++){
			var option = document.createElement('option')
			option.value = i;
			option.innerHTML = i;
			selectDay.appendChild(option)
		}
		
		selectBox.appendChild(selectYear)
		var yearLabel = document.createElement('label');
		yearLabel.innerHTML = '年'
		selectBox.appendChild(yearLabel)

		selectBox.appendChild(selectMonth)
		var monthLabel = document.createElement('label');
		monthLabel.innerHTML = '月'
		selectBox.appendChild(monthLabel)

		selectBox.appendChild(selectDay)
		var dayLabel = document.createElement('label');
		dayLabel.innerHTML = '日'
		selectBox.appendChild(dayLabel)

		calendar.appendChild(selectBox)
		var node = this.input.nextElementSibling;
		document.body.insertBefore(calendar, node)
	},
	paint : function(year, month){
		var calendar = document.querySelector('#calendar');
		var table = document.createElement('table');
		var arr = this.arr;
		var th = document.createElement('tr');
		th.innerHTML = '<th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th>';
		table.appendChild(th);

		var curArrHeight = this.getArrHeight(year,month);
		var monthLength = this.getMonthLength(year,month);
		var firstDay = this.getFirstDay(year,month);
		var preMonthLength = this.getMonthLength(year, month - 1)
		var pre = [];
		for(var i = firstDay ; i > 0 ; i --){
			pre.push(preMonthLength - i)
		}
		
		var cellClass = this.options.cellClass;
		var uesdClass = cellClass + ' ' +this.options.uesdClass;
		var p = 1;
		var q = 1;
		for(var i = 0 ; i < curArrHeight ; i ++){
			var tr = document.createElement('tr')
			for(var j = 0 ; j < 7 ; j ++){
				var td = document.createElement('td')
				if(i == 0){
				//首行
					if(j < firstDay){
						td.innerHTML = pre.shift();
						td.className = cellClass;
					}else{
						td.innerHTML = p++;
						td.className = uesdClass;
						if(td.innerHTML == this.day){
							td.className += ' active'
						}
					}
				}
				else if(i == curArrHeight - 1){
				//末行
					if(p <= monthLength){
						td.innerHTML = p++;
						td.className = uesdClass;
						if(td.innerHTML == this.day){
							td.className += ' active'
						}
					}else{
						td.innerHTML = q++;
						td.className = cellClass;
					}
				}else{
					//其他行
					td.innerHTML = p++;
					td.className = uesdClass;
					if(td.innerHTML == this.day){
						td.className += ' active'
					}
				}
				tr.appendChild(td)
			}
			table.appendChild(tr)
		}
		calendar.appendChild(table)

		// 重新渲染下拉的day框
		var dayLength = document.getElementsByClassName('used').length+1;
		document.querySelector("#day").innerHTML="";
		for(var i = 1 ; i < dayLength ; i ++){
			var option = document.createElement('option')
			option.value = i;
			option.innerHTML = i;
			document.querySelector("#day").appendChild(option)
		}
		
		// console.log(document.querySelector("#year").selectedIndex)
		// if(document.querySelector("#year").selectedIndex != 0){
		// 	// 重新渲染下拉的day框
		// 	document.getElementById('month').innerHTML = "";

		// 	for(var i = 1 ; i < 13 ; i ++){
		// 		var option = document.createElement('option')
		// 		option.value = i;
		// 		option.innerHTML = i;
		// 		document.querySelector("#month").appendChild(option)
		// 	}
		// }
	},
	// 下个月
	nextMonth : function(){
		if(this.month == 12){
			this.year = this.year + 1;
			this.month = 1;
		}else{
			this.month = this.month + 1	
		}
	},
	// 上个月
	lastMonth : function(){
		if(this.month == 1){
			this.year = this.year - 1;
			this.month = 12;
		}else{
			this.month = this.month - 1	
		}
	},
	//根据年月计算当月有几天
	getMonthLength : function(year, month){
		year = year || new Date().getFullYear();
		//这里有个细节:之前用的是下面这一行,当传入的月份为1时,month-1为0,就去获得当前日期了,所以选择了现在这种写法
		// month = month - 1 || new Date().getMonth();
		month = month || new Date().getMonth() + 1;
		//new Date(year, month, 0)会创建上月的最后一天
		return new Date(year, month, 0).getDate();
	},
	//根据年份和月份给出当月1号是星期几
	getFirstDay : function(year, month){
		year = year || new Date().getFullYear();
		month = month || new Date().getMonth() + 1;
		return new Date(year, month - 1, 1).getDay();
	},
	//根据年份和月份给出当月日历呈现的行数
	getArrHeight : function(year, month){
		var monthLength = this.getMonthLength(year, month);
		var firstDay = this.getFirstDay(year, month);
		var arrHeight = Math.ceil((firstDay + monthLength)/7)
		return arrHeight;
	}
}

