// write your code here
ramenMenu = document.getElementById('ramen-menu');

fetch("http://localhost:3000/ramens")
    .then(res => res.json())
    .then(data => {
        renderRamenDetails(data[0])
        data.forEach(ramen => {
        appendRamen(ramen)
        })
    })

//append single image
function appendRamen(ramen) {
    const ramenImg = document.createElement('img')
    ramenImg.src = ramen.image

    addImgEL(ramenImg, ramen);

    ramenMenu.appendChild(ramenImg);
    console.log('successful appending')
}

//E.L. Functions
function addImgEL(img, ramen) {
    img.addEventListener('click', () => {
        renderRamenDetails(ramen)
    })
}

//keys to deal with inside each ramen
// id, name, restaurant, image, rating comment

//classes in html
//detail-image, name, restaurant

//Details Render Function
function renderRamenDetails(ramen) {
    const name = document.getElementsByClassName('name')[0]
    const detailImg = document.getElementsByClassName('detail-image')[0]
    const restaurant = document.getElementsByClassName('restaurant')[0]

    name.textContent = ramen.name
    detailImg.src = ramen.image
    restaurant.textContent = ramen.restaurant
}

//FORM
const newRamenForm = document.getElementById('new-ramen')

newRamenForm.addEventListener('submit', (e) => {
    e.preventDefault()
    //get info from form
    newName = document.getElementById('new-name').value
    newRestaurant = document.getElementById('new-restaurant').value
    newImg = document.getElementById('new-image').value
    newRating = document.getElementById('new-rating').value
    newComment = document.getElementById('new-comment').value

   // id, name, restaurant, image, rating comment

    const newRamenObj = {
        name: newName,
        restaurant: newRestaurant,
        image: newImg,
        rating: newRating,
        comment: newComment
    }

    console.log(newRamenObj)

    // console.log(newName)
    // console.log(newRestaurant)
    // console.log(newImg)
    // console.log(newRating)
    // console.log(newComment)
    postNewData(newRamenObj)
})

function postNewData(newRamenObj) {
    fetch('http://localhost:3000/ramens', {
        method: 'Post',
        headers: {
            Accepts: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newRamenObj)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        appendRamen(data)
    })
} 