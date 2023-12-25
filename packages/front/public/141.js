"use strict";(self.webpackChunk_lp_front=self.webpackChunk_lp_front||[]).push([[141],{7621:(e,t,r)=>{r.d(t,{a:()=>l});var n=r(2784),a=r.n(n),i=r(3557),o=r(5424),u=r(7825),s=r(438);const l=({children:e})=>{const t=(0,i.s0)(),{userId:r}=(0,n.useContext)(o.I);return(0,n.useEffect)((()=>{if(r){const e=(0,s.Y)("previousLocation")||"/";localStorage.removeItem("previousLocation"),t(e)}}),[r,t]),a().createElement("div",{className:"authPageContent"},a().createElement(u.P,null),a().createElement("main",{className:"authFormContainer"},e))}},7825:(e,t,r)=>{r.d(t,{P:()=>s});var n=r(2784),a=r.n(n),i=r(2370),o=r(3557),u=r(5424);const s=()=>{const{notification:e,setNotification:t}=(0,n.useContext)(u.I),r=(0,o.TH)(),s=(0,n.useCallback)((()=>{t()}),[t]);return(0,n.useEffect)((()=>{const e=setTimeout(s,5e3);return()=>{clearTimeout(e)}}),[e,s]),(0,n.useEffect)((()=>{e?.targetLocation!==r.pathname&&t()}),[r.pathname]),a().createElement(a().Fragment,null,e&&a().createElement(i.P_,{"data-cy":`notification-${e?.variant}`,onClose:s,...e,className:"notification"}))}},8664:(e,t,r)=>{r.d(t,{Q0:()=>s,UE:()=>o,Ym:()=>u,_5:()=>i,tz:()=>l,ym:()=>a});var n=r(7834);const a=n.Ps`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      id
    }
  }
`,i=n.Ps`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      token
      id
    }
  }
`,o=n.Ps`
  mutation SaveWord($input: NewWordInput!) {
    saveWord(input: $input) {
      name
      uuid
    }
  }
`,u=n.Ps`
  mutation DeleteWord($deleteWordId: ID!) {
    deleteWord(id: $deleteWordId)
  }
`,s=n.Ps`
  mutation UpdateWord($input: UpdateWordInput!) {
    updateWord(input: $input) {
      name
    }
  }
`,l=n.Ps`
  mutation SaveGameResult($input: [UpdateStatisticsInput!]) {
    saveGameResult(input: $input)
  }
`},141:(e,t,r)=>{r.r(t),r.d(t,{default:()=>E});var n=r(2784),a=r.n(n),i=r(3557),o=r(9857),u=r(2370),s=r(7621),l=r(5424),d=r(4144);const c="LrOpoUplnsGX8yV7kYJr",m="rn6oJWfOlKIw51TWhuwV",p="y6B7lV7uDNxkcMjucEVj",v="eqeAExizodRsPHyjuLVe";var f=r(3379),g=r(8664);const E=()=>{const e=[{name:"firstName",type:"text",required:!0,label:"First Name",autoComplete:"given-name",validators:[u.z2.MINLENGTH(2)],errorText:"first name is required"},{name:"lastName",type:"text",required:!0,label:"Last Name",autoComplete:"family-name",validators:[u.z2.MINLENGTH(2)],errorText:"first name is required"},{name:"email",type:"email",required:!0,label:"Email",autoComplete:"new-password",validators:[u.z2.EMAIL()],errorText:"email is required"},{name:"password",type:"password",required:!0,label:"Password",validators:[u.z2.PASSWORD()],errorText:"password is required"},{name:"repeatPassword",type:"password",required:!0,label:"Repeat password",autoComplete:"new-password",validators:[u.z2.PASSWORD()],errorText:"passwords don't match"},{name:"primaryLanguage",type:"text",required:!1,label:"Primary language",validators:[],errorText:""}],[t,{data:r,loading:E,error:I}]=(0,f.D)(g._5),{login:w,setNotification:N,isDevEnv:x}=(0,n.useContext)(l.I),b=(0,i.s0)();return(0,n.useEffect)((()=>{if(r){const e=r.signUp;w(e.id,e.token)}}),[r,w]),(0,n.useEffect)((()=>{I&&N({variant:"error",text:"Error",subText:I?.message})}),[I,N]),(0,n.useEffect)((()=>{x||b("/sign-in")}),[x,b]),a().createElement(s.a,null,a().createElement("h2",{className:p},"Sign up"),a().createElement(u.l0,{id:"signUp",isLoading:E,className:m,onFormSubmit:e=>{t({variables:{input:e}})},fields:e,buttonText:"Sign up"}),a().createElement("p",{className:v},"already have account?"," ",a().createElement(o.rU,{className:c,to:`/${d._.signIn}`},"Sign in")))}},3379:(e,t,r)=>{r.d(t,{D:()=>d});var n=r(2970),a=r(2784),i=r(8769),o=r(8807),u=r(7274),s=r(5832),l=r(6675);function d(e,t){var r=(0,l.x)(null==t?void 0:t.client);(0,u.Vp)(e,u.n_.Mutation);var d=a.useState({called:!1,loading:!1,client:r}),c=d[0],m=d[1],p=a.useRef({result:c,mutationId:0,isMounted:!0,client:r,mutation:e,options:t});Object.assign(p.current,{client:r,options:t,mutation:e});var v=a.useCallback((function(e){void 0===e&&(e={});var t=p.current,r=t.options,a=t.mutation,u=(0,n.pi)((0,n.pi)({},r),{mutation:a}),l=e.client||p.current.client;p.current.result.loading||u.ignoreResults||!p.current.isMounted||m(p.current.result={loading:!0,error:void 0,data:void 0,called:!0,client:l});var d=++p.current.mutationId,c=(0,i.J)(u,e);return l.mutate(c).then((function(t){var r,n,a=t.data,i=t.errors,u=i&&i.length>0?new s.cA({graphQLErrors:i}):void 0,v=e.onError||(null===(r=p.current.options)||void 0===r?void 0:r.onError);if(u&&v&&v(u,c),d===p.current.mutationId&&!c.ignoreResults){var f={called:!0,loading:!1,data:a,error:u,client:l};p.current.isMounted&&!(0,o.D)(p.current.result,f)&&m(p.current.result=f)}var g=e.onCompleted||(null===(n=p.current.options)||void 0===n?void 0:n.onCompleted);return u||null==g||g(t.data,c),t})).catch((function(t){var r;if(d===p.current.mutationId&&p.current.isMounted){var n={loading:!1,error:t,data:void 0,called:!0,client:l};(0,o.D)(p.current.result,n)||m(p.current.result=n)}var a=e.onError||(null===(r=p.current.options)||void 0===r?void 0:r.onError);if(a)return a(t,c),{data:void 0,errors:t};throw t}))}),[]),f=a.useCallback((function(){if(p.current.isMounted){var e={called:!1,loading:!1,client:r};Object.assign(p.current,{mutationId:0,result:e}),m(e)}}),[]);return a.useEffect((function(){return p.current.isMounted=!0,function(){p.current.isMounted=!1}}),[]),[v,(0,n.pi)({reset:f},c)]}}}]);