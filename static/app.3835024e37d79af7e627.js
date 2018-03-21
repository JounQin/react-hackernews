(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{119:function(t,e,n){"use strict";n.d(e,"a",function(){return i});var r=n(75),o=n.n(r);n(168);function i(t){var e=t.config,n=t.version;return o.a.initializeApp(e),o.a.database().ref(n)}},126:function(t,e,n){"use strict";n.r(e);var r,o=n(0),i=n.n(o),c=n(59),u=n(123),a=n.n(u),f=n(74),l=n(8),s=n(39),p=n(5),d=n(60),h=n(28),m=n(113),b=n(6),y=n(11),v=n(3);n(127);function g(t){return(g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function w(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function O(t,e,n){return e&&_(t.prototype,e),n&&_(t,n),t}function j(t,e){if(e&&("object"===g(e)||"function"==typeof e))return e;if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function E(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var T=function(t){return Object(c.asyncComponent)({resolve:t})},P=function(t){return T(function(){return n.e(2).then(n.bind(null,50)).then(function(e){return e.default(t)})})},S=[{path:"/",exact:!0,component:function(){return i.a.createElement(h.a,{to:"/top"})}},{path:"/top/:page(\\d+)?",component:P("top")},{path:"/new/:page(\\d+)?",component:P("new")},{path:"/show/:page(\\d+)?",component:P("show")},{path:"/ask/:page(\\d+)?",component:P("ask")},{path:"/job/:page(\\d+)?",component:P("job")},{path:"/item/:id(\\d+)",component:T(function(){return n.e(1).then(n.bind(null,49))})},{path:"/user/:id",component:T(function(){return n.e(0).then(n.bind(null,51))})},{path:"*",component:function(t){function e(){return w(this,e),j(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return E(e,i.a.PureComponent),O(e,[{key:"componentWillMount",value:function(){this.props.staticContext&&(this.props.staticContext.code=404)}},{key:"render",value:function(){return"Custom 404 Page, will you implement it?"}}]),e}()}],k={entering:{opacity:0},entered:{opacity:1}},C=Object(b.c)(r=function(t){function e(){return w(this,e),j(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return E(e,i.a.PureComponent),O(e,[{key:"componentDidMount",value:function(){v.b.appMounted=!0}},{key:"render",value:function(){var t=this.props.location;return i.a.createElement(i.a.Fragment,null,i.a.createElement("header",{className:"header"},i.a.createElement("nav",{className:"inner"},i.a.createElement(b.b,{to:"/",exact:!0},i.a.createElement("img",{className:"logo",src:"/public/logo-48.png",alt:"logo"})),["top","new","show","ask","job"].map(function(t){return i.a.createElement(b.b,{key:t,to:"/".concat(t)},Object(d.a)(t))}),i.a.createElement("a",{className:"github",href:"https://github.com/JounQin/react-hackernews",target:"_blank",rel:"noopener noreferrer"},"Built with React.js"))),i.a.createElement(y.TransitionGroup,{component:o.Fragment},i.a.createElement(y.Transition,{timeout:200,key:t.pathname.split("/")[1],mountOnEnter:!0,unmountOnExit:!0},function(e){return i.a.createElement("div",{className:"view",style:k[e]},Object(m.a)(S,null,{location:t}))})))}}]),e}())||r,I=Object(p.b)(window.__INITIAL_STATE__),N=window.ASYNC_COMPONENTS_STATE;delete window.__INITIAL_STATE__,delete window.ASYNC_COMPONENTS_STATE;var A;A=i.a.createElement(c.AsyncComponentProvider,{rehydrateState:N},i.a.createElement(l.a,{store:I},i.a.createElement(s.a,{history:p.g},i.a.createElement(C,null)))),a()(A).then(function(){return Object(f.hydrate)(A,document.getElementById("app"))}),("https:"===location.protocol||["127.0.0.1","localhost"].includes(location.hostname))&&navigator.serviceWorker&&navigator.serviceWorker.register("/service-worker.js")},127:function(t,e){},17:function(t,e,n){"use strict";(function(t){n.d(e,"a",function(){return u}),n.d(e,"b",function(){return a}),n.d(e,"c",function(){return f}),n.d(e,"d",function(){return l});var r=n(119),o=!!t.env.DEBUG_API,i=Object(r.a)({version:"/v0",config:{databaseURL:"https://hacker-news.firebaseio.com"}});function c(t){o&&console.log("fetching ".concat(t,"..."));var e=i.cachedItems;return e&&e.has(t)?(o&&console.log("cache hit for ".concat(t,".")),Promise.resolve(e.get(t))):new Promise(function(n,r){i.child(t).once("value",function(r){var i=r.val();i&&(i.__lastUpdated=Date.now()),e&&e.set(t,i),o&&console.log("fetched ".concat(t,".")),n(i)},r)})}function u(t){return i.cachedIds&&i.cachedIds[t]?Promise.resolve(i.cachedIds[t]):c("".concat(t,"stories"))}function a(t){return Promise.all(t.map(function(t){return function(t){return c("item/".concat(t))}(t)}))}function f(t){return c("user/".concat(t))}function l(t,e){var n=!0,r=i.child("".concat(t,"stories")),o=function(t){n?n=!1:e(t.val())};return r.on("value",o),function(){r.off("value",o)}}i.onServer&&function t(){a((i.cachedIds.top||[]).slice(0,30));setTimeout(t,9e5)}()}).call(this,n(68))},205:function(t,e,n){t.exports=n(126)},3:function(t,e,n){"use strict";var r=n(16),o=n.n(r),i=n(0),c=n.n(i),u=n(28);function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var l=function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=arguments.length>2?arguments[2]:void 0;return"boolean"!=typeof e&&(n=e,e=!0),function(r){var i=function(e){function o(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),function(t,e){if(e&&("object"===a(e)||"function"==typeof e))return e;if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(this,(o.__proto__||Object.getPrototypeOf(o)).apply(this,arguments))}var i,u,l;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(o,c.a.PureComponent),i=o,(u=[{key:"setTitle",value:function(){var t="function"==typeof n?n.call(this,this):n;t&&Promise.resolve(t).then(function(t){t&&(document.title="React Hackernews | ".concat(t))})}},{key:"componentWillMount",value:function(){t.__inject__&&t.__inject__(this.props.staticContext),this.setTitle()}},{key:"render",value:function(){return c.a.createElement(r,this.props)}}])&&f(i.prototype,u),l&&f(i,l),o}();return Object.defineProperty(i,"displayName",{configurable:!0,enumerable:!0,writable:!0,value:"Ssr".concat(r.displayName||r.name||"Component")}),o()(e?Object(u.d)(i):i,r)}};function s(t){var e=t.replace(/^https?:\/\//,"").replace(/\/.*$/,"").split(".").slice(-3);return"www"===e[0]&&e.shift(),e.join(".")}function p(t){var e=Date.now()/1e3-Number(t);return e<3600?d(~~(e/60)," minute"):e<86400?d(~~(e/3600)," hour"):d(~~(e/86400)," day")}function d(t,e){return 1===t?t+e:t+e+"s"}n.d(e,"a",function(){return s}),n.d(e,"c",function(){return p}),n.d(e,"b",function(){return h}),n.d(e,"d",function(){return l});var h={}},5:function(t,e,n){"use strict";var r={};n.d(r,"activeType",function(){return m}),n.d(r,"itemsPerPage",function(){return b}),n.d(r,"items",function(){return y}),n.d(r,"users",function(){return v}),n.d(r,"lists",function(){return g});var o=n(34),i=n(39),c=n(31),u=n(120),a=n.n(u),f="SET_ACTIVE_TYPE",l="SET_LIST",s="SET_ITEMS",p="SET_USER";function d(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function h(){return(h=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}var m=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case f:return e.activeType;default:return t}},b=function(){return arguments.length>0&&void 0!==arguments[0]?arguments[0]:20},y=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1?arguments[1]:void 0;switch(e.type){case s:return h({},t,e.items.reduce(function(t,e){return e&&(t[e.id]=e),t},{}));default:return t}},v=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1?arguments[1]:void 0;switch(e.type){case p:return h({},t,d({},e.id,e.user||!1));default:return t}},g=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{top:[],new:[],show:[],ask:[],job:[]},e=arguments.length>1?arguments[1]:void 0;switch(e.type){case l:return h({},t,d({},e.listType,e.ids));default:return t}},w=n(17),_=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=t.activeType,r=t.itemsPerPage,o=t.lists;if(!n)return[];var i=(e-1)*r,c=e*r;return o[n].slice(i,c)},O=function(t,e){return _(t,e).map(function(e){return t.items[e]}).filter(function(t){return t})},j=function(t){return{type:f,activeType:t}},E=function(t,e){return{type:l,listType:t,ids:e}},T=function(t){return{type:s,items:t}},P=function(t,e){return{type:p,id:t,user:e}},S=function(t,e){return function(n){return n(j(t)),Object(w.a)(t).then(function(e){return n(E(t,e))}).then(function(){return n(C(e))})}},k=function(t){return function(e,n){var r=Date.now(),o=n();return(t=t.filter(function(t){var e=o.items[t];return!e||r-e.__lastUpdated>18e4})).length?Object(w.b)(t).then(function(t){return e(T(t))}):Promise.resolve()}},C=function(t){return function(e,n){return e(k(_(n(),t)))}},I=function(t){return function(e,n){return n().users[t]?Promise.resolve():Object(w.c)(t).then(function(n){return e(P(t,n))})}};function N(){return(N=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}n.d(e,"g",function(){return A}),n.d(e,!1,function(){return j}),n.d(e,"h",function(){return E}),n.d(e,!1,function(){return T}),n.d(e,!1,function(){return P}),n.d(e,"e",function(){return S}),n.d(e,"d",function(){return k}),n.d(e,"c",function(){return C}),n.d(e,"f",function(){return I}),n.d(e,!1,function(){return _}),n.d(e,"a",function(){return O});var A=Object(o.a)(),x=c.d;e.b=function(t){return Object(c.e)(Object(c.c)(N({},r,{router:i.c})),t,x(Object(c.a)(Object(i.b)(A),a.a)))}}},[[205,3,4]]]);