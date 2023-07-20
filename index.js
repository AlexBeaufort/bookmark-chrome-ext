

const inputBtn = document.querySelector("#input-btn");
const inputEl = document.querySelector("#input-el");
const linkArea = document.querySelector("#link-area");
const deleteBtn = document.querySelector("#delete-btn");
const tabBtn = document.querySelector("#tab-btn");
let myLinks =[];
let linksFromStorage = JSON.parse(localStorage.getItem("links"));

if(localStorage.getItem("links")){
    myLinks = linksFromStorage;
    renderItems(myLinks);
}
//this function saves the input in the text field
function saveInput(){
    myLinks.push(inputEl.value);
    localStorage.setItem("links",JSON.stringify(myLinks));
    renderItems(myLinks);
    inputEl.value = "";
  }

//Save input button
inputBtn.addEventListener("click",saveInput);

//save input enter key
inputEl.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        saveInput();
    }
})

//puts links onto page 
function renderItems(links){
    let listItem = "";
    for(let i =0; i<links.length; i++){
        listItem += `<li><a target="_blank" href="${links[i]}">${links[i]}</a></li>`;

}
    linkArea.innerHTML = listItem;
}


//delete button
deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear();
    myLinks=[];
    renderItems(myLinks);
})
//save tab button
tabBtn.addEventListener("click",function(){
 chrome.tabs.query({active: true, currentWindow:true}, function(tabs){
    myLinks.push(tabs[0].url);
    localStorage.setItem("links", JSON.stringify(myLinks));
    renderItems(myLinks);
 });
 
 
})


