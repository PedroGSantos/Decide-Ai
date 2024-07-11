CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    watchedMovies INT NOT NULL DEFAULT 0
);

INSERT INTO users (email, password) VALUES ('pedro@gmail.com', '123456');