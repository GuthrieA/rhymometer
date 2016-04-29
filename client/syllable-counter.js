let pronouncing = require('pronouncing/build/pronouncing-browser');


Template.syllableCounter.events({
	'submit .syllable-counter': function(event, template) {
		event.preventDefault();

		$("#output").empty();

		let wordSyllables = 0;
		let count = 0;


		const phrase = template.find('#phrase').value;


		console.log(phrase);

		// Remove punctuation
		let str = (phrase);
		let punctuationless = str.replace(/[.,\/#?!$%\^&\*;:{}=\-_`~()]/g,"");
		let lowerString = punctuationless.toLowerCase();
		let finalString = lowerString.replace(/\s{2,}/g," ");
		let arrayOfFinalString = finalString.split(" ");
		console.log(arrayOfFinalString);

		// Count the syllables
		for (word in arrayOfFinalString){
		console.log(arrayOfFinalString[word]);
		wordSyllables = pronouncing.syllableCount(pronouncing.phonesForWord(arrayOfFinalString[word])[0]);
		console.log(wordSyllables);
		count += wordSyllables;
		}

		console.log(count);

		$("#output").append(count);




		// let syllables = pronouncing.syllableCount(pronouncing.phonesForWord($('phrase').val())[0]);
		// 	$("#output").append(syllables);
		// 	console.log(syllables);
	}
});
