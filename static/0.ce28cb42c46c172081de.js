(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{19:function(e,t){},51:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return m});var r,o=n(0),a=n.n(o),u=n(8),s=n(5),c=n(3),i=n(19),l=n.n(i);function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var m=Object(u.b)(function(e){return{users:e.users}},function(e,t){return{fetchUser:function(){return e(Object(s.f)(t.match.params.id))}}})(r=Object(c.d)(l.a,!1,function(e){var t=e.props,n=t.users,r=t.match.params.id,o=n[r];return o?r:!1===o?"User Not Found":e.props.fetchUser().then(function(){return e.props.users[r]?r:"User Not Found"})})(r=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(t&&("object"===f(t)||"function"==typeof t))return t;if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}var n,r,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.a.PureComponent),n=t,(r=[{key:"asyncBootstrap",value:function(){return null!=this.user||this.props.fetchUser().then(function(){return!0})}},{key:"componentDidMount",value:function(){this.asyncBootstrap()}},{key:"render",value:function(){var e=this.user;return a.a.createElement("div",{className:"user-view"},e?a.a.createElement(a.a.Fragment,null,a.a.createElement("h1",null,"User : ",e.id),a.a.createElement("ul",{className:"meta"},a.a.createElement("li",null,a.a.createElement("span",{className:"label"},"Created:")," ",Object(c.c)(e.created)," ","ago"),a.a.createElement("li",null,a.a.createElement("span",{className:"label"},"Karma:")," ",e.karma),e.about?a.a.createElement("li",{className:"about",dangerouslySetInnerHTML:{__html:e.about}}):null),a.a.createElement("p",{className:"links"},a.a.createElement("a",{href:"https://news.ycombinator.com/submitted?id="+e.id},"submissions")," ","|",a.a.createElement("a",{href:"https://news.ycombinator.com/threads?id="+e.id},"comments"))):!1===e?a.a.createElement("h1",null,"User not found."):null)}},{key:"user",get:function(){var e=this.props,t=e.match;return e.users[t.params.id]}}])&&p(n.prototype,r),o&&p(n,o),t}())||r)||r}}]);