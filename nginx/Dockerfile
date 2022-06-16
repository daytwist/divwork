FROM nginx:1.22.0-alpine
RUN rm -f /etc/nginx/conf.d/*

COPY ./*.conf /etc/nginx/conf.d/
CMD /usr/sbin/nginx -g "daemon off;" -c /etc/nginx/nginx.conf
