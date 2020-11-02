/* Creates caretakers table */

CREATE TABLE caretakers (
    username VARCHAR(20)  PRIMARY KEY REFERENCES main_users(username)
	     ON DELETE CASCADE
	     ON UPDATE CASCADE,
    petLimit INTEGER      NOT NULL,
    rating   NUMERIC(4,2) DEFAULT 0,
    -- original table have petdays
    -- original table dont have this check

	
    CHECK (
	rating BETWEEN 0 AND 5 AND
	petLimit = 2 OR petLimit = 5)
);

/* Drops caretakers table */

DROP TABLE IF EXISTS caretakers;

/* Creates a new caretaker /*

INSERT INTO caretakers VALUES ('Tina', 2);

/* Drops a caretaker /*

DELETE FROM caretakers
      WHERE username = 'Tina';

/* Get all caretakers /*

  SELECT * 
    FROM caretakers
ORDER BY rating   ASC,
	 username ASC;