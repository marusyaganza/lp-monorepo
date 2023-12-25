"use strict";(self.webpackChunk_lp_front=self.webpackChunk_lp_front||[]).push([[463],{7825:(e,t,a)=>{a.d(t,{P:()=>l});var r=a(2784),n=a.n(r),s=a(2370),o=a(3557),i=a(5424);const l=()=>{const{notification:e,setNotification:t}=(0,r.useContext)(i.I),a=(0,o.TH)(),l=(0,r.useCallback)((()=>{t()}),[t]);return(0,r.useEffect)((()=>{const e=setTimeout(l,5e3);return()=>{clearTimeout(e)}}),[e,l]),(0,r.useEffect)((()=>{e?.targetLocation!==a.pathname&&t()}),[a.pathname]),n().createElement(n().Fragment,null,e&&n().createElement(s.P_,{"data-cy":`notification-${e?.variant}`,onClose:l,...e,className:"notification"}))}},7752:(e,t,a)=>{a.d(t,{X:()=>h});var r=a(2784),n=a.n(r),s=a(3557),o=a(4144);const i=[{url:"/",text:"Home",icon:"home"},{url:`/${o._.search}`,text:"Explore",icon:"explorer"},{url:`/${o._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${o._.games}`,text:"Practice",icon:"dice"}],l=[{url:`/${o._.search}`,text:"Explore",icon:"explorer"},{url:`/${o._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${o._.games}`,text:"Practice",icon:"dice"},{url:"/profile",text:"Profile",icon:"dragon"}],c=[{url:"/",text:"Home",icon:"home"},{url:`/${o._.search}`,text:"Explore",icon:"explorer"},{url:`/${o._.words}`,text:"Vocabulary",icon:"brain"},{url:`/${o._.games}`,text:"Practice",icon:"dice"}];var u=a(6525),m=a(2370),d=a(5424),g=a(7825),p=a(438);const f=[{text:"Review words",url:`/${o._.words}`},{text:"Look up words",url:`/${o._.search}`},{text:"Practice",url:`/${o._.games}`},{text:"Profile",url:`/${o._.profile}`}],h=({children:e,isLoading:t,noRedirect:a})=>{const{userId:h,logout:E,language:x,saveLanguage:$}=(0,r.useContext)(d.I),y=(0,s.s0)(),v=(0,s.TH)();(0,r.useEffect)((()=>{h||a||((0,p.x)("previousLocation",v.pathname),y("/sign-in"))}),[h,y,a,v.pathname]);const w=()=>{E(),y(`/${o._.signIn}`)};return n().createElement(n().Fragment,null,n().createElement("div",{className:"page"},n().createElement(g.P,null),h&&n().createElement(m.Er,{mobileNavLinks:l,navLinks:i,language:x,onLogout:w,userMenuItems:(k=w,[{url:`/${o._.profile}`,text:"Profile",icon:"dragon"},{onClick:k,text:"Logout",icon:"door"}]),onLanguageChange:e=>{$(e)}}),t?n().createElement(u.L,null):n().createElement("main",{className:"main"},e),h&&n().createElement(m.$_,{links:f,mobileLinks:c})));var k}},4341:(e,t,a)=>{a.d(t,{w:()=>l});var r=a(2784),n=a.n(r),s=a(2370);const o="HXscGkABuF7p9IZSp4k3",i="_52f1eETB38HnwTGZ1D7Q",l=({blankOption:e,onSortChange:t,sortBy:a,options:l,initialOrderValue:c,onOrderChange:u,className:m,blankValue:d,label:g})=>{const{Select:p,Option:f,setValue:h}=(0,s.L7)({onChange:t,initialValue:a});(0,r.useEffect)((()=>{a&&h(a)}),[a,h]);const E=Object.keys(l);return n().createElement("div",{"data-cy":"sortControls",className:(0,s.cn)(o,m)},n().createElement(p,{className:i,value:a,renderValue:e=>l?.[e]?l[e]:d||"Select words by",variant:"withIcon",label:g},n().createElement(f,{value:"",key:e},e),E.map((e=>n().createElement(f,{key:e,value:e},l[e])))),n().createElement(s.XZ,{onChange:u,initialValue:c,variant:"withIcon",iconId:c?"asc":"desc"}))}},3291:(e,t,a)=>{a.d(t,{$Q:()=>n,E:()=>s,IO:()=>c,Wp:()=>l,xR:()=>i,y:()=>o});var r=a(7834);const n=r.Ps`
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
`},7463:(e,t,a)=>{a.r(t),a.d(t,{default:()=>y});var r=a(2784),n=a.n(r),s=a(3557),o=a(1074),i=a(2370),l=a(4144),c=a(7752),u=a(5424),m=a(438),d=a(4341),g=a(3291);const p="GhWrHSoje67WI8cZ0u5Q",f="Dlj7l5d2vTop4uGL3wlB",h="viSjSHdTz24ELYl2AtKj",E="ReXJh8OtXI63e8DOJE4o";var x=a(5769);const $={[o.hn.ErrorCount]:"Errors",[o.hn.LastTimePracticed]:"Last Practice Date",[o.hn.PracticedTimes]:"Practiced Times",[o.hn.SuccessRate]:"Success Rate",[o.hn.MemoryRefresher]:"Memory Refresher"},y=()=>{const{error:e,loading:t,data:a}=(0,x.a)(g.Wp),{setNotification:o}=(0,r.useContext)(u.I),[y,v]=(0,r.useState)(""),[w,k]=(0,r.useState)(!1),I=(0,r.useMemo)((()=>`?isReverseOrder=${w}${y?`&sortBy=${y}`:""}`),[y,w]),L=(0,r.useCallback)((e=>{v(e),(0,m.x)("sortGamesBy",e)}),[]),_=(0,r.useCallback)((e=>{k(e),(0,m.x)("gamesSortOrder",e)}),[]);return(0,r.useEffect)((()=>{e&&o({variant:"error",text:"Error",subText:e?.message||"something went wrong"})}),[e]),(0,r.useEffect)((()=>{const e=(0,m.Y)("sortGamesBy"),t=(0,m.Y)("gamesSortOrder");e&&v(e),t&&k(t)}),[]),n().createElement(c.X,null,n().createElement("div",{className:h},n().createElement("h1",{className:f},"Select a training"),n().createElement(d.w,{className:E,sortBy:y,initialOrderValue:w,options:$,onOrderChange:_,onSortChange:L,blankOption:"none"})),t&&n().createElement(i.$j,null),a?.games&&n().createElement("ul",{"data-cy":"gamesList",className:p},a.games.map((e=>{if(e)return n().createElement("li",{key:e.id},n().createElement(i.yb,{game:e,linkUrl:`/${l._.games}/${e.type?.toLocaleLowerCase()}${I}`}))}))),n().createElement(s.j3,null))}}}]);