/* Creates parttimers table */

CREATE TABLE parttimers (
    username VARCHAR(20) PRIMARY KEY REFERENCES caretakers(username)
	     ON DELETE CASCADE
	     ON UPDATE CASCADE
);

/* Drops parttimers table */

DROP TABLE IF EXISTS parttimers;

/* Creates a new parttimer /*

INSERT INTO fulltimers VALUES ('Tina');

/* Drops a parttimer /*

DELETE FROM parttimers
      WHERE username = 'Tina';

/* Updates caretaker type /*

DELETE FROM fulltimers
      WHERE username = 'Tina';

INSERT INTO parttimers VALUES ('Tina');

/* Get all parttimers /*

  SELECT * 
    FROM parttimers 
ORDER BY username ASC;