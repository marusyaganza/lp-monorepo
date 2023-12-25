"use strict";(self.webpackChunk_lp_front=self.webpackChunk_lp_front||[]).push([[501],{7621:(t,e,n)=>{n.d(e,{a:()=>s});var r=n(2784),a=n(3557),i=n(5424),o=n(7825),u=n(438);const s=({children:t})=>{const e=(0,a.s0)(),{userId:n}=(0,r.useContext)(i.I);return(0,r.useEffect)((()=>{if(n){const t=(0,u.Y)("previousLocation")||"/";localStorage.removeItem("previousLocation"),e(t)}}),[n,e]),r.createElement("div",{className:"authPageContent"},r.createElement(o.P,null),r.createElement("main",{className:"authFormContainer"},t))}},7825:(t,e,n)=>{n.d(e,{P:()=>u});var r=n(2784),a=n(2370),i=n(3557),o=n(5424);const u=()=>{const{notification:t,setNotification:e}=(0,r.useContext)(o.I),n=(0,i.TH)(),u=(0,r.useCallback)((()=>{e()}),[e]);return(0,r.useEffect)((()=>{const t=setTimeout(u,5e3);return()=>{clearTimeout(t)}}),[t,u]),(0,r.useEffect)((()=>{t?.targetLocation!==n.pathname&&e()}),[n.pathname]),r.createElement(r.Fragment,null,t&&r.createElement(a.P_,{"data-cy":`notification-${t?.variant}`,onClose:u,...t,className:"notification"}))}},8664:(t,e,n)=>{n.d(e,{Q0:()=>s,UE:()=>o,Ym:()=>u,_5:()=>i,tz:()=>l,ym:()=>a});var r=n(7834);const a=r.Ps`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      id
    }
  }
`,i=r.Ps`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      token
      id
    }
  }
`,o=r.Ps`
  mutation SaveWord($input: NewWordInput!) {
    saveWord(input: $input) {
      name
      uuid
    }
  }
`,u=r.Ps`
  mutation DeleteWord($deleteWordId: ID!) {
    deleteWord(id: $deleteWordId)
  }
`,s=r.Ps`
  mutation UpdateWord($input: UpdateWordInput!) {
    updateWord(input: $input) {
      name
    }
  }
`,l=r.Ps`
  mutation SaveGameResult($input: [UpdateStatisticsInput!]) {
    saveGameResult(input: $input)
  }
`},3889:(t,e,n)=>{n.r(e),n.d(e,{default:()=>b});var r=n(2784),a=n(9857),i=n(2370),o=n(7621),u=n(5424),s=n(4144);const l=n.p+"4ff4161d5ab3b77a6d8d.svg",c="h8G6p5ZBKKLITlDtq17b",d="MIRI6n38YWWrFtLXriPI",m="_FBbr9KZyg99m36PsJ76",p="SvO0wkgFK7lbJHw12j4k",v="Js9qQSWbNAW7xE5UFn18",f="BceyyOadT1xagtWR76E8",g="Rzg942Ls2T8bu8jqPfoS";var E=n(3379),I=n(8664);const b=()=>{const t=[{name:"email",type:"email",required:!0,label:"Email",autoComplete:"username",validators:[i.z2.EMAIL()],errorText:"email is required"},{name:"password",type:"password",required:!0,label:"Password",autoComplete:"current-password",validators:[i.z2.PASSWORD()],errorText:"password is required"}],[e,{data:n,loading:b,error:S}]=(0,E.D)(I.ym),{login:W,setNotification:h,isDevEnv:C}=(0,r.useContext)(u.I);return(0,r.useEffect)((()=>{if(n){const{id:t,token:e}=n.login;W(t,e)}}),[n,W]),(0,r.useEffect)((()=>{S&&h({variant:"error",text:"Error",subText:S?.message})}),[S,h]),r.createElement(o.a,null,r.createElement("div",{className:m},r.createElement("div",{className:d},r.createElement("h2",{className:v},"Sign in"),r.createElement(i.l0,{"data-cy":"loginForm",id:"loginForm",isLoading:b,className:p,onFormSubmit:t=>{e({variables:{input:t}})},fields:t,buttonText:"Sign in"}),C&&r.createElement("p",{className:f},"No account?"," ",r.createElement(a.rU,{className:c,to:`/${s._.signUp}`},"Sign up"))),r.createElement("div",null,r.createElement("img",{className:g,src:l,alt:"Sign in"}))))}},3379:(t,e,n)=>{n.d(e,{D:()=>c});var r=n(2970),a=n(2784),i=n(8769),o=n(8807),u=n(7274),s=n(5832),l=n(6675);function c(t,e){var n=(0,l.x)(null==e?void 0:e.client);(0,u.Vp)(t,u.n_.Mutation);var c=a.useState({called:!1,loading:!1,client:n}),d=c[0],m=c[1],p=a.useRef({result:d,mutationId:0,isMounted:!0,client:n,mutation:t,options:e});Object.assign(p.current,{client:n,options:e,mutation:t});var v=a.useCallback((function(t){void 0===t&&(t={});var e=p.current,n=e.options,a=e.mutation,u=(0,r.pi)((0,r.pi)({},n),{mutation:a}),l=t.client||p.current.client;p.current.result.loading||u.ignoreResults||!p.current.isMounted||m(p.current.result={loading:!0,error:void 0,data:void 0,called:!0,client:l});var c=++p.current.mutationId,d=(0,i.J)(u,t);return l.mutate(d).then((function(e){var n,r,a=e.data,i=e.errors,u=i&&i.length>0?new s.cA({graphQLErrors:i}):void 0,v=t.onError||(null===(n=p.current.options)||void 0===n?void 0:n.onError);if(u&&v&&v(u,d),c===p.current.mutationId&&!d.ignoreResults){var f={called:!0,loading:!1,data:a,error:u,client:l};p.current.isMounted&&!(0,o.D)(p.current.result,f)&&m(p.current.result=f)}var g=t.onCompleted||(null===(r=p.current.options)||void 0===r?void 0:r.onCompleted);return u||null==g||g(e.data,d),e})).catch((function(e){var n;if(c===p.current.mutationId&&p.current.isMounted){var r={loading:!1,error:e,data:void 0,called:!0,client:l};(0,o.D)(p.current.result,r)||m(p.current.result=r)}var a=t.onError||(null===(n=p.current.options)||void 0===n?void 0:n.onError);if(a)return a(e,d),{data:void 0,errors:e};throw e}))}),[]),f=a.useCallback((function(){if(p.current.isMounted){var t={called:!1,loading:!1,client:n};Object.assign(p.current,{mutationId:0,result:t}),m(t)}}),[]);return a.useEffect((function(){return p.current.isMounted=!0,function(){p.current.isMounted=!1}}),[]),[v,(0,r.pi)({reset:f},d)]}}}]);