/*不要再去计算平年闰年的方法以及switch语句去计算月份天数了,浪费了Date对象强大的功能!*/
function Calendar(options) {
    this.options = options;
    console.log(this.options)
    var date = new Date();
    // 需要使用日历功能的文本框
    this.input = document.querySelector(options.dataCalendar);
    //储存时间段的两端
    this.stamp = {"start":"","end":"","status":0};
    //哪一年
    this.year = date.getFullYear();
    //几月
    this.month = date.getMonth() + 1;
    //几号
    this.day = date.getDate();
    //星期几
    this.init();
}
Calendar.prototype = {
    init: function() {
        this.initDom();
        this.initProperty();
        this.paint(this.year, this.month)
        this.initEvent();
    },
    initEvent: function() {
        var self = this;
        //输入框有焦点时弹出日历
        this.input.onfocus = function() {
            document.getElementById(self.options.id).style.display = "block";
        }
        document.getElementById(this.options.year).addEventListener("change", function() {
            
                self.updateMonth(); //默认的月份
                self.day = 1; //改储存着的day默认为1
                self.month = 1;

                var calen = document.getElementById(self.options.id);
                var yearBox = document.getElementById(self.options.year);
                var yearIndex = yearBox.selectedIndex;
                var yearText = yearBox[yearIndex].text;

                var monthBox = document.getElementById(self.options.month);
                var monthIndex = monthBox.selectedIndex;
                var monthText = monthBox[monthIndex].text;

                var index = this.selectedIndex; //获取选中的索引
                var text = this[index].text; //选中的文本

                self.year = this[index].text //把day改为选中的日期

                calen.removeChild(calen.lastChild);
                self.paint(yearText, monthText);

                self.updateDay(); //默认的日

                self.input.value = yearText + "-" + monthText + "-" + self.day;

        }, false)
        document.getElementById(this.options.month).addEventListener("change", function() {
            var calen = document.getElementById(self.options.id);

            var yearBox = document.getElementById(self.options.year);
            var yearIndex = yearBox.selectedIndex;
            var yearText = yearBox[yearIndex].text;

            var monthBox = document.getElementById(self.options.month);
            var monthIndex = monthBox.selectedIndex;
            var monthText = monthBox[monthIndex].text;

            var index = this.selectedIndex; //获取选中的索引
            var text = this[index].text; //选中的文本

            self.month = this[index].text //把day改为选中的日期

            calen.removeChild(calen.lastChild);
            self.paint(yearText, monthText);

            self.input.value = yearText + "-" + monthText + "-" + self.day;

            var date = new Date();
            var nowyear = date.getFullYear();
            //几月
            var nowmonth = date.getMonth() + 1;
            //几号
            var nowday = date.getDate();
            self.updateDay();
            self.day = 1; //改储存着的day默认为1
        }, false)
        document.getElementById(this.options.day).addEventListener("change", function() {
            var calen = document.getElementById(self.options.id);
            var yearBox = document.getElementById(self.options.year);
            var yearIndex = yearBox.selectedIndex;
            var yearText = yearBox[yearIndex].text;

            var monthBox = document.getElementById(self.options.month);
            var monthIndex = monthBox.selectedIndex;
            var monthText = monthBox[monthIndex].text;

            var index = this.selectedIndex; //获取选中的索引
            var text = this[index].text; //选中的文本

            self.day = this[index].text //把day改为选中的日期

            calen.removeChild(calen.lastChild);
            self.paint(yearText, monthText);

            self.input.value = yearText + "-" + monthText + "-" + text;
            // calen.style.display = "none";
        }, false)
        //绑定一下确认按钮
        var self = this;
        document.getElementById("confirmBtn").addEventListener("click",function(){
            if(confirm("确定为所选的时间段吗？")){
                var strYear = self.year;
                var strMonth = self.month;
                var html = strYear+"年"+strMonth+"月"+self.stamp['start']+"日到"+self.stamp['end']+"日";

                document.querySelector(self.options.dataCalendar).value = html;
                document.getElementById(self.options.day)[self.stamp['end']-1].selected = true;
                document.getElementById(self.options.id).style.display = "none";
            }else{
                self.clearClass();
            }
        },false)
    },
    clearClass:function(cuurent){
        var availTd = document.getElementById(this.options.id).getElementsByClassName(this.options.uesdClass);
        this.stamp['start']="";
        this.stamp['end']= "";
        for(var i=0;i<availTd.length;i++){
            availTd[i].className=this.options.uesdClass +" "+this.options.cellClass;
            this.stamp["status"]=0;
        }
    },
    showStamp:function(){
        var availTd = document.getElementById(this.options.id).getElementsByClassName(this.options.uesdClass);
        var i;
        var self =this;

        for(i=0;i<availTd.length;i++){
            availTd[i].onclick = function(){
                if(self.stamp["status"]>=1){
                    self.clearClass(this);
                    return;
                }
                if(document.getElementsByClassName("active")[0]!== undefined){
                    var currentTd = document.getElementsByClassName("active")[0];
                }else{
                    var currentTd = this;
                    this.className ="active "+self.options.uesdClass;
                    return
                }

                if(Number(currentTd.innerHTML)>Number(this.innerHTML)){

                    self.stamp['start'] = Number(this.innerHTML);
                    self.stamp['end'] = Number(currentTd.innerHTML);
                }else if(Number(currentTd.innerHTML)<Number(this.innerHTML)){

                    self.stamp['start'] = Number(currentTd.innerHTML);
                    self.stamp['end'] = Number(this.innerHTML);
                }else{
                    console.log("同一天");
                }

                var startNum = self.stamp['start']-1;
                var endNum = self.stamp['end']-1;

                if(availTd[startNum]!==undefined){
                    for(startNum;startNum<=endNum;startNum++){
                        availTd[startNum].className = 'active '+self.options.uesdClass+" "+self.options.cellClass;
                    }
                }
                

                self.stamp["status"]++;

            }
        }
    },
    initProperty: function() {
        var str = this.year + '-' + this.month + '-' + this.day;
        this.input.value = str;
    },
    initDom: function() {
        var calendar = document.createElement('div');
        calendar.id = this.options.id;
        calendar.className = this.options.calendarClass;
        calendar.style.display = "none";
        var selectBox = document.createElement('div');
        var selectYear = document.createElement('select');
        selectYear.id = this.options.year;
        for (i = this.year; i < 2030; i++) {
            var option = document.createElement('option')
            option.value = i;
            option.innerHTML = i;
            selectYear.appendChild(option)
        }
        var selectMonth = document.createElement('select');
        selectMonth.id = this.options.month;
        for (var i = 1; i < 13; i++) {
            var option = document.createElement('option')
            option.value = i;
            option.innerHTML = i;
            selectMonth.appendChild(option)
        }

        var selectDay = document.createElement('select');
        selectDay.id = this.options.day;
        var monthLength = this.getMonthLength();
        for (var i = 1; i < monthLength+1; i++) {
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
        // var node = this.input.nextElementSibling;
        document.body.appendChild(calendar)

       
    },
    paint: function(year, month) {
        var idid = "#" + this.options.id;
        var calendar = document.querySelector(idid);
        var table = document.createElement('table');
        var arr = this.arr;
        var th = document.createElement('tr');
        th.innerHTML = '<th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th>';
        table.appendChild(th);

        var curArrHeight = this.getArrHeight(year, month);
        var monthLength = this.getMonthLength(year, month);
        var firstDay = this.getFirstDay(year, month);
        var preMonthLength = this.getMonthLength(year, month - 1)
        var pre = [];
        for (var i = firstDay; i > 0; i--) {
            pre.push(preMonthLength - i)
        }

        var cellClass = this.options.cellClass;
        var uesdClass = cellClass + ' ' + this.options.uesdClass;
        var p = 1;
        var q = 1;
        for (var i = 0; i < curArrHeight; i++) {
            var tr = document.createElement('tr')
            for (var j = 0; j < 7; j++) {
                var td = document.createElement('td')
                if (i == 0) {
                    //首行
                    if (j < firstDay) {
                        td.innerHTML = pre.shift();
                        td.className = cellClass;
                    } else {
                        td.innerHTML = p++;
                        td.className = uesdClass;
                        if (td.innerHTML == this.day) {
                            td.className += ' active'
                        }
                    }
                } else if (i == curArrHeight - 1) {
                    //末行
                    if (p <= monthLength) {
                        td.innerHTML = p++;
                        td.className = uesdClass;
                        if (td.innerHTML == this.day) {
                            td.className += ' active'
                        }
                    } else {
                        td.innerHTML = q++;
                        td.className = cellClass;
                    }
                } else {
                    //其他行
                    td.innerHTML = p++;
                    td.className = uesdClass;
                    if (td.innerHTML == this.day) {
                        td.className += ' active'
                    }
                }

                tr.appendChild(td)
            }
            table.appendChild(tr)
        }
        //处理下拉栏
        document.getElementById(this.options.month).options[this.month-1].selected = true;
        document.getElementById(this.options.day).options[this.day-1].selected = true;

        calendar.appendChild(table)

        this.showStamp();
    },
    updateMonth: function() {
        // 重新渲染下拉的month框
        document.getElementById(this.options.month).innerHTML = "";
        for (var i = 1; i < 13; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.innerHTML = i;
            document.getElementById(this.options.month).appendChild(option);
        }
    },
    updateDay: function() {
        // 重新渲染下拉的day框
        var dayLength = document.getElementById(this.options.id).getElementsByClassName('used').length + 1;
        document.getElementById(this.options.day).innerHTML = "";
        for (var i = 1; i < dayLength; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.innerHTML = i;
            document.getElementById(this.options.day).appendChild(option);
        }
    },
    // 下个月
    nextMonth: function() {
        if (this.month == 12) {
            this.year = this.year + 1;
            this.month = 1;
        } else {
            this.month = this.month + 1
        }
    },
    // 上个月
    lastMonth: function() {
        if (this.month == 1) {
            this.year = this.year - 1;
            this.month = 12;
        } else {
            this.month = this.month - 1
        }
    },
    //根据年月计算当月有几天
    getMonthLength: function(year, month) {
        year = year || new Date().getFullYear();
        //这里有个细节:之前用的是下面这一行,当传入的月份为1时,month-1为0,就去获得当前日期了,所以选择了现在这种写法
        // month = month - 1 || new Date().getMonth();
        month = month || new Date().getMonth() + 1;
        //new Date(year, month, 0)会创建上月的最后一天
        return new Date(year, month, 0).getDate();
    },
    //根据年份和月份给出当月1号是星期几
    getFirstDay: function(year, month) {
        year = year || new Date().getFullYear();
        month = month || new Date().getMonth() + 1;
        return new Date(year, month - 1, 1).getDay();
    },
    //根据年份和月份给出当月日历呈现的行数
    getArrHeight: function(year, month) {
        var monthLength = this.getMonthLength(year, month);
        var firstDay = this.getFirstDay(year, month);
        var arrHeight = Math.ceil((firstDay + monthLength) / 7)
        return arrHeight;
    }
}
