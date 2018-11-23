$( document ).ready( readyNow );

function readyNow( ){
    console.log( 'JQ' );
    getTasks( );
    $( '#addTaskBtn' ).on( 'click', addTask );
    $( '#taskList' ).on( 'click', '.check', toggleComplete );
}

function getTasks( ){
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then( function( res ){
        console.log( 'back from server with:', res );
        displayTasks( res );
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
        <span><i class="far fa-check-circle check"></i></span>
        ${task.note}
        <button>X</button>
        </li>` )
        // add task info as data to each el
        el.data( 'task', task );
        // append to ul
        $('#taskList').append(el);
    }// end for loop
}// end displayTaks

function addTask( ){
    // capture input value
    let task = $( '#addTaskIn' ).val( );
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: { task: task }
    }).then( function( res ){
        console.log( 'back from server with:', res );
    }).catch( function( err ){
        console.log( 'error in post:', err );
    });
    // update tasks list
    getTasks( );
}// end addTask