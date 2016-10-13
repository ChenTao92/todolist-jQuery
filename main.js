var counter = 0;

// 按下Enter键添加todo事件
$('#new-todo').keydown(function (event) {
  if (event.which === 13) {
    event.preventDefault();
    event.stopPropagation();
    var task = $('#new-todo').val();
    counter++;
    var $todolist = $('<li class="active"><input type="checkbox" class="toggle"/><p>'+task+'</p><button class="delete"></button></li>');
    $('#todolist-all').append($todolist);
    $('#new-todo').val("");
  }
})
