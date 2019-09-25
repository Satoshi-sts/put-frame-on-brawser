function init(){
  // initialize on single element with jQuery
  var elem = $('.color-input')[0];
  var hueb = new Huebee( elem, {
  // options
  });

  //ストレージに保存されてる色を取得し、設定 & 要素にフォーカス
  chrome.storage.local.get(null, function(item){
    if(item){
      $('.color-input').val(item["color"]);
      $('.color-input').focus();
    }
  });

}

function main(){
  //カラーセーブボタン押下時、ストレージに色情報を保存
  $('.color-button').on("click", function(){
    let color = $(".color-input").val();
    let colorData = {"color": color};
    chrome.storage.local.set(colorData, () =>{
      chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {message: 'saved-color'}, function(item){
          if(!item){
            alert('選択範囲が見つかりませんでした');
            return;
          }
          $('#memo').val($('#memo').val() + item);
        });
      });
    });
  });

  $('#eventClearBtn').on("click", function(){
    chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {message: 'clear-event'}, function(item){
        if(!item){
          alert('aa');
          return;
        }
        $('#memo').val($('#memo').val() + item);
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", function(){
  init();

  main();
});
