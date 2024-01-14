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
    let postData = {
        "states": "",
        "cities": "",
        "amenities": ""
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:5001/api/v1/places_search',
        data: JSON.stringify({ postData }),
        contentType: 'application/json',
        success: function (data) {
            $.each(data, function (index, place) {
                var places = '<article>' +
                    '<div class="title_box">' +
                    '<h2>' + place.name + '</h2>' +
                    '<div class="price_by_night">$' + place.price_by_night + '</div>' +
                    '</div>' +
                    '<div class="information">' +
                    '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest != 1 ? 's' : '') + '</div>' +
                    '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms != 1 ? 's' : '') + '</div>' +
                    '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms != 1 ? 's' : '') + '</div>' +
                    '</div>' +
                    '<div class="description">' + place.description + '</div>' +
                    '</article>';
        
                $('section.places').append(places);
            });
            },
        error: function (error) {
            console.error('Error:', error);
        }
        });
    });