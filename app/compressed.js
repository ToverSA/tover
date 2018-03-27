function log(e){"use strict";window.console.log(e)}var app=angular.module("akomo",["ngRoute"]).config(["$routeProvider",function(e){"use strict";e.when("/",{templateUrl:"app/landing/landing.html",controller:"landingCtl"}).when("/home",{templateUrl:"app/home/home.html",controller:"homeCtl"}).when("/account",{templateUrl:"app/account/account.html",controller:"accountCtl"}).when("/account/:q",{templateUrl:"app/account/account.html",controller:"accountCtl"}).when("/account/delete",{templateUrl:"app/account/delete.html"}).when("/ads/create",{templateUrl:"app/ads/create.html",controller:"adsCreateCtl"}).when("/search",{templateUrl:"app/search/search.html",controller:"adsSearchCtl"}).when("/search/:q",{templateUrl:"app/search/search.html",controller:"adsSearchCtl"}).when("/ads/:id",{templateUrl:"app/ads/ads.html",controller:"adsCtl"}).when("/faqs",{templateUrl:"app/faqs/faqs.html",controller:"faqsCtl"}).when("/faqs/:section",{templateUrl:"app/partials/faqs.html",controller:"faqsCtl"}).when("/messenger",{templateUrl:"app/messenger/messenger.html",controller:"messengerCtl"}).when("/messenger/:q",{templateUrl:"app/messenger/messenger.html",controller:"messengerCtl"}).otherwise({templateUrl:"app/404/404.html",controller:"notFoundCtl"})}]);app.config(["$httpProvider",function(e){"use strict";e.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded;charset=utf-8"}]),app.config(["$locationProvider",function(e){"use strict";e.html5Mode(!0)}]),app.service("AppStore",["$rootScope",function(e){"use strict";function t(e){return CryptoJS.AES.encrypt(e,"akomo")}function n(e){return null===e?null:CryptoJS.AES.decrypt(e,"akomo").toString(CryptoJS.enc.Utf8)}var a=this;a.isToken=function(){return null!==localStorage.getItem("VE9LRU4")},a.isNew=function(){return null===localStorage.getItem("Q0FNUFVTSUQ")},a.getInbox=function(){var e=localStorage.getItem("SU5CT1g");return null===e?{}:JSON.parse(n(e))},a.setInbox=function(e){localStorage.setItem("SU5CT1g",t(JSON.stringify(e)))},a.setToken=function(e){localStorage.setItem("VE9LRU4",t(e))},a.getToken=function(){return n(localStorage.getItem("VE9LRU4"))},a.getUserName=function(){return n(localStorage.getItem("VVNFUk5BTUU"))},a.getUserEmail=function(){return n(localStorage.getItem("VVNFUkVNQUlM"))},a.getUserNumber=function(){return n(localStorage.getItem("VVNFUk5VTUJFUg"))},a.setUserName=function(n){localStorage.setItem("VVNFUk5BTUU",t(n)),e.$broadcast("NAME_SET",n)},a.setUserNumber=function(e){localStorage.setItem("VVNFUk5VTUJFUg",t(e))},a.setUserEmail=function(e){localStorage.setItem("VVNFUkVNQUlM",t(e))},a.setUserId=function(e){localStorage.setItem("VVNFUklE",e)},a.getUserId=function(){return localStorage.getItem("VVNFUklE")},a.getCampusName=function(){return n(localStorage.getItem("Q0FNUFVTTkFNRQ"))},a.getCampusId=function(){return localStorage.getItem("Q0FNUFVTSUQ")},a.setCampus=function(e,n){localStorage.setItem("Q0FNUFVTSUQ",e),localStorage.setItem("Q0FNUFVTTkFNRQ",t(n))},a.setSearchPrefs=function(e){localStorage.setItem("U0VBUkNIU0VUVElOR1M",t(JSON.stringify(e)))},a.getSearchPrefs=function(){var e=localStorage.getItem("U0VBUkNIU0VUVElOR1M");return null!==e&&JSON.parse(n(e))},a.setWhatsapp=function(e){localStorage.setItem("V0hBVFNBUFA",e)},a.getWhatsapp=function(){return localStorage.getItem("V0hBVFNBUFA")},a.clearAll=function(){localStorage.removeItem("VE9LRU4"),localStorage.removeItem("VVNFUklE"),localStorage.removeItem("VVNFUk5BTUU"),localStorage.removeItem("VVNFUkVNQUlM"),localStorage.removeItem("VVNFUk5VTUJFUg")}}]),app.directive("enterKey",[function(){"use strict";return function(e,t,n){t.bind("keydown keypress",function(t){13===t.which&&(e.$apply(function(){e.$eval(n.enterKey)}),t.preventDefault())})}}]),app.directive("anyKey",[function(){"use strict";return function(e,t,n){t.bind("keyup",function(t){(t.which>=65&&t.which<=90||229===t.which||8===t.which)&&(e.$apply(function(){e.$eval(n.anyKey)}),t.preventDefault())})}}]),app.directive("arrowKey",[function(){"use strict";return function(e,t,n){t.bind("keyup",function(t){log(t),(t.which>=65&&t.which<=90||229===t.which||8===t.which)&&(e.$apply(function(){e.$eval(n.anyKey)}),t.preventDefault())})}}]),app.service("httpFacade",["$http","AppStore",function(e,t){"use strict";var n=this,a="api.php/v1";n.getAdsCount=function(t){return e.get(a+"/ads/count?"+t)},n.getAccountAds=function(n){return e.get("api.php/v1/account/ads",{headers:{token:t.getToken()}})},n.getAds=function(t,n){return void 0===n&&(n=!1),e.get(a+"/ads?"+t,{cache:n})},n.getPromoAds=function(t){return e.get(a+"/ads/promotions?"+t)},n.getCredits=function(){return e.get(a+"/credits",{headers:{token:t.getToken()}})},n.getUsers=function(t){return e.get(a+"/users?"+t,{cache:!0})},n.getAccount=function(){return e.get("api.php/v1/account",{headers:{token:t.getToken()}})},n.getMessages=function(n){return void 0===n?e.get(a+"/messages",{headers:{token:t.getToken()}}):e.get(a+"/messages?"+n,{headers:{token:t.getToken()}})},n.getCampuses=function(){return e.get("api.php/v1/campuses",{cache:!0})},n.postAd=function(n){return e.post(a+"/ads",n,{headers:{token:t.getToken()}})},n.newUser=function(t){return e.post(a+"/users/new",t)},n.sendVerification=function(t){return e.post(a+"/users/verify",t)},n.recover=function(t){return e.post(a+"/users/recovery",t)},n.authUser=function(t){return e.post(a+"/users/auth",t)},n.postCredits=function(n){return e.post(a+"/credits",n,{headers:{token:t.getToken()}})},n.postMessage=function(n){return e.post(a+"/messages",n,{headers:{token:t.getToken()}})},n.putMessage=function(n){return e.put(a+"/messages",n,{headers:{token:t.getToken()}})},n.putAccount=function(n){return e.post(a+"/account/edit",n,{headers:{token:t.getToken()}})},n.promote=function(n){return e.put(a+"/ads/promotions",n,{headers:{token:t.getToken()}})},n.visit=function(t){return e.post(a+"/visitors",t)},n.purchase=function(e){var n=document.createElement("form"),o=document.createElement("input"),r=document.createElement("input");n.method="post",n.action=a+"/account/confirm",o.type="hidden",o.name="id",o.value=t.getUserId(),r.type="hidden",r.name="deal",r.value=e,n.appendChild(o),n.appendChild(r),document.body.appendChild(n),n.submit()},n.deleteAccount=function(n){return e.post(a+"/account/delete",n,{headers:{token:t.getToken()}})},n.deleteAd=function(n){return e.post(a+"/ads/delete",n,{headers:{token:t.getToken()}})}}]),app.controller("accountCtl",["$scope","$http","$location","$routeParams","AppStore",function(e,t,n,a,o){"use strict";e.error={},e.logout=function(){o.clearAll(),n.url("/home")},e.$on("STOP_LOADING",function(){e.loading=!1}),e.$on("START_LOADING",function(){e.loading=!0}),e.$on("ERROR",function(t,n){e.error.title="Error : "+n.code,e.error.description=n.desc,e.error.showing=!0}),e.closeErrDialog=function(){e.error.showing=!1},e.toRecovery=function(){n.url("/account?rel=recovery")},e.toRegister=function(){n.url("/account?rel=register")},e.toLogin=function(){n.url("/account?rel=login")},e.toPrefs=function(){n.url("/account?rel=prefs")},void 0===a.rel?o.isToken()?(a.rel="console",n.search(a)):(a.rel="login",n.search(a)):"console"===a.rel?o.isToken()?e.section="console":(a.rel="login",n.search(a)):"prefs"===a.rel?o.isToken()?e.section="prefs":(a.rel="login",n.search(a)):"login"===a.rel?o.isToken()?(a.rel="console",n.search(a)):e.section="login":"register"===a.rel?o.isToken()?(a.rel="console",n.search(a)):e.section="register":"recovery"===a.rel?o.isToken()?(a.rel="console",n.search(a)):e.section="recovery":"verify"===a.rel?o.isToken()?(a.rel="console",n.search(a)):e.section="verify":n.url("/account")}]),app.controller("actionCtl",["$scope","$http","$location","$routeParams","AppStore",function(e,t,n,a,o){"use strict";void 0!==a.t?"del"===a.t&&void 0!==a.id&&function(e){t.delete("api.php/v1/ads",{params:{id:e},headers:{token:o.getToken()}}).then(function(e){log(e.data)})}(a.id):n.url("/account")}]),app.controller("consoleCtl",["$scope","$location","AppStore","mService","httpFacade",function(e,t,n,a,o){"use strict";e.accState=2,e.$on("NOTIFY",function(t,n){e.notify=n}),a.init(1),e.createAd=function(){t.url("/ads/create")},e.openAd=function(e){t.url("/ads/"+e)},e.toInbox=function(){t.url("/messenger")},o.getAccountAds().then(function(t){e.ads=t.data}),o.getAccount().then(function(t){n.setCampus(t.data.campus.id,t.data.campus.name),n.setUserId(t.data.id),n.setUserName(t.data.name),n.setUserEmail(t.data.email),n.setUserNumber(t.data.number),n.setWhatsapp(t.data.whatsapp),e.name=t.data.name},function(e){403===e.status&&(n.clearAll(),t.url("/home"))}),e.$on("NEW_MESSAGE",function(){})}]),app.controller("delAccCtl",["$scope","$location",function(e,t){"use strict";e.cancel=function(){t.url("/account")},e.conf=function(){}}]),app.controller("loginCtl",["$scope","$location","$http","AppStore",function(e,t,n,a){"use strict";function o(o,r){e.$emit("START_LOADING");var i={email:o.toLowerCase(),password:r};n.post("api.php/v1/users/auth",$.param(i)).then(function(n){e.$emit("STOP_LOADING"),a.setUserId(n.data.id),a.setToken(n.data.token),t.url("/account")},function(n){e.$emit("STOP_LOADING"),401===n.status?t.url("/account?rel=verify&email="+o+"&from=login"):e.$emit("ERROR",{code:n.status,desc:n.data})})}e.test=function(){log("test")},e.logIn=function(t){void 0===t?(e.err=!0,e.errMsg="Email and password empty!"):void 0===t.email?(e.err=!0,e.errMsg="Email field is empty!"):void 0===t.password?(e.err=!0,e.errMsg="Password field is empty!"):(e.err=!1,o(t.email,t.password))}}]),app.controller("prefsCtl",["$scope","$location","httpFacade","AppStore",function(e,t,n,a){"use strict";function o(e){n.purchase(e)}function r(){n.getCredits().then(function(t){e.credits=t.data.balance,e.rates=t.data.rates}),e.accState=2,e.current={},e.data={},e.credits=0,e.current.name=a.getUserName(),e.data.name=a.getUserName(),e.current.number=a.getUserNumber(),e.data.number=a.getUserNumber(),e.current.w=a.getWhatsapp(),"1"===e.current.w?e.data.w=!0:e.data.w=!1,e.current.email=a.getUserEmail(),e.dataChanged=!1}e.deal=1,e.choose=function(t){e.deal=t},e.toCons=function(){t.url("/account?rel=console")},e.edit=function(t){e.editing=t},e.close=function(){e.editing=0,!0===e.data.w?"0"===e.current.w&&(e.dataChanged=!0,e.current.w="1"):"1"===e.current.w&&(e.dataChanged=!0,e.current.w="0"),e.current.name!==e.data.name?(e.dataChanged=!0,e.current.name=e.data.name):e.current.number!==e.data.number&&(e.dataChanged=!0,e.current.number=e.data.number)},e.save=function(){n.putAccount($.param(e.data)).then(function(t){"1"===t.data&&(a.setUserName(e.current.name),a.setUserNumber(e.current.number),a.setWhatsapp(e.current.w),r())})},e.del=function(o){void 0!==o&&o.length>3&&(e.editing=0,e.$emit("START_LOADING"),n.deleteAccount($.param({password:o})).then(function(n){a.clearAll(),t.url("home"),e.$emit("STOP_LOADING")},function(t){e.$emit("STOP_LOADING"),e.$emit("ERROR",{code:t.status,desc:t.data})}))},e.buy=function(){e.$emit("START_LOADING"),n.postCredits($.param({pkg:e.deal})).then(function(t){e.$emit("STOP_LOADING"),e.editing=0,"1"===t.data?r():o(e.deal)},function(t){e.editing=0,e.$emit("STOP_LOADING"),e.$emit("ERROR",{code:t.status,desc:t.data})})},r()}]),app.controller("recoverCtl",["$scope","$location","httpFacade",function(e,t,n){"use strict";e.accState=1,e.back=function(){t.url("/account")},e.recover=function(e){n.recover($.param({email:e})).then(function(e){t.url("/account")})}}]),app.controller("registerCtl",["$scope","$location","AppStore","httpFacade",function(e,t,n,a){"use strict";function o(t){if(void 0===t.name||0===t.name.length)return e.err=!0,e.errMsg="Display name is empty",!1;if(void 0===t.email||0===t.email.length)e.err=!0,e.errMsg="Email is empty";else if(0!==t.email.search(/^.+@.+\..+$/))e.err=!0,e.errMsg="Email is must contain @ and .";else if(void 0===t.number||0===t.number.length)e.err=!0,e.errMsg="Cellphone number empty";else if(0!==t.number.search(/^[0-9]{10}$/))e.err=!0,e.errMsg="Your number must be 10 numbers long with no letters or symbols";else if(void 0===t.campusId)e.err=!0,e.errMsg="Please choose your campus";else if(void 0===t.password||0===t.password.length)e.err=!0,e.errMsg="Password cannot be empty";else{if(void 0!==t.rePwd&&t.password===t.rePwd)return!0;e.err=!0,e.errMsg="Passwords do not match"}}function r(o,r){var i={email:o.toLowerCase(),password:r};a.authUser($.param(i)).then(function(a){e.$emit("STOP_LOADING"),n.setUserId(a.data.id),n.setToken(a.data.token),t.url("/account")},function(n){e.$emit("STOP_LOADING"),401===n.status?(e.$emit("START_LOADING"),t.url("/account?rel=verify&email="+e.formData.email+"&from=register")):e.$emit("ERROR",{code:n.status,desc:n.data})})}var i;e.lTitle="- Select your campus -",e.formData={},e.cState=0,e.changeC=function(){e.instList=i,e.cState=0},e.openChooser=function(){e.isCOpen=!0},e.browse=function(t){0===e.cState?(e.sTitle=i[t].name,e.instList=i[t].campuses,e.cState=1):(e.formData.campusId=e.instList[t].id,e.isCOpen=!1,e.lTitle=e.instList[t].name)},e.createNew=function(){if(e.err=!1,e.errMsg="",o(e.formData)){e.formData.email=e.formData.email.toLowerCase();var t=JSON.parse(JSON.stringify(e.formData));delete t.rePwd,e.$emit("START_LOADING"),a.newUser($.param(t)).then(function(e){r(t.email,t.password)},function(t){e.$emit("STOP_LOADING"),e.$emit("ERROR",{code:t.status,desc:t.data})})}},a.getCampuses().then(function(t){i=t.data;e.instList=[],i.forEach(function(t){e.instList.push(t)})},function(e){})}]),app.controller("verifyCtl",["$scope","$location","$routeParams","httpFacade",function(e,t,n,a){"use strict";e.accState=1,e.sendVerification=function(){e.$emit("START_LOADING"),a.sendVerification($.param({email:n.email})).then(function(n){e.$emit("STOP_LOADING"),t.url("/account"),log(n.data)},function(t){e.$emit("STOP_LOADING")})},"register"===n.from?a.sendVerification($.param({email:n.email})).then(function(t){e.$emit("STOP_LOADING"),log(t.data)}):e.$emit("STOP_LOADING")}]),app.controller("notFoundCtl",["$scope","$location","AppStore",function(e,t,n){"use strict";log(t.url()),e.path=t.url(),e.link="/home",n.isNew()&&(e.link="/")}]),app.controller("adsCreateCtl",["$scope","$location","httpFacade","AppStore",function(e,t,n,a){"use strict";e.cat=!1,e.display="- Choose category - ",e.cats=[{id:1,name:"Books & Study Material"},{id:2,name:"Electronics & Gadgets"},{id:3,name:"Phones & Laptops"},{id:4,name:"Services & Other"}],e.dummy=[1,2,3,4,5],e.images=[],e.ad={price:0,images:[]};var o=new FileReader;o.onload=function(){e.images.push(o.result),e.dummy.splice(-1),e.$apply()},e.error={},e.closeErrDialog=function(){e.error.showing=!1},e.clear=function(t){6!==e.images.length&&e.dummy.push(e.dummy.length+1),e.images.splice(t,1)},e.cancelAd=function(){t.url("/account")},e.show=function(){e.cat=!0},e.sel=function(t){e.ad.category=e.cats[t].id,e.display=e.cats[t].name,e.cat=!1},e.back=function(){e.aPage-=1,2===e.aPage&&e.dummy.splice(-1)},e.step=function(){1===e.aPage?void 0===e.ad.title?(e.error.showing=!0,e.error.description="Title should not be empty"):void 0===e.ad.category?(e.error.showing=!0,e.error.description="Category not chosen"):e.aPage+=1:2===e.aPage?(e.aPage+=1,e.dummy.push(e.dummy.length+1)):3===e.aPage&&(e.ad.userId=a.getUserId(),e.ad.images=[],e.images.forEach(function(t){e.ad.images.push(t.substring(t.indexOf(",")+1))}),e.loading=!0,n.postAd($.param(e.ad)).then(function(n){e.loading=!1,t.url("/account")},function(e){}))},e.fileNameChanged=function(e){o.readAsDataURL(e[0])}}]),app.controller("adsCtl",["$scope","$location","$routeParams","httpFacade","AppStore",function(e,t,n,a,o){"use strict";function r(e){a.deleteAd($.param({id:e})).then(function(e){t.url("/account")},function(e){t.url("/account")})}function i(t){void 0!==n.id&&a.getAds($.param({id:n.id}),t).then(function(t){e.ad=t.data,c=new Array(e.ad.src_id.length),e.ad.src_id.forEach(function(t){c[e.ad.src_id.indexOf(t)]=t}),e.cover=e.ad.src_id.splice(0,1),e.dummy=new Array(5-e.ad.src_id.length);var r=0;for(r=0;r<e.dummy.length;r+=1)e.dummy[r]=r;o.isToken()?(e.state=1,e.email=o.getUserEmail(),o.getUserId()-e.ad.uid==0?e.state=2:a.getPromoAds($.param({cid:o.getCampusId()})).then(function(t){e.promo=[],t.data.forEach(function(t){t.id!==Number.parseInt(n.id)&&e.promo.push(t)})})):a.getPromoAds($.param({cid:o.getCampusId()})).then(function(t){e.promo=[],t.data.forEach(function(t){t.id!==Number.parseInt(n.id)&&e.promo.push(t)})})},function(e){})}var c;e.isGuest=!0,e.sendMessage=function(){o.isToken()?t.url("/messenger?id="+e.ad.id):t.url("/account?redirect="+t.url())},e.userClicked=function(){t.url("/search?u="+e.ad.uid+"&name="+e.ad.name)},e.reportAd=function(e){},e.inView={id:0,next:!0,prev:!0},e.view=function(t){e.inView.id=t,0===c.indexOf(t)?e.inView.prev=!1:e.inView.prev=!0,c.indexOf(t)===c.length-1?e.inView.next=!1:e.inView.next=!0,e.isViewing=!0},e.next=function(){!0===e.inView.next&&e.view(c[c.indexOf(e.inView.id)+1])},e.prev=function(){!0===e.inView.prev&&e.view(c[c.indexOf(e.inView.id)-1])},e.del=function(){!0===e.isDel?(r(e.ad.id),e.isDel=!1):e.isDel=!0},e.confPromo=function(){a.promote($.param({aid:e.ad.id,deal:e.deal})).then(function(e){i(!1)},function(e){log("eish")}),e.prom=!1},e.deal=1,e.sel=function(t){e.deal=t},e.promote=function(t){!0===t&&a.getCredits().then(function(t){e.pState=0,-1===t.data.balance?e.pState=3:(e.bal=t.data.balance,e.bal<=20?e.pState=4:1===e.ad.promo?e.pState=2:e.pState=1)}),e.prom=t},e.viewAd=function(e){t.url("/ads/"+e)},i(!0)}]),app.directive("header",["$location","AppStore",function(e,t){"use strict";return{restrict:"A",templateUrl:"app/header/header.html",replace:!0,scope:{account:"@"},link:function(n,a,o){n.logout=function(){t.clearAll(),e.url("/home"),n.name=null},void 0===n.account&&(n.account=!1),t.isToken()&&(n.name=t.getUserName()),n.toSearch=function(){e.url("/search")},n.toAccount=function(){e.url("/account")},n.toHome=function(){t.isNew()?e.url("/"):e.url("/home")},n.$on("NAME_SET",function(e){n.name=t.getUserName()})}}}]),app.controller("homeCtl",["$scope","httpFacade","$location","AppStore",function(e,t,n,a){"use strict";var o,r=2;e.promo=[],e.loadMore=function(){t.getAds($.param({cid:a.getCampusId(),page:r})).then(function(t){t.data.forEach(function(t){e.ads.push(t)}),r+=1},function(e){})},e.campus=a.getCampusName(),e.viewAd=function(e){n.url("/ads/"+e)},t.getPromoAds($.param({cid:a.getCampusId()})).then(function(t){e.promo=t.data}),t.getAds($.param({cid:a.getCampusId()})).then(function(t){e.ads=t.data},function(e){}),t.getAdsCount($.param({cid:a.getCampusId()})).then(function(t){o=Number.parseInt(t.data),e.total=o})}]),app.controller("landingCtl",["$scope","httpFacade","AppStore","$location",function(e,t,n,a){"use strict";var o=[];t.getCampuses().then(function(t){o=t.data;e.list=[],o.forEach(function(t){e.list.push(t)})},function(e){}),e.state=0,e.browse=function(r){0===e.state?(e.iName=o[r].name,e.list=[],o[r].campuses.forEach(function(t){e.list.push(t)}),e.state=1):(n.setCampus(e.list[r].id,e.list[r].name),t.visit("cid="+e.list[r].id),a.url("/home"))},e.change=function(){e.state=0,e.list=[],o.forEach(function(t){e.list.push(t)})},e.getStarted=function(){n.isNew()?e.dialog=!0:(t.visit("cid="+n.getCampusId()),a.url("/home"))}}]),app.controller("messengerCtl",["$scope","$routeParams","$location","$timeout","AppStore","mService",function(e,t,n,a,o,r){"use strict";function i(){a(function(){var e,t;e=$("#msgs").height(),(t=$("#msg").height()-e)>0&&$("#msgs").animate({scrollTop:t},100,"swing")},10)}e.msg={},e.param={},e.to={},e.inbox={},e.thread=[],e.body="",e.$on("THREAD",function(n,a){e.inbox.forEach(function(n){n.id===a[0]&&n.tid===a[1]&&(e.to.name=n.name,e.to.ad=t.id,e.thread=n.thread,n.seen=!0,r.setOpened(n.tid),i())})}),e.$on("INBOX",function(){e.inbox=r.getInbox(),void 0!==t.tid?e.inbox.forEach(function(e){e.id===Number.parseInt(t.id)&&e.tid===Number.parseInt(t.tid)&&r.requestThread(e.tid)}):e.inbox.forEach(function(n){n.id===Number.parseInt(t.id)&&e.open(n.id,n.tid)})}),e.delThread=function(){},e.viewAd=function(){n.url("/ads/"+e.to.ad)},e.open=function(e,t){var a=n.search();a.id=e,void 0!==t&&(a.tid=t),n.search(a)},e.send=function(){void 0!==t.id&&e.body.length>0&&r.send(t.id,e.body,t.tid),e.body=""},o.isToken()&&(r.init(),void 0===t.id?e.list=0:void 0===t.tid?e.list=1:e.list=2)}]),app.service("mService",["$rootScope","httpFacade","AppStore",function(e,t,n){"use strict";function a(e){return i.ids=[],e.forEach(function(e){i.ids[e.id]=e.tid}),e}function o(n,a){t.getMessages($.param({id:n})).then(function(t){var o=0,r=0;c.forEach(function(e){!1===e.seen&&(r+=1),e.tid===n&&(o=e.id,e.thread=t.data)}),e.$broadcast("NOTIFY",r),void 0!==a&&!0===a?e.$broadcast("THREAD",[o,n]):(0===i.count&&e.$broadcast("INBOX"),i.count-=1)})}function r(){t.getMessages().then(function(e){c=e.data,i.count=-1,(c=a(e.data)).forEach(function(e){i.count+=1,o(e.tid,!1)}),s=!0})}var i=this,c={},s=!1;i.getInbox=function(){return JSON.parse(JSON.stringify(c))},i.init=function(t){void 0!==t?r():s?e.$broadcast("INBOX"):r()},i.requestThread=function(e){o(e,!0)},i.send=function(e,n,a){var s={id:e,body:n};void 0!==a&&(s.tid=a),t.postMessage($.param(s)).then(function(t,a){201===t.status?r():c.forEach(function(a){a.id===Number.parseInt(e)&&(a.thread.push({body:n,date:t.data,sent:!0}),i.count=0,o(s.tid,!1))})},function(e){})},i.setOpened=function(e){c.forEach(function(n){n.tid===e&&!1===n.seen&&(n.seen=!0,t.putMessage($.param({tid:e})).then(function(e){log(e.data)}))})}}]),app.controller("adsSearchCtl",["$scope","$routeParams","$location","httpFacade","AppStore",function(e,t,n,a,o){"use strict";function r(t){a.getAds(t).then(function(t){e.ads=t.data,e.sLabel=s[1].label.toLowerCase(),s[1].id>2&&(e.sLabel="price listed")},function(e){})}function i(){if(0===e.ad.length)return!1;var t=!1,n=[];return e.ad.forEach(function(a){var o=a.title.toLowerCase(),r=e.query.toLowerCase();null===o.match(r)?n.push(e.ad.indexOf(a)):t=!0}),n.forEach(function(t){e.ad.splice(t,1)}),t}function c(){a.getAds($.param({cid:o.getCampusId(),q:e.query,a:"n"})).then(function(t){e.ad=t.data},function(e){}),a.getUsers($.param({cid:o.getCampusId(),q:e.query})).then(function(t){e.user=t.data},function(e){})}var s,u=[],l=0,d={};a.getCampuses().then(function(t){u=t.data;e.list=[],u.forEach(function(t){e.list.push(t)})},function(e){}),e.browse=function(t){0===l?(e.mSub+=" > "+u[t].name,e.list=[],u[t].campuses.forEach(function(t){e.list.push(t)}),l=1):(o.clearAll(),o.setCampus(e.list[t].id,e.list[t].name),e.cName=e.list[t].name,e.mState=0,e.mSub="",e.list=u,l=0,e.query="",e.sSection=0,e.opt=!1,n.url("/search"))},e.cName=o.getCampusName(),e.query="",e.sSection=0,e.ad=[],e.back=function(){e.search?n.url("/search"):n.url("/home")},e.menuBack=function(){e.mState>0?(e.mState=0,e.mSub="",e.list=[],u.forEach(function(t){e.list.push(t)}),l=0):(e.opt=!1,2!==e.sSection&&e.query.length>0?n.url("/search?q="+e.query):n.url("/search"))},e.viewUser=function(e,t){n.url("/search?u="+e+"&name="+t)},e.viewAd=function(e){n.url("/ads/"+e)},e.suggest=function(){e.isTyping||(e.isTyping=!0),e.query.length>1&&(i()||c())},e.searchFor=function(){e.query.length>1&&n.url("/search/?q="+e.query)},e.changeCampus=function(){e.mState=1,e.mSub="Campus"},e.cats=[{id:0,label:"All categories"},{id:1,label:"Books & Study Materials"},{id:2,label:"Electronics & Gadgets"},{id:3,label:"Phones & Laptops"},{id:4,label:"Services & Other"}],e.changeCategory=function(t){void 0===t?(e.mState=2,e.mSub="Category"):(s[0]=e.cats[t],o.setSearchPrefs(s),e.catLabel=e.cats[t].label,e.mState=0,e.mSub="")},e.sorts=[{id:1,label:"Latest"},{id:2,label:"Top viewed"},{id:3,label:"Price (lowest to highest)"},{id:4,label:"Price (highest to lowest)"}],e.changeSorting=function(t){void 0===t?(e.mState=3,e.mSub="Sort By"):(s[1]=e.sorts[t],o.setSearchPrefs(s),e.sortLabel=e.sorts[t].label,e.mState=0,e.mSub="")},!1===(s=o.getSearchPrefs())?(e.catLabel=e.cats[0].label,e.sortLabel=e.sorts[0].label,s=[e.cats[0],e.sorts[0]],o.setSearchPrefs(s)):(e.catLabel=s[0].label,e.sortLabel=s[1].label),void 0!==t.q?(e.query=t.q,e.sSection=1,0!==s[0].id&&(d.c=s[0].id),d.cid=o.getCampusId(),d.s=s[1].id,log(e.sLabel),d.q=t.q,r($.param(d))):void 0!==t.u&&void 0!==t.name&&(e.sSection=2,e.query=t.name,d.uid=t.u,r($.param(d))),a.getPromoAds($.param({cid:o.getCampusId()})).then(function(t){e.promo=t.data})}]);