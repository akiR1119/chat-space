$(function() {
  var message_list = $(".messages");

  function appendMessage(message) {
    console.log("appendMessage")
    console.log(message)
    console.log(message.img["url"] + "<-null?")
    var img = message.img["url"] ? `<img class='lower-message__image' src="${ message.img["url"] }">` : "";
    var html = `<div class='message' data-message-id='${ message.id }'>
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
        message_list.append(html);
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
    var img = message.img["url"] ? `<img class='lower-message__image' src="${ message.img["url"] }"></img>` : "";
    var html = `<div class='message' data-message-id='${ message.id }'>
    <div class='message-meta-data'>
      <div class='message-meta-data__name'>
        ${ message.user_name }
      </div>
      <div class='message-meta-data__date'>
        ${ message.created_at }
      </div>
    </div>
    <div class='message-text'>
        ${ content }
        ${ img }
    </div>`
    message_list.append(html);
  }

  $("#new_message").on('submit', function(e) {
    e.preventDefault();
    console.log("newmessage")
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

  var groupMessages = function() {
    var urlCondition = new RegExp("groups/" + ".+" + "/messages");
    if(location.pathname.match(urlCondition)) {
      reloadMessages();
    }
  }

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
      if(messages) {
        messages.forEach(function(message){
          buildMessageHTML(message);
        });  
      }
      scrollToNewMessage();
    })
    .fail(function() {
    });
  }

  setInterval(groupMessages, 5000000000000000000000);
})
