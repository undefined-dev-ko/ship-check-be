FROM node:20-alpine
COPY ./package*.json ./
COPY ./tsconfig*.* ./
COPY ./src ./
RUN npm install
RUN npm run build


FROM node:20-alpine
WORKDIR /app
COPY --from=0 ./dist ./dist
COPY ./package*.json ./
COPY ./.env* ./
RUN npm install --production


EXPOSE 8080
CMD [ "npm", "run", "start:prod" ]