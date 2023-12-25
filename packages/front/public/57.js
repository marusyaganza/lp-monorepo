"use strict";(self.webpackChunk_lp_front=self.webpackChunk_lp_front||[]).push([[57],{7825:(e,t,r)=>{r.d(t,{P:()=>u});var n=r(2784),a=r.n(n),o=r(2370),i=r(3557),s=r(5424);const u=()=>{const{notification:e,setNotification:t}=(0,n.useContext)(s.I),r=(0,i.TH)(),u=(0,n.useCallback)((()=>{t()}),[t]);return(0,n.useEffect)((()=>{const e=setTimeout(u,5e3);return()=>{clearTimeout(e)}}),[e,u]),(0,n.useEffect)((()=>{e?.targetLocation!==r.pathname&&t()}),[r.pathname]),a().createElement(a().Fragment,null,e&&a().createElement(o.P_,{"data-cy":`notification-${e?.variant}`,onClose:u,...e,className:"notification"}))}},7752:(e,t,r)=>{r.d(t,{X:()=>v});var n=r(2784),a=r.n(n),o=r(3557),i=r(4144);const s=[{url:"/",text:"Home",icon:"home"},{url:`/${i._.search}`,text:"Explore",icon:"explorer"},{url:`/${i._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${i._.games}`,text:"Practice",icon:"dice"}],u=[{url:`/${i._.search}`,text:"Explore",icon:"explorer"},{url:`/${i._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${i._.games}`,text:"Practice",icon:"dice"},{url:"/profile",text:"Profile",icon:"dragon"}],l=[{url:"/",text:"Home",icon:"home"},{url:`/${i._.search}`,text:"Explore",icon:"explorer"},{url:`/${i._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${i._.games}`,text:"Practice",icon:"dice"}];var c=r(6525),d=r(2370),m=r(5424),p=r(7825),f=r(438);const g=[{text:"Review words",url:`/${i._.words}`},{text:"Look up words",url:`/${i._.search}`},{text:"Practice",url:`/${i._.games}`},{text:"Profile",url:`/${i._.profile}`}],v=({children:e,isLoading:t,noRedirect:r})=>{const{userId:v,logout:h,language:E,saveLanguage:y}=(0,n.useContext)(m.I),w=(0,o.s0)(),x=(0,o.TH)();(0,n.useEffect)((()=>{v||r||((0,f.x)("previousLocation",x.pathname),w("/sign-in"))}),[v,w,r,x.pathname]);const b=()=>{h(),w(`/${i._.signIn}`)};return a().createElement(a().Fragment,null,a().createElement("div",{className:"page"},a().createElement(p.P,null),v&&a().createElement(d.Er,{mobileNavLinks:u,navLinks:s,language:E,onLogout:b,userMenuItems:($=b,[{url:`/${i._.profile}`,text:"Profile",icon:"dragon"},{onClick:$,text:"Logout",icon:"door"}]),onLanguageChange:e=>{y(e)}}),t?a().createElement(c.L,null):a().createElement("main",{className:"main"},e),v&&a().createElement(d.$_,{links:g,mobileLinks:l})));var $}},4341:(e,t,r)=>{r.d(t,{w:()=>u});var n=r(2784),a=r.n(n),o=r(2370);const i="HXscGkABuF7p9IZSp4k3",s="_52f1eETB38HnwTGZ1D7Q",u=({blankOption:e,onSortChange:t,sortBy:r,options:u,initialOrderValue:l,onOrderChange:c,className:d,blankValue:m,label:p})=>{const{Select:f,Option:g,setValue:v}=(0,o.L7)({onChange:t,initialValue:r});(0,n.useEffect)((()=>{r&&v(r)}),[r,v]);const h=Object.keys(u);return a().createElement("div",{"data-cy":"sortControls",className:(0,o.cn)(i,d)},a().createElement(f,{className:s,value:r,renderValue:e=>u?.[e]?u[e]:m||"Select words by",variant:"withIcon",label:p},a().createElement(g,{value:"",key:e},e),h.map((e=>a().createElement(g,{key:e,value:e},u[e])))),a().createElement(o.XZ,{onChange:c,initialValue:l,variant:"withIcon",iconId:l?"asc":"desc"}))}},8664:(e,t,r)=>{r.d(t,{Q0:()=>u,UE:()=>i,Ym:()=>s,_5:()=>o,tz:()=>l,ym:()=>a});var n=r(7834);const a=n.Ps`
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
`,l=n.Ps`
  mutation SaveGameResult($input: [UpdateStatisticsInput!]) {
    saveGameResult(input: $input)
  }
`},3291:(e,t,r)=>{r.d(t,{$Q:()=>a,E:()=>o,IO:()=>l,Wp:()=>u,xR:()=>s,y:()=>i});var n=r(7834);const a=n.Ps`
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
`,l=n.Ps`
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
`},4057:(e,t,r)=>{r.r(t),r.d(t,{default:()=>k});var n=r(2784),a=r.n(n),o=r(3557),i=r(1074),s=r(3291),u=r(8664),l=r(2370),c=r(7752),d=r(5424),m=r(4341);const p="kWyslyizEk7moM1POJwI",f="uKa7Le94O9eMqBcms0Dn",g="ltcBEHbcCbwXgvG6qJyw",v="ykPtniw3PXoJAliBnEvI",h="cuyGjljoKCtxJD4hKSPY",E="h7nZ7Z26luVVESnOwTYc",y="DP9OEWAPBgo6Mat7utjF";var w=r(4144),x=r(438),b=r(3842),$=r(3379);const I={[i.uh.Name]:"Alphabetically",[i.uh.Particle]:"Particle",[i.uh.Level]:"Level"},k=()=>{const[e,{loading:t,error:r,data:i}]=(0,b.t)(s.$Q),{setNotification:k,language:P}=(0,n.useContext)(d.I),[C,O]=(0,n.useState)(),[W,_]=(0,n.useState)(!1),[L,D]=(0,$.D)(u.Ym,{update(e){e.evict({fieldName:"game"}),e.evict({fieldName:"words"})}}),N=(0,n.useCallback)((e=>{O(e),(0,x.x)("sortWordsBy",e)}),[]),S=(0,n.useCallback)((e=>{_(e),(0,x.x)("wordsSortOrder",e)}),[]);(0,n.useEffect)((()=>{e({variables:{input:{language:P,isReverseOrder:W,sortBy:C||void 0}}})}),[P,C,W]);const U=(0,o.s0)();(0,n.useEffect)((()=>{r&&k({variant:"error",text:"Error",subText:r?.message})}),[r,k]),(0,n.useEffect)((()=>{r&&k({variant:"error",text:"Error",subText:r?.message||"something went wrong"})}),[r]),(0,n.useEffect)((()=>{D.error&&k({variant:"error",text:"Error",subText:D?.error?.message||"something went wrong"})}),[D.error]),(0,n.useEffect)((()=>{D.data&&k({variant:"success",text:"Word deleted",subText:`${D?.data?.deleteWord}`})}),[D.data]),(0,n.useEffect)((()=>{const e=(0,x.Y)("sortWordsBy"),t=(0,x.Y)("wordsSortOrder");e&&O(e),t&&_(t)}),[]);return a().createElement(c.X,null,a().createElement("h1",{className:h},"Vocabulary"),!t&&a().createElement("div",{className:y},a().createElement("p",{"data-cy":"wordsCount",className:E},`You have ${i?.words.length||0} words.`," ",a().createElement(l.rU,{className:g,to:`/${w._.words}/new`},"Add new")),a().createElement(m.w,{blankOption:"Date",blankValue:"Date",options:I,initialOrderValue:W,sortBy:C||"",onOrderChange:S,onSortChange:N,label:"Sort words by"})),t&&a().createElement(l.$j,null),(()=>{if(!Array.isArray(i?.words))return;const e=i?.words;return a().createElement("ul",{"data-cy":"wordsList",className:p},e.map((e=>{return a().createElement("li",{className:f,key:e?.id},a().createElement(l.UK,{onClick:()=>{U(`/words/review/${e?.id}`)}},a().createElement(l.ye,{variant:"short",className:v,word:e,deleteButton:{callback:(t=e.id,function(){L({variables:{deleteWordId:t}})}),isLoading:D.loading}})));var t})))})(),a().createElement(o.j3,null))}},3842:(e,t,r)=>{r.d(t,{t:()=>l});var n=r(2970),a=r(2784),o=r(8769),i=r(5769),s=r(6675),u=["refetch","reobserve","fetchMore","updateQuery","startPolling","subscribeToMore"];function l(e,t){var r,l=a.useRef(),c=a.useRef(),d=a.useRef(),m=(0,o.J)(t,l.current||{}),p=null!==(r=null==m?void 0:m.query)&&void 0!==r?r:e;c.current=m,d.current=p;var f=(0,i.A)((0,s.x)(t&&t.client),p),g=f.useQuery((0,n.pi)((0,n.pi)({},m),{skip:!l.current})),v=g.observable.options.initialFetchPolicy||f.getDefaultFetchPolicy(),h=Object.assign(g,{called:!!l.current}),E=a.useMemo((function(){for(var e={},t=function(t){var r=h[t];e[t]=function(){return l.current||(l.current=Object.create(null),f.forceUpdateState()),r.apply(this,arguments)}},r=0,n=u;r<n.length;r++){t(n[r])}return e}),[]);Object.assign(h,E);var y=a.useCallback((function(e){l.current=e?(0,n.pi)((0,n.pi)({},e),{fetchPolicy:e.fetchPolicy||v}):{fetchPolicy:v};var t=(0,o.J)(c.current,(0,n.pi)({query:d.current},l.current)),r=f.executeQuery((0,n.pi)((0,n.pi)({},t),{skip:!1})).then((function(e){return Object.assign(e,E)}));return r.catch((function(){})),r}),[]);return[y,h]}},3379:(e,t,r)=>{r.d(t,{D:()=>c});var n=r(2970),a=r(2784),o=r(8769),i=r(8807),s=r(7274),u=r(5832),l=r(6675);function c(e,t){var r=(0,l.x)(null==t?void 0:t.client);(0,s.Vp)(e,s.n_.Mutation);var c=a.useState({called:!1,loading:!1,client:r}),d=c[0],m=c[1],p=a.useRef({result:d,mutationId:0,isMounted:!0,client:r,mutation:e,options:t});Object.assign(p.current,{client:r,options:t,mutation:e});var f=a.useCallback((function(e){void 0===e&&(e={});var t=p.current,r=t.options,a=t.mutation,s=(0,n.pi)((0,n.pi)({},r),{mutation:a}),l=e.client||p.current.client;p.current.result.loading||s.ignoreResults||!p.current.isMounted||m(p.current.result={loading:!0,error:void 0,data:void 0,called:!0,client:l});var c=++p.current.mutationId,d=(0,o.J)(s,e);return l.mutate(d).then((function(t){var r,n,a=t.data,o=t.errors,s=o&&o.length>0?new u.cA({graphQLErrors:o}):void 0,f=e.onError||(null===(r=p.current.options)||void 0===r?void 0:r.onError);if(s&&f&&f(s,d),c===p.current.mutationId&&!d.ignoreResults){var g={called:!0,loading:!1,data:a,error:s,client:l};p.current.isMounted&&!(0,i.D)(p.current.result,g)&&m(p.current.result=g)}var v=e.onCompleted||(null===(n=p.current.options)||void 0===n?void 0:n.onCompleted);return s||null==v||v(t.data,d),t})).catch((function(t){var r;if(c===p.current.mutationId&&p.current.isMounted){var n={loading:!1,error:t,data:void 0,called:!0,client:l};(0,i.D)(p.current.result,n)||m(p.current.result=n)}var a=e.onError||(null===(r=p.current.options)||void 0===r?void 0:r.onError);if(a)return a(t,d),{data:void 0,errors:t};throw t}))}),[]),g=a.useCallback((function(){if(p.current.isMounted){var e={called:!1,loading:!1,client:r};Object.assign(p.current,{mutationId:0,result:e}),m(e)}}),[]);return a.useEffect((function(){return p.current.isMounted=!0,function(){p.current.isMounted=!1}}),[]),[f,(0,n.pi)({reset:g},d)]}}}]);