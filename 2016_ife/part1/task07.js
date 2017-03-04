var Province_City = {
    '湖南省': ["长沙市", "株洲市", "湘潭市", "衡阳市", "邵阳市", "岳阳市", "张家界市", "益阳市", "常德市", "娄底市", "郴州市", "永州市", "怀化市", "湘西土家族苗族自治州"],
    '湖北省': ["武汉市", "黄石市", "十堰市", "宜昌市", "襄阳市", "鄂州市", "荆门市", "孝感市", "荆州市", "黄冈市", "咸宁市", "随州市", "仙桃市", "恩施土家族苗族自治州", "潜江市", "天门市", "神农架林区"],
    '香港特别行政区': ["香港岛", "九龙", "新界"],
}

function choosePro() {
    var pSel = document.getElementById("province").value;
    var city = document.getElementById("city");
    city.options.length = 0;
    for (var x in Province_City) {
        if (x === pSel) {
            var cityLen = Province_City[x].length;
            for (var i = 0; i < cityLen; i++) {
                var temp = new Option(Province_City[x][i], Province_City[x][i]);
                city.options.add(temp);
            }
        }
    }
}

/****************************************************************Mini-Menu****************************************************************/
var mini_menu = document.getElementById('mini-menu');
var lis = mini_menu.getElementsByTagName("li");

mini_menu.addEventListener("mousemove", function() {
    for (var i = 0; i < lis.length; i++) {
        lis[i].style.right = "0";
        mini_menu.style.height = "160px";
    }
}, false)
mini_menu.addEventListener("mouseout", function() {
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.right = "-99px";
            mini_menu.style.height = "0";
        }
    }, false)
    /**********************************国家筛选项，PASS******************************************
    *********************************************************************************************
    var Country_List = {
        "中国":Province_City,
        "美国":F_Province_City,
    };

    var F_Province_City = {
        '新英格兰地区':["缅因州","新罕布什尔州","佛蒙特州","等等"],
        '中大西洋地区':["纽约州","宾夕法尼亚州","新泽西州","等等"],
        '等等':["等等","等等","等等"],
    }

    //简单获取国家列表的个数
    function getCountryNumb(obj){
        var n =0;
        for(var x in obj){
            n++;
        }
        return n;
    }
    var q = JSON.stringify(F_Province_City);
    console.log(q)
    function chooseCon(){
        var cSel = document.getElementById("country").value;
        var province = document.getElementById("province");
        province.options.length = 0 ;
        city.options.length = 0 ;
        for(var x in Country_List){
            if(x === cSel){
                var n = getCountryNumb(Country_List[x]);
                console.log(n)
                for(var i=0;i<n;i++){
                    console.log(Country_List[x],i)
                    var temp = new Option(Country_List[x],Country_List[x]);
                    province.options.add(temp);
                }
            }
        }
    }
    *******************************************************************************
    *******************************************************************************/
