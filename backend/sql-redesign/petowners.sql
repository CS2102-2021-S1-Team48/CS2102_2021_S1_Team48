/* Creates petowners table */

CREATE TABLE petowners (
    username VARCHAR(20) PRIMARY KEY REFERENCES main_users(username)
	     ON DELETE CASCADE
	     ON UPDATE CASCADE
);

/* Drops petowners table */

DROP TABLE IF EXISTS petowners;

/* Creates a new petowner /*

INSERT INTO petowners VALUES ('Tina');

/* Drops a petowner /*

DELETE FROM petowners
      WHERE username = 'Tina';

/* Get all petowners /*

  SELECT * 
    FROM petowners
ORDER BY username ASC;