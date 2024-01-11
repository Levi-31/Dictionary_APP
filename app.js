let input =document.querySelector('#input');

let searchBtn = document.querySelector('#search');

let notFound= document.querySelector('.not_found');

let def=document.querySelector('.def') ;

let audioBox= document.querySelector('.audio');

let loeading =document.querySelector('.loading');



searchBtn.addEventListener('click',(evt)=>{
   evt.preventDefault();
  

   // clear purana data 
   audioBox.innerHTML="";
   notFound.innerText="";
   def.innerText="";

   // Get input data
   let word = input.value;





   // call api get data
   if(word===""){
    alert('Enter a  word');
    return;
   }

   getData(word);


    
})


async  function getData(word){
    loeading.style.display="block"; 


     

    // ajax call

    let url=`https://dictionaryapi.com/api/v3/references/learners/json/${word}?key=e567aa91-b022-469a-9d48-4be9dc4cc566`;

    const response = await fetch(url)

    const data= await response.json();
     
    // empty result

    if(!data.length ){
        loeading.style.display="none"; 
notFound.innerText = "No Result found ,  Try again ."; 
        return;
    }

     // result is suggestion
    if(typeof(data[0]) === "string"){
        loeading.style.display="none"; 
  let heading =document.createElement('h3')
  heading.innerText='Did you Mean ?'
   notFound.appendChild(heading);

   data.forEach(element => {
        let suggestion=document.createElement('span');
        suggestion.classList.add('suggested');
        suggestion.innerText =element+' ';
        notFound.appendChild(suggestion);
        
   });

   return;
    }

    // result found
    loeading.style.display="none"; 
    let definition = data[0].shortdef[0];
   
    def.innerText=definition;


    // sound system

    const soundName= data[0].hwi.prs[0].sound.audio;

    if(soundName){
        // file avalaible

        renderSound(soundName);
    }


   
}



function renderSound(soundName){
//https://media.merriam-webster.com/soundc11

 let subFolder= soundName.charAt(0);
 let soundsrc =`https://media.merriam-webster.com/soundc11/${subFolder}/${soundName}.wav?key=e567aa91-b022-469a-9d48-4be9dc4cc566`;

  let aud = document.createElement('audio');
  aud.src = soundsrc;

  aud.controls= true;
  audioBox.appendChild(aud);

}

