# Marvel

React & NodeJs example site

### Backend

`NodeJS/ExpressJS` backend which acts as a proxy for the Marval API (https://developer.marvel.com/)

Includes an in-memory to speed up subsequent requests.

### Frontend

`ReactJS` single page application for displaying Marvel's comics.
Including:

- thumbnails
- infinite scroll pagination

## Installation

```
yarn install
```

## Running

The following environment variables are required:

- MARVEL_PUBLIC_KEY
- MARVEL_PRIVATE_KEY

Both can be objained from registering at `https://developer.marvel.com/`

### Development

```
yarn start:dev
```

### Production

```
yarn start:dev
```
