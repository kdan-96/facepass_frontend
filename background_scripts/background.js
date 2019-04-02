chrome.runtime.onInstalled.addListener(function (){
   chrome.tabs.create({
       'url': chrome.extension.getURL('/signup_form/index.html'),
       'active':true
    },
    function(){
       console.log("register tab opened");
   });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
   if (request && request.action === 'createWindow' && request.url) {
     chrome.windows.create({url: request.url}, function (win) {
       sendResponse(win);
     });
   }
   if(request && request.action==='saveCredentials'){
      chrome.storage.local.set({credentials:request.data},function(){
         chrome.storage.local.get(['credentials'],function(result){
            var urlArray=[];
            result.credentials.forEach(element => {
                urlArray.push(element.url);
            });
            console.log("urls are",urlArray);
            chrome.storage.local.set({urls:urlArray});
           });
         chrome.storage.local.set({loggedIn:true});
         chrome.storage.local.get(['loggedIn'],function(ans){
            console.log(ans);
         })
      });
      sendResponse("success");
   }
 return true;
});

 chrome.runtime.onStartup.addListener(function(){
  chrome.tabs.create({
    'url': chrome.extension.getURL('/login_form/login.html'),
    'active':true
 },
 function(){
    console.log("verify tab opened");
 });
})

chrome.browserAction.onClicked.addListener(function (tab){
   chrome.tabs.create({
      'url': chrome.extension.getURL('/login_form/login.html'),
      'active':true
   },
   function(){
      console.log("register tab opened");
  });
});

chrome.windows.onRemoved.addListener(function(windowid) {
   chrome.storage.local.remove(['loggedIn','credentials','urls']);
  });