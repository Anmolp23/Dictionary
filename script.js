const form=document.querySelector('form');
const resultdiv=document.querySelector('.result');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});

const getWordInfo=async(word)=>{
try{
 const response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
 const data=await response.json();
 let definations=data[0].meanings[0].definitions[0];
 resultdiv.innerHTML=
 `<h2><strong>Word:</strong>${data[0].word}</h2>
 <p>${data[0].meanings[0].partOfSpeech}</p>
 <p><strong>Meaning:</strong>${data[0].meanings[0].definitions[0].definition}</p>
 <p><strong>Example:</strong>${data[0].meanings[0].definitions[0].example===undefined ? "Not Found" :
 data[0].meanings[0].definitions[0].example}</p>
<p><strong>Antonyms:</strong>
 `;
 if(definations.antonyms.length==0){
    resultdiv.innerHTML+=`<h4>Not Found</h4><br/>`
 }
else{
for(let i=0;i<definations.antonyms.length;i++){
    resultdiv.innerHTML+=`<li>${definations.antonyms[i]}</li>`
}
}

 //adding button to read more
resultdiv.innerHTML+=`<a href="${data[0].sourceUrls}" target="_blank">Read More</a>`
}catch(error){
    resultdiv.innerHTML=`<h1>Something went wrong</h1>`;
}
}