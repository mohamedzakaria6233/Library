var book=JSON.parse(localStorage.getItem("data"));
var idd=localStorage.getItem("edi");

var chosen=book.find(function(item){
    return item.id==idd
})

var nam=document.querySelector(".name");
var page=document.querySelector(".page");
var price=document.querySelector(".price");
var ok=document.querySelector(".ok");

nam.value=chosen.name;
page.value=chosen.page;
price.value=chosen.price;
ok.addEventListener("click",create);
function create(e){
    e.preventDefault();
    book[idd-1].name=nam.value;
    localStorage.setItem("data",JSON.stringify(book))
    alert("Edit Sucessfully..")
}