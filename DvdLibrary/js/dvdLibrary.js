$(document).ready(function () {
    alert("Ready to go!!!");
    loadDvd();
    addDvd();
    updateContact();
    displayDvdAddList();
    searchBar();
    //location.reload();
   // deleteContact();
});

function loadDvd(){
    clearContactTable();
    var contentRows = $('#contentRows');
    //loading data with aajazx
    $.ajax({
        type: 'GET',
        url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvds',
        //successful data was loadded
        success: function(contactArray) {
            $.each(contactArray, function(index, contact){
                var title = contact.title ;
                var releaseYear = contact.releaseYear;
                var director=contact.director;
                var rating =contact.rating;
                var id = contact.id;

                var row = '<tr>';
                    row += '<td>' + title + '</td>';
                    row += '<td>' + releaseYear + '</td>';
                    row += '<td>' + director + '</td>';
                    row += '<td>' + rating + '</td>';
                    row += '<td><button type="button" class="btn btn-info" onclick="showEditForm(' + id + ')">Edit</button> <button type="button" class="btn btn-danger" onclick="deleteDvd(' + id + ')">Delete</button></td>';
                   //row += '<td><button type="button" class="btn btn-danger" onclick="deleteDvd(' + id + ')">Delete</button></td>';
                    row += '</tr>';
                
                contentRows.append(row);
            })
        
        },
        //errro loadign data
        error: function() {
        $('#errorMessages')
            .append($('<li>')
            .attr({class: 'list-group-item list-group-item-danger'})
            .text('Error calling web service. Please try again later.'));
        }
    })
}
function displayDvdAddList(){
    $('#creatDVDButton').click(function (event){
        $('#dvdContent').hide();
        $('#addFormDiv').show();
        $('#topButtons').hide();
    })
}
function hideAddForm(){
    $('#errorMessages').empty();
    

    $('#topButtons').show();
    $('#dvdContent').show();
    $('#addFormDiv').hide();
}

function addDvd() {
    $('#createDVDButton').click(function (event) {
        $.ajax({
           type: 'POST',
           url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvd',
           data: JSON.stringify({
                title: $('#addDvdTitle').val(),
                releaseYear: $('#addReleaseYear').val(),
                director: $('#addDirector').val(),
                rating: $('#addRating').val(),
                notes: $('#addNotes').val()
           }),
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },
           'dataType': 'json',
           success: function() {
               $('#errorMessages').empty();
               $('#addDvdTitle').val('');
               $('#addReleaseYear').val('');
               $('#addDirector').val('');
               $('#addRating').val('');
               $('#addNotes').val('');
               hideAddForm();
               loadDvd();
           },
           error: function () {
               $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.')); 
           }
        })
    });
}

function deleteDvd(id) {
    var result = confirm("Want to delete?");
    if (result) {
    $.ajax({
        type: 'DELETE',
        url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/' + id,
        success: function() {
            loadDvd();
        }
    });
}
}

function clearContactTable() {   
    $('#contentRows').empty();
}

function showEditForm(id) {
    $('#errorMessages').empty();
    $.ajax({
        type: 'GET',
        url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/' + id,
        success: function(data, status) {
            $('#editDvdTitle').val(data.title);
            $('#editReleaseYear').val(data.releaseYear);
            $('#editDirector').val(data.director);
            $('#editRating').val(data.rating);
            $('#editNotes').val(data.notes);
            $('#editDvdId').val(data.id);
            
        },
        error: function() {
            $('#errorMessages')
            .append($('<li>')
            .attr({class: 'list-group-item list-group-item-danger'})
            .text('Error calling web service. Please try again later.')); 
        }
    })
    $('#dvdContent').hide();
    $('#editFormDiv').show();
}

function hideEditForm() {
    $('#errorMessages').empty();
    
    $('#editDvdTitle').val('');
    $('#editReleaseYear').val('');
    $('#editDirector').val('');
    $('#editRating').val('');
    $('#editNotes').val('');

    $('#dvdContent').show();
    $('#editFormDiv').hide();
}

function updateContact(id) {
    $('#updateDVDButton').click(function(event) {
        $.ajax({
            type: 'PUT',
            url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/' + $('#editDvdId').val(),
            data: JSON.stringify({
                id: $('#editDvdId').val(),
                title: $('#editDvdTitle').val(),
                releaseYear: $('#editReleaseYear').val(),
                director: $('#editDirector').val(),
                rating: $('#editRating').val(),
                notes: $('#editNotes').val()
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json'
            // success: function() {
               // $('#errorMessages').empty();
               
                // hideEditForm();
                // loadDvd();
            // },
            // error: function() {
            //     $('#errorMessages')
            //     .append($('<li>')
            //     .attr({class: 'list-group-item list-group-item-danger'})
            //     .text('Error calling web service. Please try again later.')); 
            // }
        })
        
        hideEditForm();
      
        setTimeout(() => loadDvd(), 500)
    });
}


function searchBar(){
    $('#searchBox').on("keyup",function(){
        var value= $(this).val();  
        $('#searchButton').click(function(event) {
            clearContactTable();
            var contentRows = $('#contentRows');
               
            $.ajax({
                type: 'GET',
                url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvds/'+$('#dropDownId').val()+'/'+ value,
                //successful data was loadded
                success: function(contactArray) {
                    $.each(contactArray, function(index, contact){
                        var title = contact.title ;
                        var releaseYear = contact.releaseYear;
                        var director=contact.director;
                        var rating =contact.rating;
                        var id = contact.id;
        
                        var row = '<tr>';
                            row += '<td>' + title + '</td>';
                            row += '<td>' + releaseYear + '</td>';
                            row += '<td>' + director + '</td>';
                            row += '<td>' + rating + '</td>';
                            row += '<td><button type="button" class="btn btn-info" onclick="showEditForm(' + id + ')">Edit</button> <button type="button" class="btn btn-danger" onclick="deleteDvd(' + id + ')">Delete</button></td>';
                           //row += '<td><button type="button" class="btn btn-danger" onclick="deleteDvd(' + id + ')">Delete</button></td>';
                            row += '</tr>';
                        
                        contentRows.append(row);
                    })
                    $('#searchCancelButton').show();
                    
                }
            })
    //loadDvd();
    });
    })
}

function hideSearchForm(){
    $('#errorMessages').empty();
   // $('#contentRows').reset();
    loadDvd();
    $('#searchCancelButton').hide();
    $('#topButtons').show();
    $('#dvdContent').show();
   
}