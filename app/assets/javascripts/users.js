$(function() {
  var preInput = "";

  function appendSearchedUser(user) {
    console.log("appending username")
    var userSearchResult = $("#user-search-result")
    var html = `<div class='chat-group-user clearfix' id="chat-group-user-${ user.id }">
                  <p class='chat-group-user__name'>${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                </div>`
    userSearchResult.append(html);
  }

  function addUserToGroup(userId, userName) {
    //追加ボタンが押されたユーザーをチャットメンバーのところに追加する。
    var userLists = $('#chat-group-users');
    var html = `<div class='chat-group-user clearfix' id='chat-group-user-${userId}' data-user-id='${userId}'>
                  <p class='chat-group-user__name'>${userName}</p>
                  <div class="chat-group-user__btn chat-group-user__btn--remove" data-user-id="${userId}">削除</div>
                </div>`
    userLists.append(html);
  }

  function removeUserFromGroup(userId) {
    //削除ボタンが押されたユーザーをチャットメンバー欄から削除する。
    console.log("do remove")
    var userLists = $('#chat-group-users');
    var removeUser = $(`#chat-group-user-${userId}`);
    console.log($(`#chat-group-user-${userId}`))
    console.log("削除対象=>" + removeUser)
    removeUser.remove();
  }

  $('#user-search-field').on("keyup", function() {
    //入力内容が変化している場合のみサーチを実行する。
    var input = $('#user-search-field').val();
    if (input !== preInput) {
      //一旦表示しているユーザー名を全削除する。
      $('#user-search-result').empty();
      $.ajax({
        type: 'GET',
        url: '/users',
        data: {keyword: input},
        dataType: 'json'
      })
      .done(function(users) {
        console.log("ajax done");
        if (users.length !== 0) {
          users.forEach(function(user) {
            // console.log($("#current_user").get(0));
            // console.log($("#current_user").attr('data-cuurentuser-id'));
            // var currentUserId = $("#current_user").attr('data-cuurentuser-id');
            // if(user.id != currentUserId) {appendSearchedUser(user)};
            //すでにいるユーザーは表示しないようにする。メンバー欄に表示しているユーザーを配列で取得、eachで重複がないか確認する。
            // console.log("重複チェック用")
            // console.log($('#chat-group-users .chat-group-user'));
            console.log("eachに入る")
            var notDuplicate = true
            $('#chat-group-users .chat-group-user').each(function(i) {
              //この中で重複しないか確認する。重複がなければnotDuplicateにtrueを入れる
              //重複したものが一つでもあればnotDuplicateにfalseを入れる。
              // console.log(this);
              var checkUserId = $(this).attr('data-user-id')
              console.log(checkUserId)
              console.log(user.id)
              if(user.id == checkUserId){notDuplicate = false};
              //user.idとthis内のdata-user-idを比較して不一致ならture、一致ならfalseを
            })
            console.log(notDuplicate);
            if(notDuplicate){appendSearchedUser(user)};
          })
        }
      })
      .fail(function() {
        alert("ユーザーの追加に失敗しました");
      })
      preInput = input;
    }
  })

  $(document).on('click','.chat-group-user__btn--add', function() {
    console.log("click~add");
    console.log($(this).attr('data-user-id'));
    var userIdToAdd = $(this).attr('data-user-id');
    console.log($(this).attr('data-user-name'));
    var userNameToAdd = $(this).attr('data-user-name');
    addUserToGroup(userIdToAdd, userNameToAdd);
    //どのユーザーが押されたか？を把握し、次にそのユーザーをメンバーに追加する処理（paramsとhtml）。
    $("#chat-group-user-" + userIdToAdd).remove();
  })

  $(document).on('click','.chat-group-user__btn--remove', function() {
    // console.log("removebutton!!");
    // console.log($(this));
    var userIdToRemove = $(this).attr('data-user-id');
    // console.log($(`chat-group-user-${userIdToRemove}`));
    removeUserFromGroup(userIdToRemove);
  })

})