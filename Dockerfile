FROM ubuntu:focal

RUN apt update
ENV DEBIAN_FRONTEND noninteractive
RUN apt install -y git ruby-dev gcc g++ make libgmp-dev build-essential \
    patch ruby-dev zlib1g-dev liblzma-dev openssl libssl-dev jupyter \
    jupyter-nbconvert curl locales

WORKDIR /home/website
COPY Gemfile .
COPY Gemfile.lock .
RUN gem install bundler
RUN bundle install
RUN gem cleanup

# Set the default locale for UTF-8 to allow jekyll and htmlproofer to
# successfully process files with non-ascii characters.
RUN locale-gen en_US.UTF-8
ENV LC_ALL=en_US.UTF-8