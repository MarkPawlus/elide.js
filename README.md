#elide.js

A small chunk of JavaScript for eliding text to fit into a single line within its containing element.
Useful for maintaining style in applications that display a feed within a fixed size column.

See [this](https://rawgit.com/MarkPawlus/elide.js/master/demo/index.html) page for a basic example.

##Usage
1. Include 'src/elide.js' in your application
2. Append the 'elide' class to any elements you need to track
3. Add a call to elide_init() to your application's onload event

Note: Only elements assigned an id will be tracked.
