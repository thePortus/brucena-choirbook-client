#copy node-alpine
FROM node:18-alpine AS node

WORKDIR /src

# copy project code
COPY . /src

# install angular-cli
RUN npm install -g @angular/cli@16.1.4

# install dependencies
RUN npm install

# build app
RUN ng build --configuration production

# copy nginx
FROM nginx:alpine
# COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node ./src/dist/choirbook /usr/share/nginx/html

# expose the port
EXPOSE ${WEB_PORT}