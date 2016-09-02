function tryuse(){
  window.location.href="/HiServiceCRM/register.jsp";
}

function pageshow(){
  //document.getElementById("serv").src="ind_page.html";
  showpa("in");
}

function  showpa(str){
  var resultp="";
	var len1=0;
	var len2=0;
  var indexstr="";
  switch(str){
    case "in"://首页
	    resultp="ind_page.html";
	    len1="1728";
	    len2="1869";
      indexstr="企业管理云";
      break;
    case "ad"://优势
      resultp="sup_page.html";
      len1="1160";
      len2="1360";
      //len2="1800";
      indexstr="适合您的管理助手";
      break;
    case "tr"://定制
	    resultp="tr_page.html";
	    len1="1600";
	    len2="1800";
      indexstr="轻松体验，快速定制";
      break;
    case "se"://服务
      resultp="serv.html";
      len1="920";
      len2="1120";
      indexstr="您身边的服务";
      break;
    case "su"://安全
	    resultp="se_page.html";
	    len1="1380";
	    len2="1580";
      indexstr="绝密的企业数据保管箱";
      break;
    case "pr"://价格
	    resultp="pri_page.html";
	    len1="465";
	    len2="665";
      indexstr="85元/用户/月";
      break;
    case "fe"://特点
      resultp="fea_page.html";
      len1="1410";
      len2="1610";
      indexstr="企业管理云";
      break;
    default:
      resultp="ind_page.html";
      len1="785";
      len2="1340";
      indexstr="企业管理云";
      break;
  }
  document.getElementById("sym_c").innerHTML=indexstr;
  document.getElementById("service").style.height=len1+"px";
  document.getElementById("foot").style.top=len2+"px";
  document.getElementById("serv").src=resultp;
}
  function SetIframeSize(iframeName)
  {
    try {
        var iframe = document.getElementById(iframeName);
        var bHeight = 0;
        if (isChrome == false && isSafari == false)
            bHeight = iframe.contentWindow.document.body.scrollHeight;

        var dHeight = 0;
        if (isFireFox == true)
            dHeight = iframe.contentWindow.document.documentElement.offsetHeight + 2;
        else if (isIE == false && isOpera == false)
            dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
        else
            bHeight += 3;
        var height = Math.max(bHeight, dHeight);
        //if (height < minHeight) height = minHeight;
        iframe.style.height = height + "px";
    } catch (ex) { }
    // var iframe = document.getElementById(iframeName);
    // try
    // {
    //   var bHeight = iframe.contentWindow.document.body.scrollHeight;
    //   var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
    //   //¾ÝËµÕâÁ½¸ö¸ß¶È¿ÉÄÜ²»Ò»Ñù
    //   var height = Math.min(bHeight, dHeight);
    //   iframe.height = height+60;
    // }catch (ex){}
  }

