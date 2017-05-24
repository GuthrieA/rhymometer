# [The Rhymometer](https://rhymometer.herokuapp.com)

## Overview
The rhymometer is a tool to assist poets and song writers with tempo. It is a web-based application that parses phrases and finds rhyming pairs in them. It then counts the number of syllables in those parsed phrases (including the rhyme pairs). Finally, it outputs that parsed information.

## Specifications
The rhymometer is an application built in [Meteor](https://www.meteor.com/).
It utilizes Allison Parrish's [pronouncing-js](https://github.com/aparrish/pronouncingjs), 
a simple interface for the [CMU Pronouncing Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict).

## Deployment
1.  Install Meteor
2.  Install Node.js
3.  meteor npm install --save pronouncing
4.  cd rhymometer
5.  run meteor
