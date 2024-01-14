$(document).ready(function() {
    let amenities = {};
    $(".amenities input[type='checkbox']").change(function() {
        let amenityId = $(this).data('id');
        let amenityName = $(this).data('name');
        if ($(this).is(':checked')) {
            amenities[amenityId] = amenityName;
        }else {
            delete amenities[amenityId];
        }
        updateAmenitiesList();
        });

        function updateAmenitiesList() {
            // Clear the existing content in h4
            $('.amenities h4').empty();

            // Iterate through the selected amenities and update the list
            let values = Object.values(amenities);
            for (let i = 0; i < values.length; i++) {
                if (i === 0) {
                    $('.amenities h4').append(values[i]);
                } else {
                    $('.amenities h4').append(', ' + values[i]);
                }
            }
            if (values.length >= 3) {
                $('.amenities h4').addClass('text-ellipsis');
              } else {
                $('.amenities h4').removeClass('text-ellipsis');
              }
        }
    $.ajax({
        type: 'GET',
        url: 'http://localhost:5001/api/v1/status/',
        dataType: 'json',
        success: function (data) {
            console.log(data)
            if (data.status === 'OK') {
                $('#api_status').addClass('available');
            }else {
                $('#api_status').removeClass('available');
            }
        }
        });
    });
    
