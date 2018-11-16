# [Measurement Lab](http://www.measurementlab.net/) Source Code

This is the source code of the Measurement Lab website built using [Jekyll](http://jekyllrb.com) and utilizing [GitHub Pages](https://pages.github.com/) to publish and host the site.

Current Build Status is: [![Build Status](https://secure.travis-ci.org/m-lab/m-lab.github.io.png?branch=master)](http://travis-ci.org/m-lab/m-lab.github.io)

### HTML Compression

This site enables HTML Compression for optimizing performance.  If it is desired to not compress pages while doing development, developers can simply remove the `layout: compress` from the default template in the _layouts folder.

## Site Structure

| Directory | Description |
| ------------- |:------------- |
| _data | Directory contains yml files that contain content that is not within individual pages or posts. |
| _includes | Contains several partials that are common to several generated pages. |
| _layouts | Contains the templates that are used to generate the commonality of the pages (default is the main one that all the pages use. |
| _pages | Contains all non-blog post pages. Pages that have a number prepended to the filename signifies that they are used to dynamically generate the main navigational header.  They will display in the header in the order of the prepended numbers.  These pages also must contain the `menu-item: true` frontmatter in the pages. |
| _posts | Contains all of the individual blog entries. |
| css | Contains the css for the project. |
| fonts | Contains the customized font libraries for the project. |
| js | Contains the js libraries for the project. |
| images | Contains all the image files for the site |
| publications | Contains all the pdfs and docs that the site links too |
