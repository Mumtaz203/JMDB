#  JMDB – Movie Rating & Information Platform(Just Movie Data Base)

JMDB is a movie rating and information platform where users can:

-  View top-rated and trending movies
-  Read detailed information including descriptions, actors, and reviews
-  Log in and unlock features like watchlists and review submissions

> Some features are only available to logged-in users.


## Tech Stack

*Frontend*
- React 19
- React Router DOM 7
- Apollo Client (GraphQL)
- GraphQL 16
- Lucide React (Icons)

*Backend*
- Spring Boot (via Maven)
- GraphQL Server
- Docker & Docker Compose


##  Project Repositories

- Frontend: https://github.com/Mumtaz203/JMDB](https://github.com/Mumtaz203/JMDB
- Backend: https://github.com/Mumtaz203/jmdb-backend](https://github.com/Mumtaz203/jmdb-backend

##  Backend Setup

git clone https://github.com/Mumtaz203/jmdb-backend.git
./mvnw clean package
docker-compose down -v
docker-compose up --build

This starts the backend GraphQL API and required services.

## Frontend Setup
Make sure the backend is running before starting the frontend.

git clone https://github.com/Mumtaz203/JMDB.git
npm install
npm start


 ## GraphQL API Overview

These are some of the GraphQL operations used in the frontend application:

Mutations
login(input: LoginInput!) : LoginResponse

createUser(input: UserInput!) : UserResponse

addReviewInMovie(movieId: Int!, reviewId: Int!) : [ReviewResponse!]!

addMovieToWatchList(movieId: Int!, userId: Int!) : [MovieResponse!]!

removeMovieFromWatchList(movieId: Int!, userId: Int!) : [MovieResponse!]!

 Queries
getMovie(id: Int!) : MovieResponse

getAllMovies : [MovieResponse!]!

searchMovieByName(name: String) : [MovieResponse!]!

sortMovieByBetterReviewPoint : [MovieResponse!]!

findAverageRankingInMovie(movieId: Int!) : Float

showAllActorsInMovie(movieId: Int!) : [ActorResponse!]

showAllReviewsInMovie(movieId: Int!) : [ReviewResponse!]!

showWatchList(userId: Int!) : [MovieResponse!]!

##  Project Status
In Development

Some features are still in progress, and functionality may change frequently.

## Project Members
Mümtaz Erdogan (5123036), Erkin Caliskan (5123096) , Yigit Savasir (6824019)