FROM ubuntu:latest
MAINTAINER Christian Hain <christian@crhain.com>

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get clean \
    && apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y gnupg2

RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 4F4EA0AAE5267A6C

# Need to set the local to work with Ondrej's name, presumably.
RUN apt-get clean \
    && apt-get update \
    && apt-get install -y locales \
    && locale-gen en_US.UTF-8 \
    && export LANG=en_US.UTF-8 \
    && export LC_ALL=en_US.UTF-8

# Install Apache
RUN apt-get update \
    && apt-get install -y apache2

RUN apt-get clean \
    && apt-get update \
    && apt-get install -y locales \
    && apt-get install -y software-properties-common \
    && locale-gen en_US.UTF-8 \
    && LC_ALL=C.UTF-8 add-apt-repository ppa:ondrej/php \
    && apt-get update \
    && apt-get install -y php7.2 \
    && apt-get install -y php7.2-curl php7.2-gd php7.2-intl php7.2-mbstring php7.2-mysql php7.2-soap php7.2-xml php7.2-xsl php7.2-zip \
    && apt-get install -y php7.2-readline php7.2-cli vim git-all \
    && apt-get update

# Install composer
# Note, if the installation fails due to "Installer Corrupt" error, you may need
# to update the public key. https://composer.github.io/pubkeys.html
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php -r "if (hash_file('SHA384', 'composer-setup.php') === '48e3236262b34d30969dca3c37281b3b4bbe3221bda826ac6a9a62d6444cdb0dcd0615698a5cbe587c3f0fe57a54d8f5') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
    && php composer-setup.php \
    && php -r "unlink('composer-setup.php');"

RUN a2enmod rewrite

#apt-cleanup
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*





VOLUME $(pwd)/dist/craft:/var/www/craft
VOLUME $(pwd)/dist/public:/var/www/html
VOLUME $(pwd)/dist/uploads:/var/www/uploads

COPY src/apache-config.local.conf /etc/apache2/sites-enabled/000-default.conf

EXPOSE 80
CMD ["apache2ctl", "-D", "FOREGROUND"]
