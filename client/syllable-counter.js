let pronouncing = require('pronouncing/build/pronouncing-browser');

Template.syllableCounter.events({
	'submit .syllable-counter': function(event) {
    event.preventDefault();
		$("#output").empty();
		let syllables = pronouncing.syllableCount(pronouncing.phonesForWord($("#word").val())[0]);
			$("#output").append(syllables);
			console.log(syllables);
	}
});
