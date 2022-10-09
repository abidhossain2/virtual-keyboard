let writeArea = document.getElementById('write-area');
let number = document.querySelectorAll('#number');
let letters = document.querySelectorAll('#letter');
let activeBtn = document.querySelector('.active-btn');

number.forEach(num => {
    num.addEventListener('click', () => {
        writeArea.value += num.innerText;
    })
})

letters.forEach(letter => {
    letter.addEventListener('click', () => {
        writeArea.value += letter.innerText;
    })
})


const handleBackSpace = () => {
    writeArea.value = writeArea.value.slice(0, -1);
}

const handleCapsLockClick = () => {
    const background = activeBtn.style.backgroundColor;
    
    if (background == 'orange') {
        activeBtn.style.backgroundColor = 'black';
        letters.forEach(letter => {
            letter.style.textTransform = 'lowercase';
        });
    } else {
        activeBtn.style.backgroundColor = 'orange';
        letters.forEach(letter => {
            letter.style.textTransform = 'uppercase';
        })
    }
}


const handleEnterClick = () => {
    writeArea.value += '\n'
}

const handleSpace = () => {
    writeArea.value += " ";
}




// Toggle keyboard

let keyboard = document.querySelector('.keyboard');

writeArea.addEventListener('click', () => {
    keyboard.style.opacity = '1';
    
})

const handleClose = () => {
    keyboard.style.opacity = '0';
}


// Voice typing

let voiceType = document.querySelector('.micro-phone');
voiceType.addEventListener('click', () => {
    let speech = true;
    window.SpeechRecognition = window.SpeechRecognition
    || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    
    recognition.addEventListener('result', (e) => {
        const transcript = Array.from(e.results).map(result => result[0]).map(result => result.transcript);
        writeArea.value = transcript;
    })
    
    if (speech == true) {
        recognition.start();
    }
})


// voice listening

let chooseVoice = document.querySelector('#choose-voice');
let listen = document.querySelector('.volume');
let speechSynth = window.speechSynthesis;
let allVoice = [];

selectVoices();

if(speechSynthesis !== undefined){
    speechSynthesis.onvoiceschanged = selectVoices;
}

listen.addEventListener('click', () => {
    let talk = new SpeechSynthesisUtterance(writeArea.value);
    let voiceName = chooseVoice.selectedOptions[0].getAttribute('data-name');
    allVoice.forEach(voice => {
        if(voice.name == voiceName){
            talk.voice = voice; 
        }
    })
    speechSynth.speak(talk)
});

function selectVoices(){
    allVoice = speechSynth.getVoices();
    let voiceIndex = chooseVoice.voiceIndex < 0 ? 0 : chooseVoice.voiceIndex;
    chooseVoice.innerHTML = '';
    allVoice.forEach(voice => {
        let voiceItem = document.createElement('option');
        voiceItem.textContent = voice.name;
        voiceItem.setAttribute('data-lang', voice.lang);
        voiceItem.setAttribute('data-name', voice.name);
        chooseVoice.appendChild(voiceItem);
    })
    chooseVoice.voiceIndex = voiceIndex;
} 


// emoji setting

let emoji = document.getElementById('emoji-icon');
let emojis = document.querySelector('.emojis');
let emojiIcon = document.querySelectorAll('.emoji');

emoji.addEventListener('click', () => {
    if(emojis.style.visibility == 'visible'){
        emojis.style.visibility = 'hidden';
    }else{
        emojis.style.visibility = 'visible';
    }
})

emojiIcon.forEach(icon => {
    icon.addEventListener('click', () => {
        writeArea.value += icon.textContent;
    })
})

let cancleBtn = document.getElementById('cancle-btn');
cancleBtn.addEventListener('click', () => {
  
        emojis.style.visibility = 'hidden';
   
    
})