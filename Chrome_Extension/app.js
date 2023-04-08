let myLeads=[]
const inputEl=document.getElementById('input-el')
const inputBtn=document.getElementById('input-btn')
const deleteBtn=document.getElementById('delete-btn')
const saveBtn=document.getElementById('save-btn')
const ulEl = document.getElementById('ul-el')

const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))
if (leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    renderlog(myLeads)
}

deleteBtn.addEventListener("dblclick", function(){
    myLeads=[]
    localStorage.clear()
    renderlog(myLeads)
})

saveBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        renderlog(myLeads)
    })
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    renderlog(myLeads)
})

function renderlog(Leads) {
    let listItems= ""
    for (let i=0; i < Leads.length; i++){
        listItems+=`<li>
            <a target='_blank' href='${Leads[i]}'>${Leads[i]}</a>
        </li>`
    }
    ulEl.innerHTML=listItems
}
