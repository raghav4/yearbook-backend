# Backend of Yearbook Project

> Backend Application of [Yearbook](https://github.com/raghav4/yearbook) Project
> <br> **API Documentation** -
> <https://documenter.getpostman.com/view/6857431/Szmb7zkd>

## Please ensure you have the following installed

- [node.js]("https://nodejs.org/en/") `v12.14.1`
- [npm]("https://www.npmjs.com/") `v6.14.2`
- [mongodb]("https://www.mongodb.com/")

## Installation Guide

- Clone the repository using
  `git clone https://github.com/raghav4/yearbook-backend.git`
- Change the current working directory `cd yearbook-backend`
- Install all the dependencies by running `npm i`
- Update the environment variables by creating a `.env` file similar to
  [`.env.example`](https://github.com/raghav4/yearbook-backend/blob/master/.env.example)
- Run the server with `pm2` using the command `pm2 start index.js`.
- Visit the server at [http://localhost:5000](http://localhost:5000)
- Stop the server using `pm2 kill`.
