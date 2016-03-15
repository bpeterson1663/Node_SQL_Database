
$(document).ready(function() {
    getInitialData();
    $('#submit-button').on('click', postData);


});

function postData() {
    event.preventDefault();

    var values = {};
    $.each($('#sql-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $.ajax({
        type: 'POST',
        url: '/people',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });

}
//Get all data in the current database
function getInitialData() {
    $.ajax({
        type: 'GET',
        url: '/people',
        success: appendData
    });
}
//get new person added when save to DB button is clicked
function getData(){

    $.ajax({
      type: 'GET',
      url: '/people/new',
      success: appendNewData
    });
}
//append all current data in database
function appendData(response){
  console.log(response)
  for(var i =0; i < response.length; i++){
    $('.container').append('<div class="person"></div>');
    var $el = $('.container').children().last();
    $el.append('<p> Name: '+response[i].name+'</p>');
    $el.append('<p> Address: '+response[i].address+' </p>');
    $el.append('<p> City: '+response[i].city+' </p>');
    $el.append('<p> State:'+response[i].state+' </p>');
    $el.append('<p> Zip Code: '+response[i].zip_code+' </p></br>');
  }
}
//append new person each time save to DB button is clicked
function appendNewData(response){
  var counter = 0;
  console.log("Counter is: ", response);
  $('.container').append('<div class="person"></div>');
  var $el = $('.container').children().last();

  $el.append('<p> Name: '+response[counter].name+' '+'</p>');
  $el.append('<p> Address: '+response[counter].address+' </p>');
  $el.append('<p> City: '+response[counter].city+' </p>');
  $el.append('<p> State: '+response[counter].state+' </p>');
  $el.append('<p> Zip Code: '+response[counter].zip_code+' </p></br>');
}
