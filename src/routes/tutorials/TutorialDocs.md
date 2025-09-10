The folder names are structures for the routes which will be
shown on the page later. You can read about them here in the
docs https://svelte.dev/docs/kit/routing.

Every `+page.svelte` file allows you to create a page for the
specific path. You can install:
[Virtual Kit](https://plugins.jetbrains.com/plugin/22363-virtualkit)
which automatically renamed the +page files to it's
corresponding folder name to increase readability in
WebStorm.

Every implementation for a tutorial can be written from 
scratch. But each tutorial needs to implement specified 
snippets. In the case of the "Introduction" tutorial we 
forward the snippets to the rendered child elements, so 
that the +layout.svelte file only renders the title.

