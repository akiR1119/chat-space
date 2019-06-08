$(function() {
  var preInput = "";

  function appendUserToSearchResult(user) {
    //検索して得たユーザー情報を検索結果欄に表示する。
    //追加要素の親要素を取得=>htmlを生成->append
    var userSearchResult = $("#user-search-result")
    var html = `<div class='chat-group-user clearfix' id="chat-group-user-${ user.id }">
                  <p class='chat-group-user__name'>${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                </div>`
    userSearchResult.append(html);
  }

  function addUserToGroup(userId, userName) {
    //追加ボタンが押されたユーザーをチャットメンバーのところに追加する。
    //追加対象の親要素を取得->htmlを生成->append
    var userLists = $('#chat-group-users');
    var html = `<div class='chat-group-user clearfix' id='chat-group-user-${userId}' data-user-id='${userId}'>
                  <p class='chat-group-user__name'>${userName}</p>
                  <input name='group[user_ids][]' type='hidden' value="${userId}">
                  <div class="chat-group-user__btn chat-group-user__btn--remove" data-user-id="${userId}">削除</div>
                </div>`
    userLists.append(html);
  }

  function removeUserFromGroup(userId) {
    //削除ボタンが押されたユーザーをチャットメンバー欄から削除する。
    var userLists = $('#chat-group-users');
    var removeUser = $(`#chat-group-user-${userId}`);
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
        if (users.length !== 0) {
          users.forEach(function(user) {
            //すでにいるユーザーは表示しないようにする。メンバー欄に表示しているユーザーを配列で取得、eachで重複がないか確認する。
            var notDuplicate = true
            $('#chat-group-users .chat-group-user').each(function(i) {
              //重複したものが一つでもあればnotDuplicateにfalseを入れる。
              var checkUserId = $(this).attr('data-user-id')
              if(user.id == checkUserId){notDuplicate = false};
            })
            if(notDuplicate){appendUserToSearchResult(user)};
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
    var userIdToAdd = $(this).attr('data-user-id');
    var userNameToAdd = $(this).attr('data-user-name');
    addUserToGroup(userIdToAdd, userNameToAdd);
    //どのユーザーが押されたか？を把握し、次にそのユーザーをメンバーに追加する処理（paramsとhtml）。
    $("#chat-group-user-" + userIdToAdd).remove();
  })

  $(document).on('click','.chat-group-user__btn--remove', function() {
    var userIdToRemove = $(this).attr('data-user-id');
    removeUserFromGroup(userIdToRemove);
  })

  $('chat-group-form__action-btn')

})