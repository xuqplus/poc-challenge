"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[138],{73087:function(Rt,V,h){h.r(V),h.d(V,{default:function(){return wt}});var k=h(72589),P=h.n(k),q=h(82644),T=h.n(q),H=h(95178),N=h.n(H),W=h(6810),I=h.n(W),U=h(38497),_=h(39346),Y=h.n(_),tt=h(53990),$=h.n(tt),nt=h(60183),E=h.n(nt),et=h(54942),R=h.n(et),rt=function(a,s){return Math.sqrt(a*a+s*s)},ot=function(a,s){var t=a.x,n=a.y,r=s.x,c=s.y,u=t*r+n*c,e=t*c-n*r,i=Math.atan2(e,u)/Math.PI*180;return(i+360)%360},F=function(a){return a*Math.PI/180},v=function(a){return Math.cos(F(a))},g=function(a){return Math.sin(F(a))},L=function(a,s,t){var n=a+s;return n>t?a=n:(s=t-a,a=t),{width:a,deltaW:s}},C=function(a,s,t){var n=a+s;return n>t?a=n:(s=t-a,a=t),{height:a,deltaH:s}},st=function(a,s,t,n,r,c,u){var e=s.width,i=s.height,l=s.centerX,p=s.centerY,o=s.rotateAngle,d=e<0?-1:1,M=i<0?-1:1;switch(e=Math.abs(e),i=Math.abs(i),a){case"r":{var y=L(e,t,c);e=y.width,t=y.deltaW,r?(n=t/r,i=e/r,l+=t/2*v(o)-n/2*g(o),p+=t/2*g(o)+n/2*v(o)):(l+=t/2*v(o),p+=t/2*g(o));break}case"tr":{n=-n;var b=L(e,t,c);e=b.width,t=b.deltaW;var w=C(i,n,u);i=w.height,n=w.deltaH,r&&(t=n*r,e=i*r),l+=t/2*v(o)+n/2*g(o),p+=t/2*g(o)-n/2*v(o);break}case"br":{var S=L(e,t,c);e=S.width,t=S.deltaW;var f=C(i,n,u);i=f.height,n=f.deltaH,r&&(t=n*r,e=i*r),l+=t/2*v(o)-n/2*g(o),p+=t/2*g(o)+n/2*v(o);break}case"b":{var z=C(i,n,u);i=z.height,n=z.deltaH,r?(t=n*r,e=i*r,l+=t/2*v(o)-n/2*g(o),p+=t/2*g(o)+n/2*v(o)):(l-=n/2*g(o),p+=n/2*v(o));break}case"bl":{t=-t;var A=L(e,t,c);e=A.width,t=A.deltaW;var D=C(i,n,u);i=D.height,n=D.deltaH,r&&(i=e/r,n=t/r),l-=t/2*v(o)+n/2*g(o),p-=t/2*g(o)-n/2*v(o);break}case"l":{t=-t;var j=L(e,t,c);e=j.width,t=j.deltaW,r?(i=e/r,n=t/r,l-=t/2*v(o)+n/2*g(o),p-=t/2*g(o)-n/2*v(o)):(l-=t/2*v(o),p-=t/2*g(o));break}case"tl":{t=-t,n=-n;var X=L(e,t,c);e=X.width,t=X.deltaW;var K=C(i,n,u);i=K.height,n=K.deltaH,r&&(e=i*r,t=n*r),l-=t/2*v(o)-n/2*g(o),p-=t/2*g(o)+n/2*v(o);break}case"t":{n=-n;var O=C(i,n,u);i=O.height,n=O.deltaH,r?(e=i*r,t=n*r,l+=t/2*v(o)+n/2*g(o),p+=t/2*g(o)-n/2*v(o)):(l+=n/2*g(o),p-=n/2*v(o));break}}return{position:{centerX:l,centerY:p},size:{width:e*d,height:i*M}}},at={n:0,ne:1,e:2,se:3,s:4,sw:5,w:6,nw:7},it=["n","ne","e","se","s","sw","w","nw"],ut={0:0,1:1,2:2,3:2,4:3,5:4,6:4,7:5,8:6,9:6,10:7,11:8},ct=function(a,s){var t=ut[Math.floor(a/30)],n=at[s],r=(n+t)%8;return it[r]},lt=function(a){var s=a.centerX,t=a.centerY,n=a.width,r=a.height,c=a.rotateAngle;return{top:t-r/2,left:s-n/2,width:n,height:r,rotateAngle:c}},pt=function(a){var s=a.top,t=a.left,n=a.width,r=a.height,c=a.rotateAngle;return{position:{centerX:t+n/2,centerY:s+r/2},size:{width:n,height:r},transform:{rotateAngle:c}}},ht=h(63027),vt=h.n(ht),gt=h(57295),B,ft=gt.ZP.div(B||(B=vt()([`
  position: absolute;
  // todo, hide border
  border: 1px solid #eb5648;

  .square {
    position: absolute;
    width: 7px;
    height: 7px;
    background: white;
    border: 1px solid #eb5648;
    border-radius: 1px;
  }

  .resizable-handler {
    position: absolute;
    width: 14px;
    height: 14px;
    cursor: pointer;
    z-index: 1;

    &.tl,
    &.t,
    &.tr {
      top: -7px;
    }

    &.tl,
    &.l,
    &.bl {
      left: -7px;
    }

    &.bl,
    &.b,
    &.br {
      bottom: -7px;
    }

    &.br,
    &.r,
    &.tr {
      right: -7px;
    }

    &.l,
    &.r {
      margin-top: -7px;
    }

    &.t,
    &.b {
      margin-left: -7px;
    }
  }

  .rotate {
    position: absolute;
    left: 50%;
    top: -26px;
    width: 18px;
    height: 18px;
    margin-left: -9px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .reverse {
    position: absolute;
    left: 50%;
    bottom: -26px;
    width: 18px;
    height: 18px;
    margin-left: -9px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .t,
  .tl,
  .tr {
    top: -3px;
  }

  .b,
  .bl,
  .br {
    bottom: -3px;
  }

  .r,
  .tr,
  .br {
    right: -3px;
  }

  .tl,
  .l,
  .bl {
    left: -3px;
  }

  .l,
  .r {
    top: 50%;
    margin-top: -3px;
  }

  .t,
  .b {
    left: 50%;
    margin-left: -3px;
  }
`]))),x=h(96469),Z={n:"t",s:"b",e:"r",w:"l",ne:"tr",nw:"tl",se:"br",sw:"bl"},G=function(m){N()(s,m);var a=I()(s);function s(){var t;P()(this,s);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return t=a.call.apply(a,[this].concat(r)),E()($()(t),"setElementRef",function(u){t.$element=u}),E()($()(t),"startDrag",function(u){var e=u.clientX,i=u.clientY;t.props.onDragStart&&t.props.onDragStart(),t._isMouseDown=!0;var l=function(d){if(t._isMouseDown){d.stopImmediatePropagation();var M=d.clientX,y=d.clientY,b=M-e,w=y-i;t.props.onDrag(b,w),e=M,i=y}},p=function o(){document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",o),t._isMouseDown&&(t._isMouseDown=!1,t.props.onDragEnd&&t.props.onDragEnd())};document.addEventListener("mousemove",l),document.addEventListener("mouseup",p)}),E()($()(t),"startRotate",function(u){if(u.button===0){var e=u.clientX,i=u.clientY,l=t.props.styles.transform.rotateAngle,p=t.$element.getBoundingClientRect(),o={x:p.left+p.width/2,y:p.top+p.height/2},d={x:e-o.x,y:i-o.y};t.props.onRotateStart&&t.props.onRotateStart(),t._isMouseDown=!0;var M=function(w){if(t._isMouseDown){w.stopImmediatePropagation();var S=w.clientX,f=w.clientY,z={x:S-o.x,y:f-o.y},A=ot(d,z);t.props.onRotate(A,l)}},y=function b(){document.removeEventListener("mousemove",M),document.removeEventListener("mouseup",b),t._isMouseDown&&(t._isMouseDown=!1,t.props.onRotateEnd&&t.props.onRotateEnd())};document.addEventListener("mousemove",M),document.addEventListener("mouseup",y)}}),E()($()(t),"startResize",function(u,e){if(u.button===0){document.body.style.cursor=e;var i=t.props.styles,l=i.position,p=l.centerX,o=l.centerY,d=i.size,M=d.width,y=d.height,b=i.transform.rotateAngle,w=u.clientX,S=u.clientY,f={width:M,height:y,centerX:p,centerY:o,rotateAngle:b},z=u.target.getAttribute("class").split(" ")[0];t.props.onResizeStart&&t.props.onResizeStart(),t._isMouseDown=!0;var A=function(X){if(t._isMouseDown){X.stopImmediatePropagation();var K=X.clientX,O=X.clientY,J=K-w,Q=O-S,xt=Math.atan2(Q,J),yt=rt(J,Q),bt=X.shiftKey;t.props.onResize(yt,xt,f,z,bt)}},D=function j(){document.body.style.cursor="auto",document.removeEventListener("mousemove",A),document.removeEventListener("mouseup",j),t._isMouseDown&&(t._isMouseDown=!1,t.props.onResizeEnd&&t.props.onResizeEnd())};document.addEventListener("mousemove",A),document.addEventListener("mouseup",D)}}),t}return T()(s,[{key:"render",value:function(){var n=this,r=this.props,c=r.styles,u=c.position,e=u.centerX,i=u.centerY,l=c.size,p=l.width,o=l.height,d=c.transform.rotateAngle,M=r.zoomable,y=r.rotatable,b=r.parentRotateAngle,w={width:Math.abs(p),height:Math.abs(o),transform:"rotate(".concat(d,"deg)"),left:e-Math.abs(p)/2,top:i-Math.abs(o)/2,cursor:"move",userSelect:"none"},S=M.split(",").map(function(f){return f.trim()}).filter(function(f){return f});return(0,x.jsxs)(ft,{ref:this.setElementRef,onMouseDown:this.startDrag,className:"rect single-resizer",style:w,children:[this.props.children,y&&(0,x.jsx)("div",{className:"rotate",onMouseDown:this.startRotate,children:(0,x.jsx)("svg",{width:"14",height:"14",xmlns:"http://www.w3.org/2000/svg",children:(0,x.jsx)("image",{width:"14",height:"14",href:"/icons/cycle-arrow.png"})})}),y&&(0,x.jsx)("div",{className:"reverse",onMouseDown:this.startRotate,children:(0,x.jsx)("svg",{width:"14",height:"14",xmlns:"http://www.w3.org/2000/svg",children:(0,x.jsx)("image",{width:"14",height:"14",href:"/icons/left-right-arrow.png"})})}),S.map(function(f){var z="".concat(ct(d+b,f),"-resize");return(0,x.jsx)("div",{style:{cursor:z},className:"".concat(Z[f]," resizable-handler"),onMouseDown:function(D){return n.startResize(D,z)}},f)}),S.map(function(f){return(0,x.jsx)("div",{className:"".concat(Z[f]," square")},f)})]})}}]),s}(U.PureComponent);E()(G,"propTypes",{styles:R().object,zoomable:R().string,rotatable:R().bool,onResizeStart:R().func,onResize:R().func,onResizeEnd:R().func,onRotateStart:R().func,onRotate:R().func,onRotateEnd:R().func,onDragStart:R().func,onDrag:R().func,onDragEnd:R().func,parentRotateAngle:R().number});var mt=function(m){N()(s,m);var a=I()(s);function s(t,n){var r;return P()(this,s),r=a.call(this,t,n),E()($()(r),"onRotate",function(c,u){var e=Math.round(u+c);e>=360?e-=360:e<0&&(e+=360),e>356||e<4?e=0:e>86&&e<94?e=90:e>176&&e<184?e=180:e>266&&e<274&&(e=270),r.setState(function(i){return Y()(Y()({},i),{},{rotateAngle:e})})}),E()($()(r),"onResize",function(c,u,e,i,l){var p=r.state.rotateAngle,o=u-F(r.state.rotateAngle+0),d=c*Math.cos(o),M=c*Math.sin(o),y=e.width/e.height,b=st(i,Y()(Y()({},e),{},{rotateAngle:p}),d,M,y,10,10),w=b.position,S=w.centerX,f=w.centerY,z=b.size,A=z.width,D=z.height,j=lt({centerX:S,centerY:f,width:A,height:D,rotateAngle:p});r.setState(function(X){return Y()(Y()({},X),j)})}),E()($()(r),"onDrag",function(c,u){r.setState(function(e){var i=e.top+u,l=e.left+c;return Y()(Y()({},e),{},{top:i,left:l})})}),r.state={top:100,left:100,width:100,height:100,rotateAngle:0,zoomable:"n, w, s, e, nw, ne, se, sw"},r}return T()(s,[{key:"render",value:function(){var n=this.state,r=n.top,c=n.left,u=n.width,e=n.height,i=n.rotateAngle,l=pt({top:r,left:c,width:u,height:e,rotateAngle:i});return(0,x.jsx)(G,{styles:l,zoomable:this.state.zoomable,rotatable:!0,parentRotateAngle:0,onResizeStart:null,onResize:this.onResize,onResizeEnd:null,onRotateStart:null,onRotate:this.onRotate,onRotateEnd:null,onDragStart:null,onDrag:this.onDrag,onDragEnd:null,children:this.props.children})}}]),s}(U.Component),dt=function(m){N()(s,m);var a=I()(s);function s(){return P()(this,s),a.apply(this,arguments)}return T()(s,[{key:"render",value:function(){return(0,x.jsx)(mt,{children:"An element"})}}]),s}(U.PureComponent),wt=function(m){N()(s,m);var a=I()(s);function s(){return P()(this,s),a.apply(this,arguments)}return T()(s,[{key:"render",value:function(){return(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{className:"center",children:"Here is play01.."}),(0,x.jsx)(dt,{})]})}}]),s}(U.Component)}}]);
