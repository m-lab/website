# This Makefile contains convenience targets for developers to use while
# hacking on the site. It is not actually necessary to use this to build the
# site for deployment.

.DEFAULT: site

.PHONY: prep
prep:
	bundle install

.PHONY: site
site: prep
	bundle exec jekyll build

.PHONY: serve
serve: prep
	bundle exec jekyll serve --baseurl ""

.PHONY: test
test: prep
	_tests/travis-checks

.PHONY: clean
clean:
	rm -rf _site bbin gh-pages site/_site .sass-cache js/app.js
