
const div = document.createElement("div");
div.style.display="flex";
document.body.appendChild(div);


const inputField = document.createElement("input");
div.appendChild(inputField);


const button = document.createElement("button");
button.innerHTML = "click me";
div.appendChild(button);

button.addEventListener("click",function(){
    console.log(inputField.value);
})

const div1 = document.createElement("div");
div1.style.display="flex";
document.body.appendChild(div1);

const link = document.createElement("a");
link.innerText = "click link";
link.setAttribute("href","www.google.com");
link.style.border = "2px solid red"
div1.appendChild(link);


const div2 = document.createElement("div");
div2.style.display="flex";
document.body.appendChild(div2);

const countriesData = {
    "Australia": "",
    "Canada": "",
    "UK": "",
    "USA": ""
}

for (let key in countriesData) {
    let option = document.createElement("option");
    option.setAttribute('value', data[key]);
  
    let optionText = document.createTextNode(key);
    option.appendChild(optionText);
  
    div2.appendChild(option);
  }


