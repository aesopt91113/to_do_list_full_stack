$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

var indexTasks = function (successCB, errorCB) {
  var request = {
    type: 'GET',
    url: 'api/tasks?api_key=1',
    success: successCB,
    error: errorCB
  }

  $.ajax(request);
};

var postTask = function (content, successCB, errorCB) {
  var request = {
    type: 'POST',
    url: 'api/tasks?api_key=1',
    data: {
      task: {
        content: content
      }
    },
    success: successCB,
    error: errorCB
  }
  $.ajax(request);
};

var deleteTask = function (id, successCB, errorCB) {
  var request = {
    type: "DELETE",
    url: `api/tasks/${id}?api_key=1`,
    success: successCB,
    error: errorCB
  }
  $.ajax(request);
}

var toggleTask = function (id, completedStatus, successCB, errorCB) {
  var request = {
    type: "PUT",
    url: `api/tasks/${id}/mark_${completedStatus? "active" : "complete"}?api_key=1`,
    success: successCB,
    error: errorCB
  }
  $.ajax(request);
}
