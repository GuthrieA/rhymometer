let pronouncing = require('pronouncing/build/pronouncing-browser');


Template.locater.events({
	'submit .locaterCounter': function(event, template) {
		event.preventDefault();

		$("#output").empty();

		let wordSyllables = 0;
		let count = 0;


		const phrase = template.find('#fullPhrase').value;


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
		wordSyllables = pronouncing.syllableCount(pronouncing.phonesForWord(arrayOfFinalString[word])[0]);
		count += wordSyllables;
		}
    // Test the rhymes

    function doesRhyme (a, b){
      for (x=0; x<a.length; x++){
        if (a[x] == b){
          return(true);
        }
      }
      return(false);
    }

    for (wordNumber in arrayOfFinalString){
      let wordRhymes = pronouncing.rhymes(arrayOfFinalString[word]);
      for (y=wordNumber; y<arrayOfFinalString.length; y++) {
        if (doesRhyme(wordRhymes, arrayOfFinalString[y])){
          console.log(arrayOfFinalString[wordNumber]);
        }
      }
    }



    $("#output").append(phrase);
    $("#output").append(" " + count);




		// let syllables = pronouncing.syllableCount(pronouncing.phonesForWord($('phrase').val())[0]);
		// 	$("#output").append(syllables);
		// 	console.log(syllables);
	}
});
