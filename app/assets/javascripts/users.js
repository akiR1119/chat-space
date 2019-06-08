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
    //追加ボタンが押されたユーザーをチャットメンバーリストに追加する。
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
    //削除対象を取得し->remove
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
          //controllerから受け取った検索結果（userの配列）一つ一つに対し、表示すべきかどうかを判断する。
          users.forEach(function(user) {
            //すでにグループに入っているユーザーは表示しないようにする。
            //メンバー欄に表示しているユーザーを配列で取得、eachで一つ一つ重複がないか確認する。
            var notDuplicate = true
            $('#chat-group-users .chat-group-user').each(function(i) {
              //重複したものが一つでもあればnotDuplicateにfalseを入れる。
              var checkUserId = $(this).attr('data-user-id')
              if(user.id == checkUserId){notDuplicate = false};
            })
            //"notDuplicateがtrue=重複なし"のときHTMLの追加を行う。
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
    //”追加”ボタンが押されたとき、選ばれたユーザーのIDと名前を取得しグループに追加する関数へ渡す。
    var userIdToAdd = $(this).attr('data-user-id');
    var userNameToAdd = $(this).attr('data-user-name');
    addUserToGroup(userIdToAdd, userNameToAdd);
    //追加後、検索結果欄から削除する。
    $("#chat-group-user-" + userIdToAdd).remove();
  })

  $(document).on('click','.chat-group-user__btn--remove', function() {
    //”削除”ボタンが押されたとき、選ばれたユーザーのIDを取得しグループから削除する関数へ渡す。
    var userIdToRemove = $(this).attr('data-user-id');
    removeUserFromGroup(userIdToRemove);
  })

})