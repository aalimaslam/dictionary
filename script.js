const text = document.getElementById("text");
const container = document.getElementById("meaning-container")
let URL;
let heading,meanings;
document.form.addEventListener("submit",(e)=>{
    e.preventDefault();
    container.innerHTML = '';
    URL = "https://api.dictionaryapi.dev/api/v2/entries/en/" + text.value;

    let meanings,definitione;

    fetch(URL)
    .then(response=>{
        if(!response.ok){
            alert("Check Your Word")
            throw new Error(`Request Failed with Status ${response.status}`)
        }
        return response.json();
    })
    .then(data=>{
        heading = elem("h2")
        heading.classList.add("text-center");
        addText(heading,data[0].word.toUpperCase());

        meanings = elem("div");
        meanings.classList.add("fw-bold")
        container.classList.add("p-4")
        definitione = elem("p");

        for(let i=0;i<data[0].meanings.length;i++){
            
            addText(meanings,data[0].meanings[i].partOfSpeech)
            
            addText(definitione, data[0].meanings[i].definitions[0].definition);
            
            container.innerHTML += "<hr/>"
        }
    })
    .catch(err=>{
        alert(`${err} Error While Creating the request`)
    })

})
function elem(elem){
    return document.createElement(elem);
}
function addText(elem,text){
    elem.innerText = text;
    container.appendChild(elem)
}