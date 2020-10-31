/* Creates a caretaker table /*

CREATE TABLE caretakers (
    username varchar(20) PRIMARY KEY,
    petdays INTEGER DEFAULT 0,
    rating INTEGER DEFAULT 3,
    petlimit INTEGER DEFAULT 3,

    FOREIGN KEY(username) REFERENCES users(username)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);

/* Drops a user table /*

DROP TABLE IF EXISTS caretakers

/* Retrieves names of all caretakers /*

SELECT *
  FROM caretakers

/* Retrieves details of a specific caretakers /*

SELECT *
  FROM caretakers
 WHERE username = 'ExampleName'