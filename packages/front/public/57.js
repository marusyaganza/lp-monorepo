"use strict";(self.webpackChunk_lp_front=self.webpackChunk_lp_front||[]).push([[57],{7825:(e,t,r)=>{r.d(t,{P:()=>s});var n=r(2784),a=r(2370),o=r(3557),i=r(5424);const s=()=>{const{notification:e,setNotification:t}=(0,n.useContext)(i.I),r=(0,o.TH)(),s=(0,n.useCallback)((()=>{t()}),[t]);return(0,n.useEffect)((()=>{const e=setTimeout(s,5e3);return()=>{clearTimeout(e)}}),[e,s]),(0,n.useEffect)((()=>{e?.targetLocation!==r.pathname&&t()}),[r.pathname]),n.createElement(n.Fragment,null,e&&n.createElement(a.P_,{"data-cy":`notification-${e?.variant}`,onClose:s,...e,className:"notification"}))}},7752:(e,t,r)=>{r.d(t,{X:()=>g});var n=r(2784),a=r(3557),o=r(4144);const i=[{url:"/",text:"Home",icon:"home"},{url:`/${o._.search}`,text:"Explore",icon:"explorer"},{url:`/${o._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${o._.games}`,text:"Practice",icon:"dice"}],s=[{url:`/${o._.search}`,text:"Explore",icon:"explorer"},{url:`/${o._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${o._.games}`,text:"Practice",icon:"dice"},{url:"/profile",text:"Profile",icon:"dragon"}],u=[{url:"/",text:"Home",icon:"home"},{url:`/${o._.search}`,text:"Explore",icon:"explorer"},{url:`/${o._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${o._.games}`,text:"Practice",icon:"dice"}];var l=r(6525),c=r(2370),d=r(5424),m=r(7825),p=r(438);const f=[{text:"Review words",url:`/${o._.words}`},{text:"Look up words",url:`/${o._.search}`},{text:"Practice",url:`/${o._.games}`},{text:"Profile",url:`/${o._.profile}`}],g=({children:e,isLoading:t,noRedirect:r})=>{const{userId:g,logout:v,language:h,saveLanguage:E}=(0,n.useContext)(d.I),y=(0,a.s0)(),w=(0,a.TH)();(0,n.useEffect)((()=>{g||r||((0,p.x)("previousLocation",w.pathname),y("/sign-in"))}),[g,y,r,w.pathname]);const x=()=>{v(),y(`/${o._.signIn}`)};return n.createElement(n.Fragment,null,n.createElement("div",{className:"page"},n.createElement(m.P,null),g&&n.createElement(c.Er,{mobileNavLinks:s,navLinks:i,language:h,onLogout:x,userMenuItems:(b=x,[{url:`/${o._.profile}`,text:"Profile",icon:"dragon"},{onClick:b,text:"Logout",icon:"door"}]),onLanguageChange:e=>{E(e)}}),t?n.createElement(l.L,null):n.createElement("main",{className:"main"},e),g&&n.createElement(c.$_,{links:f,mobileLinks:u})));var b}},4341:(e,t,r)=>{r.d(t,{w:()=>s});var n=r(2784),a=r(2370);const o="HXscGkABuF7p9IZSp4k3",i="_52f1eETB38HnwTGZ1D7Q",s=({blankOption:e,onSortChange:t,sortBy:r,options:s,initialOrderValue:u,onOrderChange:l,className:c,blankValue:d,label:m})=>{const{Select:p,Option:f,setValue:g}=(0,a.L7)({onChange:t,initialValue:r});(0,n.useEffect)((()=>{r&&g(r)}),[r,g]);const v=Object.keys(s);return n.createElement("div",{"data-cy":"sortControls",className:(0,a.cn)(o,c)},n.createElement(p,{className:i,value:r,renderValue:e=>s?.[e]?s[e]:d||"Select words by",variant:"withIcon",label:m},n.createElement(f,{value:"",key:e},e),v.map((e=>n.createElement(f,{key:e,value:e},s[e])))),n.createElement(a.XZ,{onChange:l,initialValue:u,variant:"withIcon",iconId:u?"asc":"desc"}))}},8664:(e,t,r)=>{r.d(t,{Q0:()=>u,UE:()=>i,Ym:()=>s,_5:()=>o,tz:()=>l,ym:()=>a});var n=r(7834);const a=n.Ps`
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
`},4057:(e,t,r)=>{r.r(t),r.d(t,{default:()=>I});var n=r(2784),a=r(3557),o=r(1074),i=r(3291),s=r(8664),u=r(2370),l=r(7752),c=r(5424),d=r(4341);const m="kWyslyizEk7moM1POJwI",p="uKa7Le94O9eMqBcms0Dn",f="ltcBEHbcCbwXgvG6qJyw",g="ykPtniw3PXoJAliBnEvI",v="cuyGjljoKCtxJD4hKSPY",h="h7nZ7Z26luVVESnOwTYc",E="DP9OEWAPBgo6Mat7utjF";var y=r(4144),w=r(438),x=r(3842),b=r(3379);const $={[o.uh.Name]:"Alphabetically",[o.uh.Particle]:"Particle",[o.uh.Level]:"Level"},I=()=>{const[e,{loading:t,error:r,data:o}]=(0,x.t)(i.$Q),{setNotification:I,language:k}=(0,n.useContext)(c.I),[P,C]=(0,n.useState)(),[O,W]=(0,n.useState)(!1),[_,L]=(0,b.D)(s.Ym,{update(e){e.evict({fieldName:"game"}),e.evict({fieldName:"words"})}}),D=(0,n.useCallback)((e=>{C(e),(0,w.x)("sortWordsBy",e)}),[]),N=(0,n.useCallback)((e=>{W(e),(0,w.x)("wordsSortOrder",e)}),[]);(0,n.useEffect)((()=>{e({variables:{input:{language:k,isReverseOrder:O,sortBy:P||void 0}}})}),[k,P,O]);const S=(0,a.s0)();(0,n.useEffect)((()=>{r&&I({variant:"error",text:"Error",subText:r?.message})}),[r,I]),(0,n.useEffect)((()=>{r&&I({variant:"error",text:"Error",subText:r?.message||"something went wrong"})}),[r]),(0,n.useEffect)((()=>{L.error&&I({variant:"error",text:"Error",subText:L?.error?.message||"something went wrong"})}),[L.error]),(0,n.useEffect)((()=>{L.data&&I({variant:"success",text:"Word deleted",subText:`${L?.data?.deleteWord}`})}),[L.data]),(0,n.useEffect)((()=>{const e=(0,w.Y)("sortWordsBy"),t=(0,w.Y)("wordsSortOrder");e&&C(e),t&&W(t)}),[]);return n.createElement(l.X,null,n.createElement("h1",{className:v},"Vocabulary"),!t&&n.createElement("div",{className:E},n.createElement("p",{"data-cy":"wordsCount",className:h},`You have ${o?.words.length||0} words.`," ",n.createElement(u.rU,{className:f,to:`/${y._.words}/new`},"Add new")),n.createElement(d.w,{blankOption:"Date",blankValue:"Date",options:$,initialOrderValue:O,sortBy:P||"",onOrderChange:N,onSortChange:D,label:"Sort words by"})),t&&n.createElement(u.$j,null),(()=>{if(!Array.isArray(o?.words))return;const e=o?.words;return n.createElement("ul",{"data-cy":"wordsList",className:m},e.map((e=>{return n.createElement("li",{className:p,key:e?.id},n.createElement(u.UK,{onClick:()=>{S(`/words/review/${e?.id}`)}},n.createElement(u.ye,{variant:"short",className:g,word:e,deleteButton:{callback:(t=e.id,function(){_({variables:{deleteWordId:t}})}),isLoading:L.loading}})));var t})))})(),n.createElement(a.j3,null))}},3842:(e,t,r)=>{r.d(t,{t:()=>l});var n=r(2970),a=r(2784),o=r(8769),i=r(5769),s=r(6675),u=["refetch","reobserve","fetchMore","updateQuery","startPolling","subscribeToMore"];function l(e,t){var r,l=a.useRef(),c=a.useRef(),d=a.useRef(),m=(0,o.J)(t,l.current||{}),p=null!==(r=null==m?void 0:m.query)&&void 0!==r?r:e;c.current=m,d.current=p;var f=(0,i.A)((0,s.x)(t&&t.client),p),g=f.useQuery((0,n.pi)((0,n.pi)({},m),{skip:!l.current})),v=g.observable.options.initialFetchPolicy||f.getDefaultFetchPolicy(),h=Object.assign(g,{called:!!l.current}),E=a.useMemo((function(){for(var e={},t=function(t){var r=h[t];e[t]=function(){return l.current||(l.current=Object.create(null),f.forceUpdateState()),r.apply(this,arguments)}},r=0,n=u;r<n.length;r++){t(n[r])}return e}),[]);Object.assign(h,E);var y=a.useCallback((function(e){l.current=e?(0,n.pi)((0,n.pi)({},e),{fetchPolicy:e.fetchPolicy||v}):{fetchPolicy:v};var t=(0,o.J)(c.current,(0,n.pi)({query:d.current},l.current)),r=f.executeQuery((0,n.pi)((0,n.pi)({},t),{skip:!1})).then((function(e){return Object.assign(e,E)}));return r.catch((function(){})),r}),[]);return[y,h]}},3379:(e,t,r)=>{r.d(t,{D:()=>c});var n=r(2970),a=r(2784),o=r(8769),i=r(8807),s=r(7274),u=r(5832),l=r(6675);function c(e,t){var r=(0,l.x)(null==t?void 0:t.client);(0,s.Vp)(e,s.n_.Mutation);var c=a.useState({called:!1,loading:!1,client:r}),d=c[0],m=c[1],p=a.useRef({result:d,mutationId:0,isMounted:!0,client:r,mutation:e,options:t});Object.assign(p.current,{client:r,options:t,mutation:e});var f=a.useCallback((function(e){void 0===e&&(e={});var t=p.current,r=t.options,a=t.mutation,s=(0,n.pi)((0,n.pi)({},r),{mutation:a}),l=e.client||p.current.client;p.current.result.loading||s.ignoreResults||!p.current.isMounted||m(p.current.result={loading:!0,error:void 0,data:void 0,called:!0,client:l});var c=++p.current.mutationId,d=(0,o.J)(s,e);return l.mutate(d).then((function(t){var r,n,a=t.data,o=t.errors,s=o&&o.length>0?new u.cA({graphQLErrors:o}):void 0,f=e.onError||(null===(r=p.current.options)||void 0===r?void 0:r.onError);if(s&&f&&f(s,d),c===p.current.mutationId&&!d.ignoreResults){var g={called:!0,loading:!1,data:a,error:s,client:l};p.current.isMounted&&!(0,i.D)(p.current.result,g)&&m(p.current.result=g)}var v=e.onCompleted||(null===(n=p.current.options)||void 0===n?void 0:n.onCompleted);return s||null==v||v(t.data,d),t})).catch((function(t){var r;if(c===p.current.mutationId&&p.current.isMounted){var n={loading:!1,error:t,data:void 0,called:!0,client:l};(0,i.D)(p.current.result,n)||m(p.current.result=n)}var a=e.onError||(null===(r=p.current.options)||void 0===r?void 0:r.onError);if(a)return a(t,d),{data:void 0,errors:t};throw t}))}),[]),g=a.useCallback((function(){if(p.current.isMounted){var e={called:!1,loading:!1,client:r};Object.assign(p.current,{mutationId:0,result:e}),m(e)}}),[]);return a.useEffect((function(){return p.current.isMounted=!0,function(){p.current.isMounted=!1}}),[]),[f,(0,n.pi)({reset:g},d)]}}}]);