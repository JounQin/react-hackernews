(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{19:function(e,t,n){"use strict";(function(e){n.d(t,"a",function(){return u}),n.d(t,"b",function(){return a}),n.d(t,"c",function(){return f}),n.d(t,"d",function(){return l});var r=n(38),o=!!e.env.DEBUG_API,c=Object(r.a)({version:"/v0",config:{databaseURL:"https://hacker-news.firebaseio.com"}});function i(e){o&&console.log("fetching ".concat(e,"..."));var t=c.cachedItems;return t&&t.has(e)?(o&&console.log("cache hit for ".concat(e,".")),Promise.resolve(t.get(e))):new Promise(function(n,r){c.child(e).once("value",function(r){var c=r.val();c&&(c.__lastUpdated=Date.now()),t&&t.set(e,c),o&&console.log("fetched ".concat(e,".")),n(c)},r)})}function u(e){return c.cachedIds&&c.cachedIds[e]?Promise.resolve(c.cachedIds[e]):i("".concat(e,"stories"))}function a(e){return Promise.all(e.map(function(e){return function(e){return i("item/".concat(e))}(e)}))}function f(e){return i("user/".concat(e))}function l(e,t){var n=!0,r=c.child("".concat(e,"stories")),o=function(e){n?n=!1:t(e.val())};return r.on("value",o),function(){r.off("value",o)}}c.onServer&&function e(){a((c.cachedIds.top||[]).slice(0,30));setTimeout(e,9e5)}()}).call(this,n(31))},22:function(e,t,n){"use strict";var r={};n.r(r),n.d(r,"loading",function(){return v}),n.d(r,"activeType",function(){return y}),n.d(r,"itemsPerPage",function(){return g}),n.d(r,"items",function(){return O}),n.d(r,"users",function(){return w}),n.d(r,"lists",function(){return j});var o=n(7),c=n(20),i=n(30),u=n(10),a=n(36),f="SET_LOADING",l="SET_ACTIVE_TYPE",s="SET_LIST",p="SET_ITEMS",d="SET_USER";function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(n,!0).forEach(function(t){m(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case f:return t.loading;default:return e}},y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case l:return t.activeType;default:return e}},g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:20;return e},O=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case p:return b({},e,{},t.items.reduce(function(e,t){return t&&(e[t.id]=t),e},{}));default:return e}},w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case d:return b({},e,m({},t.id,t.user||!1));default:return e}},j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{top:[],new:[],show:[],ask:[],job:[]},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case s:return b({},e,m({},t.listType,t.ids));default:return e}},E=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=e.activeType,r=e.itemsPerPage,o=e.lists;if(!n)return[];var c=(t-1)*r,i=t*r;return o[n].slice(c,i)},P=function(e,t){return E(e,t).map(function(t){return e.items[t]}).filter(function(e){return e})},_=n(19),T=function(e){return{type:f,loading:e}},S=function(e,t){return{type:s,listType:e,ids:t}},k=function(e,t){return function(n){return n({type:l,activeType:e}),Object(_.a)(e).then(function(t){return n(S(e,t))}).then(function(){return n(D(t))})}},I=function(e){return function(t,n){var r=Date.now(),o=n();return(e=e.filter(function(e){var t=o.items[e];return!t||r-t.__lastUpdated>18e4})).length?Object(_.b)(e).then(function(e){return t(function(e){return{type:p,items:e}}(e))}):Promise.resolve()}},D=function(e){return function(t,n){return t(I(E(n(),e)))}},x=function(e){return function(t,n){return n().users[e]?Promise.resolve():Object(_.c)(e).then(function(n){return t(function(e,t){return{type:d,id:e,user:t}}(e,n))})}};function N(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function A(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"g",function(){return C}),n.d(t,"i",function(){return T}),n.d(t,"h",function(){return S}),n.d(t,"e",function(){return k}),n.d(t,"d",function(){return I}),n.d(t,"c",function(){return D}),n.d(t,"f",function(){return x}),n.d(t,"a",function(){return P});var C=Object(o.a)(),L=u.d;t.b=function(e){return Object(u.e)(Object(u.c)(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?N(n,!0).forEach(function(t){A(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):N(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({router:Object(c.b)(C)},r)),e,L(Object(u.a)(Object(i.a)(C),a.a)))}},38:function(e,t,n){"use strict";n.d(t,"a",function(){return c});var r=n(28),o=n.n(r);n(51);function c(e){var t=e.config,n=e.version;return o.a.initializeApp(t),o.a.database().ref(n)}},41:function(e,t,n){e.exports=n(54)},53:function(e,t,n){},54:function(e,t,n){"use strict";n.r(t);var r,o=n(0),c=n.n(o),i=n(12),u=n(13),a=n(18),f=n.n(a),l=n(20),s=n(22),p=n(59),d=n(3),h=n(40),b=n(21),m=n(60),v=n(58);n(53);function y(e){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function g(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function O(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function w(e,t,n){return t&&O(e.prototype,t),n&&O(e,n),e}function j(e,t){return!t||"object"!==y(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function E(e){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function P(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var T=function(e){return f()({loader:e,loading:function(){return null}})},S=function(e){return T(function(){return n.e(3).then(n.bind(null,84)).then(function(t){return t.default(e)})})},k=function(){return c.a.createElement(d.a,{to:"/top"})};k.preload=function(e){return e.context.url="/top"};var I=[{path:"/",exact:!0,component:k},{path:"/top/:page(\\d+)?",component:S("top")},{path:"/new/:page(\\d+)?",component:S("new")},{path:"/show/:page(\\d+)?",component:S("show")},{path:"/ask/:page(\\d+)?",component:S("ask")},{path:"/job/:page(\\d+)?",component:S("job")},{path:"/item/:id(\\d+)",component:T(function(){return n.e(4).then(n.bind(null,85))})},{path:"/user/:id",component:T(function(){return n.e(5).then(n.bind(null,83))})},{path:"*",component:function(e){function t(e,n){var r;return g(this,t),(r=j(this,E(t).call(this,e,n))).props.staticContext&&(r.props.staticContext.code=404),r}return P(t,c.a.PureComponent),w(t,[{key:"render",value:function(){return"Custom 404 Page, will you implement it?"}}]),t}()}],D={entering:{opacity:0},entered:{opacity:1}},x=Object(d.g)(r=function(e){function t(){return g(this,t),j(this,E(t).apply(this,arguments))}return P(t,c.a.PureComponent),w(t,[{key:"render",value:function(){var e=this.props.location;return c.a.createElement(c.a.Fragment,null,c.a.createElement("header",{className:"header"},c.a.createElement("div",{className:"header-content"},c.a.createElement(b.b,{to:"/",exact:!0},c.a.createElement("img",{className:"logo",src:"/public/logo.svg",alt:"React Logo"})),c.a.createElement("nav",{className:"inner"},["top","new","show","ask","job"].map(function(e){return c.a.createElement(b.b,{key:e,to:"/".concat(e)},Object(p.a)(e))})),c.a.createElement("a",{className:"github",href:"https://github.com/JounQin/react-hackernews",target:"_blank",rel:"noopener noreferrer"},"Built with React.js",c.a.createElement("img",{src:"/public/external.svg"})))),c.a.createElement(m.a,{component:o.Fragment},c.a.createElement(v.a,{timeout:200,key:e.pathname.split("/")[1],mountOnEnter:!0,unmountOnExit:!0},function(t){return c.a.createElement("div",{className:"view",style:D[t]},Object(h.a)(I,null,{location:e}))})))}}]),t}())||r,N=Object(s.b)(window.__INITIAL_STATE__);delete window.__INITIAL_STATE__;var A;A=c.a.createElement(u.a,{store:N},c.a.createElement(l.a,{history:s.g},c.a.createElement(x,null))),f.a.preloadReady().then(function(){return Object(i.hydrate)(A,document.getElementById("app"))}),("https:"===location.protocol||["127.0.0.1","localhost"].includes(location.hostname))&&navigator.serviceWorker&&navigator.serviceWorker.register("/service-worker.js")}},[[41,1,2]]]);