let box=document.querySelector(".box");
let btn=document.querySelector("button");

const speakFunc = (input) =>{
    let speakInput= new SpeechSynthesisUtterance(input);
    speakInput.rate=1
    speakInput.pitch=1
    speakInput.volume=1
    speakInput.lang = 'en-IN'
    window.speechSynthesis.speak(speakInput);
}
window.onload = () =>{
    speakFunc("hello")  
    greetingFunc();
}
const greetingFunc = () =>{
    let date = new Date();
    let hour = date.getHours();
    if(hour>=0 && hour<12){
        speakFunc("Good morning Ma'am,How can i help you")
    }else if(hour >=12 && hour<16){
        speakFunc("Good Afternoon Ma'am,How can i help you")   
    }else{
        speakFunc("Good Evening Ma'am,How can i help you")   
    }
}
const startVoiceInput = () =>{
    if('webkitSpeechRecognition' in window)
        {
        let recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.onresult = (e) =>{
           let spokenText= e.results[0][0].transcript;
           handleCommands(spokenText);
           box.classList.remove("btn-box")
           btn.innerHTML=`<i class="fa-solid fa-microphone-lines-slash"></i>`
         }
         recognition.start();
    } else{
        alert("Your browser does not support voice input!")
    }
    
}

btn.onclick = () =>{
    box.classList.add("btn-box")
    btn.innerHTML=`<i class="fa-solid fa-microphone-lines"></i>`
    startVoiceInput();
}
const handleCommands = (command) => {
    console.log("Captured command:", command);

    if (command.toLowerCase().includes("hello") || 
        command.toLowerCase().includes("hey") || 
        command.toLowerCase().includes("hii")) {
        speakFunc("Hello Ma'am, how can I help you?");
    } else if (command.toLowerCase().includes("who developed you")) {
        speakFunc("I am your virtual assistant, developed by Hrithika.");
    } else if (command.toLowerCase().includes("open youtube")) {
        speakFunc("Opening YouTube...");
        setTimeout(() => {
            window.open("https://www.youtube.com", "_blank");
        }, 1000);
    } else if (command.toLowerCase().includes("open google")) {
        speakFunc("Opening Google...");
        setTimeout(() => {
            window.open("https://www.google.com", "_blank");
        }, 1000);
    } else if (command.toLowerCase().includes("open instagram")) {
        speakFunc("Opening Instagram...");
        setTimeout(() => {
            window.open("https://www.instagram.com", "_blank");
        }, 1000);
    } else if (command.toLowerCase().includes("open facebook")) {
        speakFunc("Opening Facebook...");
        setTimeout(() => {
            window.open("https://www.facebook.com", "_blank");
        }, 1000);
    } else {
        speakFunc(`This is what I found on Google for: ${command}`);
        setTimeout(() => {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(command)}`, "_blank");
        }, 1000);
    }
};
