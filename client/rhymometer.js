let pronouncing = require('pronouncing/build/pronouncing-browser');

Template.rhymometer.events({
  'submit .rhyme-form': function(event, template) {
  event.preventDefault();

  $("#output").empty();

  let word1 = template.find('#word1').value;
  let word2 = template.find('#word2').value;

  let word1Rhymes = pronouncing.rhymes($("#word1").val());

  function doesRhyme (a, b){
    for (x=0; x<a.length; x++){
      if (a[x] == b){
        return(true);
      }
    }
  }
  if (doesRhyme(word1Rhymes, word2)){
  $("#output").append("Rhymes!");
}
}
});
