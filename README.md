# [Measurement Lab](http://www.measurementlab.net/) Source Code

This is the source code of the Measurement Lab website built using [Jekyll](http://jekyllrb.com) using [GitHub Pages](https://pages.github.com/). The static site files are then pushed to [Amazon S3](https://docs.travis-ci.com/user/deployment/s3/) to publish and host the site.

Current Build Status is: [![Build Status](https://secure.travis-ci.org/m-lab/m-lab.github.io.png?branch=master)](http://travis-ci.org/m-lab/m-lab.github.io)

## Local Development

Building, running, and previewing changes to this website locally requires [Jekyll](https://jekyllrb.com/) and associated dependencies. We provide a virtual machine definition using [Vagrant](https://www.vagrantup.com/) to standardize the development environment across platforms. From this point forward, when discussing use of the Vagrant VM we will refer to the **host** as your development computer and to the **guest** as the Vagrant VM. You can also install Jekyll, etc. directly on your machine if preferred.

### Common Setup Steps

Whether you're using the Vagrant VM or your local machines, there are a number of steps that are similar:

* [Install and configure Git for your operating system](https://git-scm.com/downloads) and create an account on [Github](https://github.com/). Your account must also be authorized to push code to M-Lab repositories.
* [Create a fork of m-lab.github.io on your Github account](https://github.com/m-lab/m-lab.github.io#fork-destination-box)
* Clone your fork to your local machine:
`git clone --recursive git@github.com:<your Github username>/m-lab.github.io.git`
* Enter the cloned fork directory, add the upstream remote, and setup the M-Lab pre-commit hooks:

```shell
cd m-lab.github.io
git remote add upstream git@github.com:m-lab/m-lab.github.io.git
rm -rf .git/hooks/
cd .git/
ln -s -f ../_hooks hooks
cd ../
```

If you're not using the Vagrant VM, you can proceed with development locally. To build the site and preview locally:

1. Install dependencies `bundle install`
2. Run Jekyll server to preview in development mode `bundle exec jekyll serve --baseurl=`.
3. View the generated site by going to [http://localhost:4000/](http://localhost:4000/)

To use the Vagrant VM, continue reading the next section.

### VM Configuration Notes and Development Practice

When using the Vagrant VM to build, preview, and test changes to the site, a developer will have a few windows open:

* _Text editor_, to make edits to files
* _Terminal #1_, open at the root of the website files on the **host**; used to issue `git` commands, and to push files to the **guest**
* _Terminal #2_, logged into the **guest**; used to build/rebuild the site, and to serve it for local preview
* _Web browser_, to preview the site locally, being served by Jekyll

The **guest** is configured with a private static IP address, `192.168.99.2`. This is the address we'll use to preview the website once Jekyll is serving it. If your network uses this address range, it would be advisable to change this IP in `Vagrantfile`.

#### Setup the Vagrant-based VM:

* [Install Vagrant for your operating system](https://www.vagrantup.com/downloads.html)
* [Install Virtualbox for your operating system](https://www.virtualbox.org/wiki/Downloads)
* Open _Terminal #1_ and install the Vagrant SCP plugin: `vagrant plugin install vagrant-scp`
* Change into the cloned fork, and create the VM: `vagrant up`

#### Build, serve, and watch the website from the **guest**:

* Open _Terminal #2_ and navigate to the website directory. Then log into the VM using the command `vagrant ssh` and change into the `mlab-website` folder: `cd mlab-website`.
* Build and serve the website: `bundle exec jekyll serve --incremental --host 0.0.0.0 --baseurl=`
* The site will now be accessible from your **host** at: [http://192.168.99.2:4000](http://192.168.99.2:4000). Press Ctrl-C within the **guest** to stop Jekyll from serving.

#### Making and Previewing Changes

You can make updates to the site code in your favorite _text editor_ on the **host**. Normally, saving a file within the website directory will trigger Jekyll to rebuild pages affected by that edit. However, due to a [bug with Vagrant's "synced folders" in virtualbox](https://www.vagrantup.com/docs/synced-folders/virtualbox.html) the Jekyll server in the **guest** does not automatically rebuild files that have been modified in the **host**.

To update the site being served in your **guest** with the changes you made on the **host**, use `vagrant scp` from the root of your website folder to push changes to the appropriate location.

For example, if a change was made to `_pages/contact.md`, us this command to push the file to the **guest** filesystem: `vagrant scp _pages/contact.md :mlab-website/_pages/`

The above assumes one Vagrant VM installed on your system. If you have more than one VM installed, use this format:
`vagrant scp _pages/contact.md [vm name]:mlab-website/_pages/`.

#### All things git

Perform all `git` commands such as committing changes, changing branches, etc. in _Terminal #1_ on your **host**.

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

## HTML Compression

This site enables HTML Compression for optimizing performance.  If it is desired to not compress pages while doing development, developers can simply remove the `layout: compress` from the default template in the _layouts_ folder.

## Page Redirects

For page redirects, M-Lab contributors should:

* Create the new page in it's new location, using the _permalink_ part of the page's YAML front matter.
  * For example the page `_pages/gsc.md` used to be served at the URL: `https://www.measurementlab.net/data/gcs/`
  * It was "moved" to a new URL by changing the _permalink_ front matter from `permalink: /data/gcs/` to `permalink: /data/docs/gcs/`.
* Create a page for the redirect using the `redirect` template, and save in the `_pages/` folder.
  * Use the file naming convention `301-original-page-path.md`
  * Numerous examples exist in the `_pages` folder

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