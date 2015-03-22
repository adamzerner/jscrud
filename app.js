$(document).ready(function() {

var count = 0;

function Todo(title) {
  this.id = count;
  count++;
  this.title = title;
  this.completed = false;
  this.dateAdded = Date.now();
}

var model = {
  init: function() {
    if (!localStorage.todos) {
      localStorage.todos = JSON.stringify([]);
    }
  },
  add: function(title) {
    var todos = JSON.parse(localStorage.todos);
    var todo = new Todo(title);
    todos.push(todo);
    localStorage.todos = JSON.stringify(todos);
  },
  remove: function(id) {
    var todos = JSON.parse(localStorage.todos);
    for (var i = 0, len = todos.length; i < len; i++) {
      if (todos[i].id === id) {
        todos.splice(i, 1);
        localStorage.todos = JSON.stringify(todos);
        break;
      }
    }
  },
  getAll: function() {
    return JSON.parse(localStorage.todos);
  }
};

var view = {
  init: function() {
    this.render();
    $('#createForm').on('submit', function(e) {
      e.preventDefault();
      $input = $('.form-control');
      var newTitle = $input.val();
      controller.addTodo(newTitle);
      $input.val('');
      $input.blur();
    });
    $(document).on('click', '.remove', function() {
      var id = $(this).data('id');
      controller.removeTodo(id);
    });
  },
  render: function() {
    var $ul = $('.list-group'),
        todos = controller.getTodos(),
        $li;

    $ul.html('');
    for (var i = 0, len = todos.length; i < len; i++) {
      $x = $('<span>&times;</span>')
      $x
        .data('id', todos[i].id)
        .addClass('remove');

      $checkbox = $('<input>');
      $checkbox
        .attr('type', 'checkbox');

      $li = $('<li></li>');
      $li
        .addClass('list-group-item')
        .text(' ' + todos[i].title + ' ')
        .prepend($checkbox)
        .append($x);
      
      $ul.append($li);
    }
  }
};

var controller = {
  init: function() {
    model.init();
    view.init();
  },
  getTodos: function() {
    return model.getAll();
  },
  addTodo: function(title) {
    model.add(title);
    view.render();
  },
  removeTodo: function(id) {
    model.remove(id);
    view.render();
  }
};

controller.init();

});
