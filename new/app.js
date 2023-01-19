
const dropdown = document.querySelector(".fa-solid");
const dropdownToggle = document.querySelector(".dropdown-toggle");
const text = document.querySelector("#for-first");
const outputText = document.querySelector("#for-second");
const firstLanguage = document.querySelector("#language1");
const secondLanguage = document.querySelector("#language2");
const translating = document.querySelector(".translating");

run();
function run(){
	dropdown.addEventListener("click",getDropdown);
	document.addEventListener("click",runDropdown);	
	translating.addEventListener("click",outputTranslate);
}
function outputTranslate(){
	translatedWord = text.value;
	let first = firstLanguage.options[firstLanguage.selectedIndex].getAttribute("data-language-code");
	let second = secondLanguage.options[secondLanguage.selectedIndex].getAttribute("data-language-code");
	if (translatedWord === ""){
		return false;
	}
	else{
		getDataFromApi(first,second,translatedWord);
	}
}
function runDropdown(e){
	if(!e.target.matches(".fa-solid") && !e.target.matches(".match")){
		dropdownToggle.classList.remove("active");
	}
}
function getDropdown(){
	dropdownToggle.classList.add("active");
}
function getDataFromApi(first,second,translatedWord){
	const encodedParams = new URLSearchParams();
	encodedParams.append("source_language", `${first}`);
	encodedParams.append("target_language", `${second}`);
	encodedParams.append("text", `${translatedWord}`);
	const options = {
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				'X-RapidAPI-Key': 'ae4d2bce22msh3330b7253f17686p1852fajsn1c7850a9b397',
				'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
			},
			body: encodedParams
		};
fetch('https://text-translator2.p.rapidapi.com/translate', options)
.then(response => response.json())
.then(response => outputText.textContent = response.data.translatedText)
.catch(false);	
}




