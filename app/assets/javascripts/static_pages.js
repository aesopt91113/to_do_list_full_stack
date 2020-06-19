$(document).ready(function () {
  if ($('.static_pages.index').length > 0) {
    indexTasks(function (response) {
      var htmlString = response.tasks.map(function(task) {
        return `<div class="col-12 d-flex py-2" data-id='${task.id}' data-status = '${task.completed}'> \
        <button type="button" class="btn btn-sm btn-${task.completed? "info" : "warning"}  col-2 p-2 mr-3 d-inline toggleTask"> \
          ${task.completed? "Complete" : "Active"} \
          </button> \
          <div class='col-7 border rounded task d-inline'> \
           ${task.content} \
          </div> \
            <button class="btn btn-sm btn-danger p-2 ml-3 col-2 d-inline deleteTask" type="button">Remove</button> \
          </div>`;
      });
      $("#tasks").html(htmlString);
    });
  }
  // adding task
  $('#addButton').on('click', function() {
    var content = $('#task').val()

    postTask(content, function (resp) {
      $('#tasks').append(`<div class="col-12 d-flex py-2" data-id='${resp.task.id}' data-status = '${resp.task.completed}'> \
      <button type="button" class="btn btn-sm btn-warning col-2 p-2 mr-3 d-inline toggleTask"> \
        Active \
        </button> \
        <div class='col-7 border rounded task d-inline'> \
         ${resp.task.content} \
        </div> \
          <button class="btn btn-sm btn-danger p-2 ml-3 col-2 d-inline deleteTask" type="button">Remove</button> \
        </div>`)


    }, function () {
      window.alert("fail to POST")
    });
  });

  // delete task
  $('#tasks').on('click', ".deleteTask", function(event) {
    var $deleteBTN = $(this);
    var id = $(this).parent().data('id')

    deleteTask(id, function () {
      $deleteBTN.closest('div').css('background-color', 'red').fadeOut(() => {
        $deleteBTN.closest('div').remove();
        // still need to delete the closest task and complete button
      });
    }, function () {
      window.alert('cannot be deleted');
    })
  })

  // complete/incomplete tasks
  $('#tasks').on('click', '.toggleTask', function() {
    var $completeBTN = $(this);
    var id = $(this).parent().data('id')
    var status = $completeBTN.parent().data('status')

    console.log(status)

    toggleTask(id, status, function(resp) {
      console.log(resp)
      if (resp.task.completed) {
        $completeBTN.removeClass("btn-warning").addClass("btn-info").text("Completed");
        $completeBTN.parent().data('status', true);
      } else {
        $completeBTN.removeClass("btn-info").addClass("btn-warning").text("Active");
        $completeBTN.parent().data('status', false);
      }
      window.testing = $completeBTN
    }, function() {
      window.alert('status cannot be updated')
    })
  })
})
