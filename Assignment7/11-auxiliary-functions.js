"use strict";

var notenames = {
    0: "C",
    1: "C#",
    2: "D",
    3: "Eb",
    4: "E",
    5: "F",
    6: "F#",
    7: "G",
    8: "Ab",
    9: "A",
    10: "Bb",
    11: "B"
}

function interval(frequency, semitones) {
    // Assuming equal temperament
    return frequency * Math.pow(2, semitones / 12);
}

function midiToFrequency(midinumber, concertA = 440) {
    // converts a MIDI note number into its equivalent frequency.
    const A4 = 69
    if (midinumber === A4) {
        return concertA;
    }
    let semitones = midinumber - A4;
    return interval(440, semitones);
}

function frequencyToMidi(frequency){
    // converts a frequency into its equivalent MIDI note number.
   let midinumber = (( 12 * Math.log(frequency / 220.0) / Math.log(2.0)) + 57.001 );
    return midinumber
}

function noteFromFrequency(frequency, withOctave=false) {
    // converts a frequency into its closest human-readable note name.
    const midinumber = frequencyToMidi(frequency);
    //console.log(midinumber)
    const pitchclass = Math.floor(midinumber % 12);
    //console.log(pitchclass)
    let octave = (midinumber - pitchclass) / 12;
    //console.log(octave)
    let notename = notenames[pitchclass];
    //console.log(notename)
    if (withOctave) {
        octave--;
        notename += octave;
    }
    return notename;
}


/* function autotune(frequency) {
    var checkBox = document.getElementById("check");
    if (checkBox.checked == true){
        console.log("hi")       
        const midinumber = frequencyToMidi(frequency);
        console.log (midinumber); 
        rounded=Math.round(number);
        
       
       
        console.log(rounded);
    } 
    else {
        console.log("not working")
    } */
//how to connect this switch to the index checkbox?



    /* let onoff= true //document.getElementById("check")
    console.log(onoff)
    if (onoff===true){
        const midinumber = midiFromFrequency(frequency);
        Math.round(midinumber)
        console.log(midinumber)
        
    } */

//Add a button or check box that, when active, 
//makes the frequency played by the Theremin "auto-tune" 
//to the closest note so that it plays a chromatic scale 
//when dragging your mouse across the box instead of 
//a continuous sweep.
//Hint: use the function frequencyToMidi to get a 
//MIDI note number, use Math.round to round the note 
//number to a whole number, then use midiToFrequency to 
//turn the MIDI number back into a frequency.
