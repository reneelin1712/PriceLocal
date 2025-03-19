import{q as H,p as V,r as S,R as oe,as as Y,j as r,v as $,w as M,ag as C,x as D,a3 as te,a4 as Z,ar as A,s as _,y as W,a1 as K,ad as Q,at as se,t as ae,T as X}from"./index-CBkAv6D6.js";function re(e){return H("PrivateSwitchBase",e)}V("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const ne=e=>{const{classes:o,checked:t,disabled:s,edge:a}=e,l={root:["root",t&&"checked",s&&"disabled",a&&`edge${C(a)}`],input:["input"]};return D(l,re,o)},le=$(te)({padding:9,borderRadius:"50%",variants:[{props:{edge:"start",size:"small"},style:{marginLeft:-3}},{props:({edge:e,ownerState:o})=>e==="start"&&o.size!=="small",style:{marginLeft:-12}},{props:{edge:"end",size:"small"},style:{marginRight:-3}},{props:({edge:e,ownerState:o})=>e==="end"&&o.size!=="small",style:{marginRight:-12}}]}),ce=$("input",{shouldForwardProp:Z})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),ie=S.forwardRef(function(o,t){const{autoFocus:s,checked:a,checkedIcon:l,className:d,defaultChecked:n,disabled:v,disableFocusRipple:g=!1,edge:k=!1,icon:x,id:B,inputProps:j,inputRef:w,name:y,onBlur:b,onChange:h,onFocus:N,readOnly:q,required:P=!1,tabIndex:L,type:u,value:F,...O}=o,[f,z]=oe({controlled:a,default:!!n,name:"SwitchBase",state:"checked"}),c=Y(),E=p=>{N&&N(p),c&&c.onFocus&&c.onFocus(p)},R=p=>{b&&b(p),c&&c.onBlur&&c.onBlur(p)},m=p=>{if(p.nativeEvent.defaultPrevented)return;const J=p.target.checked;z(J),h&&h(p,J)};let i=v;c&&typeof i>"u"&&(i=c.disabled);const ee=u==="checkbox"||u==="radio",T={...o,checked:f,disabled:i,disableFocusRipple:g,edge:k},G=ne(T);return r.jsxs(le,{component:"span",className:M(G.root,d),centerRipple:!0,focusRipple:!g,disabled:i,tabIndex:null,role:void 0,onFocus:E,onBlur:R,ownerState:T,ref:t,...O,children:[r.jsx(ce,{autoFocus:s,checked:a,defaultChecked:n,className:G.input,disabled:i,id:ee?B:void 0,name:y,onChange:m,readOnly:q,ref:w,required:P,ownerState:T,tabIndex:L,type:u,...u==="checkbox"&&F===void 0?{}:{value:F},...j}),f?l:x]})}),de=A(r.jsx("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),pe=A(r.jsx("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),ue=A(r.jsx("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function me(e){return H("MuiCheckbox",e)}const U=V("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary","sizeSmall","sizeMedium"]),be=e=>{const{classes:o,indeterminate:t,color:s,size:a}=e,l={root:["root",t&&"indeterminate",`color${C(s)}`,`size${C(a)}`]},d=D(l,me,o);return{...o,...d}},he=$(ie,{shouldForwardProp:e=>Z(e)||e==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.root,t.indeterminate&&o.indeterminate,o[`size${C(t.size)}`],t.color!=="default"&&o[`color${C(t.color)}`]]}})(W(({theme:e})=>({color:(e.vars||e).palette.text.secondary,variants:[{props:{color:"default",disableRipple:!1},style:{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:K(e.palette.action.active,e.palette.action.hoverOpacity)}}},...Object.entries(e.palette).filter(Q()).map(([o])=>({props:{color:o,disableRipple:!1},style:{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette[o].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:K(e.palette[o].main,e.palette.action.hoverOpacity)}}})),...Object.entries(e.palette).filter(Q()).map(([o])=>({props:{color:o},style:{[`&.${U.checked}, &.${U.indeterminate}`]:{color:(e.vars||e).palette[o].main},[`&.${U.disabled}`]:{color:(e.vars||e).palette.action.disabled}}})),{props:{disableRipple:!1},style:{"&:hover":{"@media (hover: none)":{backgroundColor:"transparent"}}}}]}))),fe=r.jsx(pe,{}),Ce=r.jsx(de,{}),ve=r.jsx(ue,{}),Re=S.forwardRef(function(o,t){const s=_({props:o,name:"MuiCheckbox"}),{checkedIcon:a=fe,color:l="primary",icon:d=Ce,indeterminate:n=!1,indeterminateIcon:v=ve,inputProps:g,size:k="medium",disableRipple:x=!1,className:B,...j}=s,w=n?v:d,y=n?v:a,b={...s,disableRipple:x,color:l,indeterminate:n,size:k},h=be(b);return r.jsx(he,{type:"checkbox",inputProps:{"data-indeterminate":n,...g},icon:S.cloneElement(w,{fontSize:w.props.fontSize??k}),checkedIcon:S.cloneElement(y,{fontSize:y.props.fontSize??k}),ownerState:b,ref:t,className:M(h.root,B),disableRipple:x,...j,classes:h})});function ge(e){return H("MuiFormControlLabel",e)}const I=V("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error","required","asterisk"]),ke=e=>{const{classes:o,disabled:t,labelPlacement:s,error:a,required:l}=e,d={root:["root",t&&"disabled",`labelPlacement${C(s)}`,a&&"error",l&&"required"],label:["label",t&&"disabled"],asterisk:["asterisk",a&&"error"]};return D(d,ge,o)},xe=$("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[{[`& .${I.label}`]:o.label},o.root,o[`labelPlacement${C(t.labelPlacement)}`]]}})(W(({theme:e})=>({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${I.disabled}`]:{cursor:"default"},[`& .${I.label}`]:{[`&.${I.disabled}`]:{color:(e.vars||e).palette.text.disabled}},variants:[{props:{labelPlacement:"start"},style:{flexDirection:"row-reverse",marginRight:-11}},{props:{labelPlacement:"top"},style:{flexDirection:"column-reverse"}},{props:{labelPlacement:"bottom"},style:{flexDirection:"column"}},{props:({labelPlacement:o})=>o==="start"||o==="top"||o==="bottom",style:{marginLeft:16}}]}))),ye=$("span",{name:"MuiFormControlLabel",slot:"Asterisk",overridesResolver:(e,o)=>o.asterisk})(W(({theme:e})=>({[`&.${I.error}`]:{color:(e.vars||e).palette.error.main}}))),Se=S.forwardRef(function(o,t){const s=_({props:o,name:"MuiFormControlLabel"}),{checked:a,className:l,componentsProps:d={},control:n,disabled:v,disableTypography:g,inputRef:k,label:x,labelPlacement:B="end",name:j,onChange:w,required:y,slots:b={},slotProps:h={},value:N,...q}=s,P=Y(),L=v??n.props.disabled??(P==null?void 0:P.disabled),u=y??n.props.required,F={disabled:L,required:u};["checked","name","onChange","value","inputRef"].forEach(i=>{typeof n.props[i]>"u"&&typeof s[i]<"u"&&(F[i]=s[i])});const O=se({props:s,muiFormControl:P,states:["error"]}),f={...s,disabled:L,labelPlacement:B,required:u,error:O.error},z=ke(f),c={slots:b,slotProps:{...d,...h}},[E,R]=ae("typography",{elementType:X,externalForwardedProps:c,ownerState:f});let m=x;return m!=null&&m.type!==X&&!g&&(m=r.jsx(E,{component:"span",...R,className:M(z.label,R==null?void 0:R.className),children:m})),r.jsxs(xe,{className:M(z.root,l),ownerState:f,ref:t,...q,children:[S.cloneElement(n,F),u?r.jsxs("div",{children:[m,r.jsxs(ye,{ownerState:f,"aria-hidden":!0,className:z.asterisk,children:[" ","*"]})]}):m]})});export{Re as C,Se as F};
