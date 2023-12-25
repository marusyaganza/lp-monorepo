"use strict";(self.webpackChunk_lp_front=self.webpackChunk_lp_front||[]).push([[915],{7825:(e,t,r)=>{r.d(t,{P:()=>l});var a=r(2784),n=r.n(a),o=r(2370),i=r(3557),s=r(5424);const l=()=>{const{notification:e,setNotification:t}=(0,a.useContext)(s.I),r=(0,i.TH)(),l=(0,a.useCallback)((()=>{t()}),[t]);return(0,a.useEffect)((()=>{const e=setTimeout(l,5e3);return()=>{clearTimeout(e)}}),[e,l]),(0,a.useEffect)((()=>{e?.targetLocation!==r.pathname&&t()}),[r.pathname]),n().createElement(n().Fragment,null,e&&n().createElement(o.P_,{"data-cy":`notification-${e?.variant}`,onClose:l,...e,className:"notification"}))}},7752:(e,t,r)=>{r.d(t,{X:()=>x});var a=r(2784),n=r.n(a),o=r(3557),i=r(4144);const s=[{url:"/",text:"Home",icon:"home"},{url:`/${i._.search}`,text:"Explore",icon:"explorer"},{url:`/${i._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${i._.games}`,text:"Practice",icon:"dice"}],l=[{url:`/${i._.search}`,text:"Explore",icon:"explorer"},{url:`/${i._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${i._.games}`,text:"Practice",icon:"dice"},{url:"/profile",text:"Profile",icon:"dragon"}],u=[{url:"/",text:"Home",icon:"home"},{url:`/${i._.search}`,text:"Explore",icon:"explorer"},{url:`/${i._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${i._.games}`,text:"Practice",icon:"dice"}];var c=r(6525),d=r(2370),m=r(5424),p=r(7825),f=r(438);const g=[{text:"Review words",url:`/${i._.words}`},{text:"Look up words",url:`/${i._.search}`},{text:"Practice",url:`/${i._.games}`},{text:"Profile",url:`/${i._.profile}`}],x=({children:e,isLoading:t,noRedirect:r})=>{const{userId:x,logout:$,language:h,saveLanguage:E}=(0,a.useContext)(m.I),_=(0,o.s0)(),v=(0,o.TH)();(0,a.useEffect)((()=>{x||r||((0,f.x)("previousLocation",v.pathname),_("/sign-in"))}),[x,_,r,v.pathname]);const I=()=>{$(),_(`/${i._.signIn}`)};return n().createElement(n().Fragment,null,n().createElement("div",{className:"page"},n().createElement(p.P,null),x&&n().createElement(d.Er,{mobileNavLinks:l,navLinks:s,language:h,onLogout:I,userMenuItems:(P=I,[{url:`/${i._.profile}`,text:"Profile",icon:"dragon"},{onClick:P,text:"Logout",icon:"door"}]),onLanguageChange:e=>{E(e)}}),t?n().createElement(c.L,null):n().createElement("main",{className:"main"},e),x&&n().createElement(d.$_,{links:g,mobileLinks:u})));var P}},3291:(e,t,r)=>{r.d(t,{$Q:()=>n,E:()=>o,IO:()=>u,Wp:()=>l,xR:()=>s,y:()=>i});var a=r(7834);const n=a.Ps`
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
`},4915:(e,t,r)=>{r.r(t),r.d(t,{ProfilePage:()=>u,default:()=>c});var a=r(2784),n=r.n(a),o=r(7752),i=r(5424),s=r(5769),l=r(3291);const u=()=>{const{error:e,loading:t,data:r}=(0,s.a)(l.xR),{setNotification:u}=(0,a.useContext)(i.I);(0,a.useEffect)((()=>{e&&u({variant:"error",text:"Error",subText:e?.message})}),[e,u]);const c=new Date(Number.parseInt(r?.user?.createdAt||""));return n().createElement(o.X,{isLoading:t},r?.user&&n().createElement(n().Fragment,null,n().createElement("h1",null,`Hello ${r.user.firstName} ${r.user.lastName}!`),n().createElement("p",null,`Your role is ${r.user.role} sinse ${c}`)))},c=u}}]);