let myLeads = [];
const input = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
let ulEl = document.getElementById("ul-list");
let deleteBtn=document.getElementById("delete-btn");
let tabbtn=document.getElementById("tab-btn");

let leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))


tabbtn.addEventListener("click", function() {
  if (typeof browser !== "undefined" && browser.tabs && browser.tabs.query) {
    browser.tabs.query({ active: true, currentWindow: true }).then(function(tabs) {
      myLeads.push(tabs[0].url);
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      renderLeads();
    });
  } else if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.query) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      myLeads.push(tabs[0].url);
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      renderLeads();
    });
  }
});

  
  

if(leadsFromLocalStorage){
    myLeads= leadsFromLocalStorage;
    renderLeads();
}

deleteBtn.addEventListener("click", function(){
    localStorage.clear();
    myLeads=[];
    renderLeads();

})

input.addEventListener("click", function () {
    
   myLeads.push(inputEl.value);
   inputEl.value="";
   localStorage.setItem("myLeads", JSON.stringify(myLeads))
   renderLeads();
    
})
function renderLeads() {
    let listItems = "";
    for (let i = 0; i < myLeads.length; i++) {
        listItems += `
                    <li>
                    <a target="_blank" href="${myLeads[i]}">
                    ${myLeads[i]}
                    </a>
                    </li>

        `
    }
    ulEl.innerHTML = listItems;
}


