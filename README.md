# README

## URL-Shortener

URL-shortener service to shorten URLs

Built on top of [NestJS](https://nestjs.com/), a progressive [Node.js](https://nodejs.org) framework for building efficient and scalable server-side applications.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Environment variables

In order to run the project, first the environment variables should be configured by coping content of file `.env-template` to a new `.env` and edit it

## Swagger

Swagger can be enabled in the `.env` file by setting `APP_API_IS_SWAGGER_ENABLED=true`

After enabled and running development environment you can visit:
[http://localhost:3000/api/swagger/](http://localhost:3000/api/swagger/)
