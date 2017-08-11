# [Measurement Lab](http://www.measurementlab.net/) Source Code

This is the source code of the Measurement Lab website built using [Jekyll](http://jekyllrb.com) using [GitHub Pages](https://pages.github.com/). The static site files are then pushed to [Amazon S3](https://docs.travis-ci.com/user/deployment/s3/) to publish and host the site.

Current Build Status is: [![Build Status](https://secure.travis-ci.org/m-lab/m-lab.github.io.png?branch=master)](http://travis-ci.org/m-lab/m-lab.github.io)

## Local Development

**Please Note** This repository contains a submodule, so after cloning this repo, you will also need to run `git submodule init` and `git submodule update` to pull down the submodule files as well.

1. Install dependencies `bundle install`
2. Run Jekyll server and pass in a blank baseurl to preview in development mode `jekyll serve --baseurl`.
3. View the generated site by going to [http://localhost:4000/](http://localhost:4000/)

### Pre-commit Hook

Developers should also install the pre-commit hook that comes packaged with this repository that will alert about any trailing whitespaces to minimize git diff noise.  In order to install the pre-commit hook, run the following commands to create a symbolic link:

```shell
rm -rf .git/hooks/
cd .git/
ln -s -f ../_hooks hooks
```

### HTML Compression

This site enables HTML Compression for optimizing performance.  If it is desired to not compress pages while doing development, developers can simply remove the `layout: compress` from the default template in the _layouts folder.

## Site Structure

| Directory | Description |
| ------------- |:------------- |
| _data | Directory contains yml files that contain content that is not within individual pages or posts. |
| _includes | Contains several partials that are common to several generated pages. |
| _layouts | Contains the templates that are used to generate the commonality of the pages (default is the main one that all the pages use. |
| _linter | Contains the markdown style rules used by Jekyll to check content for style consistency. |
| _pages | Contains all non-blog post pages. Pages that have a number prepended to the filename signifies that they are used to dynamically generate the main navigational header.  They will display in the header in the order of the prepended numbers.  These pages also must contain the `menu-item: true` frontmatter in the pages. |
| _pages/categories | Contains category index pages for the categories in the YAML front matter of blog posts. Contributors should add a new category index page for any new categories in a blog post that is not already found in this directory. |
| _pages/dates | Contains monthly index pages for blog posts. Contributors should add a new month index page each time a new post is added for a new month. |
| _posts/blog | Contains all of the individual blog entries. |
| css | Contains the css for the project. |
| fonts | Contains the customized font libraries for the project. |
| js | Contains the js libraries for the project. |
| images | Contains all the image files for the site. |
| publications | Contains all the pdfs and docs that the site links to. |

## 301 Redirects

For page redirects, M-Lab contributors should:

* create the new page in it's new location, using the _permalink_ part of the page's YAML front matter.
  * For example the page `_pages/gsc.md` used to be served at the URL: `https://www.measurementlab.net/data/gcs/`
  * It was "moved" to a new URL by changing the _permalink_ front matter from `permalink: /data/gcs/` to `permalink: /data/docs/gcs/`.
* prepare empty "stub" folder(s) and file(s) to use for the redirect.
  * In the example above, these folders were created: `/data/gcs/`; and two files were created: `/data/gcs/index.html` and `/data/.301`.
  * The file `/data/.301` is added as a developer reference that the content of this folder is present only to use for a 301 redirect.
  * Once the new content has gone through code review and merged, a [301 redirect is added to the file's meta-data in Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-page-redirect.html) .

## Code Standards

This section highlights the coding standards to be used for this project to ensure consistency across the codebase for current and future development.

### Filename conventions

* Should be all lowercase and words are concatenated with a hypen

### Variable naming conventions

* All yml frontmatter keys should be lowercase and words concatenated with a hyphen

### Liquid

* All liquid variables are following an underscore pattern so they can be easier to differentiate from yml frontmatter variables
* All liquid tags, objects, and filters will have spaces in front of and following whatever is contained within braces

### Travis CI integration

Travis is configured (via .travis.yml) to take the following actions after a push:

* Build a static Jekyll site from the source.
* Deploy the built site to Amazon S3.

In order to [deploy to S3](https://docs.travis-ci.com/user/deployment/s3/), the secret key for the Amazon AWS [IAM account](https://aws.amazon.com/iam/) to be used must be encrypted in .travis.yml. The secret key is [encrypted]( https://docs.travis-ci.com/user/encryption-keys/) using the public key for the repository in Travis CI. If the Amazon credentials change, then the keys in .travis.yml will need to be updated. The `access_key_id` can be entered in plain text, but the secret key should be encryped using the [travis CLI utility](https://github.com/travis-ci/travis.rb) like so:

```$ travis encrypt secret_access_key:<SECRET KEY> -r m-lab/m-lab.github.io```

In addition to deploying the site to S3, Travis also handles invalidating the Amazon CloudFront cache each time a new version of the site is pushed. This is handled via the [cf-s3-invalidator gem](https://rubygems.org/gems/cf-s3-invalidator/). This utility makes use of the file _cf_s3_invalidator.yml.enc, which is an encrypted file generated with the [encrypt-file command](https://docs.travis-ci.com/user/encrypting-files/) of the travis CLI utility. The [README.md](https://github.com/laurilehmijoki/cf-s3-invalidator#usage) for the cf-s3-invalidator utility has some information on how to create a &#95;cf&#95;s3&#95;invalidator.yml file. You can then encrypt the file with a command like:

```$ travis encrypt-file -r m-lab/m-lab.github.io  _cf_s3_invalidator.yml --add```

Delete the unencrypted file after running the above command and be sure to __not__ commit the unencrypted file to the repository.