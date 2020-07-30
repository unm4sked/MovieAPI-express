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

-   Node.js v12.12.0 or newer
-   yarn (preferred) or npm

## How to run?

-   install dependencies using command in project directory **_npm install_** / **_yarn_**
-   run api using command **_npm run start_** / **_yarn start_**

## How to use it?

By default server starts at http://localhost:8080

To fetch a list of all movies in db.json file:

```
GET localhost:8080/api/v1/movies
```

To get movie by id:

```
GET localhost:8080/api/v1/movies/:id
```

To create new movie:

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

The route `/api/v1/` random allows you to use two query paramters:

-   **genres** - list of defined genres e.g _genres=Fantasy,Drama_ or _genres=Comedy_, the list of defined genres is at the bottom
-   **duration** - number , narrows the results by this number, this number relates to the length of the movie. _duration=90_ or _duration=43_

To get single random movie:

```
GET localhost:8080/api/v1/random
```

To get movies with specific genres:

```
GET localhost:8080/api/v1/random?genres=Fantasy
```

To get single random movie with a runtime between duration +/- 10.

```
GET localhost:8080/api/v1/random?duration=90
```

To get movies with specific genres and runtime between duration +/- 10

```
GET localhost:8080/api/v1/random?duration=90&genres=Fantasy,Drama
```

Defined list of genres:

-   Comedy
-   Fantasy
-   Crime
-   Drama
-   Music
-   Adventure
-   History
-   Thriller
-   Animation
-   Family
-   Mystery
-   Biography
-   Action
-   Film-Noir
-   Romance
-   Sci-Fi
-   War
-   Western
-   Horror
-   Musical
-   Sport
