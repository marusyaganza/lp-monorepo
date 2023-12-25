"use strict";(self.webpackChunk_lp_front=self.webpackChunk_lp_front||[]).push([[289],{8664:(e,t,r)=>{r.d(t,{Q0:()=>u,UE:()=>s,Ym:()=>i,_5:()=>a,tz:()=>c,ym:()=>o});var n=r(7834);const o=n.Ps`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      id
    }
  }
`,a=n.Ps`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      token
      id
    }
  }
`,s=n.Ps`
  mutation SaveWord($input: NewWordInput!) {
    saveWord(input: $input) {
      name
      uuid
    }
  }
`,i=n.Ps`
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
`},3291:(e,t,r)=>{r.d(t,{$Q:()=>o,E:()=>a,IO:()=>c,Wp:()=>u,xR:()=>i,y:()=>s});var n=r(7834);const o=n.Ps`
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
`,a=n.Ps`
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
`,s=n.Ps`
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
`,i=n.Ps`
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
`},9289:(e,t,r)=>{r.r(t),r.d(t,{default:()=>w});var n,o=r(2784),a=r(3557),s=r(9857),i=r(1074),u=r(4144),c=r(2370),l=r(5424),d=r(6525);!function(e){e.CHECK_ANSWER="CHECK_ANSWER",e.NEXT="NEXT",e.START="START"}(n||(n={}));const p={currentIndex:0,isCompleted:!1,currentResult:{type:"initial"},resultData:[],result:{errorCount:0},wordsPerSession:0};function m(e,t){const{type:r}=t;if(r===n.START){const{wordsPerSession:e}=t.payload;return{...p,wordsPerSession:e,result:{errorCount:0},resultData:[]}}if(r===n.CHECK_ANSWER){const{correctAnswer:r,answer:n,id:o,gameType:a}=t.payload,s={...e};return n.toLocaleLowerCase()===r.toLocaleLowerCase()?(s.currentResult={type:"success",correctAnswer:r},s.resultData.push({id:o,hasError:!1,gameType:a})):(s.currentResult={type:"error",correctAnswer:r,incorrectAnswer:n},s.result.errorCount++,s.resultData.push({id:o,hasError:!0,gameType:a})),s}if(r===n.NEXT){const r={...e},n=e.currentIndex;return n===e.wordsPerSession-1?r.isCompleted=!0:r.currentIndex=e.currentIndex+1,t?.payload?.isLearned&&(r.resultData[n].isLearned=!0),r.currentResult={},r}return e}const g="Y6kgd6zZIHRhVENmaJNn",f="b5GuoympF7SdNTxKv4gC",v="ameAXgKESS9YG5f0mlzf";var y=r(3842),h=r(3379),E=r(3291),I=r(8664);const w=()=>{const e=(0,a.UO)(),t=(0,a.s0)(),[r,{loading:w,error:C,data:x}]=(0,y.t)(E.IO,{fetchPolicy:"no-cache"}),[R,S]=(0,h.D)(I.tz),{setNotification:$,language:P,userId:b}=(0,o.useContext)(l.I),[D,T]=(0,o.useReducer)(m,p),[W]=(0,s.lr)(),M=(0,o.useMemo)((()=>{const e=W.get("sortBy");return Object.values(i.hn).includes(e)?e:null}),[W]),A=(0,o.useMemo)((()=>"true"===W.get("isReverseOrder")),[W]),N=(0,o.useMemo)((()=>{const t=e.gameId?.toUpperCase();return Object.values(i.lA).includes(t)?t:void 0}),[e]),U=(0,o.useMemo)((()=>x?.game?.questions?.filter(Boolean)),[x]),_=(0,o.useMemo)((()=>D?.isCompleted),[D?.isCompleted]),k=(0,o.useMemo)((()=>_?100:100*(D.currentIndex+1)/(D.wordsPerSession+1)),[D,_]);(0,o.useEffect)((()=>{b||t("/sign-in")}),[b,t]),(0,o.useEffect)((()=>{N?r({variables:{input:{gameType:N,language:P,sortBy:M,isReverseOrder:A}}}):($({variant:"error",text:"Error",subText:"game is not found",targetLocation:`/${u._.games}`}),t(`/${u._.games}`))}),[N,P,r,$,t]),(0,o.useEffect)((()=>{D.isCompleted&&R({variables:{input:D.resultData}})}),[D.isCompleted]),(0,o.useEffect)((()=>{C&&($({variant:"error",text:"Error",subText:C?.message||"something went wrong",targetLocation:`/${u._.games}`}),t(`/${u._.games}`))}),[C]),(0,o.useEffect)((()=>{S.error&&($({variant:"error",text:"Saving game result failed",subText:S.error?.message||"something went wrong",targetLocation:`/${u._.games}`}),t(`/${u._.games}`))}),[S.error]),(0,o.useEffect)((()=>{U?.length&&T({type:n.START,payload:{wordsPerSession:U?.length}})}),[U]);const L=w||S.loading;return o.createElement(o.Fragment,null,L&&o.createElement(d.L,null),x&&!L&&o.createElement("div",{className:g},!_&&o.createElement("header",{className:f},o.createElement(c.Ex,{value:k}),o.createElement(c.zx,{variant:"icon",iconId:"close",iconHeight:30,onClick:()=>{t(`/${u._.games}`)}},"Exit game")),o.createElement("main",{className:v},x&&!_&&o.createElement(c.lA,{currentResult:D.currentResult,additionalInfo:U?.[D.currentIndex]?.additionalInfo,type:x.game.type,onSubmit:e=>{if(U?.length&&x?.game){const t=e;T({type:n.CHECK_ANSWER,payload:{gameType:x.game.type,answer:t,correctAnswer:U[D.currentIndex]?.answer||"",id:U[D.currentIndex].wordId}})}},question:U?.[D.currentIndex].question,options:U?.[D.currentIndex]?.options,task:x?.game?.task,memoryRefresherMode:M===i.hn.MemoryRefresher,onNext:e=>{const t=e??!1;T({type:n.NEXT,payload:{isLearned:t}})}}),_&&o.createElement(c.Mh,{wordCount:D.wordsPerSession,erroCount:D.result.errorCount,buttonClickHandler:()=>{t(`/${u._.games}`)}})),!_&&o.createElement(c.to,{variant:D.currentResult.type||"inProgress"})))}},3842:(e,t,r)=>{r.d(t,{t:()=>c});var n=r(2970),o=r(2784),a=r(8769),s=r(5769),i=r(6675),u=["refetch","reobserve","fetchMore","updateQuery","startPolling","subscribeToMore"];function c(e,t){var r,c=o.useRef(),l=o.useRef(),d=o.useRef(),p=(0,a.J)(t,c.current||{}),m=null!==(r=null==p?void 0:p.query)&&void 0!==r?r:e;l.current=p,d.current=m;var g=(0,s.A)((0,i.x)(t&&t.client),m),f=g.useQuery((0,n.pi)((0,n.pi)({},p),{skip:!c.current})),v=f.observable.options.initialFetchPolicy||g.getDefaultFetchPolicy(),y=Object.assign(f,{called:!!c.current}),h=o.useMemo((function(){for(var e={},t=function(t){var r=y[t];e[t]=function(){return c.current||(c.current=Object.create(null),g.forceUpdateState()),r.apply(this,arguments)}},r=0,n=u;r<n.length;r++){t(n[r])}return e}),[]);Object.assign(y,h);var E=o.useCallback((function(e){c.current=e?(0,n.pi)((0,n.pi)({},e),{fetchPolicy:e.fetchPolicy||v}):{fetchPolicy:v};var t=(0,a.J)(l.current,(0,n.pi)({query:d.current},c.current)),r=g.executeQuery((0,n.pi)((0,n.pi)({},t),{skip:!1})).then((function(e){return Object.assign(e,h)}));return r.catch((function(){})),r}),[]);return[E,y]}},3379:(e,t,r)=>{r.d(t,{D:()=>l});var n=r(2970),o=r(2784),a=r(8769),s=r(8807),i=r(7274),u=r(5832),c=r(6675);function l(e,t){var r=(0,c.x)(null==t?void 0:t.client);(0,i.Vp)(e,i.n_.Mutation);var l=o.useState({called:!1,loading:!1,client:r}),d=l[0],p=l[1],m=o.useRef({result:d,mutationId:0,isMounted:!0,client:r,mutation:e,options:t});Object.assign(m.current,{client:r,options:t,mutation:e});var g=o.useCallback((function(e){void 0===e&&(e={});var t=m.current,r=t.options,o=t.mutation,i=(0,n.pi)((0,n.pi)({},r),{mutation:o}),c=e.client||m.current.client;m.current.result.loading||i.ignoreResults||!m.current.isMounted||p(m.current.result={loading:!0,error:void 0,data:void 0,called:!0,client:c});var l=++m.current.mutationId,d=(0,a.J)(i,e);return c.mutate(d).then((function(t){var r,n,o=t.data,a=t.errors,i=a&&a.length>0?new u.cA({graphQLErrors:a}):void 0,g=e.onError||(null===(r=m.current.options)||void 0===r?void 0:r.onError);if(i&&g&&g(i,d),l===m.current.mutationId&&!d.ignoreResults){var f={called:!0,loading:!1,data:o,error:i,client:c};m.current.isMounted&&!(0,s.D)(m.current.result,f)&&p(m.current.result=f)}var v=e.onCompleted||(null===(n=m.current.options)||void 0===n?void 0:n.onCompleted);return i||null==v||v(t.data,d),t})).catch((function(t){var r;if(l===m.current.mutationId&&m.current.isMounted){var n={loading:!1,error:t,data:void 0,called:!0,client:c};(0,s.D)(m.current.result,n)||p(m.current.result=n)}var o=e.onError||(null===(r=m.current.options)||void 0===r?void 0:r.onError);if(o)return o(t,d),{data:void 0,errors:t};throw t}))}),[]),f=o.useCallback((function(){if(m.current.isMounted){var e={called:!1,loading:!1,client:r};Object.assign(m.current,{mutationId:0,result:e}),p(e)}}),[]);return o.useEffect((function(){return m.current.isMounted=!0,function(){m.current.isMounted=!1}}),[]),[g,(0,n.pi)({reset:f},d)]}}}]);