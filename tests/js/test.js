$(document).ready(function(){

  module('');
  
  var $S = new Squirrel( 'squirrel-test' );
  
  test( 'Squirrel', function(){
    ok( typeof(Squirrel)!='undefined', 'Squirrel object exists' );
    ok( true, 'Squirrel version being tested: ' + $S.version );
  });
  
  
  
});
