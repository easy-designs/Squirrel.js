/*------------------------------------------------------------------------------
Function:      Squirrel()
Author:        Aaron Gustafson (aaron at easy-designs dot net)
Creation Date: 2010-07-31
Version:       1.0
Homepage:      http://github.com/easy-designs/Squirrel.js
License:       MIT License (see homepage)
------------------------------------------------------------------------------*/

/**
 * Squirrel()
 * a simple cache manager
 *
 * @param str id - a unique id for your cache
 * @param int seconds - how many seconds you want the cache to live (optional, IE only)
 * @return obj - a Squirrel instance
 *
 */
function Squirrel( id, seconds )
{
  
  var
  __cache_object,
  UNDEFINED,
  WINDOW  = window,
  HYPHEN  = '-',
  SUB     = 'squirrelsubcache-',
  DIV     = document.createElement('div'),
  FUNC    = function(){},
  
  // internal functions
  readFromCache   = FUNC,
  writeToCache    = FUNC,
  removeFromCache = FUNC,

  // IE requires an expiration period
  expire  = new Date();
  seconds = seconds || 10080; // default expiration == 1 week
  expire.setMinutes( expire.getMinutes() + seconds );
  expire  = expire.toUTCString();
  
  // public stuff
  this.version = '1.0';
  this.active  = false;
  this.clear = this.read = this.write = this.remove = FUNC;
    
  function argTest( required, provided, message )
  {
    if ( provided < required )
    {
      throw new Error( message );
    }
  }
  
  // HTML5 and/or Mozilla
  if ( WINDOW.localStorage != UNDEFINED )
  {
    __cache_object = WINDOW.localStorage;
    readFromCache = function( key )
    {
      key = id + HYPHEN + key;
      return __cache_object.getItem( key );
    };
    writeToCache = function( key, value )
    {
      key = id + HYPHEN + key;
      __cache_object.setItem( key, value );
      return true;
    };
    removeFromCache = function( cache )
    {
      var
      key,
      i     = __cache_object.length,
      cache = cache ? id + HYPHEN + cache : id;
      while ( i-- )
      {
        key = __cache_object.key(i);
        if ( key.indexOf( cache ) === 0 )
        {
          delete( __cache_object[key] );
        }
      }
      return true;
    };
    this.active = true;
  }
  // IE (old school)
  else
  {
    DIV.style.behavior = 'url(#default#userData)';
    document.body.appendChild( DIV );
    if ( DIV.XMLDocument != UNDEFINED )
    {
      __cache_object = DIV;
      __cache_object.load( id );
      __cache_object.expires = expire;
      readFromCache = function( key )
      {
        return __cache_object.getAttribute( key );
      };
      writeToCache = function( key, value )
      {
        __cache_object.setAttribute( key, value );
        __cache_object.save( id );
        return true;
      };
      removeFromCache = function( cache )
      {
        var 
        key,
        cache = cache || false,
        attr  = __cache_object.XMLDocument.firstChild.attributes,
        i     = attr.length;
        while ( i-- )
        {
          key = attr[i].nodeName;
          if ( ! cache ||
               key.indexOf( cache ) === 0 )
          {
            __cache_object.removeAttribute( key );
          }
        }
        __cache_object.save( id );
        return true;
      };
      this.active = true;
    }
  }
  
  if ( this.active )
  {
    
    /**
     * Squirrel.clear()
     * Clears the cache
     *
     * Option 1: Clear the entire cache
     *   Squirrel.clear()
     *   @return bool - TRUE for success, FALSE for failure
     *
     * Option 2: Clear a sub-cache
     *   Squirrel.clear( sub_cache )
     *   @param str sub_cache - the sub-cache you'd like to clear
     *   @return bool - TRUE for success, FALSE for failure
     *
     */
    this.clear = function()
    {
      var
      sub_cache = false,
      args      = arguments;
      if ( args.length == 1 )
      {
        sub_cache = SUB + args[0];
      }
      return removeFromCache( sub_cache );
    };

    /**
     * Squirrel.read()
     * Reads a key from the cache
     *
     * Option 1: Read a key
     *   Squirrel.read( key )
     *   @param str key - the key to read
     *   @return str - the value of the key in the cache
     *
     * Option 2: Property Test (simple) 
     *   Squirrel.read( sub_cache. key )
     *   @param str sub_cache - the sub-cache you'd like to read the key from
     *   @param str key - the key to read
     *   @return str - the value of the key in the sub-cache
     *
     */
    this.read = function()
    {
      var
      args  = arguments,
      aLen  = args.length,
      key   = args[0];
      argTest( 1, aLen, 'Squirrel.read() requires at least one argument.' );
      if ( args.length == 2 )
      {
        key = SUB + key + HYPHEN + args[1];
      }
      return readFromCache( key );
    };

    /**
     * Squirrel.write()
     * adds data to the cache
     *
     * Option 1: Add a value
     *   Squirrel.write( key, value )
     *   @param str key - the key to add
     *   @param str value - the value to write for key
     *   @return bool - TRUE for success, FALSE for failure
     *
     * Option 1: Add a value to a sub-cache
     *   Squirrel.write( sub_cache, key, value )
     *   @param str sub_cache - the sub-cache you'd like to add the key to
     *   @param str key - the key to add
     *   @param str value - the value to write for key
     *   @return bool - TRUE for success, FALSE for failure
     *
     */
    this.write = function()
    {
      var
      args  = arguments,
      aLen  = args.length,
      key   = args[0],
      value = args[1];
      argTest( 2, aLen, 'Squirrel.write() requires at least two arguments.' );
      if ( args.length == 3 )
      {
        key   = SUB + key + HYPHEN + args[1];
        value = args[2];
      }
      writeToCache( key, value );
      return true;
    };

    /**
     * Squirrel.remove()
     * removes specific data from the cache
     *
     * Option 1: Remove a key
     *   Squirrel.remove( key )
     *   @param str key - the key to remove
     *   @return bool - TRUE for success, FALSE for failure
     *
     * Option 2: Property Test (simple) 
     *   Squirrel.remove( sub_cache, key )
     *   @param str sub_cache - the sub-cache you'd like to remove the key from
     *   @param str key - the key to remove
     *   @return bool - TRUE for success, FALSE for failure
     *
     */
    this.remove  = function()
    {
      var
      args = arguments,
      aLen = args.length,
      key  = args[0];
      argTest( 1, aLen, 'Squirrel.remove() requires at least one argument.' );
      if ( aLen == 2 )
      {
        key = SUB + key + HYPHEN + args[1];
      }
      return removeFromCache( key );
    };

  }
  
}