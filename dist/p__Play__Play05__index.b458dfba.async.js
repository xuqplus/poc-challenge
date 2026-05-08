"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[989],{29305:function(Pt,X,a){a.r(X),a.d(X,{default:function(){return wt}});var tt=a(39346),b=a.n(tt),rt=a(72589),E=a.n(rt),et=a(82644),M=a.n(et),nt=a(53990),I=a.n(nt),ot=a(95178),G=a.n(ot),it=a(6810),J=a.n(it),at=a(60183),n=a.n(at),U=a(38497),st=a(63027),lt=a.n(st),dt=a(57295),W,O=dt.ZP.div(W||(W=lt()([`
  z-index: 20;

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
`]))),A,P=M()(function t(){E()(this,t)});A=P,n()(P,"array",function(t,r){for(var d=[],u=0;u<t;u++){var s=[];d[u]=s;for(var e=0;e<r;e++)d[u].push(0)}return d}),n()(P,"rotate",function(t){if(t.length!==t[0].length||t.length!==3&&t.length!==4)throw new Error;var r=A.array(t.length,t[0].length);return t.length===3&&(r[0][0]=t[2][0],r[0][1]=t[1][0],r[0][2]=t[0][0],r[1][0]=t[2][1],r[1][1]=t[1][1],r[1][2]=t[0][1],r[2][0]=t[2][2],r[2][1]=t[1][2],r[2][2]=t[0][2]),t.length===4&&(r[0][0]=t[3][0],r[0][1]=t[2][0],r[0][2]=t[1][0],r[0][3]=t[0][0],r[1][0]=t[3][1],r[1][1]=t[2][1],r[1][2]=t[1][1],r[1][3]=t[0][1],r[2][0]=t[3][2],r[2][1]=t[2][2],r[2][2]=t[1][2],r[2][3]=t[0][2],r[3][0]=t[3][3],r[3][1]=t[2][3],r[3][2]=t[1][3],r[3][3]=t[0][3]),r}),n()(P,"reverse",function(t){if(t.length!==t[0].length||t.length!==3&&t.length!==4)throw new Error;var r=A.array(t.length,t[0].length);return t.length===3&&(r[0][0]=t[0][2],r[0][1]=t[0][1],r[0][2]=t[0][0],r[1][0]=t[1][2],r[1][1]=t[1][1],r[1][2]=t[1][0],r[2][0]=t[2][2],r[2][1]=t[2][1],r[2][2]=t[2][0]),t.length===4&&(r[0][0]=t[0][3],r[0][1]=t[0][2],r[0][2]=t[0][1],r[0][3]=t[0][0],r[1][0]=t[1][3],r[1][1]=t[1][2],r[1][2]=t[1][1],r[1][3]=t[1][0],r[2][0]=t[2][3],r[2][1]=t[2][2],r[2][2]=t[2][1],r[2][3]=t[2][0],r[3][0]=t[3][3],r[3][1]=t[3][2],r[3][2]=t[3][1],r[3][3]=t[3][0]),r});var Y=a(88540),ht=[[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],ct=[[1,0,0],[1,1,0],[1,1,0]],vt=[[1,1,1],[1,0,1],[0,0,0]],ut=[[1,1,1],[1,0,0],[1,0,0]],gt=[[1,1,0],[0,1,0],[0,1,1]],mt=[[1,1,1],[0,1,0],[0,1,0]],ft=[[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]],pt=[[1,1,0],[0,1,0],[0,1,0]],xt=[[1,1,0,0],[0,1,1,1],[0,0,0,0],[0,0,0,0]],Ct=[[1,1,0],[0,1,1],[0,0,0]],m={A:"rgb(105,165,45)",B:"rgb(145,85,160)",C:"rgb(230,225,45)",D:"rgb(20,130,240)",E:"rgb(120,100,200)",F:"rgb(105,165,45)",G:"rgb(145,85,160)",H:"rgb(230,225,45)",I:"rgb(20,130,240)",J:"rgb(120,100,200)"},Et=null,bt=[{name:"A",matrix:ht,color:m.A},{name:"B",matrix:ct,color:m.B},{name:"C",matrix:vt,color:m.C},{name:"D",matrix:ut,color:m.D},{name:"E",matrix:gt,color:m.E},{name:"F",matrix:mt,color:m.F},{name:"G",matrix:ft,color:m.G},{name:"H",matrix:pt,color:m.H},{name:"I",matrix:xt,color:m.I},{name:"J",matrix:Ct,color:m.J}],o=M()(function t(){E()(this,t)});n()(o,"Rows",8),n()(o,"Columns",7),n()(o,"BoxSize",90),n()(o,"backgroundColor",["white","#eee"]),n()(o,"backgroundColorHighLight","#f1c309"),n()(o,"border","1px solid rgb(25,140,250)");var yt=[["january","february","march","april","may","june",""],["july","august","september","october","november","december",""],["01","02","03","04","05","06","07"],["08","09","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31","monday","tuesday","wednesday","thursday"],["","","","","friday","saturday","sunday"]],K=[[6,3],[6,4],[6,5],[6,6],[7,4],[7,5],[7,6]],Q=[[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[6,0],[6,1],[6,2]],V=[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[1,0],[1,1],[1,2],[1,3],[1,4],[1,5]],i=a(96469),Mt={n:"t",s:"b",e:"r",w:"l",ne:"tr",nw:"tl",se:"br",sw:"bl"},q=M()(function t(){E()(this,t),n()(this,"key",void 0),n()(this,"pieceName",void 0),n()(this,"top",void 0),n()(this,"left",void 0),n()(this,"width",void 0),n()(this,"height",void 0),n()(this,"rotateAngle",void 0),n()(this,"rotatable",void 0),n()(this,"reversible",void 0),n()(this,"movable",void 0),n()(this,"matrix",void 0),n()(this,"boxSize",void 0),n()(this,"boxBackgroundColor",void 0),n()(this,"boxCursor",void 0),n()(this,"extendedMatrix",void 0),n()(this,"onDrag",void 0),n()(this,"onDragEnd",void 0),n()(this,"onDragStart",void 0),n()(this,"children",void 0),n()(this,"backgroundColor",void 0),n()(this,"border",void 0),n()(this,"position",void 0),n()(this,"cursor",void 0),n()(this,"text",void 0),n()(this,"zIndex",void 0),n()(this,"opacity",void 0)}),N=function(t){G()(d,t);var r=J()(d);function d(u,s){var e;return E()(this,d),e=r.call(this,u,s),n()(I()(e),"setElementRef",function(v){e.$element=v}),n()(I()(e),"startDrag",function(v){if(e.props.movable){var h=v.clientX,g=v.clientY;e.props.onDragStart&&e.props.onDragStart(),e.mouseDown=!0;var l=function(p){if(e.mouseDown){p.stopImmediatePropagation();var y=p.clientX,S=p.clientY,c=y-h,k=S-g;e.props.onDrag&&e.props.onDrag(c,k),e.setState(function(x){var C,$=o.BoxSize,j=$*((C=e.props.matrix)===null||C===void 0?void 0:C.length),T=j,B=x.top+k,L=x.left+c;return b()(b()({},x),{},{top:B,left:L,width:j,height:T,boxSize:$})}),h=y,g=S}},D=function f(){document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",f),e.mouseDown&&(e.mouseDown=!1,e.props.onDragEnd&&e.props.onDragEnd())};document.addEventListener("mousemove",l),document.addEventListener("mouseup",D)}}),n()(I()(e),"onRotate",function(){var v=P.rotate(e.state.matrix);e.setState(function(h){return b()(b()({},h),{},{matrix:v})})}),n()(I()(e),"onReverse",function(){var v=P.reverse(e.state.matrix);e.setState(function(h){return b()(b()({},h),{},{matrix:v})})}),e.state=b()({},u),e}return M()(d,[{key:"render",value:function(){var s=this.props,e=s.key,v=s.border,h=s.cursor,g=s.boxCursor,l=s.boxBackgroundColor,D=s.position,f=s.zIndex,p=s.opacity,y=s.backgroundColor,S=s.text,c=this.state,k=c.top,x=c.left,C=c.width,$=c.height,j=c.boxSize,T=c.rotateAngle,B=c.matrix,L=[];if(B&&B.length&&B[0])for(var Dt=B[0].length,jt=B.length,H=0;H<jt;H++)for(var R=0;R<Dt;R++){var z=new q;z.key="".concat(e,"-").concat(H,"-").concat(R),z.top=j*H,z.left=j*R,z.width=j,z.height=j,z.backgroundColor=this.state.matrix[H][R]?l:void 0,z.cursor=g,z.zIndex=f+1,L.push(z)}var Bt={top:k,left:x,width:C,height:$,transform:"rotate(".concat(T,"deg)"),cursor:h,userSelect:"none",border:v,backgroundColor:y,position:D||"absolute",zIndex:f,opacity:p};return(0,i.jsxs)(O,{ref:this.setElementRef,onMouseDown:this.startDrag,style:Bt,children:[this.props.children,S&&(0,i.jsx)("div",{style:{fontSize:"1.1em",lineHeight:"1em",margin:"0.6em 0.3em 0"},children:(0,i.jsx)(Y.FormattedMessage,{id:S},"backboard-text-".concat(S))}),L&&L.map(function(w){var It={top:w.top,left:w.left,width:w.width,height:w.height,cursor:w.cursor,userSelect:"none",backgroundColor:w.backgroundColor,position:"absolute",zIndex:w.zIndex,opacity:w.opacity};return(0,i.jsx)(O,{style:It},w.key)}),this.props.rotatable&&(0,i.jsx)("div",{className:"rotate",onClick:this.onRotate,children:(0,i.jsx)("svg",{width:"14",height:"14",xmlns:"http://www.w3.org/2000/svg",children:(0,i.jsx)("image",{width:"14",height:"14",href:"/icons/cycle-arrow.png"})})}),this.props.reversible&&(0,i.jsx)("div",{className:"reverse",onClick:this.onReverse,children:(0,i.jsx)("svg",{width:"14",height:"14",xmlns:"http://www.w3.org/2000/svg",children:(0,i.jsx)("image",{width:"14",height:"14",href:"/icons/left-right-arrow.png"})})})]})}}]),d}(U.PureComponent),St=a(97611),F=a(86740),Z=a(69681),_=a(59835),kt=a(51723),zt=a(82009),wt=function(t){G()(d,t);var r=J()(d);function d(u,s){var e;E()(this,d),e=r.call(this,u,s),n()(I()(e),"onDateChange",function(D){var f=D.$W-1,p=D.$D-1,y=D.$M;f===e.state.week&&p===e.state.day&&y===e.state.month||e.setState(function(S){for(var c=S.backboard,k=0;k<o.Rows;k++)for(var x=0;x<o.Columns;x++){var C=c[k*o.Columns+x];C.text===""?C.backgroundColor="":(C.backgroundColor=o.backgroundColor[(k+x)%2],C.border=o.border)}return c[K[f][0]*o.Columns+K[f][1]].backgroundColor=o.backgroundColorHighLight,c[Q[p][0]*o.Columns+Q[p][1]].backgroundColor=o.backgroundColorHighLight,c[V[y][0]*o.Columns+V[y][1]].backgroundColor=o.backgroundColorHighLight,b()(b()({},S),{},{month:y,day:p,week:f})})}),n()(I()(e),"resolve",function(){St.ZP.info("".concat((0,Y.formatMessage)({id:"develop.wait"})))});for(var v=[],h=0;h<o.Rows;h++)for(var g=0;g<o.Columns;g++){var l=new q;l.key="backboard-".concat(h,"-").concat(g),l.top=o.BoxSize*h,l.left=o.BoxSize*g,l.width=o.BoxSize,l.height=o.BoxSize,l.zIndex=0,l.text=yt[h][g],l.text===""?l.backgroundColor="":(l.backgroundColor=o.backgroundColor[(h+g)%2],l.border=o.border),v.push(l)}return e.state={backboard:v,month:0,day:0,week:0},e}return M()(d,[{key:"render",value:function(){return(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"center",children:"Here is play 05.."}),(0,i.jsxs)(F.Z,{children:[(0,i.jsx)(Z.Z,{span:12,children:this.state.backboard.map(function(s){return(0,i.jsx)(N,{top:s.top,left:s.left,width:s.width,height:s.height,zIndex:s.zIndex,border:s.border,text:s.text,backgroundColor:s.backgroundColor,rotatable:!1,reversible:!1})})}),(0,i.jsxs)(Z.Z,{span:8,children:[(0,i.jsx)(F.Z,{children:(0,i.jsx)(_.Z,{grid:{gutter:16,column:4},dataSource:bt,renderItem:function(e){return(0,i.jsxs)(_.Z.Item,{children:[e.name,(0,i.jsx)(N,{top:0,left:0,pieceName:e.name,width:o.BoxSize/3*e.matrix.length,height:o.BoxSize/3*e.matrix.length,position:"relative",zIndex:-1,rotatable:!1,reversible:!1,movable:!1},"piece-pickup-placeholder-".concat(e.name)),(0,i.jsx)(N,{pieceName:e.name,top:o.BoxSize/3,left:o.BoxSize/3,width:o.BoxSize/3*e.matrix.length,height:o.BoxSize/3*e.matrix.length,matrix:e.matrix,boxBackgroundColor:e.color,zIndex:10,boxSize:o.BoxSize/3,position:"absolute",boxCursor:"pointer",opacity:.92,rotatable:!1,reversible:!1,movable:!0},"piece-pickup-".concat(e.name))]})}})}),(0,i.jsxs)(F.Z,{children:[(0,i.jsx)(Z.Z,{span:8,children:(0,i.jsx)(kt.Z,{format:"YYYY-MM-DD",allowClear:!1,onChange:this.onDateChange})}),(0,i.jsx)(Z.Z,{span:12,children:(0,i.jsx)(zt.ZP,{type:"primary",onClick:this.resolve,children:(0,i.jsx)(Y.FormattedMessage,{id:"resolve"})})})]})]}),(0,i.jsx)(Z.Z,{span:1,offset:1,children:(0,i.jsx)(Y.SelectLang,{className:"ant-dropdown-trigger css-lye32u",reload:!1})})]})]})}}]),d}(U.Component)}}]);
