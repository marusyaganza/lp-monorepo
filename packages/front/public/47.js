"use strict";(self.webpackChunk_lp_front=self.webpackChunk_lp_front||[]).push([[47],{7825:(e,t,r)=>{r.d(t,{P:()=>s});var n=r(2784),a=r(2370),o=r(3557),i=r(5424);const s=()=>{const{notification:e,setNotification:t}=(0,n.useContext)(i.I),r=(0,o.TH)(),s=(0,n.useCallback)((()=>{t()}),[t]);return(0,n.useEffect)((()=>{const e=setTimeout(s,5e3);return()=>{clearTimeout(e)}}),[e,s]),(0,n.useEffect)((()=>{e?.targetLocation!==r.pathname&&t()}),[r.pathname]),n.createElement(n.Fragment,null,e&&n.createElement(a.P_,{"data-cy":`notification-${e?.variant}`,onClose:s,...e,className:"notification"}))}},7752:(e,t,r)=>{r.d(t,{X:()=>g});var n=r(2784),a=r(3557),o=r(4144);const i=[{url:"/",text:"Home",icon:"home"},{url:`/${o._.search}`,text:"Explore",icon:"explorer"},{url:`/${o._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${o._.games}`,text:"Practice",icon:"dice"}],s=[{url:`/${o._.search}`,text:"Explore",icon:"explorer"},{url:`/${o._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${o._.games}`,text:"Practice",icon:"dice"},{url:"/profile",text:"Profile",icon:"dragon"}],c=[{url:"/",text:"Home",icon:"home"},{url:`/${o._.search}`,text:"Explore",icon:"explorer"},{url:`/${o._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${o._.games}`,text:"Practice",icon:"dice"}];var l=r(6525),u=r(2370),d=r(5424),m=r(7825),f=r(438);const p=[{text:"Review words",url:`/${o._.words}`},{text:"Look up words",url:`/${o._.search}`},{text:"Practice",url:`/${o._.games}`},{text:"Profile",url:`/${o._.profile}`}],g=({children:e,isLoading:t,noRedirect:r})=>{const{userId:g,logout:x,language:h,saveLanguage:v}=(0,n.useContext)(d.I),y=(0,a.s0)(),$=(0,a.TH)();(0,n.useEffect)((()=>{g||r||((0,f.x)("previousLocation",$.pathname),y("/sign-in"))}),[g,y,r,$.pathname]);const E=()=>{x(),y(`/${o._.signIn}`)};return n.createElement(n.Fragment,null,n.createElement("div",{className:"page"},n.createElement(m.P,null),g&&n.createElement(u.Er,{mobileNavLinks:s,navLinks:i,language:h,onLogout:E,userMenuItems:(b=E,[{url:`/${o._.profile}`,text:"Profile",icon:"dragon"},{onClick:b,text:"Logout",icon:"door"}]),onLanguageChange:e=>{v(e)}}),t?n.createElement(l.L,null):n.createElement("main",{className:"main"},e),g&&n.createElement(u.$_,{links:p,mobileLinks:c})));var b}},3291:(e,t,r)=>{r.d(t,{$Q:()=>a,E:()=>o,IO:()=>l,Wp:()=>c,xR:()=>s,y:()=>i});var n=r(7834);const a=n.Ps`
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
`,c=n.Ps`
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
`},4047:(e,t,r)=>{r.r(t),r.d(t,{default:()=>f});var n=r(2784),a=r(3842),o=r(3557),i=r(2370),s=r(4144),c=r(7752),l=r(3291),u=r(5424);const d="UAxEgW0KioOzvaaHeGGC",m="zRIE5SKR4MmyDqquIwlK",f=()=>{const{wordId:e}=(0,o.UO)(),{setNotification:t}=(0,n.useContext)(u.I),[r,{loading:f,error:p,data:g}]=(0,a.t)(l.E),x=(0,o.s0)();(0,n.useEffect)((()=>{r({variables:{wordId:e}})}),[e]);return(0,n.useEffect)((()=>{p&&t({variant:"error",text:"Error",subText:p?.message})}),[p,t]),n.createElement(c.X,null,n.createElement(i.rU,{className:m,to:`/${s._.words}`},n.createElement(i.JO,{width:16,height:16,id:"arrow-left"}),"Back to vocabulary"),f&&n.createElement(i.$j,null),g?.word&&n.createElement(i.ye,{className:d,word:g.word,editButton:{callback:()=>{x(`/${s._.words}/edit/${e}`)},isLoading:f}}))}},3842:(e,t,r)=>{r.d(t,{t:()=>l});var n=r(2970),a=r(2784),o=r(8769),i=r(5769),s=r(6675),c=["refetch","reobserve","fetchMore","updateQuery","startPolling","subscribeToMore"];function l(e,t){var r,l=a.useRef(),u=a.useRef(),d=a.useRef(),m=(0,o.J)(t,l.current||{}),f=null!==(r=null==m?void 0:m.query)&&void 0!==r?r:e;u.current=m,d.current=f;var p=(0,i.A)((0,s.x)(t&&t.client),f),g=p.useQuery((0,n.pi)((0,n.pi)({},m),{skip:!l.current})),x=g.observable.options.initialFetchPolicy||p.getDefaultFetchPolicy(),h=Object.assign(g,{called:!!l.current}),v=a.useMemo((function(){for(var e={},t=function(t){var r=h[t];e[t]=function(){return l.current||(l.current=Object.create(null),p.forceUpdateState()),r.apply(this,arguments)}},r=0,n=c;r<n.length;r++){t(n[r])}return e}),[]);Object.assign(h,v);var y=a.useCallback((function(e){l.current=e?(0,n.pi)((0,n.pi)({},e),{fetchPolicy:e.fetchPolicy||x}):{fetchPolicy:x};var t=(0,o.J)(u.current,(0,n.pi)({query:d.current},l.current)),r=p.executeQuery((0,n.pi)((0,n.pi)({},t),{skip:!1})).then((function(e){return Object.assign(e,v)}));return r.catch((function(){})),r}),[]);return[y,h]}}}]);