# Schdler Backend

### <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /> <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /> <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"/>

- [Description](#description)
- [Entities](#entities)
- [Installation](#installation)
- [Documentation](#documentation)

## Description
This repository provides a simple API for educational class scheduling. It was created for storing schedule projects of a time shock application. All business rules related to checking shocks in the schedule is placed in the front-end application.

## Entities
- `User`
- `Project`
- `Professor`
- `Location`
- `Module`: This reflect the classes/cources of a syllabus 
- `Block`: The union of Professor, Module, Location
- `Board`: This models a semester schedule of classes (blocks). Each block is fieled with a set of `Slot's`
- `Slot`: This is just a `Block` + index

## Instalation
In order to run the app one need to set the following environment variables:
- `NODE_ENV`
- `PORT`
- `DAYS`: Week size (default: 5)
- `SALT`: Numeric value for encrypting
- `TOKEN_SECRET`: Token key
- `TOKEN_LIFE`: Expiration time for token (e.g. `8h`)
- `REFRESH_SECRET`: Refresh Token Key

## Documentation
> -- _Ain't nobody have time for that_.

## Auxiliary links
- [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)