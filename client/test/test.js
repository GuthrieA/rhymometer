let pronouncing = require('pronouncing/build/pronouncing-browser');

Template.test.events({
	'submit .locaterCounter': function(event, template) {
		event.preventDefault();
		$("#output").empty();

		let wordSyllables = 0;
		let count = 0;
		// The input phrase
		const phrase = template.find('#fullPhrase').value;

		// Remove punctuation
		function breakPhrase(str){
		let punctuationLess = str.replace(/[.,\/#?!$%\^&\*;:{}=\-_`~()]/g,"");
		let breakLess = punctuationLess.replace(/\r?\n|\r/g, " ");
		let lowerString = breakLess.toLowerCase();
		let finalString = lowerString.replace(/\s{2,}/g," ");
		let arrayOfFinalString = finalString.split(" ");
		return arrayOfFinalString;
		}

		// Count the syllables
		function counter(arrayOfBrokenString){
			for (word in arrayOfBrokenString){
			wordSyllables = pronouncing.syllableCount(pronouncing.phonesForWord(arrayOfBrokenString[word])[0]);
			count += wordSyllables;
			}
			return count;
		}
    // Test the rhymes
    function doesRhyme (a, b){
      for (let x=0; x<a.length; x++){
        if (a[x] == b){
          return(true);
        }
      }
      return(false);
    }

		// Locate the rhyming words
		function locater (arrayOfWords){
	    for (let x=0; x<arrayOfWords.length; x++){
	      let wordRhymes = pronouncing.rhymes(arrayOfWords[x]);
	      for (let y=(x+1); y<arrayOfWords.length; y++) {
					if (doesRhyme(wordRhymes, arrayOfWords[y]) || arrayOfWords[x] == arrayOfWords[y]){
						console.log(arrayOfWords[x]);
						console.log(arrayOfWords[y]);
					}
        }
    	}
		}

		// Run the functions
		let brokenPhrase = breakPhrase(phrase);
		count = counter(brokenPhrase);
		console.log(brokenPhrase);
		locater(brokenPhrase);


		// Highlight the rhymes
		function highlighter(unhighlightedPhrase){
				if (unhighlightedPhrase == "fox"){
					unhighlightedPhrase.replace(/fox/,"<span>fox</span>");
			}
		}

		highlighter(phrase);
		// Put it back together without the punctuation
		function putItTogether(arrayPhrase){
			let newPhrase = [];
			for (let x = 0; x<arrayPhrase.length; x++){
				newPhrase.push(arrayPhrase[x] + " ");
			}
			return newPhrase;
		}

		$("#output").append(highlighter(phrase) + " ");
    // $("#output").append(putItTogether(brokenPhrase) + " ");
    // $("#output").append(" " + count);




		// let syllables = pronouncing.syllableCount(pronouncing.phonesForWord($('phrase').val())[0]);
		// 	$("#output").append(syllables);
		// 	console.log(syllables);
	}
});
