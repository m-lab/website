FROM ubuntu:focal

RUN apt update
ENV DEBIAN_FRONTEND noninteractive
RUN apt install -y git ruby-dev gcc g++ make libgmp-dev build-essential \
    patch ruby-dev zlib1g-dev liblzma-dev openssl libssl-dev jupyter \
    jupyter-nbconvert curl locales

# Install deb sources for the 10.x series of nodejs.
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
# Install nodejs 10.x and npm.
RUN apt-get install -y nodejs

WORKDIR /home/website
COPY Gemfile .
RUN gem install bundler
RUN bundle update
RUN bundle install
RUN gem cleanup

# Set the default locale for UTF-8 to allow jekyll and htmlproofer to
# successfully process files with non-ascii characters.
RUN locale-gen en_US.UTF-8
ENV LC_ALL=en_US.UTF-8

# Include all dependencies needed by travis.
RUN npm install -g firebase-tools
#RUN ./_tests/travis-checks --quick
