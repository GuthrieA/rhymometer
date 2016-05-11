let pronouncing = require('pronouncing/build/pronouncing-browser');

Template.rhymometer.events({
	'submit .locaterCounter': function(event, template) {
		event.preventDefault();
		$("#output").empty();

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
				$("#output").append("There are no rhymes that I can see.");
			}

			else if (outputs.length>0){
				
				for(let x=0; x<outputs.length; x++){
					let partialCount = counter(breakPhrase(outputs[x].join(" ")));
					console.log(outputs);
					console.log(partialCount);
					if (partialCount == 1){
						$("#output").append("<strong>" + partialCount + "\
					 	" + "syllable from</strong>" + "\
					 	 " + "<em>" + breakPhrase(outputs[x].join(" "))[0] + "</em>" + " " + "<b>to</b>" + "\
					 	  " + "<em>" + breakPhrase(outputs[x].join(" "))[(breakPhrase(outputs[x].join(" ")).length)-1] + "</em>" + "<br>" +"<br>" );
					}
					else if (partialCount > 1){
						$("#output").append("<strong>" + partialCount + "\
					 	" + "syllables from</strong>" + "\
					 	 " + "<em>" + breakPhrase(outputs[x].join(" "))[0] + "</em>" + " " + "<b>to</b>" + "\
					 	  " + "<em>" + breakPhrase(outputs[x].join(" "))[(breakPhrase(outputs[x].join(" ")).length)-1] + "</em>" + "<br>" +"<br>" );
					}
					else{
						console.log((breakPhrase(outputs[x].join(" ")).length))
						$("#output").append("<strong>" + "\
					 	" + "There seems to be a jibberish between</strong>" + "\
					 	 " + "<em>" + breakPhrase(outputs[x].join(" "))[0] + "</em>" + " " + "<b>and</b>" + "\
					 	  " + "<em>" + breakPhrase(outputs[x].join(" "))[(breakPhrase(outputs[x].join(" ")).length)-1] + "</em>" + "<br>" +"<br>" );
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
		// $("#output").append(outputs.join(" "));
		
		
		// let rhymeCount = counter(Separate(brokenPhrase, pairs[0][0], pairs[0][1]));
		// console.log(rhymeCount + " " + "between rhymes");




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

		// console.log(brokenPhrase);

		// $("#output").append(highlighter(phrase) + " ");
    // $("#output").append(brokenPhrase.join(" ") + " " + "has" + " " + fullCount + " " + "syllables");
    // $("#output").append(" " + count);




		// let syllables = pronouncing.syllableCount(pronouncing.phonesForWord($('phrase').val())[0]);
		// 	$("#output").append(syllables);
		// 	console.log(syllables);
	}
});