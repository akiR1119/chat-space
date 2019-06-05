$(function() {
  var message_list = $(".messages");


  function appendMessage(message) {
    var html = `<div class='message'>
                  <div class='message-meta-data'>
                    <div class='message-meta-data__name'>
                      ${ message.username }
                    </div>
                    <div class='message-meta-data__date'>
                      ${ message.date }
                    </div>
                  </div>
                  <div class='message-text'>
                    <p class='message-text__content'>
                      ${ message.content }
                    </p>
                  </div>
                </div>`
      message_list.append(html);
  }

  $("#new_message").on('submit', function(e) {
    e.preventDefault();
    // console.log($(this).attr('action'));
    // console.log(new FormData(this));
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $(".new-message__submit-btn").removeAttr('data-disable-with');
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      appendMessage(message);
      console.log("メッセージ送信完了")
    })
    .fail(function() {
      alert('メッセージ投稿に失敗しました')
    })
  })
})
