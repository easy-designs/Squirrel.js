Squirrel.js
===========

A cache manager evening out the W3C's `localStorage` and IE's `userData`
that plays nicely in the sandbox.


What's new in this release?
---------------------------

See the CHANGELOG file for information on what's new.

Requirements
------------

A browser that supports caching via userData or localStorage.

Note: if the browser doesn't support these features, Squirrel will not 
be active, but it won't throw an error.


Installation/Usage
------------------

Put Squirrel.js in a directory on your website, e.g. `/js`.

Then create a new `Squirrel`, passing it an id for your cache (which should 
be unique for your application):

	var $S = new Squirrel( 'scale-song' );

In IE, you can optionally supply a second argument for the number of 
seconds you want the cache to live:

	var $S = new Squirrel( 'scale-song', 10080 ); // store one week

You can use Squirrel to store and retrieve info from the cache:

	$S.write( 'doe', 'ray' );
	$S.read( 'doe' ); // 'ray'

You can even create sub-caches by supplying an optional string to beginning 
of these methods:

	$S.write( 'song', 'doe', 'a dear, a female dear' );
	$S.read( 'doe' ); // 'ray'
	$S.read( 'song', 'doe' ); // 'a dear, a female dear'

With Squirrel, you can also clean up the cache using one of two methods: 
`remove()` (for individual keys) or `clear()` (for the cache or sub-caches):

	// removing a single property from a sub-cache
	$S.remove( 'song', 'doe' );
	$S.read( 'song', 'doe' ); // null
	$S.read( 'doe' ); // 'ray'

	// clearing a sub-cache
	$S.write( 'song', 'doe', 'a dear, a female dear' );
	$S.write( 'song', 'ray', 'a drop of golden sun' );
	$S.clear( 'song' );
	$S.read( 'song', 'doe' ); // null
	$S.read( 'song', 'ray' ); // null
	$S.read( 'doe' ); // 'ray'

	// removing a property form the main cache
	$S.remove( 'doe' );
	$S.read( 'doe' ); // null

	// clearing the whole cache
	$S.write( 'doe', 'ray' );
	$S.write( 'song', 'doe', 'a dear, a female dear' );
	$S.write( 'song', 'ray', 'a drop of golden sun' );
	$S.clear();
	$S.read( 'song', 'doe' ); // null
	$S.read( 'song', 'ray' ); // null
	$S.read( 'doe' ); // null


The distribution
----------------

Besides the Squirrel.js files in `/src`, there's a complete
test tree included (`/tests`) which holds assorted tests for Squirrel.js
and a minified version in `/min`.

License
-------

Squirrel.js is licensed under the terms of the MIT License, see 
the included MIT-LICENSE file.