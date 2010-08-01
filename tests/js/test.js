$(document).ready(function(){

  module('');
  
  var $S = new Squirrel( 'squirrel-test' );
  
  test( 'Squirrel', function(){
    ok( typeof(Squirrel)!='undefined', 'Squirrel object exists' );
    ok( true, 'Squirrel version being tested: ' + $S.version );
  });
  
  test( 'Squirrel::write( key, value )', function(){
    ok( typeof($S.write)=='function', 'method exists' );
    ok( $S.write( 'do', 're' ), 'Wrote value "re" for cached key "do"' );
  });
  
  test( 'Squirrel::write( sub_cache, key, value )', function(){
    ok( typeof($S.write)=='function', 'method exists' );
    ok( $S.write( 'test', 'me', 'fa' ), 'Wrote value "fa" for cached key "me" in sub-cache "test"' );
  });
  
  test( 'Squirrel::read( key )', function(){
    ok( typeof($S.read)=='function', 'method exists' );
    ok( $S.read( 'do' ) == 're', 'Value of "re" was returned when requesting "do"' );
  });
  
  test( 'Squirrel::read( sub_cache, key )', function(){
    ok( typeof($S.read)=='function', 'method exists' );
    ok( $S.read( 'test', 'me' ) == 'fa', 'Value of "fa" was returned when requesting "me" from sub-cache "test"' );
  });
  
  test( 'Squirrel::clear( sub_cache )', function(){
    ok( typeof($S.clear)=='function', 'method exists' );
    $S.clear( 'test' );
    ok( $S.read( 'test', 'me' ) == null, '"me" key no longer exists in the sub-cache "test" in local storage' );
    ok( $S.read( 'do' ) == 're', 'Value of "re" was still returned when requesting "do"' );
  });
  
  test( 'Squirrel::clear()', function(){
    ok( typeof($S.clear)=='function', 'method exists' );
    $S.clear();
    ok( $S.read( 'test', 'me' ) == null, '"me" key no longer exists in the sub-cache "test" in local storage' );
    ok( $S.read( 'do' ) == null, '"do" key no longer exists in local storage' );
  });

});
