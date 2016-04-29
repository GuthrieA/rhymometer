Router.configure({
  // the default layout
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('rhymeTime');
});

Router.route('/syllable-counter', function () {
  this.render('syllableCounter');
});

Router.route('/rhymometer', function () {
  this.render('rhymometer');
});
