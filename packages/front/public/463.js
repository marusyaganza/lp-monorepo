"use strict";(self.webpackChunk_lp_front=self.webpackChunk_lp_front||[]).push([[463],{7825:(e,t,a)=>{a.d(t,{P:()=>i});var r=a(2784),n=a(2370),s=a(3557),o=a(5424);const i=()=>{const{notification:e,setNotification:t}=(0,r.useContext)(o.I),a=(0,s.TH)(),i=(0,r.useCallback)((()=>{t()}),[t]);return(0,r.useEffect)((()=>{const e=setTimeout(i,5e3);return()=>{clearTimeout(e)}}),[e,i]),(0,r.useEffect)((()=>{e?.targetLocation!==a.pathname&&t()}),[a.pathname]),r.createElement(r.Fragment,null,e&&r.createElement(n.P_,{"data-cy":`notification-${e?.variant}`,onClose:i,...e,className:"notification"}))}},7752:(e,t,a)=>{a.d(t,{X:()=>f});var r=a(2784),n=a(3557),s=a(4144);const o=[{url:"/",text:"Home",icon:"home"},{url:`/${s._.search}`,text:"Explore",icon:"explorer"},{url:`/${s._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${s._.games}`,text:"Practice",icon:"dice"}],i=[{url:`/${s._.search}`,text:"Explore",icon:"explorer"},{url:`/${s._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${s._.games}`,text:"Practice",icon:"dice"},{url:"/profile",text:"Profile",icon:"dragon"}],l=[{url:"/",text:"Home",icon:"home"},{url:`/${s._.search}`,text:"Explore",icon:"explorer"},{url:`/${s._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${s._.games}`,text:"Practice",icon:"dice"}];var c=a(6525),u=a(2370),m=a(5424),d=a(7825),g=a(438);const p=[{text:"Review words",url:`/${s._.words}`},{text:"Look up words",url:`/${s._.search}`},{text:"Practice",url:`/${s._.games}`},{text:"Profile",url:`/${s._.profile}`}],f=({children:e,isLoading:t,noRedirect:a})=>{const{userId:f,logout:h,language:E,saveLanguage:x}=(0,r.useContext)(m.I),$=(0,n.s0)(),y=(0,n.TH)();(0,r.useEffect)((()=>{f||a||((0,g.x)("previousLocation",y.pathname),$("/sign-in"))}),[f,$,a,y.pathname]);const v=()=>{h(),$(`/${s._.signIn}`)};return r.createElement(r.Fragment,null,r.createElement("div",{className:"page"},r.createElement(d.P,null),f&&r.createElement(u.Er,{mobileNavLinks:i,navLinks:o,language:E,onLogout:v,userMenuItems:(w=v,[{url:`/${s._.profile}`,text:"Profile",icon:"dragon"},{onClick:w,text:"Logout",icon:"door"}]),onLanguageChange:e=>{x(e)}}),t?r.createElement(c.L,null):r.createElement("main",{className:"main"},e),f&&r.createElement(u.$_,{links:p,mobileLinks:l})));var w}},4341:(e,t,a)=>{a.d(t,{w:()=>i});var r=a(2784),n=a(2370);const s="HXscGkABuF7p9IZSp4k3",o="_52f1eETB38HnwTGZ1D7Q",i=({blankOption:e,onSortChange:t,sortBy:a,options:i,initialOrderValue:l,onOrderChange:c,className:u,blankValue:m,label:d})=>{const{Select:g,Option:p,setValue:f}=(0,n.L7)({onChange:t,initialValue:a});(0,r.useEffect)((()=>{a&&f(a)}),[a,f]);const h=Object.keys(i);return r.createElement("div",{"data-cy":"sortControls",className:(0,n.cn)(s,u)},r.createElement(g,{className:o,value:a,renderValue:e=>i?.[e]?i[e]:m||"Select words by",variant:"withIcon",label:d},r.createElement(p,{value:"",key:e},e),h.map((e=>r.createElement(p,{key:e,value:e},i[e])))),r.createElement(n.XZ,{onChange:c,initialValue:l,variant:"withIcon",iconId:l?"asc":"desc"}))}},3291:(e,t,a)=>{a.d(t,{$Q:()=>n,E:()=>s,IO:()=>c,Wp:()=>l,xR:()=>i,y:()=>o});var r=a(7834);const n=r.Ps`
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
`,s=r.Ps`
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
`,o=r.Ps`
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
`,i=r.Ps`
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
`,l=r.Ps`
  query Games {
    games {
      desc
      imgUrl
      name
      id
      type
    }
  }
`,c=r.Ps`
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
`},7463:(e,t,a)=>{a.r(t),a.d(t,{default:()=>$});var r=a(2784),n=a(3557),s=a(1074),o=a(2370),i=a(4144),l=a(7752),c=a(5424),u=a(438),m=a(4341),d=a(3291);const g="GhWrHSoje67WI8cZ0u5Q",p="Dlj7l5d2vTop4uGL3wlB",f="viSjSHdTz24ELYl2AtKj",h="ReXJh8OtXI63e8DOJE4o";var E=a(5769);const x={[s.hn.ErrorCount]:"Errors",[s.hn.LastTimePracticed]:"Last Practice Date",[s.hn.PracticedTimes]:"Practiced Times",[s.hn.SuccessRate]:"Success Rate",[s.hn.MemoryRefresher]:"Memory Refresher"},$=()=>{const{error:e,loading:t,data:a}=(0,E.a)(d.Wp),{setNotification:s}=(0,r.useContext)(c.I),[$,y]=(0,r.useState)(""),[v,w]=(0,r.useState)(!1),k=(0,r.useMemo)((()=>`?isReverseOrder=${v}${$?`&sortBy=${$}`:""}`),[$,v]),I=(0,r.useCallback)((e=>{y(e),(0,u.x)("sortGamesBy",e)}),[]),L=(0,r.useCallback)((e=>{w(e),(0,u.x)("gamesSortOrder",e)}),[]);return(0,r.useEffect)((()=>{e&&s({variant:"error",text:"Error",subText:e?.message||"something went wrong"})}),[e]),(0,r.useEffect)((()=>{const e=(0,u.Y)("sortGamesBy"),t=(0,u.Y)("gamesSortOrder");e&&y(e),t&&w(t)}),[]),r.createElement(l.X,null,r.createElement("div",{className:f},r.createElement("h1",{className:p},"Select a training"),r.createElement(m.w,{className:h,sortBy:$,initialOrderValue:v,options:x,onOrderChange:L,onSortChange:I,blankOption:"none"})),t&&r.createElement(o.$j,null),a?.games&&r.createElement("ul",{"data-cy":"gamesList",className:g},a.games.map((e=>{if(e)return r.createElement("li",{key:e.id},r.createElement(o.yb,{game:e,linkUrl:`/${i._.games}/${e.type?.toLocaleLowerCase()}${k}`}))}))),r.createElement(n.j3,null))}}}]);