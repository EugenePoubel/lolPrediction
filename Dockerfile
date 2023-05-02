version: "3.9"

services:
  back-end:
    build:
      context: .
      dockerfile: back-end/Dockerfile
    volumes:
      - ./back-end:/back-end
    environment:
      - APP_ENV=dev
    networks:
      - app-network

  front-end:
    build:
      context: .
      dockerfile: front-end/Dockerfile
    ports:
      - "8011:80"
    volumes:
      - ./front-end:/front-end
    environment:
      - REACT_APP_API_URL=http://back-end/api
    networks:
      - app-network
networks:
  app-network:

