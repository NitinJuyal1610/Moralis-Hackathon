(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[663],{86094:function(i,n,t){"use strict";t.r(n),t.d(n,{OpenloginAdapter:function(){return p},getOpenloginDefaultOptions:function(){return h}});var e=t(3388),o=t(45624),s=t(4942),r=t(67845),a=t(72378),c=t.n(a);const h=(i,n)=>({adapterSettings:{network:e.dr.MAINNET,clientId:"",uxMode:e.$e.POPUP},chainConfig:i?(0,o.h2)(i,n):null,loginSettings:{}});function l(i,n){var t=Object.keys(i);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(i);n&&(e=e.filter((function(n){return Object.getOwnPropertyDescriptor(i,n).enumerable}))),t.push.apply(t,e)}return t}function g(i){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){(0,s.Z)(i,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(i,n,Object.getOwnPropertyDescriptor(t,n))}))}return i}class p extends o.J5{constructor(i){var n,t,r,a;super(),(0,s.Z)(this,"name",o.rW.OPENLOGIN),(0,s.Z)(this,"adapterNamespace",o.yk.MULTICHAIN),(0,s.Z)(this,"type",o.hN.IN_APP),(0,s.Z)(this,"openloginInstance",null),(0,s.Z)(this,"clientId",void 0),(0,s.Z)(this,"status",o.MP.NOT_READY),(0,s.Z)(this,"currentChainNamespace",o.EN.EIP155),(0,s.Z)(this,"openloginOptions",void 0),(0,s.Z)(this,"loginSettings",{}),(0,s.Z)(this,"privKeyProvider",null),o.cM.debug("const openlogin adapter",i);const c=h(null===(n=i.chainConfig)||void 0===n?void 0:n.chainNamespace,null===(t=i.chainConfig)||void 0===t?void 0:t.chainId);if(this.openloginOptions=g(g({clientId:"",network:e.dr.MAINNET},c.adapterSettings),i.adapterSettings||{}),this.clientId=null===(r=i.adapterSettings)||void 0===r?void 0:r.clientId,this.loginSettings=g(g({},c.loginSettings),i.loginSettings),this.sessionTime=this.loginSettings.sessionTime||86400,null!==(a=i.chainConfig)&&void 0!==a&&a.chainNamespace){var l;this.currentChainNamespace=null===(l=i.chainConfig)||void 0===l?void 0:l.chainNamespace;const n=c.chainConfig?c.chainConfig:{};if(this.chainConfig=g(g({},n),null===i||void 0===i?void 0:i.chainConfig),o.cM.debug("const openlogin chainConfig",this.chainConfig),!this.chainConfig.rpcTarget&&i.chainConfig.chainNamespace!==o.EN.OTHER)throw o.Ty.invalidParams("rpcTarget is required in chainConfig")}}get chainConfigProxy(){return this.chainConfig?g({},this.chainConfig):null}get provider(){var i;return(null===(i=this.privKeyProvider)||void 0===i?void 0:i.provider)||null}set provider(i){throw new Error("Not implemented")}async init(i){var n;if(super.checkInitializationRequirements(),null===(n=this.openloginOptions)||void 0===n||!n.clientId)throw o.Ty.invalidParams("clientId is required before openlogin's initialization");if(!this.chainConfig)throw o.Ty.invalidParams("chainConfig is required before initialization");let t=!1;if(this.openloginOptions.uxMode===e.$e.REDIRECT){const i=(0,e.Gv)();Object.keys(i).length>0&&i._pid&&(t=!0)}this.openloginOptions=g(g({},this.openloginOptions),{},{replaceUrlOnRedirect:t}),this.openloginInstance=new e.ZP(this.openloginOptions),o.cM.debug("initializing openlogin adapter init"),await this.openloginInstance.init(),this.status=o.MP.READY,this.emit(o.n2.READY,o.rW.OPENLOGIN);try{o.cM.debug("initializing openlogin adapter"),this.openloginInstance.privKey&&(i.autoConnect||t)&&await this.connect()}catch(s){o.cM.error("Failed to connect with cached openlogin provider",s),this.emit("ERRORED",s)}}async connect(i){super.checkConnectionRequirements(),this.status=o.MP.CONNECTING,this.emit(o.n2.CONNECTING,g(g({},i),{},{adapter:o.rW.OPENLOGIN}));try{return await this.connectWithProvider(i),this.provider}catch(n){if(o.cM.error("Failed to connect with openlogin provider",n),this.status=o.MP.READY,this.emit(o.n2.ERRORED,n),null!==n&&void 0!==n&&n.message.includes("user closed popup"))throw o.RM.popupClosed();throw o.RM.connectionError("Failed to login with openlogin")}}async disconnect(){let i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{cleanup:!1};if(this.status!==o.MP.CONNECTED)throw o.RM.notConnectedError("Not connected with wallet");if(!this.openloginInstance)throw o.Ty.notReady("openloginInstance is not ready");await this.openloginInstance.logout(),i.cleanup?(this.status=o.MP.NOT_READY,this.openloginInstance=null,this.privKeyProvider=null):this.status=o.MP.READY,this.emit(o.n2.DISCONNECTED)}async authenticateUser(){if(this.status!==o.MP.CONNECTED)throw o.RM.notConnectedError("Not connected with wallet, Please login/connect first");return{idToken:(await this.getUserInfo()).idToken}}async getUserInfo(){if(this.status!==o.MP.CONNECTED)throw o.RM.notConnectedError("Not connected with wallet");if(!this.openloginInstance)throw o.Ty.notReady("openloginInstance is not ready");return await this.openloginInstance.getUserInfo()}setAdapterSettings(i){if(this.status===o.MP.READY)return;const n=h();this.openloginOptions=g(g(g({},n.adapterSettings),this.openloginOptions||{}),i),i.sessionTime&&(this.loginSettings=g(g({},this.loginSettings),{},{sessionTime:i.sessionTime})),i.clientId&&(this.clientId=i.clientId)}setChainConfig(i){super.setChainConfig(i),this.currentChainNamespace=i.chainNamespace}async connectWithProvider(i){if(!this.chainConfig)throw o.Ty.invalidParams("chainConfig is required before initialization");if(!this.openloginInstance)throw o.Ty.notReady("openloginInstance is not ready");if(this.currentChainNamespace===o.EN.SOLANA){const{SolanaPrivateKeyProvider:i}=await Promise.all([t.e(766),t.e(108),t.e(256),t.e(702)]).then(t.bind(t,44445));this.privKeyProvider=new i({config:{chainConfig:this.chainConfig}})}else if(this.currentChainNamespace===o.EN.EIP155){const{EthereumPrivateKeyProvider:i}=await Promise.all([t.e(482),t.e(62),t.e(644)]).then(t.bind(t,52062));this.privKeyProvider=new i({config:{chainConfig:this.chainConfig}})}else{if(this.currentChainNamespace!==o.EN.OTHER)throw new Error(`Invalid chainNamespace: ${this.currentChainNamespace} found while connecting to wallet`);this.privKeyProvider=new r.FL}var n;!this.openloginInstance.privKey&&i&&(this.loginSettings.curve||(this.loginSettings.curve=this.currentChainNamespace===o.EN.SOLANA?e.x7.ED25519:e.x7.SECP256K1),await this.openloginInstance.login(c()(this.loginSettings,{loginProvider:i.loginProvider},{extraLoginOptions:g(g({},i.extraLoginOptions||{}),{},{login_hint:i.login_hint||(null===(n=i.extraLoginOptions)||void 0===n?void 0:n.login_hint)})})));let s=this.openloginInstance.privKey;if(s){if(this.currentChainNamespace===o.EN.SOLANA){const{getED25519Key:i}=await Promise.all([t.e(108),t.e(418)]).then(t.bind(t,33946));s=i(s).sk.toString("hex")}await this.privKeyProvider.setupProvider(s),this.status=o.MP.CONNECTED,this.emit(o.n2.CONNECTED,{adapter:o.rW.OPENLOGIN,reconnected:!i})}}}},27790:function(){}}]);