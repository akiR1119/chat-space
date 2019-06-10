$(function() {
  var message_list = $(".messages");

  function appendMessage(message) {
    var img = message.img ? `<img class='lower-message__image' src="/uploads/message/image/${ message.id }/${ message.img }">` : "";
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
                    ${ img }
                  </div>
                </div>`
      return html
  }

  function scrollToNewMessage() {
    var speed = 100;
    var targetTop = $('.messages').get(0).scrollHeight;
    $(".messages").animate({
      scrollTop: targetTop,
      speed
    })
  }

  var buildMessageHTML = function(message) {
    var content = message.content ? `<p class='message-text__content'>${ message.content }</p>` : "";
    var img = message.img ? `<img class='lower-message__image' src="/uploads/message/image/${ message.id }/${ message.img }"></img>` : "";
    var html = `<div class='message'>
    <div class='message-meta-data'>
      <div class='message-meta-data__name'>
        ${ message.username }
      </div>
      <div class='message-meta-data__date'>
        ${ message.date }
      </div>
      <div class='message-text'>
         ${ content }
         ${ img }
    </div>`
    message_list.append(html);
  }

  $("#new_message").on('submit', function(e) {
    e.preventDefault();
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
      scrollToNewMessage();
      $('form.new_message').get(0).reset();
    })
    .fail(function() {
      alert('メッセージ投稿に失敗しました')
    })
  })

  var reloadMessages = function() {
    last_message_id = $('.message:last').attr('data-message-id');
    groupId = $('.messages').attr('data-group-id');
    $.ajax({
      type: 'GET',
      url: `/groups/${groupId}/api/messages`,
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages) {
      console.log('success');
      var insertHTML = "";
      messages.forEach(function(message) {
        insertHTML += buildMessageHTML(message);
      })
      message_list.append(insertHTML);
    })
    .fail(function() {
      console.log('error');
    });
  }

  setInterval(reloadMessages, 5000);
})
