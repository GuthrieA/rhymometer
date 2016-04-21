let pronouncing = require('pronouncing/build/pronouncing-browser');

Template.syllableCounter.events({
	'submit .syllable-counter': function(event) {
    event.preventDefault();
		$("#output").empty();
		let syllables = pronouncing.syllableCount($("#word").val());
		$.each(syllables, function(i, item) {
			$("#output").append("<li>" + item + "</li>");
		});
	}
});
