!function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=16)}([function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.runtimeRequire=r.resolve=r.publicPath=r.serverPort=r.serverHost=r.hasType=r.__DEV__=r.NODE_ENV=void 0;var n,o=(n=t(32))&&n.__esModule?n:{default:n};r.NODE_ENV="production";r.__DEV__=!1;r.hasType="contenthash";r.serverHost="0.0.0.0";var s=process.env.PORT||4e3;r.serverPort=s;r.publicPath="/";var u=o.default.resolve;r.resolve=u;var i="undefined"==typeof require?t(33):require;r.runtimeRequire=i},function(e,r){e.exports=require("webpack")},function(e,r){e.exports=require("core-js/modules/es.array.for-each")},function(e,r){e.exports=require("core-js/modules/web.dom-collections.for-each")},function(e,r){e.exports=require("core-js/modules/es.symbol")},function(e,r){e.exports=require("core-js/modules/es.array.filter")},function(e,r){e.exports=require("core-js/modules/es.object.define-properties")},function(e,r){e.exports=require("core-js/modules/es.object.define-property")},function(e,r){e.exports=require("core-js/modules/es.object.get-own-property-descriptor")},function(e,r){e.exports=require("core-js/modules/es.object.get-own-property-descriptors")},function(e,r){e.exports=require("core-js/modules/es.object.keys")},function(e,r){e.exports=require("core-js/modules/es.object.to-string")},function(e,r){e.exports=require("core-js/modules/es.promise")},function(e,r){e.exports=require("debug")},function(e,r){e.exports=require("webpack-merge")},function(e,r,t){"use strict";t(4),t(5),t(2),t(6),t(7),t(8),t(9),t(10),t(3),Object.defineProperty(r,"__esModule",{value:!0}),r.default=r.babelLoader=void 0;var n=i(t(1)),o=i(t(41)),s=i(t(42)),u=t(0);function i(e){return e&&e.__esModule?e:{default:e}}function c(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?c(Object(t),!0).forEach((function(r){l(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var f={sourceMap:u.__DEV__},d=function(e){return[e?{loader:"react-style-loader",options:{manualInject:e}}:s.default.loader,{loader:"css-loader",options:a(a({},f),{},{esModule:!1})},{loader:"postcss-loader",options:f},{loader:"sass-loader",options:f}]};r.babelLoader=function(e){return{test:/\.js$/,loader:"babel-loader",exclude:/node_modules/,options:{cacheDirectory:!0}}};var p={mode:u.NODE_ENV,resolve:{alias:{lodash$:"lodash-es"},extensions:[".js",".scss"],modules:[(0,u.resolve)("src"),"node_modules"]},module:{rules:[{test:/\.pug$/,loader:"pug-plain-loader",options:{pretty:u.__DEV__}},{test:/\.scss$/,oneOf:[{test:/app.scss$/,use:d()},{use:d(!0)}]}]},plugins:[new n.default.DefinePlugin({__DEV__:u.__DEV__}),new s.default({filename:"[name].[".concat(u.hasType,"].css")}),new o.default]};r.default=p},function(e,r,t){"use strict";t(4),t(5),t(17),t(2),t(18),t(19),t(20),t(6),t(7),t(8),t(9),t(10),t(11),t(12),t(21),t(3);var n=y(t(22)),o=y(t(13)),s=y(t(23)),u=y(t(24)),i=y(t(25)),c=y(t(26)),a=y(t(27)),l=y(t(28)),f=y(t(29)),d=y(t(30)),p=t(31),b=t(0);function y(e){return e&&e.__esModule?e:{default:e}}function v(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function m(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?v(Object(t),!0).forEach((function(r){_(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):v(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function _(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var j,g,O=(0,o.default)("1stg:server"),h=b.__DEV__?t(34).renderFile((0,b.resolve)("server/template.pug"),{pretty:!0}):n.default.readFileSync((0,b.resolve)("dist/template.html"),"utf-8"),w=new s.default,P=new d.default(1e3),x=[(0,a.default)(),(0,l.default)("/public",(0,f.default)((0,b.resolve)("public"),{maxAge:31536e6})),function(e,r){return new Promise((function(t,n){var o,s;return b.__DEV__?Promise.resolve(j).then(function(e){try{return u.call(this)}catch(e){return n(e)}}.bind(this),n):Promise.resolve(e.cashed()).then(function(e){try{return e?t():u.call(this)}catch(e){return n(e)}}.bind(this),n);function u(){return"GET"!==e.method||e.url.lastIndexOf(".")>e.url.lastIndexOf("/")||!["*/*","text/html"].find((function(r){return e.get("Accept").includes(r)}))?t(r()):(o={ctx:e,title:"React Hackernews"},e.respond=!1,s=e.res,g.renderToStream(o).on("afterRender",(function(){e.status=o.code||200,e.set({"Content-Type":"text/html"})})).on("end",(function(){})).on("error",(function(r){var t=r.status,n=r.url;return n?(e.status=302,e.set({Location:n}),s.end()):(e.status=t||500,404===t?s.end("404 | Page Not Found"):(s.end("500 | Internal Server Error"),O("error during render : ".concat(n)),void O(r.stack)))})).pipe(s),t())}}))}],q=function(e,r){return(0,p.createBundleRenderer)(e,m(m({},r),{},{template:h,basedir:(0,b.resolve)("dist/static"),runInNewContext:!1}))};if(b.__DEV__){var S=t(35).default((function(e){var r=e.bundle,t=e.clientManifest;g=q(r,{clientManifest:t})})),E=S.readyPromise,M=S.webpackMiddlewarePromise;j=E,M.then((function(e){return w.use(e)}))}else{g=q((0,b.runtimeRequire)((0,b.resolve)("dist/react-ssr-server-bundle.json")),{clientManifest:(0,b.runtimeRequire)((0,b.resolve)("dist/react-ssr-client-manifest.json"))});var k={};x.splice(1,0,(0,c.default)(),(0,f.default)((0,b.resolve)("dist/static"),{maxAge:31536e6},k),(0,u.default)({get:function(e){return P.get(e)},set:function(e,r){return P.set(e,r)}})),k["/service-worker.js"].maxAge=0}w.use((0,i.default)(x)),w.listen(b.serverPort,b.serverHost,(function(){O("Server start listening at %s:%s",b.serverHost,b.serverPort)}))},function(e,r){e.exports=require("core-js/modules/es.array.find")},function(e,r){e.exports=require("core-js/modules/es.array.includes")},function(e,r){e.exports=require("core-js/modules/es.array.last-index-of")},function(e,r){e.exports=require("core-js/modules/es.array.splice")},function(e,r){e.exports=require("core-js/modules/es.string.includes")},function(e,r){e.exports=require("fs")},function(e,r){e.exports=require("koa")},function(e,r){e.exports=require("koa-cash")},function(e,r){e.exports=require("koa-compose")},function(e,r){e.exports=require("koa-compress")},function(e,r){e.exports=require("koa-logger")},function(e,r){e.exports=require("koa-mount")},function(e,r){e.exports=require("koa-static-cache")},function(e,r){e.exports=require("lru-cache")},function(e,r){e.exports=require("react-server-renderer")},function(e,r){e.exports=require("path")},function(e,r){function t(e){var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}t.keys=function(){return[]},t.resolve=t,e.exports=t,t.id=33},function(e,r){e.exports=require("pug")},function(e,r,t){"use strict";t(2),t(11),t(12),t(3),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n=l(t(13)),o=l(t(36)),s=l(t(37)),u=l(t(1)),i=t(0),c=l(t(38)),a=l(t(43));function l(e){return e&&e.__esModule?e:{default:e}}var f=(0,n.default)("1stg:server:dev");r.default=function(e){var r,t,n,l,d=new Promise((function(e){r=e})),p=function(){r(),e.apply(void 0,arguments)},b=(0,u.default)(c.default),y=(0,o.default)({compiler:b,devMiddleware:{stats:{colors:!0}}});b.plugin("done",(function(e){(e=e.toJson()).errors.forEach(f),e.warnings.forEach(f),e.errors.length>0||y.then((function(e){l=e.devMiddleware.fileSystem,t=JSON.parse(l.readFileSync((0,i.resolve)("dist/react-ssr-client-manifest.json"))),n&&p({bundle:n,clientManifest:t,fs:l})}))}));var v=new s.default,m=(0,u.default)(a.default);return m.outputFileSystem=v,m.watch({},(function(e,r){if(e)throw e;(r=r.toJson()).errors.length>0||(n=JSON.parse(v.readFileSync((0,i.resolve)("dist/react-ssr-server-bundle.json"))),t&&p({bundle:n,clientManifest:t,fs:l}))})),{readyPromise:d,webpackMiddlewarePromise:y}}},function(e,r){e.exports=require("koa-webpack")},function(e,r){e.exports=require("memory-fs")},function(e,r,t){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var o=f(t(1)),s=t(14),u=t(39),i=f(t(40)),c=t(0),a=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!=typeof e)return{default:e};var r=l();if(r&&r.has(e))return r.get(e);var t={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var u=o?Object.getOwnPropertyDescriptor(e,s):null;u&&(u.get||u.set)?Object.defineProperty(t,s,u):t[s]=e[s]}t.default=e,r&&r.set(e,t);return t}(t(15));function l(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return l=function(){return e},e}function f(e){return e&&e.__esModule?e:{default:e}}var d=(0,s.merge)(a.default,{entry:{app:[(0,c.resolve)("src/entry-client.js")]},resolve:{alias:{"create-api":"./create-api-client.js"}},output:{publicPath:c.publicPath,path:(0,c.resolve)("dist/static"),filename:"[name].[".concat(c.hasType,"].js")},module:{rules:[(0,a.babelLoader)()]},optimization:{runtimeChunk:{name:"manifest"},splitChunks:{cacheGroups:{vendors:{chunks:"initial",name:"vendors",test:/node_modules/}}}},plugins:[new o.default.DefinePlugin({"process.env.REACT_ENV":'"client"',__SERVER__:!1}),new u.ReactSSRClientPlugin({filename:"../react-ssr-client-manifest.json"})]});c.__DEV__||d.plugins.push(new i.default({cacheId:"react-hn",filename:"service-worker.js",minify:!0,dontCacheBustUrlsMatching:/./,staticFileGlobsIgnorePatterns:[/index\.html$/,/\.map$/,/\.json$/],runtimeCaching:[{urlPattern:/^https?:\/\//,handler:"networkFirst"}]}));var p=d;r.default=p},function(e,r){e.exports=require("react-server-renderer/client-plugin")},function(e,r){e.exports=require("sw-precache-webpack-plugin")},function(e,r){e.exports=require("friendly-errors-webpack-plugin")},function(e,r){e.exports=require("mini-css-extract-plugin")},function(e,r,t){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var o=f(t(1)),s=t(14),u=f(t(44)),i=t(45),c=t(0),a=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!=typeof e)return{default:e};var r=l();if(r&&r.has(e))return r.get(e);var t={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var u=o?Object.getOwnPropertyDescriptor(e,s):null;u&&(u.get||u.set)?Object.defineProperty(t,s,u):t[s]=e[s]}t.default=e,r&&r.set(e,t);return t}(t(15));function l(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return l=function(){return e},e}function f(e){return e&&e.__esModule?e:{default:e}}var d=(0,s.merge)(a.default,{entry:(0,c.resolve)("src/entry-server.js"),resolve:{alias:{"create-api":"./create-api-server.js"}},target:"node",output:{path:(0,c.resolve)("dist"),filename:"[name].[chunkhash].js",libraryTarget:"commonjs2"},externals:(0,u.default)({allowlist:/\.s?css$/}),module:{rules:[(0,a.babelLoader)(!0)]},plugins:[new o.default.DefinePlugin({"process.env.REACT_ENV":'"server"',__SERVER__:!0}),new i.ReactSSRServerPlugin]});r.default=d},function(e,r){e.exports=require("webpack-node-externals")},function(e,r){e.exports=require("react-server-renderer/server-plugin")}]);