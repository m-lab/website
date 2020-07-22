# Contributing to `m-lab.github.io`
 
This document outlines setup, standards, and practices for contributing to the M-Lab website.

## Setting up Local Development Environment

* Clone this repository, and update its submodule
  * `git clone git@github.com:m-lab/m-lab.github.io.git`
  * `git submodule init`
  * `git submodule update`

* Setup the M-Lab pre-commit hook
```shell
rm -rf .git/hooks/
cd .git/
ln -s -f ../_hooks hooks
```

### Install Build Dependencies

To build and preview the website locally, install the following for your system and operating environment. Note that we do not specify how you must install dependencies, since you may choose to use virtual environments, install a package using `pip` with your system's package manager, etc. We leave this to developer preference, but if you would like to submit an install guide specific to your OS and environment, please send us a pull request.

* Install website build dependencies for your operating system and environment
  * [Jekyll](https://jekyllrb.com/docs/installation/)
  * [Jupyter](https://jupyter.org/install)
  * [Bundler](https://bundler.io/)
  * [markdownlint](https://github.com/markdownlint/markdownlint)
  * [Node.js](https://nodejs.org/en/download/)
* From within the cloned website repository, install additional dependencies using `bundler`:
  * `bundle install`
* Test a working installation by running the Jekyll server, passing in a blank `--baseurl` parameter:
  * `bundle exec jekyll serve --baseurl ""`
  * View the generated site by going to [http://localhost:4000/](http://localhost:4000/)

## Code Standards and Practice

This section highlights the coding standards to be used for this project to ensure consistency across the codebase for current and future development

* **File Names** 
  * Use all lowercase characters in filenames
  * Concatenate multiple words in a filename with a hypen

* **YML Variable Names and Keys**
  * Use all lowercase characters for all `yml` frontmatter variables and keys
  * Concatenate multiple words in a `yml` frontmatter variables and keys with a hyphen

* **Liquid Variables**
  * For Liquid variables with more than one words, concatenate with an underscore character to differentiate from `yml` frontmatter variables
  * When using Liquid tags, objects, and filters, use a space at the beginning and end of the contents of curly braces (eg: `{{ site.base_url }}` )

## Travis CI integration

We use Travis CI to automate site builds to enable previewing new site content or features, to stage site updates approved through pull requests, and to build and publish approved and staged site updates through periodic releases.

The file `.travis.tml` is configured to do the following actions:

* When a branch matching the pattern `sandbox-*` is pushed:
  * Travis CI builds the site and publishes it to the GCS bucket `gs://website.mlab-sandbox.measurementlab.net` in the project `mlab-sandbox`
  * Content can then be previewed at [http://website.mlab-sandbox.measurementlab.net/](http://website.mlab-sandbox.measurementlab.net/)

* When a pull request is approved and merged into the `master` branch:
  * Travis CI builds the site and publishes to the GCS bucket `gs://website.mlab-staging.measurementlab.net` in the project `mlab-staging`
  * The staged content can then be previewed at [https://website.mlab-staging.measurementlab.net/](https://website.mlab-staging.measurementlab.net/)

* When a repository owner tags a release in Github:
  * Travis CI builds the site and publishes it to an Amazon S3 bucket
  * The [production website](https://www.measurementlab.net) is then updated with the content from this release

## Security 

Before pushing any commit to the remote repository on Github, developers should ensure that any secrets required for publication are encrypted. **If you're unsure whether the values in `.travis.yml` related to publication are encrypted, please ask a colleague before proceeding.**

Use the `travis encrypt` command to encrypt a secret access key:

```$ travis encrypt secret_access_key:<SECRET KEY> -r m-lab/m-lab.github.io```

Files containing secrets may be encrypted using the `travis encrypt-file` command:

```$ travis encrypt-file -r m-lab/m-lab.github.io  _cf_s3_invalidator.yml --add```

Currently `sandbox` and `staging` commits are deployed to GCS, and tagged release builds are deployed to AWS. 

* More information about [Travis CI deployment to GCS](https://docs.travis-ci.com/user/deployment/gcs/) 
* More information about [Travis CI deployment to AWS](https://docs.travis-ci.com/user/deployment/aws/) 

### Encrypting Keys & Secrets for Amazon S3 Deployments

In order to deploy to [Amazon S3](https://docs.travis-ci.com/user/deployment/s3/), the secret key for the Amazon AWS [IAM account](https://aws.amazon.com/iam/) to be used must be encrypted in .travis.yml. The secret key is [encrypted]( https://docs.travis-ci.com/user/encryption-keys/) using the public key for the repository in Travis CI. If the Amazon credentials change, then the keys in .travis.yml will need to be updated. The `access_key_id` can be entered in plain text, but the secret key should be encryped using the [travis CLI utility](https://github.com/travis-ci/travis.rb) like so:

```$ travis encrypt secret_access_key:<SECRET KEY> -r m-lab/m-lab.github.io```

In addition to deploying the site to S3, Travis also handles invalidating the Amazon CloudFront cache each time a new version of the site is pushed. This is handled via the [cf-s3-invalidator gem](https://rubygems.org/gems/cf-s3-invalidator/). This utility makes use of the file _cf_s3_invalidator.yml.enc, which is an encrypted file generated with the [encrypt-file command](https://docs.travis-ci.com/user/encrypting-files/) of the travis CLI utility. The [README.md](https://github.com/laurilehmijoki/cf-s3-invalidator#usage) for the cf-s3-invalidator utility has some information on how to create a &#95;cf&#95;s3&#95;invalidator.yml file. You can then encrypt the file with a command like:

```$ travis encrypt-file -r m-lab/m-lab.github.io  _cf_s3_invalidator.yml --add```

Delete the unencrypted file after running the above command and be sure to __not__ commit the unencrypted file to the repository.

### Encrypting Keys & Secrets for GCS Deployments

For GCS deployments, use ```$ travis encrypt secret_access_key:<SECRET KEY> -r m-lab/m-lab.github.io``` to generate the encrypted key following `secure:` as shown in the line below:

```
...
    secret_access_key: 
      secure: pdKctNlM2bfEzyFBi9Rr6BYua8hWXsyzUDm5WI4Alr06qLmp1zFNcPymKcihgoE8k2vr85B4BN8HYpUPvPPpzb/KlAZAuUjbKGH0hIklBN4+G+ldt2IBN+2YxYYKYu3bXjKJ5yQOHKCBVU/CR3O6UB+Llp3Ty42OCa71WDfsG2aW6EHGkWV1TljXl3fGVerPfcNeyigIFZ6Qz2Vy0Ay+hzXEZBxjLjUsrWbK5aM6PX7OuErBzKk/kFTlQNkuRQdJs7nS4Y+Pxjyjr6NVd0wjFGqtP+sLjC9hvNaaCHdQ46kA24BqNWwNq1c3++9/0NrEj2MbRrAWNrEcSDskX+XJdV+wantzJ0xQAdqgYUugLj+TSYTKTxrPnwy9WGcWxsfdlrrlnysWVDc1OpQgtXNtU66qwgsjflsOijNeV/XBhR4bOifhRJ80VcQ6KyDWwIAKcJbU8prkMAqr1SqyVbw35gH6ZfHxBcf1CYCEoCGlVn00QPyEQDBkSCFzQC8coSZStGGnxGaebHomxMiOsowM4JIZqjB3RWg+Gf5S6dAZZUQTHoYHAU02Kil+wHmYWEcJ+3eb/FWtNokeZRX3zNCKncBAaZWef+JzMuEtcq67cio/io3z9yglVcWpZz/xGSMOTOVIbHwFIjyzO8cSvp6IWLrlq8MJOge5u0ADgi0rMAE=
...
```

## Publication Process

The website publication process uses a combination of continuous integration using Travis CI, pull requests, code review and release tagging. 

### Previewing and Discussing New Features in Sandbox Branches

New site features and larger content changes are previewed in the mlab-sandbox project.

* After cloning the code repository, create your own sandbox branch using the pattern: `sandbox-<USERNAME>`
* To preview content or features in the sandbox GCS bucket, push a commit to your sandbox branch.
* Once Travis CI builds your sandbox branch, the content can then be previewed at [http://website.mlab-sandbox.measurementlab.net/](http://website.mlab-sandbox.measurementlab.net/) and discussed by relevant team members 
* Please check with colleagues and coordinate commits to their sandbox branches in order to not stomp on the work of others

### Pull Requests - Staging Content for Publication

When your new content changes or new site features are ready for publication, submit a Pull Request to the `master` branch and request a code review from a colleague or repository owner.

### Publishing Reviewed Pull Requests to Production

Content that has been approved via code review in a pull request is periodically tagged in Github, which triggers Travis CI to build and push the release update to our production website location.
