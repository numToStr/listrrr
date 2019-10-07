<h1 align="center">listrrr</h1>

<p align="center">
    <img src="https://github.com/vkasraj/listrrr/workflows/build-n-deploy/badge.svg" />
</p>

### Introduction

[Listrrr](https://listrrr.herokuapp.com) is a issue and project tracker app built with Node.js, MongoDB and React bootstrapped with docker. It is just a fun project grown from a simple to-do app.

This project consist of React App and the Node Server in the `client` and `server` folders respectively. You can ignore the `nginx-proxy` folder.

---

### Requirements

-   Node.js
-   MongoDB
-   Docker (optional)
-   docker-compose (optional)

---

### Installation

For installing client side dependencies

```bash
npm i --prefix client
```

For installing server dependencies

```bash
npm i --prefix server
```

#### Envionment File

Rename the `.env.sample` to `.env`.

_**Note**_:

-   You need to create [Github Access Token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line).
-   If you are using docker/docker-compose, make sure you are using correct MongoDB URI.

```bash
MONGODB_URI=mongodb://database:27017/listrrr
```

---

### Running

**1. For Docker and docker-compose users**

You are rocking Docker in your maching then you can quickly start up the `client`, `server` and `database` in one shot by running the following command

```bash
docker-compose up
```

**2. For other users**

Without the docker-compose you have to start the `client`, `server` and `database` separately.

For running client/React App

```bash
npm start --prefix client
```

For running the server/Node.js

```bash
npm run dev --prefix server
```

You can ready about the MongoDB [here](https://docs.mongodb.com/manual/administration/install-community/)

### Contributing

If you're interested in contributing, or want to explore the source code of this app yourself. Please feel free to create a [issue](https://guides.github.com/features/issues/) and have some idea for the app you can also create a [pull request](https://help.github.com/en/articles/about-pull-requests).
