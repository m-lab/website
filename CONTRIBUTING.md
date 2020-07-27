# Contributing to `m-lab.github.io`

This document outlines setup, standards, and practices for contributing to
the M-Lab website.

## Setting up Local Development Environment

* Clone this repository, and update its submodules:

  ```sh
  git clone git@github.com:m-lab/m-lab.github.io.git
  git submodule init
  git submodule update
  ```

* Setup the M-Lab pre-commit hook

  ```sh
  rm -rf .git/hooks/
  cd .git/
  ln -s -f ../_hooks hooks
  ```

* Build `local-website` Docker development image

  ```sh
  docker build -t local-website .
  ```

### Run Local Website

Run the jekyll server using the `local-website` docker image.

NOTE: the `--host` flag is needed within the docker environment. An empty
`--baseurl` is needed to test locally.

```sh
docker run --rm \
    --publish 4000:4000 \
    --volume $PWD:/home/website \
    --interactive --tty local-website \
      bundle exec jekyll serve --host 0.0.0.0 --baseurl ""
```

View the generated site by visiting:

* [http://localhost:4000/](http://localhost:4000/)

### Install Build Dependencies Locally

We provide the `local-website` docker image to normalize and simplify
development dependencies. You may also install these dependencies in your
local environment. However, we will only officially support the docker
environment.

We do not specify how to install local dependencies, since you may choose to
use virtual environments, install a package using `pip` with your system's
package manager, etc. We leave this to developer preference, but if you would
like to submit an install guide specific to your OS and environment, please
send us a pull request.

* Install website build dependencies for your operating system and environment

  * [Jekyll](https://jekyllrb.com/docs/installation/)
  * [Jupyter](https://jupyter.org/install)
  * [Bundler](https://bundler.io/)
  * [markdownlint](https://github.com/markdownlint/markdownlint)
  * [Node.js](https://nodejs.org/en/download/)

## Code Standards and Practice

This section highlights the coding standards to be used for this project to
ensure consistency across the codebase for current and future development

* **File Names**

  * Use all lowercase characters in filenames
  * Concatenate multiple words in a filename with a hypen

* **YML Variable Names and Keys**

  * Use all lowercase characters for all `yml` frontmatter variables and keys
  * Concatenate multiple words in a `yml` frontmatter variables and keys with a
    hyphen

* **Liquid Variables**

  * For Liquid variables with more than one words, concatenate with an
    underscore character to differentiate from yml frontmatter variables
  * When using Liquid tags, objects, and filters, use a space at the beginning
    and end of the contents of curly braces (eg: `{{ site.base_url }}` )

## Updating Schema Include Files

Schema descriptions for M-Lab tables and views are updated using a Dockerhub
image created by continuous integration on the `etl` repository.

* Update or make additions to the templated schema descriptions in:
  [https://github.com/m-lab/etl/tree/master/schema/descriptions][schema]
* Commit changes to the schema descriptions, and tag a release using the
  pattern `vX.X.X`. The latest tags can be found in:
    [https://github.com/m-lab/etl/tags](https://github.com/m-lab/etl/tags)
* Once tagged, wait for the new dockerhub image to be available in
  [https://hub.docker.com/repository/docker/measurementlab/generate-schema-docs/tags][tags]
* Use the command below in the root folder of the website repository
  to generated updated schema include files. Don't forget to update the image
  tag to the latest release tag.

  ```sh
  docker run -v $PWD:/ -w /workspace -it \
    measurementlab/generate-schema-docs:v2.4.2 -doc.output _includes
  ```

* Commit your changes, push, and issue a pull request.

[schema]: https://github.com/m-lab/etl/tree/master/schema/descriptions
[tags]: https://hub.docker.com/repository/docker/measurementlab/generate-schema-docs/tags

## How this site packages and ships Jupyter Notebooks

* Notebooks are packaged and shipped using the `jekyll-jupyter-notebook` gem
* The gem uses `juypter`, so this must also be installed
* We're saving `.ipynb` notebook files in `/notebook`
* They are included in website pages using this syntax:

  ```yaml
  {% jupyter_notebook "/notebooks/discard-analysis-2018.ipynb" %}
  ```

* When the site is generated, notebooks in `/notebooks` are converted to
  `.html`, which are added as iframe content by the `jupyter_notebook` include
  command above.

## Travis CI integration

We use Travis CI to automate site builds to enable previewing new site
content or features, to stage site updates approved through pull requests,
and to build and publish approved and staged site updates through periodic
releases.

The file `.travis.tml` is configured to do the following actions:

* When a branch matching the pattern `sandbox-*` is pushed:

  * Travis CI builds the site and publishes it to the GCS bucket
    `gs://website.mlab-sandbox.measurementlab.net` in the project
    `mlab-sandbox`
  * Content can then be previewed at
    [http://website.mlab-sandbox.measurementlab.net/][website-sandbox]

* When a pull request is approved and merged into the `master` branch:

  * Travis CI builds the site and publishes to the GCS bucket
    `gs://website.mlab-staging.measurementlab.net` in the project
    `mlab-staging`
  * Content can then be previewed at
    [https://website.mlab-staging.measurementlab.net/][website-staging]

* When a repository owner tags a release in Github:

  * Travis CI builds the site and publishes it to an Amazon S3 bucket
  * The [production website][website-prod] is then updated with the content
    from this release

[website-sandbox]: http://website.mlab-sandbox.measurementlab.net/
[website-staging]: https://website.mlab-staging.measurementlab.net/
[website-prod]: https://www.measurementlab.net

## Security

Before pushing any commit to the remote repository on Github, developers
should ensure that any secrets required for publication are encrypted. **If**
**you're unsure whether the values in `.travis.yml` related to publication are**
**encrypted, please ask a colleague before proceeding.**

Use the `travis encrypt` command to encrypt a secret access key:

```sh
travis encrypt secret_access_key:<SECRET KEY> -r m-lab/m-lab.github.io
```

Files containing secrets may be encrypted using the `travis encrypt-file`
command:

```sh
travis encrypt-file -r m-lab/m-lab.github.io  _cf_s3_invalidator.yml --add
```

Currently `sandbox` and `staging` commits are deployed to GCS, and tagged
release builds are deployed to AWS.

* More information about [Travis CI deployment to GCS][travis-gcs]
* More information about [Travis CI deployment to AWS][travis-aws]

[travis-gcs]: https://docs.travis-ci.com/user/deployment/gcs/
[travis-gcs]: https://docs.travis-ci.com/user/deployment/aws/

### Encrypting Keys & Secrets for Amazon S3 Deployments

In order to deploy to [Amazon S3][s3], the secret key for the Amazon AWS [IAM
account](https://aws.amazon.com/iam/) to be used must be encrypted in
.travis.yml. The secret key is [encrypted][travis-keys] using the public key
for the repository in Travis CI. If the Amazon credentials change, then the
keys in .travis.yml will need to be updated. The `access_key_id` can be
entered in plain text, but the secret key should be encryped using the
[travis CLI utility][travis-cli] like so:

[s3]: https://docs.travis-ci.com/user/deployment/s3/
[travis-keys]: https://docs.travis-ci.com/user/encryption-keys/
[travis-cli]: https://github.com/travis-ci/travis.rb

```sh
travis encrypt secret_access_key:<SECRET KEY> -r m-lab/m-lab.github.io
```

In addition to deploying the site to S3, Travis also handles invalidating the
Amazon CloudFront cache each time a new version of the site is pushed. This
is handled via the [cf-s3-invalidator gem][cf-s3]. This utility makes use of
the file _cf_s3_invalidator.yml.enc, which is an encrypted file generated
with the [encrypt-file command][travis-encrypt] of the travis CLI utility.
The [README.md][cf-s3-usage] for the cf-s3-invalidator utility has some
information on how to create a &#95;cf&#95;s3&#95;invalidator.yml file. You
can then encrypt the file with a command like:

[cf-s3]: https://rubygems.org/gems/cf-s3-invalidator/
[cf-s3-usage]: https://github.com/laurilehmijoki/cf-s3-invalidator#usage
[travis-encrypt]: https://docs.travis-ci.com/user/encrypting-files/

```sh
travis encrypt-file -r m-lab/m-lab.github.io  _cf_s3_invalidator.yml --add
```

Delete the unencrypted file after running the above command and be sure to
__not__ commit the unencrypted file to the repository.

### Encrypting Keys & Secrets for GCS Deployments

For GCS deployments, generate the encrypted `secure:` key using:

```sh
travis encrypt secret_access_key:<SECRET KEY> -r m-lab/m-lab.github.io
```

```yaml
...
    secret_access_key:
      secure: pdKctNlM2bfEzyFBi9Rr6BYua8hWXsyzUDm5WI4Alr06qLmp1zFNcPymKcihgoE8k2vr85B4BN8HYpUPvPPpzb/KlAZAuUjbKGH0hIklBN4+G+ldt2IBN+2YxYYKYu3bXjKJ5yQOHKCBVU/CR3O6UB+Llp3Ty42OCa71WDfsG2aW6EHGkWV1TljXl3fGVerPfcNeyigIFZ6Qz2Vy0Ay+hzXEZBxjLjUsrWbK5aM6PX7OuErBzKk/kFTlQNkuRQdJs7nS4Y+Pxjyjr6NVd0wjFGqtP+sLjC9hvNaaCHdQ46kA24BqNWwNq1c3++9/0NrEj2MbRrAWNrEcSDskX+XJdV+wantzJ0xQAdqgYUugLj+TSYTKTxrPnwy9WGcWxsfdlrrlnysWVDc1OpQgtXNtU66qwgsjflsOijNeV/XBhR4bOifhRJ80VcQ6KyDWwIAKcJbU8prkMAqr1SqyVbw35gH6ZfHxBcf1CYCEoCGlVn00QPyEQDBkSCFzQC8coSZStGGnxGaebHomxMiOsowM4JIZqjB3RWg+Gf5S6dAZZUQTHoYHAU02Kil+wHmYWEcJ+3eb/FWtNokeZRX3zNCKncBAaZWef+JzMuEtcq67cio/io3z9yglVcWpZz/xGSMOTOVIbHwFIjyzO8cSvp6IWLrlq8MJOge5u0ADgi0rMAE=
...
```

## Publication Process

The website publication process uses a combination of continuous integration
using Travis CI, pull requests, code review and release tagging.

### Previewing and Discussing New Features in Sandbox Branches

New site features and larger content changes are previewed in the mlab-sandbox
project.

* After cloning the code repository, create your own sandbox branch using the
  pattern: `sandbox-<USERNAME>`
* To preview content or features in the sandbox GCS bucket, push a commit to
  your sandbox branch.
* Once Travis CI builds your sandbox branch, the content can then be previewed
  at [http://website.mlab-sandbox.measurementlab.net/][website-sandbox]
  and discussed by relevant team members
* Please check with colleagues and coordinate commits to their sandbox branches
  in order to not stomp on the work of others

### Pull Requests - Staging Content for Publication

When your new content changes or new site features are ready for publication,
submit a Pull Request to the `master` branch and request a code review from a
colleague or repository owner.

### Publishing Reviewed Pull Requests to Production

Content that has been approved via code review in a pull request is
periodically tagged in Github, which triggers Travis CI to build and push the
release update to our production website location.
