"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[214],{55717:function(zt,O,p){p.r(O),p.d(O,{Box:function(){return J},default:function(){return wt}});var H=p(95178),N=p.n(H),W=p(6810),I=p.n(W),_=p(82644),P=p.n(_),tt=p(72589),T=p.n(tt),et=p(60183),R=p.n(et),U=p(38497),nt=p(39346),E=p.n(nt),rt=p(53990),j=p.n(rt),ot=p(54942),M=p.n(ot),st=function(i,a){return Math.sqrt(i*i+a*a)},at=function(i,a){var t=i.x,e=i.y,r=a.x,u=a.y,h=t*r+e*u,n=t*u-e*r,s=Math.atan2(n,h)/Math.PI*180;return(s+360)%360},K=function(i){return i*Math.PI/180},v=function(i){return Math.cos(K(i))},g=function(i){return Math.sin(K(i))},L=function(i,a,t){var e=i+a;return e>t?i=e:(a=t-i,i=t),{width:i,deltaW:a}},C=function(i,a,t){var e=i+a;return e>t?i=e:(a=t-i,i=t),{height:i,deltaH:a}},it=function(i,a,t,e,r,u,h){var n=a.width,s=a.height,c=a.centerX,l=a.centerY,o=a.rotateAngle,y=n<0?-1:1,z=s<0?-1:1;switch(n=Math.abs(n),s=Math.abs(s),i){case"r":{var w=L(n,t,u);n=w.width,t=w.deltaW,r?(e=t/r,s=n/r,c+=t/2*v(o)-e/2*g(o),l+=t/2*g(o)+e/2*v(o)):(c+=t/2*v(o),l+=t/2*g(o));break}case"tr":{e=-e;var b=L(n,t,u);n=b.width,t=b.deltaW;var x=C(s,e,h);s=x.height,e=x.deltaH,r&&(t=e*r,n=s*r),c+=t/2*v(o)+e/2*g(o),l+=t/2*g(o)-e/2*v(o);break}case"br":{var X=L(n,t,u);n=X.width,t=X.deltaW;var m=C(s,e,h);s=m.height,e=m.deltaH,r&&(t=e*r,n=s*r),c+=t/2*v(o)-e/2*g(o),l+=t/2*g(o)+e/2*v(o);break}case"b":{var S=C(s,e,h);s=S.height,e=S.deltaH,r?(t=e*r,n=s*r,c+=t/2*v(o)-e/2*g(o),l+=t/2*g(o)+e/2*v(o)):(c-=e/2*g(o),l+=e/2*v(o));break}case"bl":{t=-t;var Y=L(n,t,u);n=Y.width,t=Y.deltaW;var D=C(s,e,h);s=D.height,e=D.deltaH,r&&(s=n/r,e=t/r),c-=t/2*v(o)+e/2*g(o),l-=t/2*g(o)-e/2*v(o);break}case"l":{t=-t;var $=L(n,t,u);n=$.width,t=$.deltaW,r?(s=n/r,e=t/r,c-=t/2*v(o)+e/2*g(o),l-=t/2*g(o)-e/2*v(o)):(c-=t/2*v(o),l-=t/2*g(o));break}case"tl":{t=-t,e=-e;var A=L(n,t,u);n=A.width,t=A.deltaW;var B=C(s,e,h);s=B.height,e=B.deltaH,r&&(n=s*r,t=e*r),c-=t/2*v(o)-e/2*g(o),l-=t/2*g(o)+e/2*v(o);break}case"t":{e=-e;var F=C(s,e,h);s=F.height,e=F.deltaH,r?(n=s*r,t=e*r,c+=t/2*v(o)+e/2*g(o),l+=t/2*g(o)-e/2*v(o)):(c+=e/2*g(o),l-=e/2*v(o));break}}return{position:{centerX:c,centerY:l},size:{width:n*y,height:s*z}}},ut={n:0,ne:1,e:2,se:3,s:4,sw:5,w:6,nw:7},ht=["n","ne","e","se","s","sw","w","nw"],ct={0:0,1:1,2:2,3:2,4:3,5:4,6:4,7:5,8:6,9:6,10:7,11:8},lt=function(i,a){var t=ct[Math.floor(i/30)],e=ut[a],r=(e+t)%8;return ht[r]},pt=function(i){var a=i.centerX,t=i.centerY,e=i.width,r=i.height,u=i.rotateAngle;return{top:t-r/2,left:a-e/2,width:e,height:r,rotateAngle:u}},vt=function(i){var a=i.top,t=i.left,e=i.width,r=i.height,u=i.rotateAngle;return{position:{centerX:t+e/2,centerY:a+r/2},size:{width:e,height:r},transform:{rotateAngle:u}}},gt=p(63027),ft=p.n(gt),mt=p(57295),k,dt=mt.ZP.div(k||(k=ft()([`
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
`]))),d=p(96469),V={n:"t",s:"b",e:"r",w:"l",ne:"tr",nw:"tl",se:"br",sw:"bl"},Z=function(f){N()(a,f);var i=I()(a);function a(){var t;T()(this,a);for(var e=arguments.length,r=new Array(e),u=0;u<e;u++)r[u]=arguments[u];return t=i.call.apply(i,[this].concat(r)),R()(j()(t),"setElementRef",function(h){t.$element=h}),R()(j()(t),"startDrag",function(h){var n=h.clientX,s=h.clientY;t.props.onDragStart&&t.props.onDragStart(),t._isMouseDown=!0;var c=function(y){if(t._isMouseDown){y.stopImmediatePropagation();var z=y.clientX,w=y.clientY,b=z-n,x=w-s;t.props.onDrag(b,x),n=z,s=w}},l=function o(){document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",o),t._isMouseDown&&(t._isMouseDown=!1,t.props.onDragEnd&&t.props.onDragEnd())};document.addEventListener("mousemove",c),document.addEventListener("mouseup",l)}),R()(j()(t),"startRotate",function(h){if(h.button===0){var n=h.clientX,s=h.clientY,c=t.props.styles.transform.rotateAngle,l=t.$element.getBoundingClientRect(),o={x:l.left+l.width/2,y:l.top+l.height/2},y={x:n-o.x,y:s-o.y};t.props.onRotateStart&&t.props.onRotateStart(),t._isMouseDown=!0;var z=function(x){if(t._isMouseDown){x.stopImmediatePropagation();var X=x.clientX,m=x.clientY,S={x:X-o.x,y:m-o.y},Y=at(y,S);t.props.onRotate(Y,c)}},w=function b(){document.removeEventListener("mousemove",z),document.removeEventListener("mouseup",b),t._isMouseDown&&(t._isMouseDown=!1,t.props.onRotateEnd&&t.props.onRotateEnd())};document.addEventListener("mousemove",z),document.addEventListener("mouseup",w)}}),R()(j()(t),"startResize",function(h,n){if(h.button===0){document.body.style.cursor=n;var s=t.props.styles,c=s.position,l=c.centerX,o=c.centerY,y=s.size,z=y.width,w=y.height,b=s.transform.rotateAngle,x=h.clientX,X=h.clientY,m={width:z,height:w,centerX:l,centerY:o,rotateAngle:b},S=h.target.getAttribute("class").split(" ")[0];t.props.onResizeStart&&t.props.onResizeStart(),t._isMouseDown=!0;var Y=function(A){if(t._isMouseDown){A.stopImmediatePropagation();var B=A.clientX,F=A.clientY,Q=B-x,q=F-X,bt=Math.atan2(q,Q),Rt=st(Q,q),Mt=A.shiftKey;t.props.onResize(Rt,bt,m,S,Mt)}},D=function $(){document.body.style.cursor="auto",document.removeEventListener("mousemove",Y),document.removeEventListener("mouseup",$),t._isMouseDown&&(t._isMouseDown=!1,t.props.onResizeEnd&&t.props.onResizeEnd())};document.addEventListener("mousemove",Y),document.addEventListener("mouseup",D)}}),t}return P()(a,[{key:"render",value:function(){var e=this,r=this.props,u=r.styles,h=u.position,n=h.centerX,s=h.centerY,c=u.size,l=c.width,o=c.height,y=u.transform.rotateAngle,z=r.zoomable,w=r.rotatable,b=r.parentRotateAngle,x={width:Math.abs(l),height:Math.abs(o),transform:"rotate(".concat(y,"deg)"),left:n-Math.abs(l)/2,top:s-Math.abs(o)/2,cursor:"move",userSelect:"none"},X=z.split(",").map(function(m){return m.trim()}).filter(function(m){return m});return(0,d.jsxs)(dt,{ref:this.setElementRef,onMouseDown:this.startDrag,className:"rect single-resizer",style:x,children:[this.props.children,w&&(0,d.jsx)("div",{className:"rotate",onMouseDown:this.startRotate,children:(0,d.jsx)("svg",{width:"14",height:"14",xmlns:"http://www.w3.org/2000/svg",children:(0,d.jsx)("image",{width:"14",height:"14",href:"/icons/cycle-arrow.png"})})}),w&&(0,d.jsx)("div",{className:"reverse",onMouseDown:this.startRotate,children:(0,d.jsx)("svg",{width:"14",height:"14",xmlns:"http://www.w3.org/2000/svg",children:(0,d.jsx)("image",{width:"14",height:"14",href:"/icons/left-right-arrow.png"})})}),X.map(function(m){var S="".concat(lt(y+b,m),"-resize");return(0,d.jsx)("div",{style:{cursor:S},className:"".concat(V[m]," resizable-handler"),onMouseDown:function(D){return e.startResize(D,S)}},m)}),X.map(function(m){return(0,d.jsx)("div",{className:"".concat(V[m]," square")},m)})]})}}]),a}(U.PureComponent);R()(Z,"propTypes",{styles:M().object,zoomable:M().string,rotatable:M().bool,onResizeStart:M().func,onResize:M().func,onResizeEnd:M().func,onRotateStart:M().func,onRotate:M().func,onRotateEnd:M().func,onDragStart:M().func,onDrag:M().func,onDragEnd:M().func,parentRotateAngle:M().number});var yt=function(f){N()(a,f);var i=I()(a);function a(t,e){var r;return T()(this,a),r=i.call(this,t,e),R()(j()(r),"onRotate",function(u,h){var n=Math.round(h+u);n>=360?n-=360:n<0&&(n+=360),n>356||n<4?n=0:n>86&&n<94?n=90:n>176&&n<184?n=180:n>266&&n<274&&(n=270),r.setState(function(s){return E()(E()({},s),{},{rotateAngle:n})})}),R()(j()(r),"onResize",function(u,h,n,s,c){var l=r.state.rotateAngle,o=h-K(r.state.rotateAngle+0),y=u*Math.cos(o),z=u*Math.sin(o),w=n.width/n.height,b=it(s,E()(E()({},n),{},{rotateAngle:l}),y,z,w,10,10),x=b.position,X=x.centerX,m=x.centerY,S=b.size,Y=S.width,D=S.height,$=pt({centerX:X,centerY:m,width:Y,height:D,rotateAngle:l});r.setState(function(A){return E()(E()({},A),$)})}),R()(j()(r),"onDrag",function(u,h){r.setState(function(n){var s=n.top+h,c=n.left+u;return E()(E()({},n),{},{top:s,left:c})})}),r.state={top:typeof t.top=="number"?t.top:100,left:typeof t.left=="number"?t.left:100,width:typeof t.width=="number"?t.width:100,height:typeof t.height=="number"?t.height:100,rotateAngle:0,zoomable:""},r}return P()(a,[{key:"render",value:function(){var e=this.state,r=e.top,u=e.left,h=e.width,n=e.height,s=e.rotateAngle,c=vt({top:r,left:u,width:h,height:n,rotateAngle:s});return(0,d.jsx)(Z,{styles:c,zoomable:this.state.zoomable,rotatable:!1,parentRotateAngle:0,onResizeStart:null,onResize:this.onResize,onResizeEnd:null,onRotateStart:null,onRotate:this.onRotate,onRotateEnd:null,onDragStart:null,onDrag:this.onDrag,onDragEnd:null,children:this.props.children})}}]),a}(U.Component),G=function(f){N()(a,f);var i=I()(a);function a(){return T()(this,a),i.apply(this,arguments)}return P()(a,[{key:"render",value:function(){return(0,d.jsx)(yt,{top:this.props.top,left:this.props.left,width:this.props.width,height:this.props.height,children:this.props.children})}}]),a}(U.PureComponent),xt=p(88540),J=P()(function f(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:100,e=arguments.length>3&&arguments[3]!==void 0?arguments[3]:100,r=arguments.length>4&&arguments[4]!==void 0?arguments[4]:"kept";T()(this,f),R()(this,"top",void 0),R()(this,"left",void 0),R()(this,"width",void 0),R()(this,"height",void 0),R()(this,"text",void 0),this.top=i,this.left=a,this.width=t,this.height=e,this.text=r}),wt=function(f){N()(a,f);var i=I()(a);function a(){return T()(this,a),i.apply(this,arguments)}return P()(a,[{key:"render",value:function(){for(var e=7,r=8,u=100,h=[],n=[["january","february","march","april","may","june","kept"],["july","august","september","october","november","december","kept"],["01","02","03","04","05","06","07"],["08","09","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31","monday","tuesday","wednesday","thursday"],["kept","kept","kept","kept","friday","saturday","sunday"]],s=0;s<r;s++){h[s]=[];for(var c=0;c<e;c++)h[s].push(new J(u*s,u*c,u,u,n[s][c]))}return(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{className:"center",children:"Here is play02.."}),h.map(function(l){return l.map(function(o){return(0,d.jsx)("div",{style:{backgroundColor:"black"},children:(0,d.jsx)(G,{top:o.top,left:o.left,children:(0,d.jsx)(xt.FormattedMessage,{id:o.text})},"box-"+o.top+"-"+o.left)})})}),(0,d.jsx)(G,{top:1,left:1,width:u*e,height:u*r})]})}}]),a}(U.Component)}}]);
