$(function() {
  $('#user-search-field').on("keyup", function() {
    // console.log($('#user-search-field').val());
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })
    .done(function(users) {
      console.log(users);
    })
    .fail(function() {
    })
  })
})