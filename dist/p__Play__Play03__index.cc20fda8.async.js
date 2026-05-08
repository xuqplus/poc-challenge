"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[939],{77896:function(zt,K,p){p.r(K),p.d(K,{Box:function(){return J},default:function(){return xt}});var H=p(95178),k=p.n(H),W=p(6810),N=p.n(W),_=p(82644),P=p.n(_),tt=p(72589),T=p.n(tt),et=p(60183),x=p.n(et),I=p(38497),nt=p(39346),E=p.n(nt),rt=p(53990),D=p.n(rt),ot=p(54942),w=p.n(ot),st=function(i,a){return Math.sqrt(i*i+a*a)},at=function(i,a){var t=i.x,e=i.y,n=a.x,u=a.y,h=t*n+e*u,r=t*u-e*n,s=Math.atan2(r,h)/Math.PI*180;return(s+360)%360},F=function(i){return i*Math.PI/180},v=function(i){return Math.cos(F(i))},g=function(i){return Math.sin(F(i))},L=function(i,a,t){var e=i+a;return e>t?i=e:(a=t-i,i=t),{width:i,deltaW:a}},C=function(i,a,t){var e=i+a;return e>t?i=e:(a=t-i,i=t),{height:i,deltaH:a}},it=function(i,a,t,e,n,u,h){var r=a.width,s=a.height,l=a.centerX,c=a.centerY,o=a.rotateAngle,y=r<0?-1:1,z=s<0?-1:1;switch(r=Math.abs(r),s=Math.abs(s),i){case"r":{var R=L(r,t,u);r=R.width,t=R.deltaW,n?(e=t/n,s=r/n,l+=t/2*v(o)-e/2*g(o),c+=t/2*g(o)+e/2*v(o)):(l+=t/2*v(o),c+=t/2*g(o));break}case"tr":{e=-e;var M=L(r,t,u);r=M.width,t=M.deltaW;var b=C(s,e,h);s=b.height,e=b.deltaH,n&&(t=e*n,r=s*n),l+=t/2*v(o)+e/2*g(o),c+=t/2*g(o)-e/2*v(o);break}case"br":{var Y=L(r,t,u);r=Y.width,t=Y.deltaW;var X=C(s,e,h);s=X.height,e=X.deltaH,n&&(t=e*n,r=s*n),l+=t/2*v(o)-e/2*g(o),c+=t/2*g(o)+e/2*v(o);break}case"b":{var m=C(s,e,h);s=m.height,e=m.deltaH,n?(t=e*n,r=s*n,l+=t/2*v(o)-e/2*g(o),c+=t/2*g(o)+e/2*v(o)):(l-=e/2*g(o),c+=e/2*v(o));break}case"bl":{t=-t;var S=L(r,t,u);r=S.width,t=S.deltaW;var $=C(s,e,h);s=$.height,e=$.deltaH,n&&(s=r/n,e=t/n),l-=t/2*v(o)+e/2*g(o),c-=t/2*g(o)-e/2*v(o);break}case"l":{t=-t;var A=L(r,t,u);r=A.width,t=A.deltaW,n?(s=r/n,e=t/n,l-=t/2*v(o)+e/2*g(o),c-=t/2*g(o)-e/2*v(o)):(l-=t/2*v(o),c-=t/2*g(o));break}case"tl":{t=-t,e=-e;var j=L(r,t,u);r=j.width,t=j.deltaW;var U=C(s,e,h);s=U.height,e=U.deltaH,n&&(r=s*n,t=e*n),l-=t/2*v(o)-e/2*g(o),c-=t/2*g(o)+e/2*v(o);break}case"t":{e=-e;var B=C(s,e,h);s=B.height,e=B.deltaH,n?(r=s*n,t=e*n,l+=t/2*v(o)+e/2*g(o),c+=t/2*g(o)-e/2*v(o)):(l+=e/2*g(o),c-=e/2*v(o));break}}return{position:{centerX:l,centerY:c},size:{width:r*y,height:s*z}}},ut={n:0,ne:1,e:2,se:3,s:4,sw:5,w:6,nw:7},ht=["n","ne","e","se","s","sw","w","nw"],lt={0:0,1:1,2:2,3:2,4:3,5:4,6:4,7:5,8:6,9:6,10:7,11:8},ct=function(i,a){var t=lt[Math.floor(i/30)],e=ut[a],n=(e+t)%8;return ht[n]},pt=function(i){var a=i.centerX,t=i.centerY,e=i.width,n=i.height,u=i.rotateAngle;return{top:t-n/2,left:a-e/2,width:e,height:n,rotateAngle:u}},vt=function(i){var a=i.top,t=i.left,e=i.width,n=i.height,u=i.rotateAngle;return{position:{centerX:t+e/2,centerY:a+n/2},size:{width:e,height:n},transform:{rotateAngle:u}}},gt=p(63027),ft=p.n(gt),mt=p(57295),O,dt=mt.ZP.div(O||(O=ft()([`
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
`]))),d=p(96469),V={n:"t",s:"b",e:"r",w:"l",ne:"tr",nw:"tl",se:"br",sw:"bl"},Z=function(f){k()(a,f);var i=N()(a);function a(){var t;T()(this,a);for(var e=arguments.length,n=new Array(e),u=0;u<e;u++)n[u]=arguments[u];return t=i.call.apply(i,[this].concat(n)),x()(D()(t),"setElementRef",function(h){t.$element=h}),x()(D()(t),"startDrag",function(h){var r=h.clientX,s=h.clientY;t.props.onDragStart&&t.props.onDragStart(),t._isMouseDown=!0;var l=function(y){if(t._isMouseDown){y.stopImmediatePropagation();var z=y.clientX,R=y.clientY,M=z-r,b=R-s;t.props.onDrag(M,b),r=z,s=R}},c=function o(){document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",o),t._isMouseDown&&(t._isMouseDown=!1,t.props.onDragEnd&&t.props.onDragEnd())};document.addEventListener("mousemove",l),document.addEventListener("mouseup",c)}),x()(D()(t),"startRotate",function(h){if(h.button===0){var r=h.clientX,s=h.clientY,l=t.props.styles.transform.rotateAngle,c=t.$element.getBoundingClientRect(),o={x:c.left+c.width/2,y:c.top+c.height/2},y={x:r-o.x,y:s-o.y};t.props.onRotateStart&&t.props.onRotateStart(),t._isMouseDown=!0;var z=function(b){if(t._isMouseDown){b.stopImmediatePropagation();var Y=b.clientX,X=b.clientY,m={x:Y-o.x,y:X-o.y},S=at(y,m);t.props.onRotate(S,l)}},R=function M(){document.removeEventListener("mousemove",z),document.removeEventListener("mouseup",M),t._isMouseDown&&(t._isMouseDown=!1,t.props.onRotateEnd&&t.props.onRotateEnd())};document.addEventListener("mousemove",z),document.addEventListener("mouseup",R)}}),x()(D()(t),"startResize",function(h,r){if(h.button===0){document.body.style.cursor=r;var s=t.props.styles,l=s.position,c=l.centerX,o=l.centerY,y=s.size,z=y.width,R=y.height,M=s.transform.rotateAngle,b=h.clientX,Y=h.clientY,X={width:z,height:R,centerX:c,centerY:o,rotateAngle:M},m=h.target.getAttribute("class").split(" ")[0];t.props.onResizeStart&&t.props.onResizeStart(),t._isMouseDown=!0;var S=function(j){if(t._isMouseDown){j.stopImmediatePropagation();var U=j.clientX,B=j.clientY,Q=U-b,q=B-Y,wt=Math.atan2(q,Q),Rt=st(Q,q),Mt=j.shiftKey;t.props.onResize(Rt,wt,X,m,Mt)}},$=function A(){document.body.style.cursor="auto",document.removeEventListener("mousemove",S),document.removeEventListener("mouseup",A),t._isMouseDown&&(t._isMouseDown=!1,t.props.onResizeEnd&&t.props.onResizeEnd())};document.addEventListener("mousemove",S),document.addEventListener("mouseup",$)}}),t}return P()(a,[{key:"render",value:function(){var e=this,n=this.props,u=n.styles,h=u.position,r=h.centerX,s=h.centerY,l=u.size,c=l.width,o=l.height,y=u.transform.rotateAngle,z=n.zoomable,R=n.rotatable,M=n.parentRotateAngle,b=n.kept,Y={width:Math.abs(c),height:Math.abs(o),transform:"rotate(".concat(y,"deg)"),left:r-Math.abs(c)/2,top:s-Math.abs(o)/2,cursor:"move",userSelect:"none",backgroundColor:b?"grey":""},X=z.split(",").map(function(m){return m.trim()}).filter(function(m){return m});return(0,d.jsxs)(dt,{ref:this.setElementRef,onMouseDown:this.startDrag,className:"rect single-resizer",style:Y,children:[this.props.children,R&&(0,d.jsx)("div",{className:"rotate",onMouseDown:this.startRotate,children:(0,d.jsx)("svg",{width:"14",height:"14",xmlns:"http://www.w3.org/2000/svg",children:(0,d.jsx)("image",{width:"14",height:"14",href:"/icons/cycle-arrow.png"})})}),R&&(0,d.jsx)("div",{className:"reverse",onMouseDown:this.startRotate,children:(0,d.jsx)("svg",{width:"14",height:"14",xmlns:"http://www.w3.org/2000/svg",children:(0,d.jsx)("image",{width:"14",height:"14",href:"/icons/left-right-arrow.png"})})}),X.map(function(m){var S="".concat(ct(y+M,m),"-resize");return(0,d.jsx)("div",{style:{cursor:S},className:"".concat(V[m]," resizable-handler"),onMouseDown:function(A){return e.startResize(A,S)}},m)}),X.map(function(m){return(0,d.jsx)("div",{className:"".concat(V[m]," square")},m)})]})}}]),a}(I.PureComponent);x()(Z,"propTypes",{styles:w().object,zoomable:w().string,rotatable:w().bool,kept:w().bool,onResizeStart:w().func,onResize:w().func,onResizeEnd:w().func,onRotateStart:w().func,onRotate:w().func,onRotateEnd:w().func,onDragStart:w().func,onDrag:w().func,onDragEnd:w().func,parentRotateAngle:w().number});var yt=function(f){k()(a,f);var i=N()(a);function a(t,e){var n;return T()(this,a),n=i.call(this,t,e),x()(D()(n),"movable",void 0),x()(D()(n),"onRotate",function(u,h){var r=Math.round(h+u);r>=360?r-=360:r<0&&(r+=360),r>356||r<4?r=0:r>86&&r<94?r=90:r>176&&r<184?r=180:r>266&&r<274&&(r=270),n.setState(function(s){return E()(E()({},s),{},{rotateAngle:r})})}),x()(D()(n),"onResize",function(u,h,r,s,l){var c=n.state.rotateAngle,o=h-F(n.state.rotateAngle+0),y=u*Math.cos(o),z=u*Math.sin(o),R=r.width/r.height,M=it(s,E()(E()({},r),{},{rotateAngle:c}),y,z,R,10,10),b=M.position,Y=b.centerX,X=b.centerY,m=M.size,S=m.width,$=m.height,A=pt({centerX:Y,centerY:X,width:S,height:$,rotateAngle:c});n.setState(function(j){return E()(E()({},j),A)})}),x()(D()(n),"onDrag",function(u,h){n.movable&&n.setState(function(r){var s=r.top+h,l=r.left+u;return E()(E()({},r),{},{top:s,left:l})})}),n.movable=typeof t.movable=="boolean"?t.movable:!0,n.state={top:typeof t.top=="number"?t.top:100,left:typeof t.left=="number"?t.left:100,width:typeof t.width=="number"?t.width:100,height:typeof t.height=="number"?t.height:100,rotateAngle:0,zoomable:""},n}return P()(a,[{key:"render",value:function(){var e=this.state,n=e.top,u=e.left,h=e.width,r=e.height,s=e.rotateAngle,l=vt({top:n,left:u,width:h,height:r,rotateAngle:s});return(0,d.jsx)(Z,{styles:l,zoomable:this.state.zoomable,rotatable:!1,parentRotateAngle:0,onResizeStart:null,onResize:this.onResize,onResizeEnd:null,onRotateStart:null,onRotate:this.onRotate,onRotateEnd:null,onDragStart:null,onDrag:this.onDrag,onDragEnd:null,kept:this.props.kept,children:this.props.children})}}]),a}(I.Component),G=function(f){k()(a,f);var i=N()(a);function a(){return T()(this,a),i.apply(this,arguments)}return P()(a,[{key:"render",value:function(){return(0,d.jsx)(yt,{top:this.props.top,left:this.props.left,width:this.props.width,height:this.props.height,kept:this.props.kept,movable:this.props.movable,children:this.props.children})}}]),a}(I.PureComponent),bt=p(88540),J=P()(function f(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:100,e=arguments.length>3&&arguments[3]!==void 0?arguments[3]:100,n=arguments.length>4&&arguments[4]!==void 0?arguments[4]:"kept";T()(this,f),x()(this,"top",void 0),x()(this,"left",void 0),x()(this,"width",void 0),x()(this,"height",void 0),x()(this,"text",void 0),this.top=i,this.left=a,this.width=t,this.height=e,this.text=n}),xt=function(f){k()(a,f);var i=N()(a);function a(){return T()(this,a),i.apply(this,arguments)}return P()(a,[{key:"render",value:function(){for(var e=7,n=8,u=100,h=[],r=[["january","february","march","april","may","june","kept"],["july","august","september","october","november","december","kept"],["01","02","03","04","05","06","07"],["08","09","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31","monday","tuesday","wednesday","thursday"],["kept","kept","kept","kept","friday","saturday","sunday"]],s=0;s<n;s++){h[s]=[];for(var l=0;l<e;l++)h[s].push(new J(u*s,u*l,u,u,r[s][l]))}return(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{className:"center",children:"Here is play03.."}),(0,d.jsx)("div",{style:{zIndex:9999},children:h.map(function(c){return c.map(function(o){return(0,d.jsx)("div",{style:{backgroundColor:"black"},children:(0,d.jsx)(G,{top:o.top,left:o.left,kept:o.text==="kept",children:(0,d.jsx)(bt.FormattedMessage,{id:o.text})},"box-"+o.top+"-"+o.left)})})})}),(0,d.jsx)("div",{style:{zIndex:-9999},children:(0,d.jsx)(G,{top:1,left:1,width:u*e,height:u*n,movable:!1})})]})}}]),a}(I.Component)}}]);
