var book=[
    {id:1,name:"C++",page:244,price:25,qu:1},
    {id:2,name:"Java",page:14,price:30,qu:1},
    {id:3,name:"Paython",page:700,price:40,qu:1},
    {id:4,name:"RUBY",page:14,price:24,qu:1},
]
/////////////////////////
var content=document.querySelector(".content");
var nam=document.querySelector(".name");
var price=document.querySelector(".price");
var pages=document.querySelector(".pages");
var ok=document.querySelector(".ok");
var contentCart=document.querySelector(".content-cart")
var total=document.querySelector(".total")
var t2=document.querySelector(".t2");
var tam=document.querySelector(".tam");
// var oksearch=document.querySelector(".see3")
// var insearch=document.querySelector(".see2")
///////////////////////
if(localStorage.getItem("data")){
    var allbook=JSON.parse(localStorage.getItem("data"))
}
else{
    var allbook=book;
}

///////////////////////
function show(){
    var b=allbook.map(function (item){
        return`
        <div class="shbook" style="border:${item.isMe=="yes"?"10px red solid":""}"> 
        <p class="name effe" onclick="sav(${item.id})">${item.name}</p>
        <p class="page">${item.page}</p>
        <p class="price">${item.price}</p>
        <div class="button">
        <button onclick="addtocart(${item.id})">add to cart</button>
        <button onclick="removebook(${item.id})">remove ths book</button>
        <button onclick="addtofav(${item.id})" style="background-color:${item.liked==true?"red":""}">My Favourite</button>


        ${
            ( item.isMe==="yes") ?
            "<button class='edittt' onclick='editbook("+ item.id+")'>Edit Product</button>":""
        }
        </div>

 
    
    </div>
        `
    })
  
  

    content.innerHTML=`
    <div class="shbook fr"> 
    <p class="name .na1">Name</p>
    <p class="page .pa1">Pages</p>
    <p class="price .pr1">Price</p>
    `;
    content.innerHTML+=b;

}
show();
var image="not image";
ok.addEventListener("click",add);
function add(e){
    e.preventDefault();
    
    if(nam.value=="" || price.value=="" || pages.value==""){
        window.alert("Please fill all information !")
    }
    
        $(document).ready(function (){
            $(".tam").hide();
            $(".tam").show(2000)
        })
        // tam.style.display="none";
        // tam.style.display="block";
        var last=allbook.length;
        console.log(last)
        allbook.push({id:++last,name:nam.value,page:pages.value,price:price.value,isMe:"yes",qu:1,image:image});
     
        nam.value="";
        price.value="";
        pages.value="";
    
        localStorage.setItem("data",JSON.stringify(allbook));
        show(allbook)
        console.log(allbook)


    
}
var photo=document.querySelector(".photo")
photo.addEventListener("change",uploadphoto)
function uploadphoto(){
    var file=this.files[0];
    var reader=new FileReader();
    reader.readAsDataURL(file)
    reader.onload=function(){
        image=reader.result
    }
   
}
/*************/
if(localStorage.getItem("myfavourite")){
    var myfavv=JSON.parse(localStorage.getItem("myfavourite"))
}
else{
    var myfavv=[]
}


function addtofav(e){
    var chosen=book.find(function(item){
        return item.id==e
    })
    
    var items=myfavv.find(function(item){
        return item.name==chosen.name
    })

    if(items){
        myfavv.splice(chosen.num,1)
        allbook.map(function(item){
            if(item.name==chosen.name){
                item.liked=false
            }
        })
        localStorage.setItem("data",JSON.stringify(allbook))
        show(allbook)
        console.log("removing.......")
    }

    else{
        console.log("creating.....")
        myfavv.push(chosen);
        allbook.map(function(item){
            if(item.name==chosen.name){
                item.liked=true
            }
        })
        localStorage.setItem("data",JSON.stringify(allbook))
        show(allbook);
    }
    var x=-1
    myfavv.forEach(function(item){
        item.num=++x;
    })

    localStorage.setItem("myfavourite",JSON.stringify(myfavv))
    

}

var mycarts=[];
if(localStorage.getItem("mycarts")){
     mycarts=JSON.parse(localStorage.getItem("mycarts"));
}
else{
    mycarts=[]
}
// //لما ادوس علي add to cart
function addtocart(e){
    var numb=mycarts.length;
    var chose=allbook.find(function (item){
        return e==item.id
    })
    var items=mycarts.find(function(item){
        return item.name==chose.name
    })
    if(items){
        items.qu+=1;
        console.log(items)
        showCarts(mycarts)
        localStorage.setItem("mycarts",JSON.stringify(mycarts))

    }
    else{
        chose.n=numb+1;  
        mycarts.push(chose)
        localStorage.setItem("mycarts",JSON.stringify(mycarts))
        showCarts(mycarts)
    }




}

function showCarts(){



    var b=mycarts.map(function (item){
        return `
        <div class="shbook"> 
        <p class="name">${item.name}</p>
        <p class="page">${item.page}</p>
        <p class="price">${item.price}</p>
        <p class="qu"">${item.qu}</p>
      
        <button class="re" onclick="removecart(${item.n})">remove from cart </button>
  
    
    </div>
        `
    })

    var sum= mycarts.reduce(function (b,item){
        return parseInt(item.price)+b
    },0)
    if(mycarts.length>0){
        total.style.display="block";
        t2.innerHTML=sum;
        
    }
    contentCart.innerHTML="";
    contentCart.innerHTML=b;
}
showCarts();

// لما ادوس علي remove this book
function removecart(e){
    var chose=mycarts.filter(function (item){
        return item.n!==e
    })

    localStorage.setItem("mycarts",JSON.stringify(chose));
     mycarts=JSON.parse(localStorage.getItem("mycarts"))



    showCarts(mycarts)
    console.log(mycarts)


}

// لما ادوس علي remove book
function removebook(e){
    var boook=allbook.map(function (item){
        return item.id
    }).indexOf(e);

    allbook.splice(boook,1)

    var ss=0;
   var asmaa=allbook.map(function (item){
    return {id:++ss,name:item.name,page:item.page,price:item.price}
   })
   localStorage.setItem("data",JSON.stringify(asmaa));
   allbook=JSON.parse(localStorage.getItem("data"))
   show(allbook)
}

function editbook(e){
    localStorage.setItem("edi",e);
    window.location="edit.html"
}
// oksearch.addEventListener("click",s)

// function s(){
//     console.log("tamam")
//   function search(arr,word){
//     return arr.filter(function (item){
//         return item.name.indexOf(word)!==-1
//     })
// }

//     var result=search(allbook,insearch.value);
//     console.log(result)
//     var b=result.map(function (item){
//         return`
//         <div class="shbook"> 
//         <p class="name">${item.name}</p>
//         <p class="page">${item.page}</p>
//         <p class="price">${item.price}</p>
//         <div class="button">
//         <button onclick="addtocart(${item.id})">add to cart</button>
//         <button onclick="removebook(${item.id})">remove ths book</button>
//         </div>
    
//     </div>
//         `
//     })
//     content.innerHTML=`
//     <div class="shbook fr"> 
//     <p class="name">Name</p>
//     <p class="page">Pages</p>
//     <p class="price">Price</p>
//     `;
//     content.innerHTML+=b;
//     insearch.value="";
    
// }


function sav(e){
    localStorage.setItem("saveId",e)
    window.location="desc.html"
}

// jquery

$(document).ready(function (){

    $(".u li").click(function (){
        $(this).addClass("formheader").siblings().removeClass("formheader")
    })

    $(window).scroll(function(){
        if($(window).scrollTop()>$(".add").offset().top){
    
            $(".header").addClass("headerwhenscroll")
        }
        else{
    
            $(".header").removeClass("headerwhenscroll")

        }
    })

    $(".u li").click(function (){
      var s= $(this).attr("id")
      var ss= "."+s;
      $("body").animate({
        scrollTop:$(ss).offset().top-70
      })
    })
})//end jQuery



var arabic=document.querySelector(".arabic")
var english=document.querySelector(".english")
arabic.addEventListener("click",ar)
function ar(){
    document.querySelector("html").setAttribute("lang","ar")
    $(document).ready(function(){
        $(".add-t").text("إضافة كتاب جديد")
        $(".tam").text("تمت إضافة الكتاب بنجاح")
        $("#add").text("إضافة")
        $("#content").text("عرض")
        $("#mycart").text("السلة")
        $("form .name").attr("placeholder","أدخل اسم الكتاب")
        $("form .pages").attr("placeholder","أدخل صفحات الكتب")
        $("form .price").attr("placeholder","أدخل سعر الكتاب")
        $(".ok").val("تم")
        $(".na1").text("الاسم")
        $(".pa1").text("الصفحات")
        $(".pr1").text("السعر")
        $(".re").text("الإزالة من المفضلة")
        $(".t1").text("إجمالي السعر هو")
        $(".textfa").text("السلة")
    })//end jQuery
}
english.addEventListener("click",en);
function en(){
    document.querySelector("html").removeAttribute("lang")

    $(document).ready(function(){
        $(".add-t").text("Add New Book")
        $(".tam").text("تمت إضافة الكتاب بنجاح")
        $("#add").text("إضافة")
        $("#content").text("عرض")
        $("#mycart").text("السلة")
        $("form .name").attr("placeholder","أدخل اسم الكتاب")
        $("form .pages").attr("placeholder","أدخل صفحات الكتب")
        $("form .price").attr("placeholder","أدخل سعر الكتاب")
        $(".ok").val("تم")
        $(".na1").text("الاسم")
        $(".pa1").text("الصفحات")
        $(".pr1").text("السعر")
        $(".re").text("الإزالة من المفضلة")
        $(".t1").text("إجمالي السعر هو")
        $(".textfa").text("السلة")
    })//end jQuery
}
