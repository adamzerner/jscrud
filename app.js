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
  check: function(id) {
    var todos = JSON.parse(localStorage.todos);
    todos[id].completed = !todos[id].completed;
    localStorage.todos = JSON.stringify(todos);
  },
  getAll: function() {
    return JSON.parse(localStorage.todos);
  },
  getRemaining: function() {
    var todos = JSON.parse(localStorage.todos);
    return todos.filter(function(todo) {
      return !todo.completed;
    });
  },
  getCompleted: function() {
    var todos = JSON.parse(localStorage.todos);
    return todos.filter(function(todo) {
      return todo.completed;
    });
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
    $(document).on('click', 'input[type="checkbox"]', function() {
      var id = $(this).data('id');
      controller.checkTodo(id);
    });
    $('nav a').on('click', function(e) {
      e.preventDefault();
      var type = $(this).attr('id');
      view.render(type);
    });
  },
  render: function(type) {
    type = type || 'all';
    var todos = controller.getTodos(type);
    var $ul = $('.list-group'),
        $li;

    $ul.html('');
    for (var i = 0, len = todos.length; i < len; i++) {
      $x = $('<span>&times;</span>')
      $x
        .data('id', todos[i].id)
        .addClass('remove');

      $checkbox = $('<input>');
      $checkbox
        .data('id', todos[i].id)
        .attr('type', 'checkbox');
      if (todos[i].completed) $checkbox.attr('checked', true);

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
  getTodos: function(type) {
    if (type === 'all') return model.getAll();
    else if (type === 'remaining') return model.getRemaining();
    else if (type === 'completed') return model.getCompleted();
  },
  addTodo: function(title) {
    model.add(title);
    view.render();
  },
  removeTodo: function(id) {
    model.remove(id);
    view.render();
  },
  checkTodo: function(id) {
    model.check(id);
  }
};

controller.init();

});
