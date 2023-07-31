let name = document.getElementById('name') 
let iD = document.getElementById('id') 
let mobile = document.getElementById('mobile') 
let position = document.getElementById('position') 
let dpt = document.getElementById('dpt') 
let date = document.getElementById('date') 
let img = document.getElementById('img') 
let add = document.getElementById('add') 
let update = document.querySelectorAll('#update')
let tbody = document.querySelector('tbody')
let message = document.querySelector('.popup')
let removedList = document.querySelector('.removed-list')
let arrowList = document.querySelector('.fa-chevron-down')
let searchValue = document.getElementById('search')

let mood = 'add';


let outerI;
// create the data 
let store = [];
let removedStore = [];
//Start APP 
localStorageUpdates()

add.addEventListener('click',createDataAndStoreIt)


// The main function ((Getting & creating & putting) the data)
function createDataAndStoreIt(){
    // Collect the data 
    if((name.value && iD.value && mobile.value && position.value && dpt .value && date.value && img.value)!=""){
        let person = {
            name:name.value,
            iD: iD.value,
            mobile: mobile.value,
            position: position.value,
            dpt : dpt.value,
            date : date.value,
            img : img.value
        }

        //  Hide the popup message
       
        setTimeout(() => {
            message.classList.remove('show-message')
            message.style.color="#4CAF50"
        }, 1000);
        message.style.color="#f15e5e"
        // Put the data in array
        if(mood == 'add'){
            store.push(person)

             // scrolling down after adding
             setTimeout(() => {
                 window.scrollBy(0, window.innerHeight);
             }, 500);

            
            
        }else{
            store[outerI] = person
            mood ='add'
            add.value='Add'
            add.style.backgroundColor='#2b2d42'


        }
        // Adding array to local storage
        localStorage.setItem('employees',JSON.stringify(store))
        showData()
       
    }else{
        // show popup tell us the inputs are empty
        message.classList.add('show-message')

    }
    // Clean inputs
    removeInputs()
}

// Backup the data from local storage when we reload the page
window.onload = function(){


    showRData()
    showData();
}
// show data
function showData(){
        // looping to put the data in body
        tbody.innerHTML = ""
        for(let i=0 ; i < store.length ; i++){
            tbody.innerHTML+= `<tr>
            <td>${i+1}</td>
            <td>${store[i].name}</td>
            <td>${store[i].iD}</td>
            <td>${store[i].mobile}</td>
            <td>${store[i].position}</td>
            <td>${store[i].dpt}</td>
            <td>${store[i].date}</td>
            <td><img onClick=showImg(${i}) src="img/${store[i].img.split("\\")[2]}" alt=""></td>
            <td><i onClick=edittingPerson(${i}) class="fas fa-user-edit" id="update"></i></td>
            <td><i onClick=deletePerson(${i}) class="fas fa-trash" id="delete"></i></td>
            </tr>`;
        }
    
}

// Delete employee 

function deletePerson(i){
   
    removedStore.push(store[i])
    localStorage.setItem('resentRemoved',JSON.stringify(removedStore))
    // And add It to resent removed
    showRData()

    store.splice(i,1);
    localStorage.setItem('employees',JSON.stringify(store));
    showData()  
}

// Localstorage updates
function localStorageUpdates(){
    if(localStorage.getItem('employees')){
        store = JSON.parse(localStorage.getItem('employees')) 
    }
    if(localStorage.getItem('resentRemoved')){
        removedStore = JSON.parse(localStorage.getItem('resentRemoved'))
    }
}

// Remove inputs 
function removeInputs(){
    for(let r =0 ; r < 4 ; r++){
        if(r==3){
            continue
        }
        document.querySelectorAll('input')[r].value = ""
    }
}

// Editing
function edittingPerson(i){
    // console.log('hello Iam : '+ store[i].name)
    name.value = store[i].name;
    iD.value  = store[i].iD ; 
    mobile.value  = store[i].mobile ; 
    position.value  = store[i].position; 
    dpt.value  = store[i].dpt; 
    date.value  = store[i].date; 
    // change the main btn content 
    add.value = 'Update';
    add.style.backgroundColor='#4CAF50'

    // back the main data for btn
    mood='update'
    outerI =i;
    scroll({
        top:0,
        behavior:"smooth"
    })

}

// show removed data 
function showRData(){
     // looping to put the data in body
     removedList.innerHTML = ""
     for(let i=0 ; i < removedStore.length ; i++){
        removedList.innerHTML+= `<tr>
         <td>${i+1}</td>
         <td>${removedStore[i].name}</td>
         <td>${removedStore[i].iD}</td>
         <td>${removedStore[i].mobile}</td>
         <td>${removedStore[i].position}</td>
         <td>${removedStore[i].dpt}</td>
         <td>${removedStore[i].date}</td>
         <td><img src="img/${removedStore[i].img.split("\\")[2]}" alt=""></td>
         <td><i onClick=recoverEmployee(${i}) class="fas fa-trash-restore"></i></td>
         <td><i onClick=deleteForEver(${i}) class="fas fa-user-times"></i></td>
         </tr>`;
     }
}
// when toggle resent removed(hide & show)
arrowList.addEventListener('click',function(){
    arrowList.classList.toggle('shrink')
    document.querySelector('.removed table').classList.toggle('hide-show')
})
// Recover deleted employee 
function recoverEmployee(i){
    store.push(removedStore[i])
    removedStore.splice(i,1);
    
    showData()
    localStorage.setItem('employees',JSON.stringify(store))
    showRData()
    localStorage.setItem('resentRemoved',JSON.stringify(removedStore))

}
// Delete for ever
function deleteForEver(i){
    removedStore.splice(i,1);
    showData()
    localStorage.setItem('employees',JSON.stringify(store))
    showRData()
    localStorage.setItem('resentRemoved',JSON.stringify(removedStore))
}
// Search 
function search(value){
    tbody.innerHTML=""
    for(let i = 0 ; i < store.length ; i++){
        if(store[i].name.toLowerCase().includes(value.toLowerCase())){
            tbody.innerHTML+= `<tr>
            <td>${i+1}</td>
            <td>${store[i].name}</td>
            <td>${store[i].iD}</td>
            <td>${store[i].mobile}</td>
            <td>${store[i].position}</td>
            <td>${store[i].dpt}</td>
            <td>${store[i].date}</td>
            <td><img src="img/${store[i].img.split("\\")[2]}" alt=""></td>
            <td><i onClick=edittingPerson(${i}) class="fas fa-user-edit" id="update"></i></td>
            <td><i onClick=deletePerson(${i}) class="fas fa-trash" id="delete"></i></td>
            </tr>`;
        }
    }

}
// Show employee photo

function showImg(i){
    console.log(i)
    let parentImg = document.createElement('div')
    let imgShow = document.createElement('img')
    let iclose = document.createElement('i')
    iclose.classList.add('far','fa-window-close')
    parentImg.appendChild(iclose)
    parentImg.classList.add('img-show')
    imgShow.classList.add('window-img')
    // start creating elements (name ,position , national id)
    let window_content = document.createElement('div')
    window_content.className = 'win-content';
    let contentHtml = `
    <p><span>Name : </span>${store[i].name}</p>
    <p><span>Position : </span>${store[i].position}</p>
    <p><span>N.ID : </span>${store[i].iD}</p>
    `
    window_content.innerHTML=contentHtml

    imgShow.setAttribute('src','img/'+store[i].img.split('\\')[2])
    parentImg.appendChild(window_content)
    parentImg.appendChild(imgShow)
    document.body.appendChild(parentImg)

    document.querySelector('.fa-window-close').onclick = function(){
        parentImg.classList.add('scale-n')
        setTimeout(() => {
            document.body.removeChild(parentImg)
        }, 500);


        }


}
