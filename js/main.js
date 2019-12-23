// Initial Value
const LoadMoreNumber = 4;
const LoadMoreNumberAll = 1;

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
        $('.ig-images').css('display', 'none')
        $('.' + category).css('display', 'block')
    }
});

loadImages("all");

$(document).ready(function () {
    const selector = '#galleryImageLoadMore';
    $(selector).on('click', function () {
        const category = $('#galleryCategoryList ul li.active').attr('data-category');
        loadImages(category);
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

function createDomeArray(category, load) {
    const Parent = document.getElementById("infinityImagesLoad");
    let index = Parent.getElementsByClassName(category).length;
    console.log(index);
    let endIndex = index + load;
    return categoriesObject[category].slice(index, endIndex)
}


function loadImages(category) {
    if (category === 'all') {
        uniqueCategories.forEach(categoryName => createDome(createDomeArray(categoryName, LoadMoreNumberAll)));
    } else {
        createDome(createDomeArray(category, LoadMoreNumber))
    }
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

