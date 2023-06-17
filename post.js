import fetch from "node-fetch"


const body = {
    "title": "New Product",
    "price": 10,
    "description": "A description",
    "categoryId": 1,
    "images": ["https://placeimg.com/640/480/any"]
};

const response = await fetch('https://api.escuelajs.co/api/v1/products', {
	method: 'post',
	body: JSON.stringify(body),
	headers: {'Content-Type': 'application/json'}
});
const data = await response.json();

console.log(data);





// fetch('https://api.escuelajs.co/api/v1/products',requestOptions)
//     .then(response => response.json())
//     .then(function (data){
//     console.log(data);
//     })


//     var requestOptions = {
//         method: 'GET',
//         redirect: 'follow',
//         headers: myHeaders
//     };