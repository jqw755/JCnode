/**
 * Created by luzd on 17/3/21.
 */
const Utils = {
  checkEmail: function (email) {
    return /^([a-zA-Z0-9-_]*[-_.]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2})?$/.test(email);
  },
  checkMobile: function (mobile) {
    return /^1\d{10}$/.test(mobile);
  },
  subTime: function (str_time) {
    if (str_time < 10) {
      str_time = '0' + str_time;
    }
    return str_time + '';
  },
  isMobile: {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    IOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    QQ: function () {
      return navigator.userAgent.match(/QQ/i);
    },
    WeChat: function () {
      return navigator.userAgent.match(/MicroMessenger/i);
    },
    AlipayChat: function () {
      return navigator.userAgent.match(/AlipayClient/i);
    },
    APP: function () {
      return navigator.userAgent.match(/lecake/i);
    }
  },
  currency: function (price, separate = false) {
    let f = parseFloat(price);
    if (isNaN(f)) {
      return 0;
    }
    f = Math.round(f * 100) / 100;
    let s = f.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    if (separate) {
      return s.split('.');
    }
    return s;
  },
  asyncLoadJS: function (url) {
    let headObj = document.getElementsByTagName('HEAD').item(0);
    let scriptObj = document.createElement("script");
    scriptObj.type = "text/javascript";
    scriptObj.src = url;
    headObj.appendChild(scriptObj);
  },
  formatDate: function (time = Date.now(), fmt = 'yyyy-MM-dd hh:mm:ss') {
    let date = new Date(time);
    let o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  },
  getQuery: function (name, url) {
    let u = arguments[1] || window.location.search,
      reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
      r = u.substr(u.indexOf('\?') + 1).match(reg);
    return r != null ? r[2] : '';
  },
  getHref: function () {
    return location.origin + location.pathname + location.search;
  },
  setTitle: function (title) {
    document.title = title;
    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
      const i = document.createElement('iframe');
      i.src = '/favicon.ico';
      i.style.display = 'none';
      i.onload = function () {
        setTimeout(function () {
          i.remove();
        }, 9);
      };
      document.body.appendChild(i);
    }
  },

  //by --jqw
  formatWatch(v){
    if (v < 10000) {return v}
    return (v / 10000).toFixed(1) + "万";
  },
  // xhrResponse: function(dataS, apiSource, limitC, isConsole){
  //   const successCallback = (res) => {
  //     if (res.data.success === true) {
  //       if (isConsole === true) {
  //         console.log(res);
  //       } else if (isConsole === undefined || isConsole === null) {
  //         isConsole = false;
  //       }
  //       self.rooms = dataS;
  //     }
  //   };
  //   const errorCallback = (res) => {
  //     console.log(res);
  //   };
  //   if (apiSource === undefined || apiSource === null) {
  //     apiSource = '';
  //   }
  //   if (!limitC) {
  //     return limitC = 8;
  //   }
  //   this.$axios.get('/api/' + apiSource + '?limit=' + limitC + '&mdrender=false').then(successCallback).catch(errorCallback);
  // },
};

export default Utils;
