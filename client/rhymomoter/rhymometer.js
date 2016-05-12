let pronouncing = require('pronouncing/build/pronouncing-browser');

Template.rhymometer.events({
	'submit .locaterCounter': function(event, template) {
		event.preventDefault();
		$("#output").empty();

		
		// Initial declarations
		let wordSyllables = 0;
		let count = 0;
		// The input phrase
		const phrase = template.find('#fullPhrase').value;

		// Remove punctuation
		function breakPhrase(str){
			let punctuationLess = str.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '');
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

		// Locate the rhyming pairs
		function findPairs(arrayOfWords){
			let pairs = [];
		    for (let x=0; x<arrayOfWords.length; x++){
		      let wordRhymes = pronouncing.rhymes(arrayOfWords[x]);
		      for (let y=(x+1); y<arrayOfWords.length; y++) {
					if (doesRhyme(wordRhymes, arrayOfWords[y]) ||(arrayOfWords[x] == arrayOfWords[y])){
						pairs.push([arrayOfWords[x], arrayOfWords[y]]);
					}
				}

			}
			return pairs;
		}


		// Slice an array of syllables between rhyming words
		function separate (array, firstWord, secondWord){
			for (let x=0; x<array.length; x++){
				if (array[x] == firstWord){
					array = array.slice(x);
					break
				}
			}
			for (let y =array.length; y>=0; y--){
				if (array[y] == secondWord){
					array =	array.slice(0, y+1);
					break

				}
			}
			// console.log(array);
			// $("#output").append(array.join(" "));
			return array;
		}

		// Delineate the rhymes from the pairs, return array of words between rhymes
		function delineate(array, pairsArray){
			let outputs=[];
			if (pairsArray.length>0){
				for(let x=0; x<pairsArray.length; x++){
				
					outputs.push(separate(array, pairs[x][0], pairs[x][1]));
			
				}
				return outputs;
			}
		}
		// Print the outputs to the view
		function outputConcatenate(outputs){
			if (outputs == undefined){
				$("#output").append("There are no rhymes that I can see in that phrase.");
			}

			else if (outputs.length>0){
				
				for(let x=0; x<outputs.length; x++){
					let partialCount = counter(breakPhrase(outputs[x].join(" ")));
					if (partialCount > 0){
						$("#output").append(partialCount + "\
					 	" + "syllables from" + "\
					 	 " + "<em>" + breakPhrase(outputs[x].join(" "))[0] + "</em>" + " " + "to" + "\
					 	  " + "<em>" + breakPhrase(outputs[x].join(" "))[(breakPhrase(outputs[x].join(" ")).length)-1] + "\
					 	  " + "</em>" + "<br>" +"<br>" );
					}
					else{
						$("#output").append("\
					 	" + "Jibberish between" + "\
					 	 " + "<em>" + breakPhrase(outputs[x].join(" "))[0] + "</em>" + " " + "and" + "\
					 	  " + "<em>" + breakPhrase(outputs[x].join(" "))[(breakPhrase(outputs[x].join(" ")).length)-1] + "\
					 	  " + "</em>" + "<br>" +"<br>" );
					}
				}
			}
		}

		// Run the functions
		let brokenPhrase = breakPhrase(phrase);
		let fullCount = counter(brokenPhrase);
		let pairs = findPairs(brokenPhrase);
		let outputs = delineate(brokenPhrase, pairs);
		outputConcatenate(outputs);
	}
});
