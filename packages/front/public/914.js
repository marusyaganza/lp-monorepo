"use strict";(self.webpackChunk_lp_front=self.webpackChunk_lp_front||[]).push([[914],{7825:(e,t,r)=>{r.d(t,{P:()=>l});var n=r(2784),a=r.n(n),o=r(2370),i=r(3557),s=r(5424);const l=()=>{const{notification:e,setNotification:t}=(0,n.useContext)(s.I),r=(0,i.TH)(),l=(0,n.useCallback)((()=>{t()}),[t]);return(0,n.useEffect)((()=>{const e=setTimeout(l,5e3);return()=>{clearTimeout(e)}}),[e,l]),(0,n.useEffect)((()=>{e?.targetLocation!==r.pathname&&t()}),[r.pathname]),a().createElement(a().Fragment,null,e&&a().createElement(o.P_,{"data-cy":`notification-${e?.variant}`,onClose:l,...e,className:"notification"}))}},7752:(e,t,r)=>{r.d(t,{X:()=>g});var n=r(2784),a=r.n(n),o=r(3557),i=r(4144);const s=[{url:"/",text:"Home",icon:"home"},{url:`/${i._.search}`,text:"Explore",icon:"explorer"},{url:`/${i._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${i._.games}`,text:"Practice",icon:"dice"}],l=[{url:`/${i._.search}`,text:"Explore",icon:"explorer"},{url:`/${i._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${i._.games}`,text:"Practice",icon:"dice"},{url:"/profile",text:"Profile",icon:"dragon"}],u=[{url:"/",text:"Home",icon:"home"},{url:`/${i._.search}`,text:"Explore",icon:"explorer"},{url:`/${i._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${i._.games}`,text:"Practice",icon:"dice"}];var c=r(6525),d=r(2370),m=r(5424),f=r(7825),p=r(438);const v=[{text:"Review words",url:`/${i._.words}`},{text:"Look up words",url:`/${i._.search}`},{text:"Practice",url:`/${i._.games}`},{text:"Profile",url:`/${i._.profile}`}],g=({children:e,isLoading:t,noRedirect:r})=>{const{userId:g,logout:b,language:h,saveLanguage:x}=(0,n.useContext)(m.I),y=(0,o.s0)(),E=(0,o.TH)();(0,n.useEffect)((()=>{g||r||((0,p.x)("previousLocation",E.pathname),y("/sign-in"))}),[g,y,r,E.pathname]);const $=()=>{b(),y(`/${i._.signIn}`)};return a().createElement(a().Fragment,null,a().createElement("div",{className:"page"},a().createElement(f.P,null),g&&a().createElement(d.Er,{mobileNavLinks:l,navLinks:s,language:h,onLogout:$,userMenuItems:(C=$,[{url:`/${i._.profile}`,text:"Profile",icon:"dragon"},{onClick:C,text:"Logout",icon:"door"}]),onLanguageChange:e=>{x(e)}}),t?a().createElement(c.L,null):a().createElement("main",{className:"main"},e),g&&a().createElement(d.$_,{links:v,mobileLinks:u})));var C}},7971:(e,t,r)=>{r.d(t,{L:()=>m});var n,a=r(2784),o=r.n(a),i=r(2370);function s(e,t){const{type:r,payload:a}=t;return r===n.INPUT_CHANGE?{...e,...a}:e}!function(e){e.INPUT_CHANGE="INPUT_CHANGE"}(n||(n={}));var l=r(1074),u=r(5424),c=r(4144);const d={buttonContainer:"R_HWvLfhaFbeX5Dvjyeg",formFields:"rVyuUJMlkNPDIq7f_08Q",form:"IcBpe_0OSerB448WDzBb"};function m({initialValues:e,onSubmit:t,validators:r,formConfig:m,isLoading:f}){const[{values:p,changeHandler:v,validate:g}]=function(e,t){const[r,o]=(0,a.useReducer)(s,e),i=(0,a.useCallback)((e=>{o({type:n.INPUT_CHANGE,payload:e})}),[o]);return[{values:r,changeHandler:i,validate:()=>{let e=!0;const n={};return t?(Object.keys(t).forEach((a=>{const o=t[a];if(o){const t=o.validate(r[a]);e=e&&t,t||(n[a]=o.errorText)}})),{isValid:e,errors:n}):{isValid:e,errors:n}}}]}(e,r),[b,h]=(0,a.useState)({}),{language:x}=(0,a.useContext)(u.I),y=e=>function(t){v({[e]:t})};return o().createElement("form",{className:d.form,onSubmit:e=>{e.preventDefault();const{errors:r,isValid:n}=g();n&&t(p),h(r)},"data-cy":"wordForm"},o().createElement("div",{className:d.formFields},m.map((e=>{const{Component:t,name:r,label:n,props:a={},isDisabled:i,value:s}=e,u=p[r]||s;return o().createElement(t,{initialValue:u,dataCy:`formField-${r}`,key:r,withTranslation:"defs"===r&&x===l.SQ.Spanish,name:r,label:n||r,isDisabled:i,onChange:y(r),errorText:b[r],...a})}))),o().createElement("div",{className:d.buttonContainer},o().createElement(i.rU,{variant:"button",to:`/${c._.words}`},"Cancel"),o().createElement(i.zx,{variant:"secondary",type:"submit",isLoading:f},"Save")))}},8664:(e,t,r)=>{r.d(t,{Q0:()=>l,UE:()=>i,Ym:()=>s,_5:()=>o,tz:()=>u,ym:()=>a});var n=r(7834);const a=n.Ps`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      id
    }
  }
`,o=n.Ps`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      token
      id
    }
  }
`,i=n.Ps`
  mutation SaveWord($input: NewWordInput!) {
    saveWord(input: $input) {
      name
      uuid
    }
  }
`,s=n.Ps`
  mutation DeleteWord($deleteWordId: ID!) {
    deleteWord(id: $deleteWordId)
  }
`,l=n.Ps`
  mutation UpdateWord($input: UpdateWordInput!) {
    updateWord(input: $input) {
      name
    }
  }
`,u=n.Ps`
  mutation SaveGameResult($input: [UpdateStatisticsInput!]) {
    saveGameResult(input: $input)
  }
`},3291:(e,t,r)=>{r.d(t,{$Q:()=>a,E:()=>o,IO:()=>u,Wp:()=>l,xR:()=>s,y:()=>i});var n=r(7834);const a=n.Ps`
  query Words($input: WordsInput) {
    words(input: $input) {
      id
      name
      defs {
        def
      }
      particle
      audioUrl
      transcription
      isOffensive
      isLearned
      level
      shortDef
    }
  }
`,o=n.Ps`
  query WordById($wordId: ID!) {
    word(id: $wordId) {
      id
      name
      defs {
        def
        examples {
          text
          translation
        }
      }
      particle
      imgUrl
      imgDesc
      audioUrl
      additionalInfo
      transcription
      user
      isOffensive
      isLearned
      stems
      level
      shortDef
    }
  }
`,i=n.Ps`
  query SearchWords($input: WordSearchInput!) {
    searchWord(input: $input) {
      ... on Suggestions {
        suggestions
      }
      ... on DictionaryWord {
        uuid
        transcription
        stems
        particle
        name
        isOffensive
        imgUrl
        defs {
          examples {
            text
            translation
          }
          def
        }
        audioUrl
        additionalInfo
        imgDesc
        shortDef
        language
      }
    }
  }
`,s=n.Ps`
  query User {
    user {
      createdAt
      email
      firstName
      lastName
      primaryLanguage
      role
    }
  }
`,l=n.Ps`
  query Games {
    games {
      desc
      imgUrl
      name
      id
      type
    }
  }
`,u=n.Ps`
  query Game($input: GameDataInput!) {
    game(input: $input) {
      questions {
        wordId
        question
        options
        answer
        additionalInfo {
          audioUrl
          imgUrl
          shortDef
          examples {
            text
            translation
          }
        }
      }
      task
      type
    }
  }
`},4914:(e,t,r)=>{r.r(t),r.d(t,{default:()=>y});var n=r(2784),a=r.n(n),o=r(3557),i=r(2370),s=r(3379),l=r(3842);const u="JRs9BbpzylJKJcSff5Xl",c="qfx5EYTHjCEaBJyMRMBY";var d=r(1074);const m={defs:{validate:e=>!!Array.isArray(e)&&e.filter((e=>e?.def)).length>0,errorText:"word definition is required"},shortDef:{validate:e=>!!Array.isArray(e)&&e.filter(Boolean).length>0,errorText:"shortDef is required"},particle:{validate:e=>!!e,errorText:"particle is required"}};var f=r(7752),p=r(7971),v=r(4144),g=r(5424),b=r(3291),h=r(4826),x=r(8664);const y=()=>{const{wordId:e}=(0,o.UO)(),[t,r]=(0,s.D)(x.Q0,{update(e){e.evict({fieldName:"game"}),e.evict({fieldName:"words"})}}),[y,{loading:E,error:$,data:C}]=(0,l.t)(b.E),{setNotification:w,language:I}=(0,n.useContext)(g.I),_=(0,o.s0)(),P=(0,n.useMemo)((()=>(e=>{const t={audioUrl:"",transcription:"",particle:"",defs:[{def:"",examples:[{text:"",translation:""}]}],imgUrl:"",imgDesc:"",shortDef:[""],additionalInfo:"",stems:[""],isOffensive:!1,isLearned:!1,level:d.aC.B1};if(!e)return;const r={id:e.id};return Object.keys(t).forEach((n=>{r[n]=e[n]||t[n]})),r})((0,h.o)(C?.word))),[C?.word,e]);(0,n.useEffect)((()=>{y({variables:{wordId:e}})}),[e]),(0,n.useEffect)((()=>{r.error&&w({variant:"error",text:"Error",subText:$?.message||"something went wrong"})}),[$]),(0,n.useEffect)((()=>{r.error&&w({variant:"error",text:"Error",subText:r?.error?.message||"something went wrong"})}),[r.error]),(0,n.useEffect)((()=>{const{data:e}=r;if(e){const{name:t}=e.updateWord;w({variant:"success",text:"Word updated",subText:`Changes for the word ${t} were saved`,targetLocation:`/${v._.words}`}),_(`/${v._.words}`)}}),[r.data]);return a().createElement(f.X,null,a().createElement(i.rU,{"data-cy":"backLink",className:u,to:`/${v._.words}`},a().createElement(i.JO,{width:16,height:16,id:"arrow-left"}),"Back to vocabulary"),a().createElement("h1",{className:c},"Edit word"),C&&P&&a().createElement(p.L,{validators:m,initialValues:P,formConfig:(D=C.word,[{Component:i.b0,name:"name",isDisabled:!0,value:D.name},{Component:i.n4,name:"level"},{Component:i.b0,name:"particle"},{Component:i.b0,name:"audioUrl",label:"audio url"},{Component:i.v9,name:"defs"},{Component:i.b0,name:"transcription"},{Component:i.qt,name:"shortDef",label:"short definition",props:{showOrderButtons:!0}},{Component:i.b0,name:"imgUrl",label:"image url"},{Component:i.qt,name:"stems",label:"word form"},{Component:i.b0,name:"imgDesc",label:"image description"},{Component:i.b0,name:"additionalInfo",label:"Additional information"},{Component:i.XZ,name:"isOffensive",props:{variant:"isOffensive"}},{Component:i.XZ,name:"isLearned",props:{label:"Mark as learned"}}]),isLoading:E,onSubmit:e=>{const r=(0,h.X)(e);t({variables:{input:r},refetchQueries:()=>[{query:b.$Q,variables:{language:I}}]})}}));var D}},4826:(e,t,r)=>{function n(e){if(Array.isArray(e))return e.map(n);if("string"==typeof e)return e?.trim();if(null===e||"object"!=typeof e)return e;const t={...e};t?.__typename&&delete t.__typename;return Object.keys(t).forEach((e=>{const r=t[e];t[e]=n(r)})),t}function a(e){const{defs:t}=e;if(!t)return e;const r=t.map((e=>({def:e?.def,examples:e?.examples?.filter((e=>e?.text))}))).filter((e=>e?.def));return{...e,defs:r,shortDef:e?.shortDef?.filter(Boolean)}}r.d(t,{X:()=>a,o:()=>n})},3842:(e,t,r)=>{r.d(t,{t:()=>u});var n=r(2970),a=r(2784),o=r(8769),i=r(5769),s=r(6675),l=["refetch","reobserve","fetchMore","updateQuery","startPolling","subscribeToMore"];function u(e,t){var r,u=a.useRef(),c=a.useRef(),d=a.useRef(),m=(0,o.J)(t,u.current||{}),f=null!==(r=null==m?void 0:m.query)&&void 0!==r?r:e;c.current=m,d.current=f;var p=(0,i.A)((0,s.x)(t&&t.client),f),v=p.useQuery((0,n.pi)((0,n.pi)({},m),{skip:!u.current})),g=v.observable.options.initialFetchPolicy||p.getDefaultFetchPolicy(),b=Object.assign(v,{called:!!u.current}),h=a.useMemo((function(){for(var e={},t=function(t){var r=b[t];e[t]=function(){return u.current||(u.current=Object.create(null),p.forceUpdateState()),r.apply(this,arguments)}},r=0,n=l;r<n.length;r++){t(n[r])}return e}),[]);Object.assign(b,h);var x=a.useCallback((function(e){u.current=e?(0,n.pi)((0,n.pi)({},e),{fetchPolicy:e.fetchPolicy||g}):{fetchPolicy:g};var t=(0,o.J)(c.current,(0,n.pi)({query:d.current},u.current)),r=p.executeQuery((0,n.pi)((0,n.pi)({},t),{skip:!1})).then((function(e){return Object.assign(e,h)}));return r.catch((function(){})),r}),[]);return[x,b]}},3379:(e,t,r)=>{r.d(t,{D:()=>c});var n=r(2970),a=r(2784),o=r(8769),i=r(8807),s=r(7274),l=r(5832),u=r(6675);function c(e,t){var r=(0,u.x)(null==t?void 0:t.client);(0,s.Vp)(e,s.n_.Mutation);var c=a.useState({called:!1,loading:!1,client:r}),d=c[0],m=c[1],f=a.useRef({result:d,mutationId:0,isMounted:!0,client:r,mutation:e,options:t});Object.assign(f.current,{client:r,options:t,mutation:e});var p=a.useCallback((function(e){void 0===e&&(e={});var t=f.current,r=t.options,a=t.mutation,s=(0,n.pi)((0,n.pi)({},r),{mutation:a}),u=e.client||f.current.client;f.current.result.loading||s.ignoreResults||!f.current.isMounted||m(f.current.result={loading:!0,error:void 0,data:void 0,called:!0,client:u});var c=++f.current.mutationId,d=(0,o.J)(s,e);return u.mutate(d).then((function(t){var r,n,a=t.data,o=t.errors,s=o&&o.length>0?new l.cA({graphQLErrors:o}):void 0,p=e.onError||(null===(r=f.current.options)||void 0===r?void 0:r.onError);if(s&&p&&p(s,d),c===f.current.mutationId&&!d.ignoreResults){var v={called:!0,loading:!1,data:a,error:s,client:u};f.current.isMounted&&!(0,i.D)(f.current.result,v)&&m(f.current.result=v)}var g=e.onCompleted||(null===(n=f.current.options)||void 0===n?void 0:n.onCompleted);return s||null==g||g(t.data,d),t})).catch((function(t){var r;if(c===f.current.mutationId&&f.current.isMounted){var n={loading:!1,error:t,data:void 0,called:!0,client:u};(0,i.D)(f.current.result,n)||m(f.current.result=n)}var a=e.onError||(null===(r=f.current.options)||void 0===r?void 0:r.onError);if(a)return a(t,d),{data:void 0,errors:t};throw t}))}),[]),v=a.useCallback((function(){if(f.current.isMounted){var e={called:!1,loading:!1,client:r};Object.assign(f.current,{mutationId:0,result:e}),m(e)}}),[]);return a.useEffect((function(){return f.current.isMounted=!0,function(){f.current.isMounted=!1}}),[]),[p,(0,n.pi)({reset:v},d)]}}}]);