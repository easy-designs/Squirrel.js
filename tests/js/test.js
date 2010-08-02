$(document).ready(function(){

  module('');
  
  var $S = new Squirrel( 'squirrel-test' );
  
  test( 'Squirrel', function(){
    ok( typeof(Squirrel)!='undefined', 'Squirrel object exists' );
    ok( true, 'Squirrel version being tested: ' + $S.version );
    if ( $S.active )
    {
      ok( true, 'Squirrel is active' );
    }
    else
    {
      ok( true, 'Squirrel is not active (caching isn\'t available)' );
    }
  });
  
  if ( $S.active )
  {

    test( 'Squirrel::write( key, value )', function(){
      ok( typeof($S.write)=='function', 'method exists' );
      ok( $S.write( 'doe', 'ray' ), 'Wrote value "ray" for cached key "doe"' );
    });

    test( 'Squirrel::write( sub_cache, key, value )', function(){
      ok( typeof($S.write)=='function', 'method exists' );
      ok( $S.write( 'test', 'me', 'fah' ), 'Wrote value "fah" for cached key "me" in sub-cache "test"' );
    });

    test( 'Squirrel::read( key )', function(){
      ok( typeof($S.read)=='function', 'method exists' );
      ok( $S.read( 'doe' ) == 'ray', 'Value of "ray" was returned when requesting "doe"' );
    });

    test( 'Squirrel::read( sub_cache, key )', function(){
      ok( typeof($S.read)=='function', 'method exists' );
      ok( $S.read( 'test', 'me' ) == 'fah', 'Value of "fah" was returned when requesting "me" from sub-cache "test"' );
    });

    test( 'Squirrel::remove( key )', function(){
      ok( typeof($S.remove)=='function', 'method exists' );
      ok( $S.remove( 'doe' ), 'Called Squirrel::remove on key "doe"' );
      ok( $S.read( 'doe' ) == null, '"doe" key no longer exists in local storage' );
    });

    test( 'Squirrel::remove( sub_cache, key )', function(){
      ok( typeof($S.remove)=='function', 'method exists' );
      ok( $S.remove( 'test', 'me' ), 'Called Squirrel::remove on key "me" in sub-cache "test"' );
      ok( $S.read( 'test', 'me' ) == null, '"me" key no longer exists in the sub-cache "test" in local storage' );
    });

    test( 'Squirrel::clear( sub_cache )', function(){
      ok( typeof($S.clear)=='function', 'method exists' );
      ok( $S.write( 'doe', 'ray' ), 'Wrote value "ray" for cached key "doe"' );
      ok( $S.write( 'me', 'fah' ), 'Wrote value "fah" for cached key "me"' );
      ok( $S.write( 'test', 'so', 'la' ), 'Wrote value "la" for cached key "so" in sub-cache "test"' );
      ok( $S.write( 'test', 'tee', 'doe' ), 'Wrote value "doe" for cached key "tee" in sub-cache "test"' );
      ok( $S.clear( 'test' ), 'Called Squirrel::clear on sub-cache "test"' );
      ok( $S.read( 'test', 'so' ) == null, '"so" key no longer exists in the sub-cache "test" in local storage' );
      ok( $S.read( 'test', 'tee' ) == null, '"tee" key no longer exists in the sub-cache "test" in local storage' );
      ok( $S.read( 'doe' ) == 'ray', 'Value of "ray" was still returned when requesting "doe"' );
      ok( $S.read( 'me' ) == 'fah', 'Value of "fah" was still returned when requesting "doe"' );
    });

    test( 'Squirrel::clear()', function(){
      ok( typeof($S.clear)=='function', 'method exists' );
      ok( $S.write( 'test', 'so', 'la' ), 'Wrote value "la" for cached key "so" in sub-cache "test"' );
      ok( $S.write( 'test', 'tee', 'doe' ), 'Wrote value "doe" for cached key "tee" in sub-cache "test"' );
      ok( $S.clear(), 'Called Squirrel::clear' );
      ok( $S.read( 'test', 'so' ) == null, '"so" key no longer exists in the sub-cache "test" in local storage' );
      ok( $S.read( 'test', 'tee' ) == null, '"tee" key no longer exists in the sub-cache "test" in local storage' );
      ok( $S.read( 'doe' ) == null, '"doe" key no longer exists in local storage' );
      ok( $S.read( 'me' ) == null, '"doe" key no longer exists in local storage' );
    });
    
  }

});
