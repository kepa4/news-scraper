$(document).on('click', '#commentSubmit', function() {
  event.preventDefault();

  var thisId = $(this).attr('data-id');
  var comment = $('#commentInput').val();

  $.ajax({
    method: 'POST',
    url: '/articles/' + thisId,
    data: {
      comment: $('#commentInput').val(),
    },
  }).then(function(data) {
    console.log(data);
    $('commentInput').empty();
  });

  $('#collection').append(`<li class="collection-item">${comment}</li>`);
  $('#commentInput').val('');
});

// following code is not used anywhere and does not work
$(document).on('click', '#deleteComment', function() {
  event.preventDefault();

  var thisId = $(this).attr('data-id');

  $.ajax({
    method: 'PUT',
    url: '/articles/delete/' + thisId,
    data: {
      comment: $('#commentInput').val(),
    },
  }).then(function(data) {
    console.log(data);
    $('commentInput').empty();
  });

  $('#commentInput').val('');
});