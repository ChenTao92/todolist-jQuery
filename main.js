/*
* @Author: taochen
* @Date:   2016-10-14 18:46:43
* @Last Modified by:   taochen
* @Last Modified time: 2016-10-21 23:49:57
*/

var counter = 0;
function getTimestamp() {
  var today = new Date()
  var year = today.getFullYear()
  var month = today.getMonth() + 1
  var day = today.getDate()
  var hour = today.getHours()
  var minute = today.getMinutes()
  var second = today.getSeconds()
  if(minute.toString().length === 1) {
    minute = "0" + minute
  }
  if(second.toString().length === 1) {
    second = "0" + second
  }
  return year + "-" + month + "-" + day + " " + hour + ":" + minute+ ":" + second
}

// 按下Enter键添加todo事项
$('#new-todo').keydown(function (evt) {
  if (evt.which === 13) {
    var task = $('#new-todo').val();
    // 确定输入值为非空白值时才添加todo事项
    var valid = false;
    for (var i = 0; i < task.length; i++) {
      if(task[i] !== " ") {
        valid = true;
        break;
      }
    };
    if(!valid){
      $('#new-todo').val('')
      return
    }


    // 选出模板，克隆一份添加到DOM中，并让其可见
    var $todolist = $('#todo-template').clone().attr('id','').addClass('active');
    var currentFilter = $('.selected').attr('id');
    if (currentFilter!=="completed") {
      $todolist.show();
    }
    $todolist.find('p').text(task);
    $('#todolist-all').append($todolist);
    $('#new-todo').val("");
    counter++;
    if (counter > 1) {
      $('#todo-count').text(counter +' items left')
    } else {
      $('#todo-count').text(counter +' item left')
    }
    

    // 显示filter
    if(counter === 1) {
      $("#todolist-filter").css("display", "flex")
    }


    // 点击X按钮删除todo事项
    $todolist.find('.delete').click(function (evt) {
      $(this).parent().remove();
      if(!$(this).parent().hasClass('completed')) {
        counter--;
        if (counter > 1) {
          $('#todo-count').text(counter +' items left')
        } else {
          $('#todo-count').text(counter +' item left')
        }
      }
      // 判断过滤栏是否需要隐藏
      var hasCompleted = $('#todolist-all').find('li').hasClass('completed');
      if (counter === 0 && !hasCompleted) {
        $('#todolist-filter').hide()
      }
    })


    //点击checkbox切换这个todo的完成状态
    $todolist.find('input').click(function(evt){
      var checkTodo = $(this).parent()
      if (checkTodo.hasClass('active')) {
        checkTodo.removeClass('active').addClass('completed');
        if($('#active').hasClass('selected')){
          checkTodo.hide();
        }
        checkTodo.find('.timestamp').text(getTimestamp());
        counter--;
      } else {
        checkTodo.removeClass('completed').addClass('active');
        if($('#completed').hasClass('selected')){
          checkTodo.hide();
        }
        checkTodo.find('.timestamp').text('')
        counter++;
      }
      if (counter > 1) {
        $('#todo-count').text(counter +' items left')
      } else {
        $('#todo-count').text(counter +' item left')
      }
    })  


    // 实现双击修改todolist内容
    $todolist.find('p').on('dblclick',function(evt){
      var $p = $(this)
      var text = $p.text()
      $p.text('')
      var $input = $('<input/>').addClass('todo-editing')
      $input.val(text).appendTo($p)
      $input.focus()

      $input.on('blur keydown',function(evt){
        if (evt.which === 0 || evt.which === 13) {
          var text = $input.val()
          $p.text(text)
          $input.remove()
        }
      })      
    })
    
  }
})

// 显示所有任务
$('#all').click(function(){
  $('.active').show();
  $('.completed').show();
  $(this).addClass('selected');
  $('#completed').removeClass('selected');
  $('#active').removeClass('selected');
})

// 显示未完成任务
$('#active').click(function(){
  $('.active').show();
  $('.completed').hide();
  $(this).addClass('selected');
  $('#completed').removeClass('selected');
  $('#all').removeClass('selected');
})

// 显示已完成任务
$('#completed').click(function(){
  $('.active').hide();
  $('.completed').show();
  $(this).addClass('selected');
  $('#active').removeClass('selected');
  $('#all').removeClass('selected');
})

// 删除所有完成的事项
$('#clear-completed').click(function(){
  $('.completed').remove();
  if (counter === 0) {
    $('#todolist-filter').hide();
  }
})

