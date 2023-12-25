"use strict";(self.webpackChunk_lp_front=self.webpackChunk_lp_front||[]).push([[47],{7825:(e,t,r)=>{r.d(t,{P:()=>c});var n=r(2784),a=r.n(n),o=r(2370),i=r(3557),s=r(5424);const c=()=>{const{notification:e,setNotification:t}=(0,n.useContext)(s.I),r=(0,i.TH)(),c=(0,n.useCallback)((()=>{t()}),[t]);return(0,n.useEffect)((()=>{const e=setTimeout(c,5e3);return()=>{clearTimeout(e)}}),[e,c]),(0,n.useEffect)((()=>{e?.targetLocation!==r.pathname&&t()}),[r.pathname]),a().createElement(a().Fragment,null,e&&a().createElement(o.P_,{"data-cy":`notification-${e?.variant}`,onClose:c,...e,className:"notification"}))}},7752:(e,t,r)=>{r.d(t,{X:()=>x});var n=r(2784),a=r.n(n),o=r(3557),i=r(4144);const s=[{url:"/",text:"Home",icon:"home"},{url:`/${i._.search}`,text:"Explore",icon:"explorer"},{url:`/${i._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${i._.games}`,text:"Practice",icon:"dice"}],c=[{url:`/${i._.search}`,text:"Explore",icon:"explorer"},{url:`/${i._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${i._.games}`,text:"Practice",icon:"dice"},{url:"/profile",text:"Profile",icon:"dragon"}],l=[{url:"/",text:"Home",icon:"home"},{url:`/${i._.search}`,text:"Explore",icon:"explorer"},{url:`/${i._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${i._.games}`,text:"Practice",icon:"dice"}];var u=r(6525),d=r(2370),m=r(5424),f=r(7825),p=r(438);const g=[{text:"Review words",url:`/${i._.words}`},{text:"Look up words",url:`/${i._.search}`},{text:"Practice",url:`/${i._.games}`},{text:"Profile",url:`/${i._.profile}`}],x=({children:e,isLoading:t,noRedirect:r})=>{const{userId:x,logout:h,language:v,saveLanguage:y}=(0,n.useContext)(m.I),$=(0,o.s0)(),E=(0,o.TH)();(0,n.useEffect)((()=>{x||r||((0,p.x)("previousLocation",E.pathname),$("/sign-in"))}),[x,$,r,E.pathname]);const b=()=>{h(),$(`/${i._.signIn}`)};return a().createElement(a().Fragment,null,a().createElement("div",{className:"page"},a().createElement(f.P,null),x&&a().createElement(d.Er,{mobileNavLinks:c,navLinks:s,language:v,onLogout:b,userMenuItems:(w=b,[{url:`/${i._.profile}`,text:"Profile",icon:"dragon"},{onClick:w,text:"Logout",icon:"door"}]),onLanguageChange:e=>{y(e)}}),t?a().createElement(u.L,null):a().createElement("main",{className:"main"},e),x&&a().createElement(d.$_,{links:g,mobileLinks:l})));var w}},3291:(e,t,r)=>{r.d(t,{$Q:()=>a,E:()=>o,IO:()=>l,Wp:()=>c,xR:()=>s,y:()=>i});var n=r(7834);const a=n.Ps`
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
`},4047:(e,t,r)=>{r.r(t),r.d(t,{default:()=>p});var n=r(2784),a=r.n(n),o=r(3842),i=r(3557),s=r(2370),c=r(4144),l=r(7752),u=r(3291),d=r(5424);const m="UAxEgW0KioOzvaaHeGGC",f="zRIE5SKR4MmyDqquIwlK",p=()=>{const{wordId:e}=(0,i.UO)(),{setNotification:t}=(0,n.useContext)(d.I),[r,{loading:p,error:g,data:x}]=(0,o.t)(u.E),h=(0,i.s0)();(0,n.useEffect)((()=>{r({variables:{wordId:e}})}),[e]);return(0,n.useEffect)((()=>{g&&t({variant:"error",text:"Error",subText:g?.message})}),[g,t]),a().createElement(l.X,null,a().createElement(s.rU,{className:f,to:`/${c._.words}`},a().createElement(s.JO,{width:16,height:16,id:"arrow-left"}),"Back to vocabulary"),p&&a().createElement(s.$j,null),x?.word&&a().createElement(s.ye,{className:m,word:x.word,editButton:{callback:()=>{h(`/${c._.words}/edit/${e}`)},isLoading:p}}))}},3842:(e,t,r)=>{r.d(t,{t:()=>l});var n=r(2970),a=r(2784),o=r(8769),i=r(5769),s=r(6675),c=["refetch","reobserve","fetchMore","updateQuery","startPolling","subscribeToMore"];function l(e,t){var r,l=a.useRef(),u=a.useRef(),d=a.useRef(),m=(0,o.J)(t,l.current||{}),f=null!==(r=null==m?void 0:m.query)&&void 0!==r?r:e;u.current=m,d.current=f;var p=(0,i.A)((0,s.x)(t&&t.client),f),g=p.useQuery((0,n.pi)((0,n.pi)({},m),{skip:!l.current})),x=g.observable.options.initialFetchPolicy||p.getDefaultFetchPolicy(),h=Object.assign(g,{called:!!l.current}),v=a.useMemo((function(){for(var e={},t=function(t){var r=h[t];e[t]=function(){return l.current||(l.current=Object.create(null),p.forceUpdateState()),r.apply(this,arguments)}},r=0,n=c;r<n.length;r++){t(n[r])}return e}),[]);Object.assign(h,v);var y=a.useCallback((function(e){l.current=e?(0,n.pi)((0,n.pi)({},e),{fetchPolicy:e.fetchPolicy||x}):{fetchPolicy:x};var t=(0,o.J)(u.current,(0,n.pi)({query:d.current},l.current)),r=p.executeQuery((0,n.pi)((0,n.pi)({},t),{skip:!1})).then((function(e){return Object.assign(e,v)}));return r.catch((function(){})),r}),[]);return[y,h]}}}]);