# Contributing to `github.com/m-lab/website`

This document outlines setup, standards, and practices for contributing to
the M-Lab website. Content is written in markdown, and Jekyll applies templates
and formatting when generating the final static site. We use Travis-ci to test
site builds and deployments, previewing branches matching the pattern
`sandbox-*` 

## Install required tools on your system

To edit this website you need:

* git, Github account
* whatever you want to edit files with (eg. Sublime, VSCode, etc.)
* Docker

The Dockerfile is used to manage everything needed to build the site with
Jekyll and preview it locally. If you have installed any of the site build
dependencies on your system, you may experience conflicts when running the
Docker builds. Remove locally installed dependencies if this happens to you.

## Get the site with Git

* Clone this repository: `git clone git@github.com:m-lab/website.git`
* Setup the pre-commit hook:

  ```sh
  rm -rf .git/hooks/
  cd .git/
  ln -s -f ../_hooks hooks
  ```

* Build `local-website` Docker development image

  ```sh
  docker build -t local-website .
  ```

## Publication Process

The website publication process uses a combination of continuous integration
using Travis CI, pull requests, code review and release tagging.

The file `.travis.tml` is configured to do the following actions:

* When a branch matching the pattern `sandbox-*` is pushed:

  * Travis CI builds the site and publishes it to the GCS bucket
    `gs://website.mlab-sandbox.measurementlab.net` in the project
    `mlab-sandbox`
  * Content can then be previewed at
    [http://website.mlab-sandbox.measurementlab.net/][website-sandbox]

* When a pull request is approved and merged into the `main` branch:

  * Travis CI builds the site and publishes to the GCS bucket
    `gs://website.mlab-staging.measurementlab.net` in the project
    `mlab-staging`
  * Content can then be previewed at
    [https://website.mlab-staging.measurementlab.net/][website-staging]

* When a repository owner tags a release in Github:

  * Travis CI builds the site and publishes it to a Google Firebase project
  * The [production website][website-prod] is then updated with the content
    from this release

[website-sandbox]: http://website.mlab-sandbox.measurementlab.net/
[website-staging]: https://website.mlab-staging.measurementlab.net/
[website-prod]: https://www.measurementlab.net

## Contribution Process

Internal team members typically edit content for new posts or pages in a Google
Doc, where the content is reviewed and commented on by others. Once ready, the
Doc is converted to Markdown and added to a git branch for final review here.

Team members should always make changes to the site using a git branch (not
`main`). Community contributors should fork this repository, and preview/test changes
locally using provided the Docker container.

When ready, team members may push their branch to preview (if using the
`sandbox-*` branch name pattern) and submit a Pull Request to the `main` branch for code
review. Community contributors should preview their changes locally, and issue a Pull
Request from their fork to our `main` branch.

Once review is completed, a repository owner will tag a release to publish.

## Previewing Site Locally and Offline

The `local-website` Docker image can be run on your machine to preview changes
locally before pushing to Github and submitting pull requests.

Run the jekyll server using the `local-website` docker image using the command below.

```sh
docker run --rm \
    --publish 4000:4000 \
    --volume $PWD:/home/website \
    --interactive --tty local-website \
      bundle exec jekyll serve --host 0.0.0.0 --baseurl ""
```
NOTE: the `--host` flag is needed within the docker environment. An empty
`--baseurl` is needed to test locally.

View the generated site by visiting: [http://localhost:4000/](http://localhost:4000/)

## Notes on Site Structure and Specific Types of Content

### Site Structure

| Directory | Description |
| ------------- |:------------- |
| _data | Directory contains yml files that contain content that is not within individual pages or posts. Currently used on the home page. |
| _hooks | Includes a pre-commit hook that runs tests from `_tests/travis-checks` on each commit. | 
| _includes | Contains html, markdown, and JavaScript files that can be included on various pages. |
| _layouts | Contains the templates that are used to generate pages with different layouts. Templates may include one another, and all pages use the `default.html` template. For example, see `page.html`.|
| _linter | Contains a Ruby file defining rules that the markdown linter should use. |
| _pages | Contains all non-blog post pages. Pages that have a number prepended to the filename signifies that they are used to dynamically generate the main navigational header. They will display in the header in the order of the prepended numbers.  These pages also must contain the `menu-item: true` frontmatter in the pages. |
| _pages/301 | 301 redirects used when content is moved from one URL to a new one. |
| _pages/categories | Contains category pages for each named tag used on blog posts. A category page must be added when new tags are added to the site. |
| _pages/dates | Contains a "month index" page for each month in which blog posts are published. A new month index page must be added whenever a new post in a new month is published. |
| _posts | Contains all of the individual blog entries. |
| _sass | Contains the CSS for bootstrap and overrides. |
| _tests | Contains travis checks run by the pre-commit hook. |
| assets | Bootstrap fonts and JavaScripts |
| blog | Contains the blog index page. |
| css | Contains additional css to be included in the site. |
| fonts | Contains the customized font libraries for the site. |
| images | Contains all images used in the site. |
| js | Contains JavaScript libraries included in the site. |
| notebooks | Contains Jupyter notebooks to be included on pages or posts. |
| publications | Contains all the pdfs and docs that are included or linked in the site. |
| static | Contains additional static content. |
| travis | Submodule for [m-lab/travis](https://github.com/m-lab/travis) to support deployment automation in Travis CI. |
| .firebaserc | Defines the Firebase project and hosting. Used by Travis CI to automate publishing of tagged releases. |
| .gitignore | Defines which files and file patterns should be excluded from Git commits. |
| .gitmodules | Defines the Git submodules used in this repo. |
| .travis.yml | Travis CI build and deployment configurations. |
| CONTRIBUTING.md | Provides onboarding details for new contributors. |
| Dockerfile | Defines the Docker container for building and previewing the site locally. |
| LICENSE | Software license for the code in this repository. |
| README.md | Read me. |
| _config.yml | Defines the site settings Jekyll uses when building the site. |
| favicon.ico | Favicon used for the site. |
| firebase.json | Additional config file for Firebase to exclude some files from the published site. |

### Updating Include Files for BigQuery Table/View Schemas

Schema descriptions for M-Lab tables and views are located in the `m-lab/etl`
repository. They are updated for this site using a Dockerhub
image created by continuous integration on the `m-lab/etl-schema` repository.

* Update or make additions to the templated schema descriptions in:
  [https://github.com/m-lab/etl/tree/master/schema/descriptions][schema]
* Commit changes to the schema descriptions, and tag a release using the
  pattern `vX.X.X`. The latest tags can be found in:
    [https://github.com/m-lab/etl/tags](https://github.com/m-lab/etl/tags)
* Once tagged, wait for the new dockerhub image to be available in
  [https://hub.docker.com/repository/docker/measurementlab/generate-schema-docs/](https://hub.docker.com/repository/docker/measurementlab/generate-schema-docs/)
* Use the command below in the root folder of the website repository
  to generated updated schema include files. Don't forget to update the image
  tag to the latest release tag.

```sh
docker run -v $PWD:/_includes -it measurementlab/generate-schema-docs:latest -doc.output /_includes
```

[schema]: https://github.com/m-lab/etl/tree/master/schema/descriptions
[tags]: https://hub.docker.com/repository/docker/measurementlab/generate-schema-docs/tags

## Including Jupyter Notebooks in Pages or Posts

* Notebooks are included using the `jekyll-jupyter-notebook` gem
* Save `.ipynb` notebook files in `/notebook`
* And include them in website pages using this syntax:

  ```yaml
  {% jupyter_notebook "/notebooks/discard-analysis-2018.ipynb" %}
  ```

* When the site is generated, notebooks in `/notebooks` are converted to
  `.html`, which are added as iframe content by the `jupyter_notebook` include
  command above.
