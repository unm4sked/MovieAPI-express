# Movie API
![Node.js CI](https://github.com/unm4sked/MovieAPI-express/workflows/Node.js%20CI/badge.svg)

## Technologies used:

-   :bulb: Node.js
-   :bulb: Typescript
-   :bulb: Express
-   :bulb: ESlint
-   :bulb: Prettier
-   :bulb: Jest

## Prerequisites:
- Node.js v12.12.0 or newer
- yarn (preferred) or npm

## How to run?

- install dependencies using command in project directory ***npm install*** / ***yarn***
- run api using command ***npm run start*** / ***yarn start***


## How to use it?

By default server starts at http://localhost:8080

```
GET localhost:8080/api/v1/movies   
```

```
GET localhost:8080/api/v1/movies/:id 
```

```
POST localhost:8080/api/v1/movies
{
    "genres": ["Comedy","Drama"],
    "title": "How to catch someone on something",
    "year": "2019",
    "runtime": "90",
    "director": "Lukas Kalickis"
    "actors": "Lukas Kalickis",
}
```

```
GET localhost:8080/api/v1/random
```

```
GET localhost:8080/api/v1/random?genres=Fantasy
```

```
GET localhost:8080/api/v1/random?duration=90
```

```
GET localhost:8080/api/v1/random?duration=90&genres=Fantasy,Drama
```
