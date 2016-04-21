let pronouncing = require('pronouncing/build/pronouncing-browser');

Template.rhymeTime.events({
	'submit .rhyme-form': function(event) {
    event.preventDefault();
		$("#output").empty();
		let rhymes = pronouncing.rhymes($("#word").val());
		$.each(rhymes, function(i, item) {
			$("#output").append("<li>" + item + "</li>");
		});
	}
});
