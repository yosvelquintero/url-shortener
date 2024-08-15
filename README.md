# README

## URL-Shortener

A URL-shortener service that makes long, unwieldy URLs more manageable and shareable.

### Key Features

* Quickly generate short, unique links for any URL.
* Track click statistics for shortened links.
* Customizable short links (optional, depending on implementation).
* Easy integration into your projects.

### Tech Stack

* Built with [NestJS](https://nestjs.com/), a powerful Node.js framework for building efficient and scalable server-side applications.
* Leverages Node.js for fast and reliable performance.
* Utilizes MongoDB as the database for storing and managing URL data.

## Installation

```bash
# install
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
