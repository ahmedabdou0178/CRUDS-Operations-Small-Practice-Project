//get elememnts by id
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;
// get total function
function getTotal(){
    if (price.value){
        // console.log();
        let result = (+price.value) + (+taxes.value) + (+ads.value) - (+discount.value);
        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.innerHTML ='';
        total.style.background = '#a00d02';

    }
}
getTotal();
//create product


class Pro {
    constructor(__title, __price, __taxes, __ads, __discount, __total, __count, __category) {
        this.title = __title;
        this.price = __price;
        this.taxes = __taxes;
        this.ads = __ads;
        this.discount = __discount;
        this.total = __total;
        this.count = __count;
        this.category = __category;
    }
}

var dataPro = new Array ;
if (localStorage.product != null){
     dataPro = JSON.parse(localStorage.product);
    }else{
     dataPro = [];
}
// the problem with the hoisting of dataPro // problem solved



submit.onclick = function (){
    
        let newPro = new Pro (title.value.toLowerCase(), price.value, taxes.value, ads.value, discount.value, total.innerHTML,
        count.value, category.value.toLowerCase())

    if (title.value != "" && 
        price.value != "" && 
        category.value != "" &&
        count.value <= 100){
            if(mood === 'create'){
                if (newPro.count >1 ){
                    for (let i=0; i < newPro.count ; i++ ){
                        dataPro. push(newPro);
                    }
                }else{
                    dataPro. push(newPro);
                    
                }
            }else{
                dataPro[tmp] = newPro;
                submit.innerHTML='CREATE'
                mood = 'create'
                count.style.display = 'block'
            }
            clearData();
        }
        // console.log(dataPro);
        
        // save in localStorage
        localStorage.setItem('product', JSON.stringify(dataPro))
    
    // clear inputs
    getTotal();
    showData()
}

function clearData(){
    title.value =''; price.value=''; taxes.value=''; ads.value= ''; discount.value='' ; discount.value='';
    count.value =''; category.value='';

}

// read product
function showData(){  
    let table = '';
    for (let i=0; i < dataPro.length ; i++ ){
        
        table +=`
                <tr>
                        <td>${i+1} </td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete </button></td>
                </tr>
        
        `
    }
    document.getElementById('tbody').innerHTML = table;
    getTotal();
    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0){
        btnDelete.innerHTML = `<button onclick="deleteAll()" id="delete_All">delete All  (${dataPro.length})</button>`
    }else{
        btnDelete.innerHTML =''
    }
}
showData();



//delete
function deleteData(i){
    console.log(i);
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();    
}

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();        
}

//count


//update
function updateData(i){
    // console.log(i);
    //getting value into input fields
    title.value = dataPro[i].title; 
    price.value=dataPro[i].price; 
    taxes.value=dataPro[i].taxes; 
    ads.value= dataPro[i].ads; 
    discount.value=dataPro[i].discount; 
    count.style.display = 'none';
    category.value=dataPro[i].category;
    getTotal();
    submit.innerHTML= 'UPDATE';
    mood = 'update';
    tmp= i;
    scroll({
        top:0,
        behavior:"smooth"
    });
}
//search
let searchMood = 'title'
function getSearchMood(id){
    let search = document.getElementById('search');
    search.value = "";
    search.focus()
    showData()
    
    if (id == "searchCategory"){
        searchMood = 'category';
    }else{
        searchMood = 'title';
    }
    search.placeholder="Search By "+ searchMood;
}

function searchData(value){
    let table = '';
    
    
    for (let i=0; i < dataPro.length ; i++){
        if (searchMood === "title"){
            if (dataPro[i].title .includes(value.toLowerCase())){
                table +=`
                <tr>
                        <td>${i+1} </td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete </button></td>
                </tr>
                  `
            }
        
        }else{
            if (dataPro[i].category .includes(value.toLowerCase())){
                table +=`
                <tr>
                        <td>${i+1} </td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete </button></td>
                </tr>
                `
            }
        }

    }
    document.getElementById('tbody').innerHTML = table;
}


//validation for clean data
