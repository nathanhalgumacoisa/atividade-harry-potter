CREATE DATABASE harrypottah;

/c harrypottah

CREATE TABLE bruxos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    idade INTEGER NOT NULL,
    casa VARCHAR(50),
    habilidade VARCHAR(100) NOT NULL,
    status_sangue VARCHAR(10) NOT NULL,
    patrono VARCHAR(50)
);

CREATE TABLE varinhas (
    id SERIAL PRIMARY KEY,
    material VARCHAR(50) NOT NULL,
    comprimento DECIMAL NOT NULL,
    nucleo VARCHAR(50) NOT NULL,
    data_fabricacao DATE NOT NULL
);