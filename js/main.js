//
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');


// Init the voices array

let voices = [];

const getVoices = (() => {

    voices = synth.getVoices();

    console.log(voices)
    //Loop through voices and create an option for each one

    voices.forEach((voice) => {

    //create option element
    const option = document.createElement('option')
    //fill option with voice and lang

    option.textContent = voice.name + '('+voice.lang +')';

    // set needed option attr
    option.setAttribute('data-lang', voice.lang)
    option.setAttribute('data-name', voice.name)

    //append option to select

    voiceSelect.appendChild(option);
    })

})

getVoices();

if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

//speaking 

const speak = () =>{

        
    // check if speaking
    if(synth.speaking){
        console.error('ALready speaking...');
        return;

    }

    if(textInput.value !== ''){
        // Add background animation
        body.style.background = '#141414 url(img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
    
        //Get the text to speak

        const speakText = new SpeechSynthesisUtterance(textInput.value)
        
        //speak end
        // run when done speaking
        speakText.onend = e =>{
            console.log('Done speaking oo ...');
            body.style.background = '#141414';
        }

        // speaking error
        speakText.onerror = e =>{
            console.error('Something went wrong Buddy.');

        }

        //selected voice

        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name')
        
        // loop through voices and select

        voices.forEach((voice) => {
            
            if(voice.name === selectedVoice){
                speakText.voice = voice;
            }
        });

        // set pitch and rate

        speakText.rate = rate.value;
        speakText.pitch = pitch.value

        //Now speak

        synth.speak(speakText);


    
    }
}



//Event LIsteners

//text form submit

textForm.addEventListener('submit', e=> {
    e.preventDefault();
    speak();
    textInput.blur();
});

//  Change rate value

rate.addEventListener('change', e=> rateValue.textContent = rate.value)

//  Change rate value

pitch.addEventListener('change', e=> pitchValue.textContent = pitch.value)

//voice select change

voiceSelect.addEventListener('change', e => speak());


