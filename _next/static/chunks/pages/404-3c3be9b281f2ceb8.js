(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[197,374],{7276:function(e,t,n){"use strict";n.r(t);var r=n(689),o=n(2322);t.default=()=>(0,o.jsx)(r.default,{statusCode:404})},5374:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(2784)),o=a(n(2001));function a(e){return e&&e.__esModule?e:{default:e}}const s={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function i({res:e,err:t}){return{statusCode:e&&e.statusCode?e.statusCode:t?t.statusCode:404}}class c extends r.default.Component{render(){const{statusCode:e}=this.props,t=this.props.title||s[e]||"An unexpected error has occurred";return r.default.createElement("div",{style:u.error},r.default.createElement(o.default,null,r.default.createElement("title",null,e?"".concat(e,": ").concat(t):"Application error: a client-side exception has occurred")),r.default.createElement("div",null,r.default.createElement("style",{dangerouslySetInnerHTML:{__html:"body { margin: 0 }"}}),e?r.default.createElement("h1",{style:u.h1},e):null,r.default.createElement("div",{style:u.desc},r.default.createElement("h2",{style:u.h2},this.props.title||e?t:r.default.createElement(r.default.Fragment,null,"Application error: a client-side exception has occurred (see the browser console for more information)"),"."))))}}c.displayName="ErrorPage",c.getInitialProps=i,c.origGetInitialProps=i,t.default=c;const u={error:{color:"#000",background:"#fff",fontFamily:'-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{display:"inline-block",textAlign:"left",lineHeight:"49px",height:"49px",verticalAlign:"middle"},h1:{display:"inline-block",borderRight:"1px solid rgba(0, 0, 0,.3)",margin:0,marginRight:"20px",padding:"10px 23px 10px 0",fontSize:"24px",fontWeight:500,verticalAlign:"top"},h2:{fontSize:"14px",fontWeight:"normal",lineHeight:"inherit",margin:0,padding:0}}},2518:function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;const o=((r=n(2784))&&r.__esModule?r:{default:r}).default.createContext({});t.AmpStateContext=o},4667:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=s,t.useAmp=function(){return s(o.default.useContext(a.AmpStateContext))};var r,o=(r=n(2784))&&r.__esModule?r:{default:r},a=n(2518);function s({ampFirst:e=!1,hybrid:t=!1,hasQuery:n=!1}={}){return e||t&&n}},2001:function(e,t,n){"use strict";var r=n(7467);function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=d,t.default=void 0;var a,s=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}(n(2784)),i=(a=n(1023))&&a.__esModule?a:{default:a},c=n(2518),u=n(4523),l=n(4667);function d(e=!1){const t=[s.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(s.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function p(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===s.default.Fragment?e.concat(s.default.Children.toArray(t.props.children).reduce(((e,t)=>"string"===typeof t||"number"===typeof t?e:e.concat(t)),[])):e.concat(t)}const f=["name","httpEquiv","charSet","itemProp"];function h(e,t){return e.reduce(((e,t)=>{const n=s.default.Children.toArray(t.props.children);return e.concat(n)}),[]).reduce(p,[]).reverse().concat(d(t.inAmpMode)).filter(function(){const e=new Set,t=new Set,n=new Set,r={};return o=>{let a=!0,s=!1;if(o.key&&"number"!==typeof o.key&&o.key.indexOf("$")>0){s=!0;const t=o.key.slice(o.key.indexOf("$")+1);e.has(t)?a=!1:e.add(t)}switch(o.type){case"title":case"base":t.has(o.type)?a=!1:t.add(o.type);break;case"meta":for(let e=0,t=f.length;e<t;e++){const t=f[e];if(o.props.hasOwnProperty(t))if("charSet"===t)n.has(t)?a=!1:n.add(t);else{const e=o.props[t],n=r[t]||new Set;"name"===t&&s||!n.has(e)?(n.add(e),r[t]=n):a=!1}}}return a}}()).reverse().map(((e,n)=>{const a=e.key||n;if(!t.inAmpMode&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some((t=>e.props.href.startsWith(t)))){const t=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e.props||{});return t["data-href"]=t.href,t.href=void 0,t["data-optimized-fonts"]=!0,s.default.cloneElement(e,t)}return s.default.cloneElement(e,{key:a})}))}var m=function({children:e}){const t=s.useContext(c.AmpStateContext),n=s.useContext(u.HeadManagerContext);return s.default.createElement(i.default,{reduceComponentsToState:h,headManager:n,inAmpMode:l.isInAmpMode(t)},e)};t.default=m},1023:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}(n(2784));class o extends r.Component{constructor(e){super(e),this.emitChange=()=>{this._hasHeadManager&&this.props.headManager.updateHead(this.props.reduceComponentsToState([...this.props.headManager.mountedInstances],this.props))},this._hasHeadManager=this.props.headManager&&this.props.headManager.mountedInstances}componentDidMount(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}componentDidUpdate(){this.emitChange()}componentWillUnmount(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}render(){return null}}t.default=o},7522:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/404",function(){return n(7276)}])},689:function(e,t,n){e.exports=n(5374)}},function(e){e.O(0,[774,888,179],(function(){return t=7522,e(e.s=t);var t}));var t=e.O();_N_E=t}]);
//# sourceMappingURL=404-3c3be9b281f2ceb8.js.map