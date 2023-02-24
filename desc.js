var product=JSON.parse(localStorage.getItem("data"));
var id=localStorage.getItem("saveId");

var book=product.filter(function (item){
    return item.id==id
})

var print=book.map(function (item){
    return `
                <p>name: ${item.name}</p>
                <p>author : ${item.author} </p>
                <p>price : ${item.price}</p>
                <p>pages : ${item.page}</p>
    `
})
var pho=document.querySelector(".photoo")
var p=book.map(function(item){
    return item.image
})

pho.innerHTML=`
<img src=${p} title="photo">

`

var desc=document.querySelector(".desc");
desc.innerHTML=print;
console.log("yes")