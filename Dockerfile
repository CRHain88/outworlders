FROM ubuntu:latest
MAINTAINER Christian Hain <christian@crhain.com>

RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 4F4EA0AAE5267A6C

# Install PHP 5.6 to work with latest Magento.
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

# Install PHP5.6
RUN apt-get update \
    && apt-get -y install software-properties-common python-software-properties \
    && apt-get update

RUN apt-get clean \
    && apt-get update \
    && apt-get install -y locales \
    && locale-gen en_US.UTF-8 \
    && LC_ALL=C.UTF-8 add-apt-repository ppa:ondrej/php \
    && apt-get update \
    && apt-get -y install php5.6 \
    && apt-get -y install php5.6-curl php5.6-gd php5.6-intl php5.6-mbstring php5.6-mcrypt php5.6-mysql php5.6-soap php5.6-xml php5.6-xsl php5.6-zip \
    && apt-get -y install php5.6-readline php5.6-cli vim git-all \
    && apt-get update

# Install composer
# Run php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
#     && php -r "if (hash_file('SHA384', 'composer-setup.php') === '669656bab3166a7aff8a7506b8cb2d1c292f042046c5a994c43155c0be6190fa0355160742ab2e1c88d40d5be660b410') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
#     && php composer-setup.php \
#     && php -r "unlink('composer-setup.php');"


# RUN apt-get update \
#     && apt-get -y install php7-json php7-iconv

# add missing always_populate_raw_post_data = -1 to php.ini
# Not needed when moving to PHP 7.
# http://devdocs.magento.com/guides/v2.0/install-gde/trouble/php/tshoot_php-set.html#trouble-php-always
RUN echo "always_populate_raw_post_data=-1" > /etc/php/5.6/cli/conf.d/20-always_populate_raw_post_data.ini
RUN echo "always_populate_raw_post_data=-1" > /etc/php/5.6/apache2/conf.d/20-always_populate_raw_post_data.ini

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
