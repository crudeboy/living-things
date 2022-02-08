FROM httpd:2.4.18

RUN \
    apt-get update \
    && apt-get -y install gettext-base libcap2-bin procps \
    && apt-get clean \
    && setcap 'cap_net_bind_service=+ep' /usr/local/apache2/bin/httpd

RUN useradd -m -u 1500 nonroot
COPY ./build/ /home/nonroot/htdocs/
# URL Rewriting
COPY ./deployment/httpd.custom.conf /usr/local/apache2/conf/httpd.conf
RUN chown -R nonroot:nonroot /home/nonroot/htdocs/ \
    && chown -R nonroot:nonroot /usr/local/apache2

# non-root user privilege
USER nonroot

EXPOSE 7070

ENTRYPOINT ["/bin/sh",  "-c",  "apachectl -D FOREGROUND"]