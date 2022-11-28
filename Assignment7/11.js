"use strict";
//still need to be fix , the showing of the midinot and frequency,the first openr ofthe page
//global var
var oscillator = new Pizzicato.Sound({
    source: 'wave',
    options: {
        type: "sine",
        frequency: 220
    }
});
var reverb = new Pizzicato.Effects.Reverb({
    time: 1,
    decay: 0.8,
    reverse: true,
    mix: 0.5
});
//oscOption();
// Turn theremin on
function thereminOn(oscillator) {
    oscillator.play();
}

// Control the theremin
function thereminControl(e, oscillator, theremin) {
    let x = e.offsetX;
    let y = e.offsetY;
   // console.log(x, y);

    let minFrequency = 220.0;
    let maxFrequency = 880.0;
    let freqRange = maxFrequency - minFrequency;
    let thereminFreq = minFrequency + (x / theremin.clientWidth) * freqRange;
    let thereminVolume = 1.0 - (y / theremin.clientHeight);

    //console.log("Frequency: ", thereminFreq);
    oscillator.frequency = thereminFreq;
    //console.log("Volume: ", thereminVolume);
    oscillator.volume = thereminVolume;
    autotune(thereminFreq,oscillator)

}

// Turn theremin off
function thereminOff(oscillator) {
    oscillator.stop();
}

function runAfterLoadingPage() {
    
    // Instantiate a sine wave with pizzicato.js

    // Get the theremin div from the html
    const theremin = document.getElementById("thereminZone");
    
    // Theremin plays when the mouse enters the theremin div
    theremin.addEventListener("mouseenter", function () {
        
        oscillator=oscOption()
        let reverbOption=addReverb()
        console.log(reverbOption) 
        if (reverbOption==true){
            oscillator.addEffect(reverb)
        }
        thereminOn(oscillator);
    });

    // Theremin is controlled while the mouse is inside the theremin div
    theremin.addEventListener("mousemove", function (e) {
        thereminControl(e, oscillator, theremin);
        
    });

    // Theremin stops when the mouse leaves the theremin div
    theremin.addEventListener("mouseleave", function () {
        thereminOff(oscillator);
    });
}

    
function oscOption(oscillator){
    let e = document.getElementById("waveform");
    let value = e.value;
    if(value == "sine"){
        console.log("Im in sine")
        oscillator = new Pizzicato.Sound({
            source: 'wave',
            options: {
                type: "sine",
                frequency: 220
            }
        });
        return oscillator
    }
    if(value == "sawtooth"){
        console.log("Im in saw")
        oscillator = new Pizzicato.Sound({
            source: 'wave',
            options: {
                type: "sawtooth",
                frequency: 220
            }
        });
        return oscillator
    }
    if(value == "square"){
        console.log("Im in square")
        oscillator = new Pizzicato.Sound({
            source: 'wave',
            options: {
                type: "square",
                frequency: 220
            }
        });
        return oscillator
    }
}
function addReverb(oscillator){
    let checkBox = document.getElementById("checkreverb");
    if (checkBox.checked == true){
        console.log("im in reverb")
        return true
    }
    return false
    
}

function autotune(frequency,oscillator){
    //console.log(frequency)
    
    let checkBox = document.getElementById("check");
    if (checkBox.checked == true){
        //console.log("checked")   
        let midiNoteNumber = frequencyToMidi(frequency)
        //console.log(midiNoteNumber)
        let TunedNote=Math.round(midiNoteNumber)
        //console.log(TunedNote)
        let TunedFrequency=midiToFrequency(TunedNote)
        let NoteName=noteFromFrequency(TunedFrequency)
        document.getElementById("FrequencyOutput").innerHTML="Current frequency is : "+ Math.round(TunedFrequency*100)/100
        document.getElementById("NoteOutput").innerHTML="Current Note is : "+NoteName
        oscillator.frequency=TunedFrequency;
       //console.log(TunedFrequency)
       
       // console.log(rounded);
    } 
    else {
       // console.log("not checked")
    } 
 }


window.onload = runAfterLoadingPage;
