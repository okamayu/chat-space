$(function(){ 
      function buildHTML(message){
      if ( message.image ) {
        var html =
          `<div class="messageBox" data-message-id=${message.id}>
            <div class="chat-main__message-list__message-info">
              <div class="chat-main__message-list__message-info__talker">
                ${message.user_name}
              </div>
              <div class="chat-main__message-list__message-info__date">
                ${message.created_at}
              </div>
            </div>
            <div class="chat-main__message-list__message-text">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
            <img src=${message.image} >
          </div>`
        return html;
      } else {
        var html =
          `<div class="messageBox" data-message-id=${message.id}>
            <div class="chat-main__message-list__message-info">
              <div class="chat-main__message-list__message-info__talker">
                ${message.user_name}
              </div>
              <div class="chat-main__message-list__message-info__date">
                ${message.created_at}
              </div>
           </div>
           <div class="chat-main__message-list__message-text">
             <p class="lower-message__content">
               ${message.content}
             </p>
           </div>
         </div>`
       return html;
     };
   }
   var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.messageBox:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
$('#new_message').on('submit', function(e){
   e.preventDefault();
   var formData = new FormData(this);
   var url = $(this).attr('action')
   $.ajax({
     url: url,
     type: "POST",
     data: formData,
     dataType: 'json',
     processData: false,
     contentType: false
   })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html).animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
    
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  })
    .always(function(){
      $('.chat-main__type-message__submit-btn').prop('disabled', false);
    })
})
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});