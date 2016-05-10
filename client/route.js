Router.configure({
  // the default layout
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('test');
});

Router.route('/syllable-counter', function () {
  this.render('syllableCounter');
});

Router.route('/rhymometer', function () {
  this.render('rhymometer');
});

Router.route('/locater', function () {
  this.render('locater');
});

Router.route('/test', function () {
  this.render('rhymetime');
});
