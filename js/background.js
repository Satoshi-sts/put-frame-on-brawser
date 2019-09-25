//Wait for some one connect to it
let contentPort;
chrome.runtime.onConnect.addListener(function(portFrom) {
   if(portFrom.name === 'background-content') {
      //This is how you add listener to a port.
      portFrom.onMessage.addListener(function(message) {
         //Do something to duck
      });
   }
});


chrome.commands.onCommand.addListener(function(cmd){
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { text: cmd }, function (response) {

    });
  });
});
