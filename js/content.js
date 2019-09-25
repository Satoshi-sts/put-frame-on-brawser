let contentPort = chrome.runtime.connect({
   name: 'background-content'
});

function main(){
  let x = 0;
  let y = 0;
  //フレームの数
  let cnt = 0;

  chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    let color = "red";
    $('body').off();

    //カラー情報が保存された際、画面に描画するフレームの色も変更
    if(msg.message == "saved-color"){
      chrome.storage.local.get(null, function(item){
        if(item){
          color = item["color"];
        }
      });
    }else if(msg.message == "clear-event"){
      $('body').off();
      return true;
    }

    $('body').on("mousedown", function(e){

      cnt += 1;
      //クリックした座標を記録
      x = e.pageX;
      y = e.pageY;

      //要素の生成
      let div = $('<div></div>', {
        width: 10,
        height: 10,
        addClass: "added_frame_" + cnt,
        css:{border: "5px solid " + color, position: "absolute", top: y, left: x, "z-index": 9999}
      });
      $('body').append(div);

      //マウスをクリックしながら移動時
      $('body').on("mousemove", function(e){
        $('.added_frame_' + cnt).width(e.pageX - x);
        $('.added_frame_' + cnt).height(e.pageY - y);
      });

      //マウスクリック解除時、マウス移動イベント解除
      $('body').on("mouseup", function(){
        $('body').off("mousemove");
      });
    });

    return true;
  });
}

document.addEventListener("DOMContentLoaded", main());
