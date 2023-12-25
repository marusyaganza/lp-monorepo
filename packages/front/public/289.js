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
`},9289:(e,t,r)=>{r.r(t),r.d(t,{default:()=>C});var n,o=r(2784),a=r.n(o),s=r(3557),i=r(9857),u=r(1074),c=r(4144),l=r(2370),d=r(5424),p=r(6525);!function(e){e.CHECK_ANSWER="CHECK_ANSWER",e.NEXT="NEXT",e.START="START"}(n||(n={}));const m={currentIndex:0,isCompleted:!1,currentResult:{type:"initial"},resultData:[],result:{errorCount:0},wordsPerSession:0};function g(e,t){const{type:r}=t;if(r===n.START){const{wordsPerSession:e}=t.payload;return{...m,wordsPerSession:e,result:{errorCount:0},resultData:[]}}if(r===n.CHECK_ANSWER){const{correctAnswer:r,answer:n,id:o,gameType:a}=t.payload,s={...e};return n.toLocaleLowerCase()===r.toLocaleLowerCase()?(s.currentResult={type:"success",correctAnswer:r},s.resultData.push({id:o,hasError:!1,gameType:a})):(s.currentResult={type:"error",correctAnswer:r,incorrectAnswer:n},s.result.errorCount++,s.resultData.push({id:o,hasError:!0,gameType:a})),s}if(r===n.NEXT){const r={...e},n=e.currentIndex;return n===e.wordsPerSession-1?r.isCompleted=!0:r.currentIndex=e.currentIndex+1,t?.payload?.isLearned&&(r.resultData[n].isLearned=!0),r.currentResult={},r}return e}const f="Y6kgd6zZIHRhVENmaJNn",v="b5GuoympF7SdNTxKv4gC",y="ameAXgKESS9YG5f0mlzf";var h=r(3842),E=r(3379),I=r(3291),w=r(8664);const C=()=>{const e=(0,s.UO)(),t=(0,s.s0)(),[r,{loading:C,error:x,data:R}]=(0,h.t)(I.IO,{fetchPolicy:"no-cache"}),[S,$]=(0,E.D)(w.tz),{setNotification:P,language:b,userId:D}=(0,o.useContext)(d.I),[T,W]=(0,o.useReducer)(g,m),[M]=(0,i.lr)(),A=(0,o.useMemo)((()=>{const e=M.get("sortBy");return Object.values(u.hn).includes(e)?e:null}),[M]),N=(0,o.useMemo)((()=>"true"===M.get("isReverseOrder")),[M]),U=(0,o.useMemo)((()=>{const t=e.gameId?.toUpperCase();return Object.values(u.lA).includes(t)?t:void 0}),[e]),_=(0,o.useMemo)((()=>R?.game?.questions?.filter(Boolean)),[R]),k=(0,o.useMemo)((()=>T?.isCompleted),[T?.isCompleted]),L=(0,o.useMemo)((()=>k?100:100*(T.currentIndex+1)/(T.wordsPerSession+1)),[T,k]);(0,o.useEffect)((()=>{D||t("/sign-in")}),[D,t]),(0,o.useEffect)((()=>{U?r({variables:{input:{gameType:U,language:b,sortBy:A,isReverseOrder:N}}}):(P({variant:"error",text:"Error",subText:"game is not found",targetLocation:`/${c._.games}`}),t(`/${c._.games}`))}),[U,b,r,P,t]),(0,o.useEffect)((()=>{T.isCompleted&&S({variables:{input:T.resultData}})}),[T.isCompleted]),(0,o.useEffect)((()=>{x&&(P({variant:"error",text:"Error",subText:x?.message||"something went wrong",targetLocation:`/${c._.games}`}),t(`/${c._.games}`))}),[x]),(0,o.useEffect)((()=>{$.error&&(P({variant:"error",text:"Saving game result failed",subText:$.error?.message||"something went wrong",targetLocation:`/${c._.games}`}),t(`/${c._.games}`))}),[$.error]),(0,o.useEffect)((()=>{_?.length&&W({type:n.START,payload:{wordsPerSession:_?.length}})}),[_]);const O=C||$.loading;return a().createElement(a().Fragment,null,O&&a().createElement(p.L,null),R&&!O&&a().createElement("div",{className:f},!k&&a().createElement("header",{className:v},a().createElement(l.Ex,{value:L}),a().createElement(l.zx,{variant:"icon",iconId:"close",iconHeight:30,onClick:()=>{t(`/${c._.games}`)}},"Exit game")),a().createElement("main",{className:y},R&&!k&&a().createElement(l.lA,{currentResult:T.currentResult,additionalInfo:_?.[T.currentIndex]?.additionalInfo,type:R.game.type,onSubmit:e=>{if(_?.length&&R?.game){const t=e;W({type:n.CHECK_ANSWER,payload:{gameType:R.game.type,answer:t,correctAnswer:_[T.currentIndex]?.answer||"",id:_[T.currentIndex].wordId}})}},question:_?.[T.currentIndex].question,options:_?.[T.currentIndex]?.options,task:R?.game?.task,memoryRefresherMode:A===u.hn.MemoryRefresher,onNext:e=>{const t=e??!1;W({type:n.NEXT,payload:{isLearned:t}})}}),k&&a().createElement(l.Mh,{wordCount:T.wordsPerSession,erroCount:T.result.errorCount,buttonClickHandler:()=>{t(`/${c._.games}`)}})),!k&&a().createElement(l.to,{variant:T.currentResult.type||"inProgress"})))}},3842:(e,t,r)=>{r.d(t,{t:()=>c});var n=r(2970),o=r(2784),a=r(8769),s=r(5769),i=r(6675),u=["refetch","reobserve","fetchMore","updateQuery","startPolling","subscribeToMore"];function c(e,t){var r,c=o.useRef(),l=o.useRef(),d=o.useRef(),p=(0,a.J)(t,c.current||{}),m=null!==(r=null==p?void 0:p.query)&&void 0!==r?r:e;l.current=p,d.current=m;var g=(0,s.A)((0,i.x)(t&&t.client),m),f=g.useQuery((0,n.pi)((0,n.pi)({},p),{skip:!c.current})),v=f.observable.options.initialFetchPolicy||g.getDefaultFetchPolicy(),y=Object.assign(f,{called:!!c.current}),h=o.useMemo((function(){for(var e={},t=function(t){var r=y[t];e[t]=function(){return c.current||(c.current=Object.create(null),g.forceUpdateState()),r.apply(this,arguments)}},r=0,n=u;r<n.length;r++){t(n[r])}return e}),[]);Object.assign(y,h);var E=o.useCallback((function(e){c.current=e?(0,n.pi)((0,n.pi)({},e),{fetchPolicy:e.fetchPolicy||v}):{fetchPolicy:v};var t=(0,a.J)(l.current,(0,n.pi)({query:d.current},c.current)),r=g.executeQuery((0,n.pi)((0,n.pi)({},t),{skip:!1})).then((function(e){return Object.assign(e,h)}));return r.catch((function(){})),r}),[]);return[E,y]}},3379:(e,t,r)=>{r.d(t,{D:()=>l});var n=r(2970),o=r(2784),a=r(8769),s=r(8807),i=r(7274),u=r(5832),c=r(6675);function l(e,t){var r=(0,c.x)(null==t?void 0:t.client);(0,i.Vp)(e,i.n_.Mutation);var l=o.useState({called:!1,loading:!1,client:r}),d=l[0],p=l[1],m=o.useRef({result:d,mutationId:0,isMounted:!0,client:r,mutation:e,options:t});Object.assign(m.current,{client:r,options:t,mutation:e});var g=o.useCallback((function(e){void 0===e&&(e={});var t=m.current,r=t.options,o=t.mutation,i=(0,n.pi)((0,n.pi)({},r),{mutation:o}),c=e.client||m.current.client;m.current.result.loading||i.ignoreResults||!m.current.isMounted||p(m.current.result={loading:!0,error:void 0,data:void 0,called:!0,client:c});var l=++m.current.mutationId,d=(0,a.J)(i,e);return c.mutate(d).then((function(t){var r,n,o=t.data,a=t.errors,i=a&&a.length>0?new u.cA({graphQLErrors:a}):void 0,g=e.onError||(null===(r=m.current.options)||void 0===r?void 0:r.onError);if(i&&g&&g(i,d),l===m.current.mutationId&&!d.ignoreResults){var f={called:!0,loading:!1,data:o,error:i,client:c};m.current.isMounted&&!(0,s.D)(m.current.result,f)&&p(m.current.result=f)}var v=e.onCompleted||(null===(n=m.current.options)||void 0===n?void 0:n.onCompleted);return i||null==v||v(t.data,d),t})).catch((function(t){var r;if(l===m.current.mutationId&&m.current.isMounted){var n={loading:!1,error:t,data:void 0,called:!0,client:c};(0,s.D)(m.current.result,n)||p(m.current.result=n)}var o=e.onError||(null===(r=m.current.options)||void 0===r?void 0:r.onError);if(o)return o(t,d),{data:void 0,errors:t};throw t}))}),[]),f=o.useCallback((function(){if(m.current.isMounted){var e={called:!1,loading:!1,client:r};Object.assign(m.current,{mutationId:0,result:e}),p(e)}}),[]);return o.useEffect((function(){return m.current.isMounted=!0,function(){m.current.isMounted=!1}}),[]),[g,(0,n.pi)({reset:f},d)]}}}]);