/*
* @Author: taochen
* @Date:   2016-10-14 18:46:43
* @Last Modified by:   taochen
* @Last Modified time: 2016-10-19 15:14:51
*/

var counter = 0;

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
    var $todolist = $('#todo-template').clone().attr('id','').addClass('active').show()
    $todolist.find('p').text(task)
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
      if($(this).parent().hasClass('completed')) return
      counter--;
      if (counter > 1) {
        $('#todo-count').text(counter +' items left')
      } else {
        $('#todo-count').text(counter +' item left')
      }

      if (counter === 0) {
        $('#todolist-filter').hide()
      }
    })


    //点击checkbox切换这个todo的完成状态
    $todolist.find('input').click(function(evt){
      if ($(this).parent().hasClass('active')) {
        $(this).parent().removeClass('active').addClass('completed');
        var timestamp = moment().format('lll');
        $(this).parent().find('.timestamp').text(timestamp)
        counter--;
      } else {
        $(this).parent().removeClass('completed').addClass('active');
        $(this).parent().find('.timestamp').text('')
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
      $input = $('<input/>').addClass('todo-editing')
      $input.val(text).appendTo($p)
      $input.focus()

      $input.on('blur keydown',function(evt){
        console.log(evt.which)
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
})



