"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[438],{71829:function(bt,Z,c){c.r(Z),c.d(Z,{default:function(){return mt}});var H=c(72589),A=c.n(H),W=c(82644),j=c.n(W),_=c(95178),L=c.n(_),tt=c(6810),D=c.n(tt),I=c(38497),nt=c(39346),y=c.n(nt),et=c(53990),C=c.n(et),rt=c(60183),m=c.n(rt),st=c(54942),w=c.n(st),wt=function(t,i){return Math.sqrt(t*t+i*i)},yt=function(t,i){var r=t.x,n=t.y,s=i.x,l=i.y,g=r*s+n*l,o=r*l-n*s,h=Math.atan2(o,g)/Math.PI*180;return(h+360)%360},F=function(t){return t*Math.PI/180},v=function(t){return Math.cos(F(t))},f=function(t){return Math.sin(F(t))},T=function(t,i,r){var n=t+i;return n>r?t=n:(i=r-t,t=r),{width:t,deltaW:i}},$=function(t,i,r){var n=t+i;return n>r?t=n:(i=r-t,t=r),{height:t,deltaH:i}},ot=function(t,i,r,n,s,l,g){var o=i.width,h=i.height,u=i.centerX,p=i.centerY,a=i.rotateAngle,P=o<0?-1:1,Y=h<0?-1:1;switch(o=Math.abs(o),h=Math.abs(h),t){case"r":{var d=T(o,r,l);o=d.width,r=d.deltaW,s?(n=r/s,h=o/s,u+=r/2*v(a)-n/2*f(a),p+=r/2*f(a)+n/2*v(a)):(u+=r/2*v(a),p+=r/2*f(a));break}case"tr":{n=-n;var z=T(o,r,l);o=z.width,r=z.deltaW;var M=$(h,n,g);h=M.height,n=M.deltaH,s&&(r=n*s,o=h*s),u+=r/2*v(a)+n/2*f(a),p+=r/2*f(a)-n/2*v(a);break}case"br":{var S=T(o,r,l);o=S.width,r=S.deltaW;var b=$(h,n,g);h=b.height,n=b.deltaH,s&&(r=n*s,o=h*s),u+=r/2*v(a)-n/2*f(a),p+=r/2*f(a)+n/2*v(a);break}case"b":{var R=$(h,n,g);h=R.height,n=R.deltaH,s?(r=n*s,o=h*s,u+=r/2*v(a)-n/2*f(a),p+=r/2*f(a)+n/2*v(a)):(u-=n/2*f(a),p+=n/2*v(a));break}case"bl":{r=-r;var E=T(o,r,l);o=E.width,r=E.deltaW;var X=$(h,n,g);h=X.height,n=X.deltaH,s&&(h=o/s,n=r/s),u-=r/2*v(a)+n/2*f(a),p-=r/2*f(a)-n/2*v(a);break}case"l":{r=-r;var B=T(o,r,l);o=B.width,r=B.deltaW,s?(h=o/s,n=r/s,u-=r/2*v(a)+n/2*f(a),p-=r/2*f(a)-n/2*v(a)):(u-=r/2*v(a),p-=r/2*f(a));break}case"tl":{r=-r,n=-n;var O=T(o,r,l);o=O.width,r=O.deltaW;var V=$(h,n,g);h=V.height,n=V.deltaH,s&&(o=h*s,r=n*s),u-=r/2*v(a)-n/2*f(a),p-=r/2*f(a)+n/2*v(a);break}case"t":{n=-n;var q=$(h,n,g);h=q.height,n=q.deltaH,s?(o=h*s,r=n*s,u+=r/2*v(a)+n/2*f(a),p+=r/2*f(a)-n/2*v(a)):(u+=n/2*f(a),p-=n/2*v(a));break}}return{position:{centerX:u,centerY:p},size:{width:o*P,height:h*Y}}},it={n:0,ne:1,e:2,se:3,s:4,sw:5,w:6,nw:7},at=["n","ne","e","se","s","sw","w","nw"],ht={0:0,1:1,2:2,3:2,4:3,5:4,6:4,7:5,8:6,9:6,10:7,11:8},lt=function(t,i){var r=ht[Math.floor(t/30)],n=it[i],s=(n+r)%8;return at[s]},ut=function(t){var i=t.centerX,r=t.centerY,n=t.width,s=t.height,l=t.rotateAngle;return{top:r-s/2,left:i-n/2,width:n,height:s,rotateAngle:l}},gt=function(t){var i=t.top,r=t.left,n=t.width,s=t.height,l=t.rotateAngle;return{position:{centerX:r+n/2,centerY:i+s/2},size:{width:n,height:s},transform:{rotateAngle:l}}},ct=c(63027),vt=c.n(ct),ft=c(57295),k,pt=ft.ZP.div(k||(k=vt()([`
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
`]))),x=c(96469),G={n:"t",s:"b",e:"r",w:"l",ne:"tr",nw:"tl",se:"br",sw:"bl"},J=function(e){L()(i,e);var t=D()(i);function i(){var r;A()(this,i);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return r=t.call.apply(t,[this].concat(s)),m()(C()(r),"setElementRef",function(g){r.$element=g}),r}return j()(i,[{key:"render",value:function(){var n=this,s=this.props,l=s.styles,g=l.position,o=g.centerX,h=g.centerY,u=l.size,p=u.width,a=u.height,P=l.transform.rotateAngle,Y=s.zoomable,d=s.rotatable,z=s.parentRotateAngle,M={width:Math.abs(p),height:Math.abs(a),transform:"rotate(".concat(P,"deg)"),left:o-Math.abs(p)/2,top:h-Math.abs(a)/2,cursor:"move",userSelect:"none",backgroundColor:this.props.text==="1"?"grey":""},S=Y.split(",").map(function(b){return b.trim()}).filter(function(b){return b});return(0,x.jsxs)(pt,{ref:this.setElementRef,onMouseDown:this.startDrag,className:"rect single-resizer",style:M,children:[this.props.children,d&&(0,x.jsx)("div",{className:"rotate",onClick:this.props.onRotate,children:(0,x.jsx)("svg",{width:"14",height:"14",xmlns:"http://www.w3.org/2000/svg",children:(0,x.jsx)("image",{width:"14",height:"14",href:"/icons/cycle-arrow.png"})})}),d&&(0,x.jsx)("div",{className:"reverse",onClick:this.props.onReverse,children:(0,x.jsx)("svg",{width:"14",height:"14",xmlns:"http://www.w3.org/2000/svg",children:(0,x.jsx)("image",{width:"14",height:"14",href:"/icons/left-right-arrow.png"})})}),S.map(function(b){var R="".concat(lt(P+z,b),"-resize");return(0,x.jsx)("div",{style:{cursor:R},className:"".concat(G[b]," resizable-handler"),onMouseDown:function(X){return n.startResize(X,R)}},b)}),S.map(function(b){return(0,x.jsx)("div",{className:"".concat(G[b]," square")},b)})]})}}]),i}(I.PureComponent);m()(J,"propTypes",{styles:w().object,zoomable:w().string,rotatable:w().bool,onResizeStart:w().func,onResize:w().func,onResizeEnd:w().func,onRotateStart:w().func,onRotate:w().func,onRotateEnd:w().func,onDragStart:w().func,onDrag:w().func,onDragEnd:w().func,parentRotateAngle:w().number});var Q=function(e){L()(i,e);var t=D()(i);function i(r,n){var s;return A()(this,i),s=t.call(this,r,n),m()(C()(s),"onRotate",function(l,g){var o=Math.round(g+l);o>=360?o-=360:o<0&&(o+=360),o>356||o<4?o=0:o>86&&o<94?o=90:o>176&&o<184?o=180:o>266&&o<274&&(o=270),s.setState(function(h){return y()(y()({},h),{},{rotateAngle:o})})}),m()(C()(s),"onResize",function(l,g,o,h,u){var p=s.state.rotateAngle,a=g-F(s.state.rotateAngle+0),P=l*Math.cos(a),Y=l*Math.sin(a),d=o.width/o.height,z=ot(h,y()(y()({},o),{},{rotateAngle:p}),P,Y,d,10,10),M=z.position,S=M.centerX,b=M.centerY,R=z.size,E=R.width,X=R.height,B=ut({centerX:S,centerY:b,width:E,height:X,rotateAngle:p});s.setState(function(O){return y()(y()({},O),B)})}),m()(C()(s),"onDrag",function(l,g){s.props.movable&&s.setState(function(o){var h=o.top+g,u=o.left+l;return y()(y()({},o),{},{top:h,left:u})})}),s.state={top:typeof r.top=="number"?r.top:100,left:typeof r.left=="number"?r.left:100,width:typeof r.width=="number"?r.width:100,height:typeof r.height=="number"?r.height:100,rotateAngle:0,zoomable:""},s}return j()(i,[{key:"render",value:function(){var n=this.state,s=n.top,l=n.left,g=n.width,o=n.height,h=n.rotateAngle,u=gt({top:s,left:l,width:g,height:o,rotateAngle:h});return(0,x.jsx)(J,{styles:u,zoomable:this.state.zoomable,rotatable:this.props.rotatable,parentRotateAngle:0,onResizeStart:null,onResize:this.onResize,onResizeEnd:null,onRotateStart:null,onRotateEnd:null,onDragStart:null,onDrag:this.onDrag,onDragEnd:null,onRotate:this.props.onRotate,onReverse:this.props.onReverse,text:this.props.text,children:this.props.children})}}]),i}(I.Component),U,N=j()(function e(){A()(this,e)});U=N,m()(N,"array",function(e,t){for(var i=[],r=0;r<e;r++){var n=[];i[r]=n;for(var s=0;s<t;s++)i[r].push(0)}return i}),m()(N,"rotate",function(e){if(e.length!==e[0].length||e.length!==3&&e.length!==4)throw new Error;var t=U.array(e.length,e[0].length);return e.length===3&&(t[0][0]=e[2][0],t[0][1]=e[1][0],t[0][2]=e[0][0],t[1][0]=e[2][1],t[1][1]=e[1][1],t[1][2]=e[0][1],t[2][0]=e[2][2],t[2][1]=e[1][2],t[2][2]=e[0][2]),e.length===4&&(t[0][0]=e[3][0],t[0][1]=e[2][0],t[0][2]=e[1][0],t[0][3]=e[0][0],t[1][0]=e[3][1],t[1][1]=e[2][1],t[1][2]=e[1][1],t[1][3]=e[0][1],t[2][0]=e[3][2],t[2][1]=e[2][2],t[2][2]=e[1][2],t[2][3]=e[0][2],t[3][0]=e[3][3],t[3][1]=e[2][3],t[3][2]=e[1][3],t[3][3]=e[0][3]),t}),m()(N,"reverse",function(e){if(e.length!==e[0].length||e.length!==3&&e.length!==4)throw new Error;var t=U.array(e.length,e[0].length);return e.length===3&&(t[0][0]=e[0][2],t[0][1]=e[0][1],t[0][2]=e[0][0],t[1][0]=e[1][2],t[1][1]=e[1][1],t[1][2]=e[1][0],t[2][0]=e[2][2],t[2][1]=e[2][1],t[2][2]=e[2][0]),e.length===4&&(t[0][0]=e[0][3],t[0][1]=e[0][2],t[0][2]=e[0][1],t[0][3]=e[0][0],t[1][0]=e[1][3],t[1][1]=e[1][2],t[1][2]=e[1][1],t[1][3]=e[1][0],t[2][0]=e[2][3],t[2][1]=e[2][2],t[2][2]=e[2][1],t[2][3]=e[2][0],t[3][0]=e[3][3],t[3][1]=e[3][2],t[3][2]=e[3][1],t[3][3]=e[3][0]),t});var xt=j()(function e(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:100,n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:100,s=arguments.length>4&&arguments[4]!==void 0?arguments[4]:"kept";A()(this,e),m()(this,"top",void 0),m()(this,"left",void 0),m()(this,"width",void 0),m()(this,"height",void 0),m()(this,"text",void 0),this.top=t,this.left=i,this.width=r,this.height=n,this.text=s}),K=function(e){L()(i,e);var t=D()(i);function i(r){var n;return A()(this,i),n=t.call(this,r),m()(C()(n),"onRotate",function(){var s=N.rotate(n.state.matrix);n.setState(function(l){return y()(y()({},l),{},{matrix:s})})}),m()(C()(n),"onReverse",function(){var s=N.reverse(n.state.matrix);n.setState(function(l){return y()(y()({},l),{},{matrix:s})})}),n.state={matrix:n.props.matrix||[[0,1,0],[0,1,0],[1,1,1]]},n}return j()(i,[{key:"render",value:function(){for(var n=100,s=this.state.matrix[0].length,l=this.state.matrix.length,g=[],o=0;o<l;o++)for(var h=0;h<s;h++)g.push(new xt(n*o,n*h,n,n,this.state.matrix[o][h]+""));return(0,x.jsx)(Q,{top:this.props.top||100,left:this.props.left||100,width:n*s,height:n*l,movable:!0,rotatable:!0,onRotate:this.onRotate,onReverse:this.onReverse,children:g.map(function(u){return(0,x.jsx)(Q,{top:u.top,left:u.left,text:u.text,children:u.text})})})}}]),i}(I.PureComponent),mt=function(e){L()(i,e);var t=D()(i);function i(){return A()(this,i),t.apply(this,arguments)}return j()(i,[{key:"render",value:function(){var n=[[0,1,0],[0,1,0],[1,1,1]],s=[[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],l=[[1,0,0,0],[1,1,0,0],[0,1,0,0],[0,1,0,0]];return(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{className:"center",children:"Here is play04.."}),(0,x.jsx)(K,{top:100,left:100,matrix:n}),(0,x.jsx)(K,{left:500,matrix:s}),(0,x.jsx)(K,{top:500,matrix:l})]})}}]),i}(I.Component)}}]);
