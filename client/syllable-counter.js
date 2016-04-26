let pronouncing = require('pronouncing/build/pronouncing-browser');


let str = "How are you doing today?";
let punctuationless = str.replace(/[.,\/#?!$%\^&\*;:{}=\-_`~()]/g,"");
let finalString = punctuationless.replace(/\s{2,}/g," ");
let arrayOfFinalString = finalString.split(" ");
console.log(arrayOfFinalString);

Template.syllableCounter.events({
	'submit .syllable-counter': function(event) {
    event.preventDefault();
		$("#output").empty();
		let syllables = pronouncing.syllableCount(pronouncing.phonesForWord($("#word").val())[0]);
			$("#output").append(syllables);
			console.log(syllables);
	}
});
