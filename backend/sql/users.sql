/* Creates a user table /*

CREATE TABLE users (
    username varchar(20) PRIMARY KEY,
    pw varchar(20) NOT NULL
);

/* Drops a user table /*

DROP TABLE IF EXISTS users

/* Creates a new user /*

CREATE PROCEDURE create_user(username VARCHAR, pw VARCHAR)
LANGUAGE 'plpgsql'
AS $$ BEGIN
INSERT INTO users VALUES (username, pw);
END $$;

CALL create_user('Tina', 'password')

/* Updates Username /*

CREATE PROCEDURE update_username(old VARCHAR, new VARCHAR)
LANGUAGE 'plpgsql'
AS $BODY$ BEGIN
UPDATE users
   SET username = new
 WHERE username = old;
END $BODY$;

CALL update_username('Tina', 'John')

/* Updates Password /*

CREATE PROCEDURE update_password(name VARCHAR, new VARCHAR)
LANGUAGE 'plpgsql'
AS $BODY$ BEGIN
UPDATE users
   SET pw = new
 WHERE username = name;
END $BODY$;

CALL update_password('John', 'newpassword')