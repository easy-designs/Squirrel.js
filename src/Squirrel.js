/*------------------------------------------------------------------------------
Function:      Squirrel()
Author:        Aaron Gustafson (aaron at easy-designs dot net)
Creation Date: 2010-07-31
Version:       1.0
Homepage:      http://github.com/easy-designs/Squirrel.js
License:       MIT License (see homepage)
------------------------------------------------------------------------------*/

function Squirrel( id, expire )
{
  var
  __cache_object,
  UNDEFINED,
  WINDOW = window,
  HYPHEN = '-',
  div    = document.createElement('div');
  
  // default expiration == 1 week
  if ( ! expire )
  {
    expire = new Date();
    expire.setMinutes( expire.getMinutes() + 10080 );
    expire = expire.toUTCString();
  }
  
  // HTML5 and/or Mozilla
  if ( WINDOW.localStorage != UNDEFINED )
  {
    __cache_object = WINDOW.localStorage;
    clearCache = function()
    {
      var i = __cache_object.length, key;
      // cherry-pick only our own items in the cache
      while ( --i )
      {
        key = localStorage.key(i);
        if ( key.indexOf( id ) === 0 )
        {
          delete( __cache_object[key] );
        }
      }
    };
    readFromCache = function( cache, key )
    {
      // make sure our cached objects are prefixed
      cache = id + HYPHEN + cache;
      return __cache_object.getItem( cache + HYPHEN + key );
    };
    writeToCache = function( cache, key, value )
    {
      // make sure our cached objects are prefixed
      cache = id + HYPHEN + cache;
      __cache_object.setItem( cache + HYPHEN + key, value );
    };
  }
  // IE (old school)
  else
  {
    div.style.behavior = 'url(#default#userData)';
    document.body.appendChild( div );
    if ( div.XMLDocument != UNDEFINED )
    {
      __cache_object = div;
      __cache_object.load( id );
      __cache_object.expires = expire;
      clearCache = function()
      {
        var
        attr = __cache_object.XMLDocument.firstChild.attributes,
        i    = attr.length;
        while ( i-- )
        {
          __cache_object.removeAttribute( attr[i].nodeName );
        }
        __cache_object.save( id );
      };
      readFromCache = function( cache, key )
      {
        return __cache_object.getAttribute( cache + HYPHEN + key );
      };
      writeToCache = function( cache, key, value )
      {
        __cache_object.setAttribute( cache + HYPHEN + key, value );
        __cache_object.save( id );
      };
    }
  }
  
  this.version = '1.0';
  this.clear   = clearCache;
  this.read    = readFromCache;
  this.write   = writeToCache;
  
}