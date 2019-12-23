// Initial Value
const LoadMoreNumber = 4;
const LoadMoreNumberAll = 5;

// Object
const GalleryImagesObject = [
    {
        url: 'https://i.picsum.photos/id/100/1400/800.jpg',
        category: 'nature'
    },
    {
        url: 'https://i.picsum.photos/id/101/1400/800.jpg',
        category: 'technology'
    },
    {
        url: 'https://i.picsum.photos/id/102/1400/800.jpg',
        category: 'art'
    },
    {
        url: 'https://i.picsum.photos/id/103/1400/800.jpg',
        category: 'nature'
    },
    {
        url: 'https://i.picsum.photos/id/104/1400/800.jpg',
        category: 'nature'
    },
    {
        url: 'https://i.picsum.photos/id/115/1400/800.jpg',
        category: 'technology'
    },
    {
        url: 'https://i.picsum.photos/id/106/1400/800.jpg',
        category: 'art'
    },
    {
        url: 'https://i.picsum.photos/id/107/1400/800.jpg',
        category: 'nature'
    },
    {
        url: 'https://i.picsum.photos/id/108/1400/800.jpg',
        category: 'art'
    },
    {
        url: 'https://i.picsum.photos/id/109/1400/800.jpg',
        category: 'nature'
    },
    {
        url: 'https://i.picsum.photos/id/110/1400/800.jpg',
        category: 'nature'
    },
    {
        url: 'https://i.picsum.photos/id/111/1400/800.jpg',
        category: 'technology'
    },
    {
        url: 'https://i.picsum.photos/id/112/1400/800.jpg',
        category: 'art'
    },
    {
        url: 'https://i.picsum.photos/id/113/1400/800.jpg',
        category: 'nature'
    },
];

const uniqueCategories = [...new Set(GalleryImagesObject.map(data => data.category))];
const categoriesObject = {};
uniqueCategories.forEach(element => categoriesObject[element] = []);

GalleryImagesObject.map(image => categoriesObject[image.category].push(createDomeObject(image)));

// Category on click feature.
// Menu or category list
const selector = '#galleryCategoryList ul li';
$(selector).on('click', function () {
    $(selector).removeClass('active');
    $(this).addClass('active');
    const category = $(this).attr('data-category');
    // console.log(category);
    if (category === 'all') {
        $('.ig-images').css('display', 'block')
    } else {
        $('.ig-images').css('display', 'none');
        $('.' + category).css('display', 'block')
    }
});

loadImages("all");

$(document).ready(function () {
    const selector = '#galleryImageLoadMore';
    $(selector).on('click', function () {
        const category = $('#galleryCategoryList ul li.active').attr('data-category');
        loadImages(category);

        // var scr = $('#infinityGallery')[0].scrollHeight;

        setTimeout(function () {

            var winHeight = $(window).height(),
                topOffset = $("#infinityGallery").offset().top,
                elementHeight = $('#infinityGallery').height();
            var top = topOffset - winHeight + elementHeight;

            $('html, body').animate({
                scrollTop: top
            }, 500);
        }, 200)
    });
});

// All Global Functions

function createDomeObject(imageObject) {
    return {
        url: imageObject.url,
        category: imageObject.category,
        status: false,
    }
}

function loadImages(category) {
    if (category === 'all') {

        let totalIndex = LoadMoreNumberAll,
            totalCategory = uniqueCategories.length;

        while (totalCategory >= 0 && totalIndex > 0) {
            console.log(totalCategory);
            uniqueCategories.forEach(categoryName => {
                if (totalCategory >= 0 && totalIndex > 0) {
                    createDome(arraySpilt(categoryName));
                }
            });
        }

        function arraySpilt(categoryName) {
            let aaa = createDomeArray(categoryName, 1);
            if (aaa.length) {
                totalIndex--;
            } else {
                totalCategory--;
            }
            return aaa;
        }

    } else {
        createDome(createDomeArray(category, LoadMoreNumber))
    }
}

//

function createDomeArray(category, load) {
    const Parent = document.getElementById("infinityImagesLoad");
    let index = Parent.getElementsByClassName(category).length;
    // console.log(index);
    let endIndex = index + load;
    console.log(categoriesObject[category].slice(index, endIndex));
    return categoriesObject[category].slice(index, endIndex)
}


function createDome(array) {
    array.forEach(image => {
        let html_to_insert = `<div class="col-12 col-sm-6 col-md-4 col-xl-3 ig-images ${image.category}">
                                <div class="row">
                                    <div class="img">
                                        <img src="${image.url}" class="img-fluid" alt="">
                                    </div>
                                </div>
                              </div>
                             `;
        // with .insertAdjacentHTML, preserves event listeners
        document.getElementById('infinityImagesLoad').insertAdjacentHTML('beforeend', html_to_insert);
    });
}

