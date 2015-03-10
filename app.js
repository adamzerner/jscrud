$(document).ready(function() {
  // SELECTORS
  // navs
  var $listNav = $('#listNav'),
      $createNav = $('#createNav'),
  // sections
      $listSection = $('section.list'),
      $itemSection = $('section.item'),
      $createSection = $('section.create'),
      $editSection = $('section.edit'),
  // forms
      $createForm = $("form[name='todoFormCreate']"),
      $editForm = $("form[name='todoFormEdit']"),
  // inputs
      $createInput = $('section.create input'),
      $editInput = $('section.edit input');

	// VARIABLES
	var currentPage = 'list',
      todos = [],
      currIndex;

	// INITIALIZATION
	$itemSection
    .add($createSection)
    .add($editSection)
    .hide();

	// ROUTING
	$listNav.on('click', renderList);

	$createNav.on('click', function() {
    renderPage('create');
	});

	$('.container').on('click', '#edit', function(e) {
		currIndex = $(e.target).data('i');
    $editInput.val(todos[currIndex]);
    renderPage('edit');
	});

  $('.container').on('click', '#delete', function(e) {
    var i = $(e.target).data('i');
    todos.splice(i, 1);
    renderList();
  });

  function getPage(page) {
    switch(page) {
      case 'list': 
        return $listSection;
      case 'item': 
        return $itemSection;
      case 'create': 
        return $createSection;
      case 'edit': 
        return $editSection;
    }
  }

  function renderPage(page) {
    getPage(currentPage).hide();
    getPage(page).show();
    currentPage = page;
  }

	function renderList() {
		// render DOM using todos
		$('.list ul').html('');
		for (var i = 0, len = todos.length; i < len; i++) {
			$('.list ul').append([
				'<li>' + todos[i] + 
					' | ' +  '<a id="edit" data-i="' + i + '">edit</a>' + 
					' | ' +  '<a id="delete" data-i="' + i + '">delete</a>' + 
				'</li>'
			].join());
		}
    renderPage('list');
	}

	// FORMS
	$createForm.on('submit', function(e) {
		e.preventDefault();
		todos.push($createInput.val());
		$createInput.val('');
		renderList();
	});

	$editForm.on('submit', function(e) {
		e.preventDefault();
		var newVal = $editInput.val();
    todos[currIndex] = newVal;
		$editInput.val('');
		renderList();
	});
});