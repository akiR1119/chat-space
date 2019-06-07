$(function() {
  var preInput = "";

  function appendSearchedUser(user) {
    // var delButton = user.id != current_user_id ?
    console.log("appending username")
    var userSearchResult = $("#user-search-result")
    var html = `<div class='chat-group-user clearfix' id="chat-group-user-${ user.id }">
                  <p class='chat-group-user__name'>${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                </div>`
    userSearchResult.append(html);
  }

  function addUserToGroup(userId) {
    
  }

  $('#user-search-field').on("keyup", function() {
    // console.log($('#user-search-field').val());
    console.log("hakka")
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
            appendSearchedUser(user);
          })
        }
      })
      .fail(function() {
        alert("ユーザーの追加に失敗しました");
      })
      preInput = input
    }
  })

  $(document).on('click','.chat-group-user__btn', function() {
    console.log("click~");
    console.log($(this).attr('data-user-id'));
    var userIdToAdd = $(this).attr('id');
    addUserToGroup(userIdToAdd);
    //どのユーザーが押されたか？を把握し、次にそのユーザーをメンバーに追加する処理（paramsとhtml）。
  })
})