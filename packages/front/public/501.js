"use strict";(self.webpackChunk_lp_front=self.webpackChunk_lp_front||[]).push([[501],{7621:(t,e,n)=>{n.d(e,{a:()=>l});var r=n(2784),a=n.n(r),i=n(3557),o=n(5424),u=n(7825),s=n(438);const l=({children:t})=>{const e=(0,i.s0)(),{userId:n}=(0,r.useContext)(o.I);return(0,r.useEffect)((()=>{if(n){const t=(0,s.Y)("previousLocation")||"/";localStorage.removeItem("previousLocation"),e(t)}}),[n,e]),a().createElement("div",{className:"authPageContent"},a().createElement(u.P,null),a().createElement("main",{className:"authFormContainer"},t))}},7825:(t,e,n)=>{n.d(e,{P:()=>s});var r=n(2784),a=n.n(r),i=n(2370),o=n(3557),u=n(5424);const s=()=>{const{notification:t,setNotification:e}=(0,r.useContext)(u.I),n=(0,o.TH)(),s=(0,r.useCallback)((()=>{e()}),[e]);return(0,r.useEffect)((()=>{const t=setTimeout(s,5e3);return()=>{clearTimeout(t)}}),[t,s]),(0,r.useEffect)((()=>{t?.targetLocation!==n.pathname&&e()}),[n.pathname]),a().createElement(a().Fragment,null,t&&a().createElement(i.P_,{"data-cy":`notification-${t?.variant}`,onClose:s,...t,className:"notification"}))}},8664:(t,e,n)=>{n.d(e,{Q0:()=>s,UE:()=>o,Ym:()=>u,_5:()=>i,tz:()=>l,ym:()=>a});var r=n(7834);const a=r.Ps`
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
`},3889:(t,e,n)=>{n.r(e),n.d(e,{default:()=>S});var r=n(2784),a=n.n(r),i=n(9857),o=n(2370),u=n(7621),s=n(5424),l=n(4144);const c=n.p+"4ff4161d5ab3b77a6d8d.svg",d="h8G6p5ZBKKLITlDtq17b",m="MIRI6n38YWWrFtLXriPI",p="_FBbr9KZyg99m36PsJ76",v="SvO0wkgFK7lbJHw12j4k",f="Js9qQSWbNAW7xE5UFn18",g="BceyyOadT1xagtWR76E8",E="Rzg942Ls2T8bu8jqPfoS";var I=n(3379),b=n(8664);const S=()=>{const t=[{name:"email",type:"email",required:!0,label:"Email",autoComplete:"username",validators:[o.z2.EMAIL()],errorText:"email is required"},{name:"password",type:"password",required:!0,label:"Password",autoComplete:"current-password",validators:[o.z2.PASSWORD()],errorText:"password is required"}],[e,{data:n,loading:S,error:W}]=(0,I.D)(b.ym),{login:h,setNotification:C,isDevEnv:N}=(0,r.useContext)(s.I);return(0,r.useEffect)((()=>{if(n){const{id:t,token:e}=n.login;h(t,e)}}),[n,h]),(0,r.useEffect)((()=>{W&&C({variant:"error",text:"Error",subText:W?.message})}),[W,C]),a().createElement(u.a,null,a().createElement("div",{className:p},a().createElement("div",{className:m},a().createElement("h2",{className:f},"Sign in"),a().createElement(o.l0,{"data-cy":"loginForm",id:"loginForm",isLoading:S,className:v,onFormSubmit:t=>{e({variables:{input:t}})},fields:t,buttonText:"Sign in"}),N&&a().createElement("p",{className:g},"No account?"," ",a().createElement(i.rU,{className:d,to:`/${l._.signUp}`},"Sign up"))),a().createElement("div",null,a().createElement("img",{className:E,src:c,alt:"Sign in"}))))}},3379:(t,e,n)=>{n.d(e,{D:()=>c});var r=n(2970),a=n(2784),i=n(8769),o=n(8807),u=n(7274),s=n(5832),l=n(6675);function c(t,e){var n=(0,l.x)(null==e?void 0:e.client);(0,u.Vp)(t,u.n_.Mutation);var c=a.useState({called:!1,loading:!1,client:n}),d=c[0],m=c[1],p=a.useRef({result:d,mutationId:0,isMounted:!0,client:n,mutation:t,options:e});Object.assign(p.current,{client:n,options:e,mutation:t});var v=a.useCallback((function(t){void 0===t&&(t={});var e=p.current,n=e.options,a=e.mutation,u=(0,r.pi)((0,r.pi)({},n),{mutation:a}),l=t.client||p.current.client;p.current.result.loading||u.ignoreResults||!p.current.isMounted||m(p.current.result={loading:!0,error:void 0,data:void 0,called:!0,client:l});var c=++p.current.mutationId,d=(0,i.J)(u,t);return l.mutate(d).then((function(e){var n,r,a=e.data,i=e.errors,u=i&&i.length>0?new s.cA({graphQLErrors:i}):void 0,v=t.onError||(null===(n=p.current.options)||void 0===n?void 0:n.onError);if(u&&v&&v(u,d),c===p.current.mutationId&&!d.ignoreResults){var f={called:!0,loading:!1,data:a,error:u,client:l};p.current.isMounted&&!(0,o.D)(p.current.result,f)&&m(p.current.result=f)}var g=t.onCompleted||(null===(r=p.current.options)||void 0===r?void 0:r.onCompleted);return u||null==g||g(e.data,d),e})).catch((function(e){var n;if(c===p.current.mutationId&&p.current.isMounted){var r={loading:!1,error:e,data:void 0,called:!0,client:l};(0,o.D)(p.current.result,r)||m(p.current.result=r)}var a=t.onError||(null===(n=p.current.options)||void 0===n?void 0:n.onError);if(a)return a(e,d),{data:void 0,errors:e};throw e}))}),[]),f=a.useCallback((function(){if(p.current.isMounted){var t={called:!1,loading:!1,client:n};Object.assign(p.current,{mutationId:0,result:t}),m(t)}}),[]);return a.useEffect((function(){return p.current.isMounted=!0,function(){p.current.isMounted=!1}}),[]),[v,(0,r.pi)({reset:f},d)]}}}]);