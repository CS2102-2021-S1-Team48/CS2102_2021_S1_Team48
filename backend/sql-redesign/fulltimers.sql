/* Creates fulltimers table */
-- table name caretakers_ft
CREATE TABLE fulltimers (
    username VARCHAR(20) PRIMARY KEY REFERENCES caretakers(username)
	     ON DELETE CASCADE
	     ON UPDATE CASCADE,
    start_d1 DATE        NOT NULL,
    end_d1   DATE        NOT NULL,
    start_d2 DATE        NOT NULL,
    end_d2   DATE        NOT NULL,

    CHECK(end_d1 - start_d1 >= 150 AND 
	  end_d2 - start_d2 >= 150 AND 
          start_d2 > end_d1 AND
          end_d2 - start_d1 <= 365)
);

/* Drops fulltimers table */

DROP TABLE IF EXISTS fulltimers;

/* Creates a new fulltimer /*

INSERT INTO fulltimers VALUES ('Tina', '01-01-2001', '06-01-2001', '06-02-2001', '12-30-2001');

/* Drops a fulltimer /*

DELETE FROM fulltimers 
      WHERE username = 'Tina';

/* Updates caretaker type /*

DELETE FROM parttimers
      WHERE username = 'Tina';

INSERT INTO fulltimers VALUES ('Tina', '01-01-2001', '06-01-2001', '06-02-2001', '12-30-2001');

/* Get all fulltimers /*

  SELECT * 
    FROM fulltimers
ORDER BY username ASC;

/* Updates first working period /*

UPDATE fulltimers
   SET start_d1 = '01-01-2001',
       end_d1 = '06-01-2001',
 WHERE username = 'Tina';

/* Updates second working period /*

UPDATE fulltimers
   SET start_d2 = '06-02-2001',
       end_d2 = '12-30-2001',
 WHERE username = 'Tina';