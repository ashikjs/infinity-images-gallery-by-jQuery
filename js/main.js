// Category on click feature.

$(document).ready(function () {
    const selector = '#galleryCategoryList ul li';
    $(selector).on('click', function () {
        $(selector).removeClass('active');
        $(this).addClass('active');
    })
});



// Category on click feature.

// $(document).ready(function () {
//     const selector = '#galleryCategoryList ul li';
//     $(selector).on('click', function () {
//         $(selector).addClass('active');
//         $(this).addClass('active');
//     })
// });

