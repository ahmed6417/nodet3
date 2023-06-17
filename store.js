import fetch from "node-fetch"


var myHeaders = new Headers();
    myHeaders.append("apikey", "PJi2TMiYMJex1utHvXxQMUUk3KR1LBju");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
    
    let EGPRate; 

    let result = fetch("https://api.apilayer.com/exchangerates_data/convert?to=EGP&from=USD&amount=1", requestOptions)
        .then(response => response.json())
        .then(function (result){ 
            EGPRate = result.result
            console.log(EGPRate);
        })
        .catch(error => console.log('error', error));

        // console.log(EGPRate);

fetch('https://api.escuelajs.co/api/v1/products', result)
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
            element.price=(element.price)*EGPRate;
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


    



