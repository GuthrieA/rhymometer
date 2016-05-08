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
			let count = 0;
			for (word in arrayOfBrokenString){
			wordSyllables = pronouncing.syllableCount(pronouncing.phonesForWord(arrayOfBrokenString[word])[0]);
			count += wordSyllables;
			}
			return count;
		}
    // Test the rhymes
    function doesRhyme(a, b){
      for (let x=0; x<a.length; x++){
        if (a[x] == b){
          return(true);
        }
      }
      return(false);
    }

		// Locate the rhyming words
		function locater(arrayOfWords){
			// let firstWord= '';
			// let secondWord= '';
			let pairs = [];
	    for (let x=0; x<arrayOfWords.length; x++){
	      let wordRhymes = pronouncing.rhymes(arrayOfWords[x]);
	      for (let y=(x+1); y<arrayOfWords.length; y++) {
					if (doesRhyme(wordRhymes, arrayOfWords[y])){ /* || arrayOfWords[x] == arrayOfWords[y])*/
						console.log(arrayOfWords[x]);
						console.log(arrayOfWords[y]);
						pairs.push([arrayOfWords[x], arrayOfWords[y]]);
					}
        }

    	}
			console.log(pairs);
			return pairs;
		}
		// let firstWord = brokenPhrase[0];
		// let secondWord = brokenPhrase[1];

		// slice an array between rhyming words

		function arraySeparation (array, firstWord, secondWord){
			let x=0;
			for (x; x<array.length; x++){
				if (array[x] == firstWord){
					array = array.slice(x+1);
				}
			}
			for (let y =0; y<array.length; y++){
				if (array[y] == secondWord){
				array =	array.slice(0, y+1);

				}
			}
			console.log(array);
			return array;
		}

		// Run the functions
		let brokenPhrase = breakPhrase(phrase);
		let fullCount = counter(brokenPhrase);
		console.log(fullCount);
		let located = locater(brokenPhrase);
		console.log(located);
		// let rhymeCount = counter(arraySeparation(brokenPhrase, firstWord, secondWord));
		// console.log(rhymeCount + " " + "between rhymes")





		// Highlight the rhymes
		// function highlighter(unhighlightedPhrase){
		// 		if (unhighlightedPhrase == "fox"){
		// 			unhighlightedPhrase.replace(/fox/,"<span>fox</span>");
		// 	}
		// }

		// Put it back together without the punctuation
		// function putItTogether(arrayPhrase){
		// 	let newPhrase = [];
		// 	for (let x = 0; x<arrayPhrase.length; x++){
		// 		newPhrase.push(arrayPhrase[x] + " ");
		// 	}
		// 	console.log(newPhrase)
		// 	return newPhrase;
		// }

		console.log(brokenPhrase);
		console.log(brokenPhrase.join(" "));

		// $("#output").append(highlighter(phrase) + " ");
    $("#output").append(brokenPhrase.join(" ") + " " + "has" + " " + fullCount + " " + "syllables");
    // $("#output").append(" " + count);




		// let syllables = pronouncing.syllableCount(pronouncing.phonesForWord($('phrase').val())[0]);
		// 	$("#output").append(syllables);
		// 	console.log(syllables);
	}
});
