(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{100:function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),a=n(26),i=n(55),s=n(86),c=n(25),u=n(92),l=n.n(u);function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var b,v=Object(c.d)(l.a)(Object(a.b)(function(e){return{comments:e.items}})(function(e){function t(){var e,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return y(h(h(n=function(e,t){return!t||"object"!==m(t)&&"function"!=typeof t?h(e):t}(this,(e=p(t)).call.apply(e,[this].concat(o))))),"displayName","Comment"),y(h(h(n)),"state",{open:!0}),y(h(h(n)),"pluralize",function(e){return e+(1===e?" reply":" replies")}),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(t,o.a.PureComponent),function(e,t,n){t&&f(e.prototype,t),n&&f(e,n)}(t,[{key:"render",value:function(){var e=this,t=this.state.open,n=this.props,r=n.comments[n.id];return r?o.a.createElement("li",{className:"comment"},o.a.createElement("div",{className:"by"},r.by?o.a.createElement(i.a,{to:"/user/"+r.by},r.by):null," "+Object(c.c)(r.time)," ago"),o.a.createElement("div",{className:"text",dangerouslySetInnerHTML:{__html:r.text||"<del>[Deleted]</del>"}}),r.kids&&r.kids.length?o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"toggle"+(t?" open":"")},o.a.createElement("a",{onClick:function(){return e.setState({open:!t})}},t?"[-]":"[+] "+this.pluralize(r.kids.length)+" collapsed")),o.a.createElement("ul",{className:"comment-children",style:{display:t?"block":"none"}},r.kids.map(function(e){return o.a.createElement(v,{key:e,id:e})}))):null):null}}]),t}())),g=v,w=n(19),k=n(90),x=n.n(k);function j(e){return(j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function E(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function O(e){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function N(e,t){return(N=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function S(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}n.d(t,"default",function(){return C});var C=Object(a.b)(function(e){return{items:e.items}},function(e){return{fetchItems:function(t){return e(Object(w.d)(t))}}})(b=Object(c.d)(x.a,!1,function(e){var t=e.props,n=t.items,r=t.match.params.id;return n[r]&&n[r].title})(b=function(e){function t(){var e,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return function(e,t,n){t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}(S(S(n=function(e,t){return!t||"object"!==j(t)&&"function"!=typeof t?S(e):t}(this,(e=O(t)).call.apply(e,[this].concat(o))))),"state",{loading:!1}),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&N(e,t)}(t,o.a.PureComponent),function(e,t,n){t&&E(e.prototype,t),n&&E(e,n)}(t,[{key:"bootstrap",value:function(){var e=this.props.match.params.id;return!!this.props.items[e]||this.props.fetchItems([e]).then(function(){return!0})}},{key:"fetchItems",value:function(){var e=this,t=this.item;t&&t.kids&&(this.setState({loading:!0}),this.fetchComments(t).then(function(){return e.setState({loading:!1})}))}},{key:"fetchComments",value:function(e){var t=this;if(e&&e.kids)return this.props.fetchItems(e.kids).then(function(){return Promise.all(e.kids.map(function(e){return t.fetchComments(t.props.items[e])}))})}},{key:"componentDidMount",value:function(){this.fetchItems()}},{key:"render",value:function(){var e=this.state.loading,t=this.item;return t?o.a.createElement("div",{className:"item-view"},o.a.createElement("div",{className:"item-view-header"},o.a.createElement("a",{href:t.url,target:"_blank",rel:"noopener noreferrer"},o.a.createElement("h1",null,t.title)),t.url?o.a.createElement("span",{className:"host"},"(",Object(c.a)(t.url),")"):null,o.a.createElement("p",{className:"meta"},t.score," points | by"," ",o.a.createElement(i.a,{to:"/user/"+t.by},t.by)," "+Object(c.c)(t.time)," ago")),o.a.createElement("div",{className:"item-view-comments"},o.a.createElement("p",{className:"item-view-comments-header"},t.kids?t.descendants+" comments":"No comments yet.",o.a.createElement(s.a,{show:e})),e||!t.kids?null:o.a.createElement("ul",{className:"comment-children"},t.kids.map(function(e){return o.a.createElement(g,{key:e,id:e})})))):null}},{key:"item",get:function(){return this.props.items[this.props.match.params.id]}}]),t}())||b)||b},81:function(e,t,n){var r="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!r)throw new Error("react-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var o=n(83),a={},i=r&&(document.head||document.getElementsByTagName("head")[0]),s=null,c=0,u=!1,l=function(){},m=null,f="data-react-ssr-id",p="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function d(e){for(var t=0;t<e.length;t++){var n=e[t],r=a[n.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](n.parts[o]);for(;o<n.parts.length;o++)r.parts.push(y(n.parts[o]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{var i=[];for(o=0;o<n.parts.length;o++)i.push(y(n.parts[o]));a[n.id]={id:n.id,refs:1,parts:i}}}}function h(){var e=document.createElement("style");return e.type="text/css",i.appendChild(e),e}function y(e){var t,n,r=document.querySelector("style["+f+'~="'+e.id+'"]');if(r){if(u)return l;r.parentNode.removeChild(r)}if(p){var o=c++;r=s||(s=h()),t=v.bind(null,r,o,!1),n=v.bind(null,r,o,!0)}else r=h(),t=function(e,t){var n=t.css,r=t.media,o=t.sourceMap;r&&e.setAttribute("media",r);m.ssrId&&e.setAttribute(ssridKey,t.id);o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,r),n=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else n()}}e.exports=function(e,t,n,r){u=n,m=r||{};var i=o(e,t);return d(i),function(t){for(var n=[],r=0;r<i.length;r++){var s=i[r];(c=a[s.id]).refs--,n.push(c)}t?d(i=o(e,t)):i=[];for(r=0;r<n.length;r++){var c;if(0===(c=n[r]).refs){for(var u=0;u<c.parts.length;u++)c.parts[u]();delete a[c.id]}}}};var b=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}();function v(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=b(t,o);else{var a=document.createTextNode(o),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(a,i[t]):e.appendChild(a)}}},82:function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(r),a=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[n].concat(a).concat([o]).join("\n")}return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var a=this[o][0];"number"==typeof a&&(r[a]=!0)}for(o=0;o<e.length;o++){var i=e[o];"number"==typeof i[0]&&r[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),t.push(i))}},t}},83:function(e,t){e.exports=function(e,t){for(var n=[],r={},o=0;o<t.length;o++){var a=t[o],i=a[0],s={id:e+":"+o,css:a[1],media:a[2],sourceMap:a[3]};r[i]?r[i].parts.push(s):n.push(r[i]={id:i,parts:[s]})}return n}},84:function(e,t,n){(e.exports=n(82)(!1)).push([e.i,".spinner{transition:opacity .15s ease;animation:rotator 1.4s linear infinite;animation-play-state:paused}.spinner.show{animation-play-state:running}@keyframes rotator{0%{transform:scale(.5) rotate(0deg)}to{transform:scale(.5) rotate(270deg)}}.spinner .path{stroke:#f60;stroke-dasharray:126;stroke-dashoffset:0;transform-origin:center;animation:dash 1.4s ease-in-out infinite}@keyframes dash{0%{stroke-dashoffset:126}50%{stroke-dashoffset:63;transform:rotate(135deg)}to{stroke-dashoffset:126;transform:rotate(450deg)}}",""])},85:function(e,t,n){var r=n(84);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(81)("93d81cac",r,!0,{manualInject:!0})},86:function(e,t,n){"use strict";var r=n(1),o=n.n(r),a=n(25),i=n(85),s=n.n(i);t.a=Object(a.d)(s.a)(function(e){var t=e.show;return t?o.a.createElement("svg",{className:"spinner"+(t?" show":""),width:"44px",height:"44px",viewBox:"0 0 44 44"},o.a.createElement("circle",{className:"path",fill:"none",strokeWidth:"4",strokeLinecap:"round",cx:"22",cy:"22",r:"20"})):null})},89:function(e,t,n){(e.exports=n(82)(!1)).push([e.i,".item-view-header{background-color:#fff;padding:1.8em 2em 1em;box-shadow:0 1px 2px rgba(0,0,0,.1)}.item-view-header h1{display:inline;font-size:1.5em;margin:0;margin-right:.5em}.item-view-header .host,.item-view-header .meta,.item-view-header .meta a{color:#828282}.item-view-header .meta a{text-decoration:underline}.item-view-comments{background-color:#fff;margin-top:10px;padding:0 2em .5em}.item-view-comments-header{margin:0;font-size:1.1em;padding:1em 0;position:relative}.item-view-comments-header .spinner{display:inline-block;margin:-15px 0}.comment-children{list-style-type:none;padding:0;margin:0}@media (max-width:600px){.item-view-header h1{font-size:1.25em}}",""])},90:function(e,t,n){var r=n(89);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(81)("3b3ab4ba",r,!0,{manualInject:!0})},91:function(e,t,n){(e.exports=n(82)(!1)).push([e.i,".comment-children .comment-children{margin-left:1.5em}.comment{border-top:1px solid #eee;position:relative}.comment .by,.comment .text,.comment .toggle{font-size:.9em;margin:1em 0}.comment .by{color:#828282}.comment .by a{color:#828282;text-decoration:underline}.comment .text{overflow-wrap:break-word}.comment .text a:hover{color:#f60}.comment .text pre{white-space:pre-wrap}.comment .toggle{background-color:#fffbf2;padding:.3em .5em;border-radius:4px}.comment .toggle a{color:#828282;cursor:pointer}.comment .toggle.open{padding:0;background-color:transparent;margin-bottom:-.5em}",""])},92:function(e,t,n){var r=n(91);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(81)("1d0cf4f0",r,!0,{manualInject:!0})}}]);