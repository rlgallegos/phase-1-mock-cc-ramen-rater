// write your code here
ramenMenu = document.getElementById('ramen-menu');
ramenList = [];
const dropdownList = document.getElementById('select-dropdown')

fetch("http://localhost:3000/ramens")
    .then(res => res.json())
    .then(data => {
        renderRamenDetails(data[0])
        data.forEach(ramen => {
        appendRamen(ramen)
        })
    }).then(() => {

    //Populate Dropdown form
    console.log(ramenList[0])
    ramenList.forEach(ramen => {
    console.log(ramen)
    
    const singleOption = document.createElement('option')
    singleOption.innerText = ramen
    singleOption.value = ramen
    dropdownList.appendChild(singleOption)

})
    })

//append single image
function appendRamen(ramen) {
    const ramenImg = document.createElement('img')
    ramenImg.src = ramen.image

    //populate ramen list
    ramenList.push(ramen.name)

    addImgEL(ramenImg, ramen);

    ramenMenu.appendChild(ramenImg);
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
    const rating = document.getElementById('rating-display')
    const comment = document.getElementById('comment-display')

    name.textContent = ramen.name
    detailImg.src = ramen.image
    restaurant.textContent = ramen.restaurant
    rating.textContent = ramen.rating
    comment.textContent = ramen.comment
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


//PATCH / DELETE Event Listeners
updateForm = document.getElementById('update-form')

updateForm.addEventListener('submit', (e) => {
    e.preventDefault()

    //get values
    const choice = dropdownList.value
    console.log(choice)

    newRating = document.getElementById('new-rating').value

    let choiceId = ramenList.indexOf(choice)
    console.log(choiceId)

    //construct thing

    patchRequest(newRating, choiceId)
})

function patchRequest(newRating, id) {
    fetch(`http://localhost:3000/ramens/${id}`, {
        method: 'PATCH',
        headers: {
            "Accepts": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            rating: newRating
        })
    })
}