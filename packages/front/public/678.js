"use strict";(self.webpackChunk_lp_front=self.webpackChunk_lp_front||[]).push([[678],{7825:(e,t,r)=>{r.d(t,{P:()=>u});var n=r(2784),a=r.n(n),o=r(2370),i=r(3557),s=r(5424);const u=()=>{const{notification:e,setNotification:t}=(0,n.useContext)(s.I),r=(0,i.TH)(),u=(0,n.useCallback)((()=>{t()}),[t]);return(0,n.useEffect)((()=>{const e=setTimeout(u,5e3);return()=>{clearTimeout(e)}}),[e,u]),(0,n.useEffect)((()=>{e?.targetLocation!==r.pathname&&t()}),[r.pathname]),a().createElement(a().Fragment,null,e&&a().createElement(o.P_,{"data-cy":`notification-${e?.variant}`,onClose:u,...e,className:"notification"}))}},7752:(e,t,r)=>{r.d(t,{X:()=>v});var n=r(2784),a=r.n(n),o=r(3557),i=r(4144);const s=[{url:"/",text:"Home",icon:"home"},{url:`/${i._.search}`,text:"Explore",icon:"explorer"},{url:`/${i._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${i._.games}`,text:"Practice",icon:"dice"}],u=[{url:`/${i._.search}`,text:"Explore",icon:"explorer"},{url:`/${i._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${i._.games}`,text:"Practice",icon:"dice"},{url:"/profile",text:"Profile",icon:"dragon"}],c=[{url:"/",text:"Home",icon:"home"},{url:`/${i._.search}`,text:"Explore",icon:"explorer"},{url:`/${i._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${i._.games}`,text:"Practice",icon:"dice"}];var l=r(6525),d=r(2370),m=r(5424),p=r(7825),f=r(438);const g=[{text:"Review words",url:`/${i._.words}`},{text:"Look up words",url:`/${i._.search}`},{text:"Practice",url:`/${i._.games}`},{text:"Profile",url:`/${i._.profile}`}],v=({children:e,isLoading:t,noRedirect:r})=>{const{userId:v,logout:h,language:y,saveLanguage:x}=(0,n.useContext)(m.I),E=(0,o.s0)(),$=(0,o.TH)();(0,n.useEffect)((()=>{v||r||((0,f.x)("previousLocation",$.pathname),E("/sign-in"))}),[v,E,r,$.pathname]);const b=()=>{h(),E(`/${i._.signIn}`)};return a().createElement(a().Fragment,null,a().createElement("div",{className:"page"},a().createElement(p.P,null),v&&a().createElement(d.Er,{mobileNavLinks:u,navLinks:s,language:y,onLogout:b,userMenuItems:(I=b,[{url:`/${i._.profile}`,text:"Profile",icon:"dragon"},{onClick:I,text:"Logout",icon:"door"}]),onLanguageChange:e=>{x(e)}}),t?a().createElement(l.L,null):a().createElement("main",{className:"main"},e),v&&a().createElement(d.$_,{links:g,mobileLinks:c})));var I}},8664:(e,t,r)=>{r.d(t,{Q0:()=>u,UE:()=>i,Ym:()=>s,_5:()=>o,tz:()=>c,ym:()=>a});var n=r(7834);const a=n.Ps`
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
`},9417:(e,t,r)=>{r.r(t),r.d(t,{default:()=>h});var n=r(2784),a=r.n(n),o=r(5424),i=r(9857),s=r(2370),u=r(7752);const c={list:"jwqDFuBt9qrxZEFHzB4x",listItem:"JO9uIfGNAJSGWsuGi7iQ",mainHeading:"ELX8UlkehQMeF4ld6_qW",content:"h3uG9FjdXIsWlRts_rBm",search:"vLRZrTU4u_QVBQK9Lser",suggestion:"VRmIPykszdVJow8fBwyq",headingContainer:"qbFodheCJ1aVPifpHrjX",notFound:"FMoCwyjmMQLuUSHQGyCQ",notFoundText:"M92dr9VxP_4ZDE0ptn9i",notFoundImage:"MZeKVA04h7l3Wm_3i7kQ"};var l=r(4144),d=r(4826);const m=r.p+"c47f931652cfcbdd2c1e.svg";var p=r(3291),f=r(8664),g=r(3379),v=r(3842);const h=()=>{const[e,t]=(0,i.lr)(),[r,h]=(0,g.D)(f.UE,{update(e){e.evict({fieldName:"game"}),e.evict({fieldName:"words"})}}),{setNotification:y,language:x}=(0,n.useContext)(o.I),[E,{loading:$,error:b,data:I}]=(0,v.t)(p.y),[w,_]=(0,n.useState)([]),P=(0,n.useMemo)((()=>I?.searchWord?.every((e=>"Suggestions"===e?.__typename))&&!$),[I,$]);(0,n.useEffect)((()=>{b&&y({variant:"error",text:"Error",subText:b?.message||"something went wrong"})}),[b]),(0,n.useEffect)((()=>{h.error&&y({variant:"error",text:"Error",subText:h?.error?.message||"something went wrong"})}),[h.error]),(0,n.useEffect)((()=>{const{data:e}=h;if(e){const{name:t,uuid:r}=e.saveWord;y({variant:"success",text:"Word added",subText:`${t} is added successfully.`}),r&&_((e=>[...e,r]))}}),[h.data]),(0,n.useEffect)((()=>{const t=e.get("search");t&&E({variables:{input:{search:t,language:x}}})}),[x,E,e]);const W=e=>function(){r({variables:{input:(0,d.o)(e)}})};return a().createElement(u.X,null,a().createElement("div",{className:c.content},a().createElement("div",{className:c.headingContainer},a().createElement("h1",{className:c.mainHeading},"Look up word"),a().createElement(s.rU,{variant:"button",className:c.link,to:`/${l._.words}/new`},"Add your own word")),a().createElement(s.Um,{autofocus:!0,className:c.search,searchQuery:e.get("search")||"",onSearch:e=>{e&&(t({search:e}),E({variables:{input:{search:e,language:x}}}))}}),$&&a().createElement(s.$j,null),(()=>{if(!P||!Array.isArray(I?.searchWord))return;const t=I?.searchWord;return t?.length?a().createElement("article",null,t?.map((e=>a().createElement("p",{className:c.suggestion,key:e?.suggestions?.[0]},a().createElement(s.JO,{id:"pointer",width:20,height:20}),e?.suggestions?.join(", "))))):a().createElement("div",{className:c.notFound},a().createElement("img",{src:m,className:c.notFoundImage,alt:""}),a().createElement("h3",{className:c.notFoundText},e?.get("search")??"word"," is not found"))})(),(()=>{if(P||!Array.isArray(I?.searchWord))return;const e=I?.searchWord;return a().createElement("ul",{className:c.list,"data-cy":"searchResult"},e.map((e=>a().createElement("li",{className:c.listItem,key:e?.id},a().createElement(s.ye,{addButton:{callback:W(e),isLoading:h.loading,isDisabled:w.some((t=>t===e?.uuid))},word:e})))))})()))}},4826:(e,t,r)=>{function n(e){if(Array.isArray(e))return e.map(n);if("string"==typeof e)return e?.trim();if(null===e||"object"!=typeof e)return e;const t={...e};t?.__typename&&delete t.__typename;return Object.keys(t).forEach((e=>{const r=t[e];t[e]=n(r)})),t}function a(e){const{defs:t}=e;if(!t)return e;const r=t.map((e=>({def:e?.def,examples:e?.examples?.filter((e=>e?.text))}))).filter((e=>e?.def));return{...e,defs:r,shortDef:e?.shortDef?.filter(Boolean)}}r.d(t,{X:()=>a,o:()=>n})},3842:(e,t,r)=>{r.d(t,{t:()=>c});var n=r(2970),a=r(2784),o=r(8769),i=r(5769),s=r(6675),u=["refetch","reobserve","fetchMore","updateQuery","startPolling","subscribeToMore"];function c(e,t){var r,c=a.useRef(),l=a.useRef(),d=a.useRef(),m=(0,o.J)(t,c.current||{}),p=null!==(r=null==m?void 0:m.query)&&void 0!==r?r:e;l.current=m,d.current=p;var f=(0,i.A)((0,s.x)(t&&t.client),p),g=f.useQuery((0,n.pi)((0,n.pi)({},m),{skip:!c.current})),v=g.observable.options.initialFetchPolicy||f.getDefaultFetchPolicy(),h=Object.assign(g,{called:!!c.current}),y=a.useMemo((function(){for(var e={},t=function(t){var r=h[t];e[t]=function(){return c.current||(c.current=Object.create(null),f.forceUpdateState()),r.apply(this,arguments)}},r=0,n=u;r<n.length;r++){t(n[r])}return e}),[]);Object.assign(h,y);var x=a.useCallback((function(e){c.current=e?(0,n.pi)((0,n.pi)({},e),{fetchPolicy:e.fetchPolicy||v}):{fetchPolicy:v};var t=(0,o.J)(l.current,(0,n.pi)({query:d.current},c.current)),r=f.executeQuery((0,n.pi)((0,n.pi)({},t),{skip:!1})).then((function(e){return Object.assign(e,y)}));return r.catch((function(){})),r}),[]);return[x,h]}},3379:(e,t,r)=>{r.d(t,{D:()=>l});var n=r(2970),a=r(2784),o=r(8769),i=r(8807),s=r(7274),u=r(5832),c=r(6675);function l(e,t){var r=(0,c.x)(null==t?void 0:t.client);(0,s.Vp)(e,s.n_.Mutation);var l=a.useState({called:!1,loading:!1,client:r}),d=l[0],m=l[1],p=a.useRef({result:d,mutationId:0,isMounted:!0,client:r,mutation:e,options:t});Object.assign(p.current,{client:r,options:t,mutation:e});var f=a.useCallback((function(e){void 0===e&&(e={});var t=p.current,r=t.options,a=t.mutation,s=(0,n.pi)((0,n.pi)({},r),{mutation:a}),c=e.client||p.current.client;p.current.result.loading||s.ignoreResults||!p.current.isMounted||m(p.current.result={loading:!0,error:void 0,data:void 0,called:!0,client:c});var l=++p.current.mutationId,d=(0,o.J)(s,e);return c.mutate(d).then((function(t){var r,n,a=t.data,o=t.errors,s=o&&o.length>0?new u.cA({graphQLErrors:o}):void 0,f=e.onError||(null===(r=p.current.options)||void 0===r?void 0:r.onError);if(s&&f&&f(s,d),l===p.current.mutationId&&!d.ignoreResults){var g={called:!0,loading:!1,data:a,error:s,client:c};p.current.isMounted&&!(0,i.D)(p.current.result,g)&&m(p.current.result=g)}var v=e.onCompleted||(null===(n=p.current.options)||void 0===n?void 0:n.onCompleted);return s||null==v||v(t.data,d),t})).catch((function(t){var r;if(l===p.current.mutationId&&p.current.isMounted){var n={loading:!1,error:t,data:void 0,called:!0,client:c};(0,i.D)(p.current.result,n)||m(p.current.result=n)}var a=e.onError||(null===(r=p.current.options)||void 0===r?void 0:r.onError);if(a)return a(t,d),{data:void 0,errors:t};throw t}))}),[]),g=a.useCallback((function(){if(p.current.isMounted){var e={called:!1,loading:!1,client:r};Object.assign(p.current,{mutationId:0,result:e}),m(e)}}),[]);return a.useEffect((function(){return p.current.isMounted=!0,function(){p.current.isMounted=!1}}),[]),[f,(0,n.pi)({reset:g},d)]}}}]);