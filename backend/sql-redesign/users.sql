/* Creates a user table /*

CREATE TABLE users (
    username varchar(20) PRIMARY KEY,
    pw       varchar(20) NOT NULL
);

/* Drops a user table /*

DROP TABLE IF EXISTS users

/* Creates a new user /*

INSERT INTO users VALUES ('Tina', 'password');

/* Drops a user /*

DELETE FROM users
      WHERE username = 'Tina';

/* Updates Username /*

UPDATE users
   SET username = 'John'
 WHERE username = 'Tina';

/* Updates Password /*

UPDATE users
   SET pw = 'newPassword'
 WHERE username = 'Tina';

/* Get all users /*

  SELECT * 
    FROM users
ORDER BY username ASC;
  