FROM node:15

WORKDIR /app
COPY . .
RUN npm i 
ARG NODE_ENV
ARG DB_NAME
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_HOST
ARG DB_PORT
ENV NODE_ENV $NODE_ENV
ENV DB_HOST $DB_HOST
ENV DB_NAME $DB_NAME
ENV DB_USERNAME $DB_USERNAME
ENV DB_PASSWORD $DB_PASSWORD
ENV DB_PORT $DB_PORT
CMD ["npm", "run", "start:dev"]