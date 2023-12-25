"use strict";(self.webpackChunk_lp_front=self.webpackChunk_lp_front||[]).push([[678],{7825:(e,t,r)=>{r.d(t,{P:()=>s});var n=r(2784),a=r(2370),o=r(3557),i=r(5424);const s=()=>{const{notification:e,setNotification:t}=(0,n.useContext)(i.I),r=(0,o.TH)(),s=(0,n.useCallback)((()=>{t()}),[t]);return(0,n.useEffect)((()=>{const e=setTimeout(s,5e3);return()=>{clearTimeout(e)}}),[e,s]),(0,n.useEffect)((()=>{e?.targetLocation!==r.pathname&&t()}),[r.pathname]),n.createElement(n.Fragment,null,e&&n.createElement(a.P_,{"data-cy":`notification-${e?.variant}`,onClose:s,...e,className:"notification"}))}},7752:(e,t,r)=>{r.d(t,{X:()=>g});var n=r(2784),a=r(3557),o=r(4144);const i=[{url:"/",text:"Home",icon:"home"},{url:`/${o._.search}`,text:"Explore",icon:"explorer"},{url:`/${o._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${o._.games}`,text:"Practice",icon:"dice"}],s=[{url:`/${o._.search}`,text:"Explore",icon:"explorer"},{url:`/${o._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${o._.games}`,text:"Practice",icon:"dice"},{url:"/profile",text:"Profile",icon:"dragon"}],u=[{url:"/",text:"Home",icon:"home"},{url:`/${o._.search}`,text:"Explore",icon:"explorer"},{url:`/${o._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${o._.games}`,text:"Practice",icon:"dice"}];var c=r(6525),l=r(2370),d=r(5424),m=r(7825),p=r(438);const f=[{text:"Review words",url:`/${o._.words}`},{text:"Look up words",url:`/${o._.search}`},{text:"Practice",url:`/${o._.games}`},{text:"Profile",url:`/${o._.profile}`}],g=({children:e,isLoading:t,noRedirect:r})=>{const{userId:g,logout:v,language:h,saveLanguage:y}=(0,n.useContext)(d.I),x=(0,a.s0)(),E=(0,a.TH)();(0,n.useEffect)((()=>{g||r||((0,p.x)("previousLocation",E.pathname),x("/sign-in"))}),[g,x,r,E.pathname]);const $=()=>{v(),x(`/${o._.signIn}`)};return n.createElement(n.Fragment,null,n.createElement("div",{className:"page"},n.createElement(m.P,null),g&&n.createElement(l.Er,{mobileNavLinks:s,navLinks:i,language:h,onLogout:$,userMenuItems:(b=$,[{url:`/${o._.profile}`,text:"Profile",icon:"dragon"},{onClick:b,text:"Logout",icon:"door"}]),onLanguageChange:e=>{y(e)}}),t?n.createElement(c.L,null):n.createElement("main",{className:"main"},e),g&&n.createElement(l.$_,{links:f,mobileLinks:u})));var b}},8664:(e,t,r)=>{r.d(t,{Q0:()=>u,UE:()=>i,Ym:()=>s,_5:()=>o,tz:()=>c,ym:()=>a});var n=r(7834);const a=n.Ps`
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
`,u=n.Ps`
  mutation UpdateWord($input: UpdateWordInput!) {
    updateWord(input: $input) {
      name
    }
  }
`,c=n.Ps`
  mutation SaveGameResult($input: [UpdateStatisticsInput!]) {
    saveGameResult(input: $input)
  }
`},3291:(e,t,r)=>{r.d(t,{$Q:()=>a,E:()=>o,IO:()=>c,Wp:()=>u,xR:()=>s,y:()=>i});var n=r(7834);const a=n.Ps`
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
`,u=n.Ps`
  query Games {
    games {
      desc
      imgUrl
      name
      id
      type
    }
  }
`,c=n.Ps`
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
`},9417:(e,t,r)=>{r.r(t),r.d(t,{default:()=>v});var n=r(2784),a=r(5424),o=r(9857),i=r(2370),s=r(7752);const u={list:"jwqDFuBt9qrxZEFHzB4x",listItem:"JO9uIfGNAJSGWsuGi7iQ",mainHeading:"ELX8UlkehQMeF4ld6_qW",content:"h3uG9FjdXIsWlRts_rBm",search:"vLRZrTU4u_QVBQK9Lser",suggestion:"VRmIPykszdVJow8fBwyq",headingContainer:"qbFodheCJ1aVPifpHrjX",notFound:"FMoCwyjmMQLuUSHQGyCQ",notFoundText:"M92dr9VxP_4ZDE0ptn9i",notFoundImage:"MZeKVA04h7l3Wm_3i7kQ"};var c=r(4144),l=r(4826);const d=r.p+"c47f931652cfcbdd2c1e.svg";var m=r(3291),p=r(8664),f=r(3379),g=r(3842);const v=()=>{const[e,t]=(0,o.lr)(),[r,v]=(0,f.D)(p.UE,{update(e){e.evict({fieldName:"game"}),e.evict({fieldName:"words"})}}),{setNotification:h,language:y}=(0,n.useContext)(a.I),[x,{loading:E,error:$,data:b}]=(0,g.t)(m.y),[I,w]=(0,n.useState)([]),_=(0,n.useMemo)((()=>b?.searchWord?.every((e=>"Suggestions"===e?.__typename))&&!E),[b,E]);(0,n.useEffect)((()=>{$&&h({variant:"error",text:"Error",subText:$?.message||"something went wrong"})}),[$]),(0,n.useEffect)((()=>{v.error&&h({variant:"error",text:"Error",subText:v?.error?.message||"something went wrong"})}),[v.error]),(0,n.useEffect)((()=>{const{data:e}=v;if(e){const{name:t,uuid:r}=e.saveWord;h({variant:"success",text:"Word added",subText:`${t} is added successfully.`}),r&&w((e=>[...e,r]))}}),[v.data]),(0,n.useEffect)((()=>{const t=e.get("search");t&&x({variables:{input:{search:t,language:y}}})}),[y,x,e]);const P=e=>function(){r({variables:{input:(0,l.o)(e)}})};return n.createElement(s.X,null,n.createElement("div",{className:u.content},n.createElement("div",{className:u.headingContainer},n.createElement("h1",{className:u.mainHeading},"Look up word"),n.createElement(i.rU,{variant:"button",className:u.link,to:`/${c._.words}/new`},"Add your own word")),n.createElement(i.Um,{autofocus:!0,className:u.search,searchQuery:e.get("search")||"",onSearch:e=>{e&&(t({search:e}),x({variables:{input:{search:e,language:y}}}))}}),E&&n.createElement(i.$j,null),(()=>{if(!_||!Array.isArray(b?.searchWord))return;const t=b?.searchWord;return t?.length?n.createElement("article",null,t?.map((e=>n.createElement("p",{className:u.suggestion,key:e?.suggestions?.[0]},n.createElement(i.JO,{id:"pointer",width:20,height:20}),e?.suggestions?.join(", "))))):n.createElement("div",{className:u.notFound},n.createElement("img",{src:d,className:u.notFoundImage,alt:""}),n.createElement("h3",{className:u.notFoundText},e?.get("search")??"word"," is not found"))})(),(()=>{if(_||!Array.isArray(b?.searchWord))return;const e=b?.searchWord;return n.createElement("ul",{className:u.list,"data-cy":"searchResult"},e.map((e=>n.createElement("li",{className:u.listItem,key:e?.id},n.createElement(i.ye,{addButton:{callback:P(e),isLoading:v.loading,isDisabled:I.some((t=>t===e?.uuid))},word:e})))))})()))}},4826:(e,t,r)=>{function n(e){if(Array.isArray(e))return e.map(n);if("string"==typeof e)return e?.trim();if(null===e||"object"!=typeof e)return e;const t={...e};t?.__typename&&delete t.__typename;return Object.keys(t).forEach((e=>{const r=t[e];t[e]=n(r)})),t}function a(e){const{defs:t}=e;if(!t)return e;const r=t.map((e=>({def:e?.def,examples:e?.examples?.filter((e=>e?.text))}))).filter((e=>e?.def));return{...e,defs:r,shortDef:e?.shortDef?.filter(Boolean)}}r.d(t,{X:()=>a,o:()=>n})},3842:(e,t,r)=>{r.d(t,{t:()=>c});var n=r(2970),a=r(2784),o=r(8769),i=r(5769),s=r(6675),u=["refetch","reobserve","fetchMore","updateQuery","startPolling","subscribeToMore"];function c(e,t){var r,c=a.useRef(),l=a.useRef(),d=a.useRef(),m=(0,o.J)(t,c.current||{}),p=null!==(r=null==m?void 0:m.query)&&void 0!==r?r:e;l.current=m,d.current=p;var f=(0,i.A)((0,s.x)(t&&t.client),p),g=f.useQuery((0,n.pi)((0,n.pi)({},m),{skip:!c.current})),v=g.observable.options.initialFetchPolicy||f.getDefaultFetchPolicy(),h=Object.assign(g,{called:!!c.current}),y=a.useMemo((function(){for(var e={},t=function(t){var r=h[t];e[t]=function(){return c.current||(c.current=Object.create(null),f.forceUpdateState()),r.apply(this,arguments)}},r=0,n=u;r<n.length;r++){t(n[r])}return e}),[]);Object.assign(h,y);var x=a.useCallback((function(e){c.current=e?(0,n.pi)((0,n.pi)({},e),{fetchPolicy:e.fetchPolicy||v}):{fetchPolicy:v};var t=(0,o.J)(l.current,(0,n.pi)({query:d.current},c.current)),r=f.executeQuery((0,n.pi)((0,n.pi)({},t),{skip:!1})).then((function(e){return Object.assign(e,y)}));return r.catch((function(){})),r}),[]);return[x,h]}},3379:(e,t,r)=>{r.d(t,{D:()=>l});var n=r(2970),a=r(2784),o=r(8769),i=r(8807),s=r(7274),u=r(5832),c=r(6675);function l(e,t){var r=(0,c.x)(null==t?void 0:t.client);(0,s.Vp)(e,s.n_.Mutation);var l=a.useState({called:!1,loading:!1,client:r}),d=l[0],m=l[1],p=a.useRef({result:d,mutationId:0,isMounted:!0,client:r,mutation:e,options:t});Object.assign(p.current,{client:r,options:t,mutation:e});var f=a.useCallback((function(e){void 0===e&&(e={});var t=p.current,r=t.options,a=t.mutation,s=(0,n.pi)((0,n.pi)({},r),{mutation:a}),c=e.client||p.current.client;p.current.result.loading||s.ignoreResults||!p.current.isMounted||m(p.current.result={loading:!0,error:void 0,data:void 0,called:!0,client:c});var l=++p.current.mutationId,d=(0,o.J)(s,e);return c.mutate(d).then((function(t){var r,n,a=t.data,o=t.errors,s=o&&o.length>0?new u.cA({graphQLErrors:o}):void 0,f=e.onError||(null===(r=p.current.options)||void 0===r?void 0:r.onError);if(s&&f&&f(s,d),l===p.current.mutationId&&!d.ignoreResults){var g={called:!0,loading:!1,data:a,error:s,client:c};p.current.isMounted&&!(0,i.D)(p.current.result,g)&&m(p.current.result=g)}var v=e.onCompleted||(null===(n=p.current.options)||void 0===n?void 0:n.onCompleted);return s||null==v||v(t.data,d),t})).catch((function(t){var r;if(l===p.current.mutationId&&p.current.isMounted){var n={loading:!1,error:t,data:void 0,called:!0,client:c};(0,i.D)(p.current.result,n)||m(p.current.result=n)}var a=e.onError||(null===(r=p.current.options)||void 0===r?void 0:r.onError);if(a)return a(t,d),{data:void 0,errors:t};throw t}))}),[]),g=a.useCallback((function(){if(p.current.isMounted){var e={called:!1,loading:!1,client:r};Object.assign(p.current,{mutationId:0,result:e}),m(e)}}),[]);return a.useEffect((function(){return p.current.isMounted=!0,function(){p.current.isMounted=!1}}),[]),[f,(0,n.pi)({reset:g},d)]}}}]);