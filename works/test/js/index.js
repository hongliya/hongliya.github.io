$(function()
{

    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'json.txt',
        success: function(data)
        {
            console.log(data);
        },
        error: function()
        {
            console.log('error');
        }
    });


    // var vehicleObj =

    // for (var i = 0; i < vehicleObj.length; i++)
    // {
    //     createTr('#dragSortTable > tbody', vehicleObj[i]);
    // }
});

function createTr(element, Obj)
{
    var trStr = '<tr>'
                + '<td>'+ Obj.plate_number +'</td>'
                + '<td>'+ Obj.driver_name +'</td>'
                + '<td>'+ Obj.driver_phone +'</td>'
                + '<td>'+ Obj.seat_number +'</td>'
                + '<td>'+ Obj.order_number +'</td>'
                + '<td>'+ Obj.cooperation_team +'</td>'
                + '<td></td>'
                + '<td></td>'
                + '<td></td>'
                + '<td></td>'
                + '<td></td>'
                + '<td></td>'
                + '<td></td>'
                + '<td></td>'
                + '<td></td>'
                + '<td></td>'
                + '<td></td>'
                + '<td></td>'
                + '<td></td>'
                + '<td></td>'
                + '<td></td>'
                + '<td></td>'
                + '<td></td>'
                + '<td></td>'
                + '<td></td>'
                + '<td></td>'
                + '<td></td>'
                + '<td></td>'
                + '<td></td>'
                + '<td></td>'
            + '</tr>';
    $(element).append(trStr);
}