"use strict";(self.webpackChunk_lp_front=self.webpackChunk_lp_front||[]).push([[915],{7825:(e,t,r)=>{r.d(t,{P:()=>s});var a=r(2784),n=r(2370),o=r(3557),i=r(5424);const s=()=>{const{notification:e,setNotification:t}=(0,a.useContext)(i.I),r=(0,o.TH)(),s=(0,a.useCallback)((()=>{t()}),[t]);return(0,a.useEffect)((()=>{const e=setTimeout(s,5e3);return()=>{clearTimeout(e)}}),[e,s]),(0,a.useEffect)((()=>{e?.targetLocation!==r.pathname&&t()}),[r.pathname]),a.createElement(a.Fragment,null,e&&a.createElement(n.P_,{"data-cy":`notification-${e?.variant}`,onClose:s,...e,className:"notification"}))}},7752:(e,t,r)=>{r.d(t,{X:()=>g});var a=r(2784),n=r(3557),o=r(4144);const i=[{url:"/",text:"Home",icon:"home"},{url:`/${o._.search}`,text:"Explore",icon:"explorer"},{url:`/${o._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${o._.games}`,text:"Practice",icon:"dice"}],s=[{url:`/${o._.search}`,text:"Explore",icon:"explorer"},{url:`/${o._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${o._.games}`,text:"Practice",icon:"dice"},{url:"/profile",text:"Profile",icon:"dragon"}],l=[{url:"/",text:"Home",icon:"home"},{url:`/${o._.search}`,text:"Explore",icon:"explorer"},{url:`/${o._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${o._.games}`,text:"Practice",icon:"dice"}];var u=r(6525),c=r(2370),d=r(5424),m=r(7825),p=r(438);const f=[{text:"Review words",url:`/${o._.words}`},{text:"Look up words",url:`/${o._.search}`},{text:"Practice",url:`/${o._.games}`},{text:"Profile",url:`/${o._.profile}`}],g=({children:e,isLoading:t,noRedirect:r})=>{const{userId:g,logout:x,language:$,saveLanguage:h}=(0,a.useContext)(d.I),E=(0,n.s0)(),_=(0,n.TH)();(0,a.useEffect)((()=>{g||r||((0,p.x)("previousLocation",_.pathname),E("/sign-in"))}),[g,E,r,_.pathname]);const v=()=>{x(),E(`/${o._.signIn}`)};return a.createElement(a.Fragment,null,a.createElement("div",{className:"page"},a.createElement(m.P,null),g&&a.createElement(c.Er,{mobileNavLinks:s,navLinks:i,language:$,onLogout:v,userMenuItems:(I=v,[{url:`/${o._.profile}`,text:"Profile",icon:"dragon"},{onClick:I,text:"Logout",icon:"door"}]),onLanguageChange:e=>{h(e)}}),t?a.createElement(u.L,null):a.createElement("main",{className:"main"},e),g&&a.createElement(c.$_,{links:f,mobileLinks:l})));var I}},3291:(e,t,r)=>{r.d(t,{$Q:()=>n,E:()=>o,IO:()=>u,Wp:()=>l,xR:()=>s,y:()=>i});var a=r(7834);const n=a.Ps`
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
`,o=a.Ps`
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
`,i=a.Ps`
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
`,s=a.Ps`
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
`,l=a.Ps`
  query Games {
    games {
      desc
      imgUrl
      name
      id
      type
    }
  }
`,u=a.Ps`
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
`},4915:(e,t,r)=>{r.r(t),r.d(t,{ProfilePage:()=>l,default:()=>u});var a=r(2784),n=r(7752),o=r(5424),i=r(5769),s=r(3291);const l=()=>{const{error:e,loading:t,data:r}=(0,i.a)(s.xR),{setNotification:l}=(0,a.useContext)(o.I);(0,a.useEffect)((()=>{e&&l({variant:"error",text:"Error",subText:e?.message})}),[e,l]);const u=new Date(Number.parseInt(r?.user?.createdAt||""));return a.createElement(n.X,{isLoading:t},r?.user&&a.createElement(a.Fragment,null,a.createElement("h1",null,`Hello ${r.user.firstName} ${r.user.lastName}!`),a.createElement("p",null,`Your role is ${r.user.role} sinse ${u}`)))},u=l}}]);