$( document ).ready( readyNow );

function readyNow( ){
    console.log( 'JQ' );
    // hide input on page load
    $( '#addTaskDiv' ).hide( );
    // toggle if input form is visible
    $( '#addTask ').on( 'click', toggleInput );
    // add new task to DB
    $( '#addTaskBtn' ).on( 'click', addTask );
    // toggle if task is completed or not
    $( '#taskList' ).on( 'click', '.check', toggleComplete );
    // delete task from DB
    $( '#taskList' ).on( 'click', '.deleteBtn', deleteTask );
    // show delete button on hover
    $('#taskList').on( 'mouseenter', '.task', function(){
        $( '.deleteBtn', this ).show( );
    });
    // hide delete button on mouseleave
    $('#taskList').on('mouseleave', '.task', function () {
        $('.deleteBtn', this).hide();
    });
    // get tasks from DB on page load
    getTasks();
}

function getTasks( ){
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then( function( res ){
        displayTasks( res );
        // check to style different if complete
        checkIfComplete( );
    }).catch( function( err ){
        console.log( 'error in GET:', err );
    })
}// end getTasks

function displayTasks( tasks ){
    // clear out tasks first
    $('#taskList').empty( );
    for( let task of tasks ){
        // create element to append to ul
        let el = $(`
        <li class="task">
        <span><i class="far fa-check-circle check"></i>
        ${task.note}</span>
        <i class="deleteBtn far fa-trash-alt"></i>
        </li>` )
        // add task info as data to each el
        el.data( 'task', task );
        // append to ul
        $('#taskList').append(el);
        $( '#taskList .deleteBtn' ).hide( );
    }// end for loop
}// end displayTaks

function checkIfComplete( ){
    $( '.task' ).each( function(){
        console.log( $( this ))
        let task = $( this ).data( 'task' );
        console.log( task );
        if( task.completed ){
            $( 'i.check', this ).toggleClass( 'completedCheck' );
            $( 'span', this ).toggleClass( 'completedText' );
        }
    })
}

function addTask( ){
    // capture input value
    let task = $( '#addTaskIn' ).val( );
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: { task: task }
    }).then( function( res ){
        // clear out input value
        $('#addTaskIn').val( '' );
    }).catch( function( err ){
        console.log( 'error in post:', err );
    });
    // update tasks list
    getTasks( );
}// end addTask

function toggleComplete( ){
    // get data object for element to target
    let task = $( this ).parent( ).parent( ).data( 'task' );
    $.ajax({
        method: 'PUT',
        url: `/tasks/${task.id}`
    }).then( function( res ){
        // update DOM
        getTasks( );
    }).catch( function( err ){
        console.log( 'error on put:', err );
    });// end ajax
}// end toggleComplete

function deleteTask( ){
    // get data object for task to delete
    let task = $(this).parent().data('task');
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${task.id}`
    }).then( function( res ){
        //update DOM
        getTasks( );
    }).catch( function( err ){
        console.log( 'error from DEL route:', err );
    });// end ajax
}// end deleteTask

function toggleInput( ){
    $( '#addTaskDiv' ).toggle( );
}