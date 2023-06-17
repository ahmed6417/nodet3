

var myHeaders = new Headers();
myHeaders.append("apikey", "PJi2TMiYMJex1utHvXxQMUUk3KR1LBju");

var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};


// Change Currency

let fromR;
let toR;
let currentRate;
let fromRate = document.getElementById("rates").addEventListener('change', function() {
    fromR = this.value;
    return this.value;
}); 
let toRate = document.getElementById("torates").addEventListener('change', function() {
    toR = this.value;
    return this.value;
}); 
function submit(){
    console.log (fromR);
    console.log (toR);
fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${fromR}&from=${toR}&amount=1`, requestOptions)
    .then(response => response.json())
    .then(function (result){
        currentRate = result.result
        console.log(currentRate);
    })
    .catch(error => console.log('error', error));
}


// Post Product

function post(){  
const body = {
    "title": "New Product",
    "price": 10*currentRate,
    "description": "A description",
    "categoryId": 1,
    "images": ["https://placeimg.com/640/480/any"]
};

fetch('https://api.escuelajs.co/api/v1/products', {
	method: 'post',
	body: JSON.stringify(body),
	headers: {'Content-Type': 'application/json'}
})
.then (response => response.json())
.then (function(result){
    console.log(result);
    document.getElementById("result").innerHTML = `
    <div id="product">
    <div class="product-data">Product ID: <em class="result">${result.id}</em></div>
    <div class="product-data">Product Description: <em class="result">${result.description}</em></div>
    <div class="product-data">Product Images: <img src="${result.images[0]}"></div>
    <div class="product-data">Product Price: <em class="result">${result.price}</em></div>
    </div>
    `
})
}



//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
// Fetch All products

function showAllProducts(){
fetch('https://api.escuelajs.co/api/v1/products')
    .then(response => response.json())
    .then(function (data){
    let sort = data.sort(function(a, b) {
        return parseFloat(a.id) - parseFloat(b.id);
    })
    let filtro = sort.slice(0, 30);
    return filtro
    })
    // .then( function(changePrice) {    
    //     console.log(changePrice[1].price * EGPRate)
    // })
    .then( function(json) {    
        let dataa = Array.from(json);
        // console.log(dataa[1].price);
        dataa.forEach(element=>{
            element.price=(element.price)*currentRate;
        })
        let final= {
            Clothes:[],
            Electronics:[],
            Furniture:[],
            Shoes:[],
            Others:[]
        }
        dataa.forEach(element=>{
            if (element.category.name == "Clothes"){
            final.Clothes.push(element);
            }
            else if(element.category.name == "Electronics"){
            final.Electronics.push(element);
            }
            else if(element.category.name == "Furniture"){
                final.Furniture.push(element);
            }
            else if(element.category.name == "Shoes"){
                final.Shoes.push(element);
            }
            else {
                final.Others.push(element);
            }
        })
        console.log(final);
        // console.log(json);
    })
}