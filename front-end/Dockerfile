FROM nginx:alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY back-end/public /back-end/public
COPY front-end/ /front-end

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
