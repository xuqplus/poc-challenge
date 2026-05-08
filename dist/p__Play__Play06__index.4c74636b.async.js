"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[260],{62443:function(Et,T,i){i.r(T),i.d(T,{default:function(){return kt}});var tt=i(39346),k=i.n(tt),et=i(72589),E=i.n(et),rt=i(82644),M=i.n(rt),nt=i(53990),B=i.n(nt),ot=i(95178),$=i.n(ot),at=i(6810),G=i.n(at),it=i(60183),n=i.n(it),J=i(38497),st=i(63027),lt=i.n(st),dt=i(57295),W,O=dt.ZP.div(W||(W=lt()([`
  z-index: 20;

  outline: 1px solid red;

  .square {
    position: relative;
    width: 7px;
    height: 7px;
    background: white;
    border: 1px solid #eb5648;
    border-radius: 1px;
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
`]))),N,P=M()(function t(){E()(this,t)});N=P,n()(P,"array",function(t,e){for(var c=[],C=0;C<t;C++){var s=[];c[C]=s;for(var r=0;r<e;r++)c[C].push(0)}return c}),n()(P,"rotate",function(t){if(t.length!==t[0].length||t.length!==3&&t.length!==4)throw new Error;var e=N.array(t.length,t[0].length);return t.length===3&&(e[0][0]=t[2][0],e[0][1]=t[1][0],e[0][2]=t[0][0],e[1][0]=t[2][1],e[1][1]=t[1][1],e[1][2]=t[0][1],e[2][0]=t[2][2],e[2][1]=t[1][2],e[2][2]=t[0][2]),t.length===4&&(e[0][0]=t[3][0],e[0][1]=t[2][0],e[0][2]=t[1][0],e[0][3]=t[0][0],e[1][0]=t[3][1],e[1][1]=t[2][1],e[1][2]=t[1][1],e[1][3]=t[0][1],e[2][0]=t[3][2],e[2][1]=t[2][2],e[2][2]=t[1][2],e[2][3]=t[0][2],e[3][0]=t[3][3],e[3][1]=t[2][3],e[3][2]=t[1][3],e[3][3]=t[0][3]),e}),n()(P,"reverse",function(t){if(t.length!==t[0].length||t.length!==3&&t.length!==4)throw new Error;var e=N.array(t.length,t[0].length);return t.length===3&&(e[0][0]=t[0][2],e[0][1]=t[0][1],e[0][2]=t[0][0],e[1][0]=t[1][2],e[1][1]=t[1][1],e[1][2]=t[1][0],e[2][0]=t[2][2],e[2][1]=t[2][1],e[2][2]=t[2][0]),t.length===4&&(e[0][0]=t[0][3],e[0][1]=t[0][2],e[0][2]=t[0][1],e[0][3]=t[0][0],e[1][0]=t[1][3],e[1][1]=t[1][2],e[1][2]=t[1][1],e[1][3]=t[1][0],e[2][0]=t[2][3],e[2][1]=t[2][2],e[2][2]=t[2][1],e[2][3]=t[2][0],e[3][0]=t[3][3],e[3][1]=t[3][2],e[3][2]=t[3][1],e[3][3]=t[3][0]),e});var A=i(88540),ht=[[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],ct=[[1,0,0],[1,1,0],[1,1,0]],vt=[[1,1,1],[1,0,1],[0,0,0]],ut=[[1,1,1],[1,0,0],[1,0,0]],gt=[[1,1,0],[0,1,0],[0,1,1]],mt=[[1,1,1],[0,1,0],[0,1,0]],ft=[[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]],pt=[[1,1,0],[0,1,0],[0,1,0]],xt=[[1,1,0,0],[0,1,1,1],[0,0,0,0],[0,0,0,0]],Ct=[[1,1,0],[0,1,1],[0,0,0]],b={A:"rgb(105,165,45)",B:"rgb(145,85,160)",C:"rgb(230,225,45)",D:"rgb(20,130,240)",E:"rgb(120,100,200)",F:"rgb(105,165,45)",G:"rgb(145,85,160)",H:"rgb(230,225,45)",I:"rgb(20,130,240)",J:"rgb(120,100,200)"},Mt=null,yt=[{name:"A",matrix:ht,color:b.A},{name:"B",matrix:ct,color:b.B},{name:"C",matrix:vt,color:b.C},{name:"D",matrix:ut,color:b.D},{name:"E",matrix:gt,color:b.E},{name:"F",matrix:mt,color:b.F},{name:"G",matrix:ft,color:b.G},{name:"H",matrix:pt,color:b.H},{name:"I",matrix:xt,color:b.I},{name:"J",matrix:Ct,color:b.J}],o=M()(function t(){E()(this,t)});n()(o,"Rows",8),n()(o,"Columns",7),n()(o,"BoxSize",90),n()(o,"backgroundColor",["white","#eee"]),n()(o,"backgroundColorHighLight","#f1c309"),n()(o,"border","1px solid rgb(25,140,250)");var bt=[["january","february","march","april","may","june",""],["july","august","september","october","november","december",""],["01","02","03","04","05","06","07"],["08","09","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31","monday","tuesday","wednesday","thursday"],["","","","","friday","saturday","sunday"]],K=[[6,3],[6,4],[6,5],[6,6],[7,4],[7,5],[7,6]],Q=[[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[6,0],[6,1],[6,2]],V=[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[1,0],[1,1],[1,2],[1,3],[1,4],[1,5]],a=i(96469),q=M()(function t(){E()(this,t),n()(this,"key",void 0),n()(this,"pieceName",void 0),n()(this,"top",void 0),n()(this,"left",void 0),n()(this,"width",void 0),n()(this,"height",void 0),n()(this,"rotateAngle",void 0),n()(this,"rotatable",void 0),n()(this,"reversible",void 0),n()(this,"movable",void 0),n()(this,"matrix",void 0),n()(this,"boxSize",void 0),n()(this,"boxBackgroundColor",void 0),n()(this,"boxCursor",void 0),n()(this,"extendedMatrix",void 0),n()(this,"onDrag",void 0),n()(this,"onDragEnd",void 0),n()(this,"onDragStart",void 0),n()(this,"children",void 0),n()(this,"backgroundColor",void 0),n()(this,"border",void 0),n()(this,"position",void 0),n()(this,"cursor",void 0),n()(this,"text",void 0),n()(this,"zIndex",void 0),n()(this,"opacity",void 0)}),R=function(t){$()(c,t);var e=G()(c);function c(C,s){var r;return E()(this,c),r=e.call(this,C,s),n()(B()(r),"startDrag",function(u){if(r.props.movable){var d=u.clientX,g=u.clientY;r.props.onDragStart&&r.props.onDragStart(),r.mouseDown=!0;var l=function(f){if(r.mouseDown){f.stopImmediatePropagation();var p=f.clientX,x=f.clientY,h=p-d,S=x-g;d=p,g=x}},y=function m(){document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",m),r.mouseDown&&(r.mouseDown=!1,r.props.onDragEnd&&r.props.onDragEnd())};document.addEventListener("mousemove",l),document.addEventListener("mouseup",y)}}),n()(B()(r),"startInnerDrag",function(u,d){var g=u.clientX,l=u.clientY;r.mouseDown=!0;var y=function(p){if(r.mouseDown){p.stopImmediatePropagation();var x=p.clientX,h=p.clientY,S=x-g,z=h-l;r.props.onDrag&&r.props.onDrag(S,z),r.setState(function(w){var Y=o.BoxSize,I=Y,U=Y,j=w.top+z,Z=w.left+S;return k()(k()({},w),{},{top:j,left:Z,width:I,height:U,boxSize:Y})}),g=x,l=h}},m=function f(){document.removeEventListener("mousemove",y),document.removeEventListener("mouseup",f),r.mouseDown&&(r.mouseDown=!1,r.props.onDragEnd&&r.props.onDragEnd())};document.addEventListener("mousemove",y),document.addEventListener("mouseup",m)}),n()(B()(r),"onRotate",function(){var u=P.rotate(r.state.matrix);r.setState(function(d){return k()(k()({},d),{},{matrix:u})})}),n()(B()(r),"onReverse",function(){var u=P.reverse(r.state.matrix);r.setState(function(d){return k()(k()({},d),{},{matrix:u})})}),r.state=k()({},C),r}return M()(c,[{key:"render",value:function(){var s=this.props,r=s.key,u=s.border,d=s.cursor,g=s.boxCursor,l=s.boxBackgroundColor,y=s.position,m=s.zIndex,f=s.opacity,p=s.backgroundColor,x=s.text,h=this.state,S=h.top,z=h.left,w=h.width,Y=h.height,I=h.boxSize,U=h.rotateAngle,j=h.matrix,Z=[];if(j&&j.length&&j[0])for(var zt=j[0].length,It=j.length,H=0;H<It;H++)for(var X=0;X<zt;X++){var v=new q;v.key="".concat(r,"-").concat(H,"-").concat(X),v.top=I*H,v.left=I*X,v.width=I,v.height=I,v.onDrag=this.startInnerDrag;var jt=this.state.matrix[H][X];jt?(v.backgroundColor=l,v.cursor=g,v.zIndex=m+1,v.width=I,v.height=I):(v.backgroundColor=void 0,v.cursor=void 0,v.zIndex=m-1),Z.push(v)}var Bt={top:S,left:z,width:w,height:Y,transform:"rotate(".concat(U,"deg)"),cursor:d,userSelect:"none",border:u,backgroundColor:p,position:y||"absolute",zIndex:m,opacity:f};return(0,a.jsxs)(O,{onMouseDown:this.startDrag,style:Bt,children:[this.props.children,x&&(0,a.jsx)("div",{style:{fontSize:"1.1em",lineHeight:"1em",margin:"0.6em 0.3em 0"},children:(0,a.jsx)(A.FormattedMessage,{id:x},"backboard-text-".concat(x))}),Z&&Z.map(function(D){var Pt={top:D.top,left:D.left,width:D.width,height:D.height,cursor:D.cursor,userSelect:"none",backgroundColor:D.backgroundColor,position:"absolute",zIndex:D.zIndex,opacity:D.opacity};return(0,a.jsx)(O,{onMouseDown:D.onDrag,style:Pt},D.key)}),this.props.rotatable&&(0,a.jsx)("div",{className:"rotate",onClick:this.onRotate,children:(0,a.jsx)("svg",{width:"14",height:"14",xmlns:"http://www.w3.org/2000/svg",children:(0,a.jsx)("image",{width:"14",height:"14",href:"/icons/cycle-arrow.png"})})}),this.props.reversible&&(0,a.jsx)("div",{className:"reverse",onClick:this.onReverse,children:(0,a.jsx)("svg",{width:"14",height:"14",xmlns:"http://www.w3.org/2000/svg",children:(0,a.jsx)("image",{width:"14",height:"14",href:"/icons/left-right-arrow.png"})})})]})}}]),c}(J.PureComponent),St=i(97611),F=i(86740),L=i(69681),_=i(59835),wt=i(51723),Dt=i(82009),kt=function(t){$()(c,t);var e=G()(c);function c(C,s){var r;E()(this,c),r=e.call(this,C,s),n()(B()(r),"onDateChange",function(y){var m=y.$W-1,f=y.$D-1,p=y.$M;m===r.state.week&&f===r.state.day&&p===r.state.month||r.setState(function(x){for(var h=x.backboard,S=0;S<o.Rows;S++)for(var z=0;z<o.Columns;z++){var w=h[S*o.Columns+z];w.text===""?w.backgroundColor="":(w.backgroundColor=o.backgroundColor[(S+z)%2],w.border=o.border)}return h[K[m][0]*o.Columns+K[m][1]].backgroundColor=o.backgroundColorHighLight,h[Q[f][0]*o.Columns+Q[f][1]].backgroundColor=o.backgroundColorHighLight,h[V[p][0]*o.Columns+V[p][1]].backgroundColor=o.backgroundColorHighLight,k()(k()({},x),{},{month:p,day:f,week:m})})}),n()(B()(r),"resolve",function(){St.ZP.info("".concat((0,A.formatMessage)({id:"develop.wait"})))});for(var u=[],d=0;d<o.Rows;d++)for(var g=0;g<o.Columns;g++){var l=new q;l.key="backboard-".concat(d,"-").concat(g),l.top=o.BoxSize*d,l.left=o.BoxSize*g,l.width=o.BoxSize,l.height=o.BoxSize,l.zIndex=0,l.text=bt[d][g],l.text===""?l.backgroundColor="":(l.backgroundColor=o.backgroundColor[(d+g)%2],l.border=o.border),u.push(l)}return r.state={backboard:u,month:0,day:0,week:0},r}return M()(c,[{key:"render",value:function(){return(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:"center",children:"Here is play 06.."}),(0,a.jsxs)(F.Z,{children:[(0,a.jsx)(L.Z,{span:12,children:this.state.backboard.map(function(s){return(0,a.jsx)(R,{top:s.top,left:s.left,width:s.width,height:s.height,zIndex:s.zIndex,border:s.border,text:s.text,backgroundColor:s.backgroundColor,rotatable:!1,reversible:!1})})}),(0,a.jsxs)(L.Z,{span:8,children:[(0,a.jsx)(F.Z,{children:(0,a.jsx)(_.Z,{grid:{gutter:16,column:4},dataSource:yt,renderItem:function(r){return(0,a.jsxs)(_.Z.Item,{children:[r.name,(0,a.jsx)(R,{top:0,left:0,pieceName:r.name,width:o.BoxSize/3*r.matrix.length,height:o.BoxSize/3*r.matrix.length,position:"relative",zIndex:-1,rotatable:!1,reversible:!1,movable:!1},"piece-pickup-placeholder-".concat(r.name)),(0,a.jsx)(R,{pieceName:r.name,top:o.BoxSize/3,left:o.BoxSize/3,width:o.BoxSize/3*r.matrix.length,height:o.BoxSize/3*r.matrix.length,matrix:r.matrix,boxBackgroundColor:r.color,zIndex:10,boxSize:o.BoxSize/3,position:"absolute",boxCursor:"pointer",opacity:.92,rotatable:!1,reversible:!1,movable:!1},"piece-pickup-".concat(r.name))]})}})}),(0,a.jsxs)(F.Z,{children:[(0,a.jsx)(L.Z,{span:8,children:(0,a.jsx)(wt.Z,{format:"YYYY-MM-DD",allowClear:!1,onChange:this.onDateChange})}),(0,a.jsx)(L.Z,{span:12,children:(0,a.jsx)(Dt.ZP,{type:"primary",onClick:this.resolve,children:(0,a.jsx)(A.FormattedMessage,{id:"resolve"})})})]})]}),(0,a.jsx)(L.Z,{span:1,offset:1,children:(0,a.jsx)(A.SelectLang,{className:"ant-dropdown-trigger css-lye32u",reload:!1})})]})]})}}]),c}(J.Component)}}]);
