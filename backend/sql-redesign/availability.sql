/* Creates availability table */

CREATE TABLE availability (
    username VARCHAR(20) REFERENCES caretakers(username)
	     ON DELETE CASCADE
	     ON UPDATE CASCADE,
    start_date DATE,
    end_date DATE,
    pet_type VARCHAR(40),
    quantity INTEGER DEFAULT 1,
	
    PRIMARY KEY(username, start_date, end_date, pet_type)
);

/* Drops availability table */

DROP TABLE IF EXISTS availability;

/* Creates a availabilty entry /*

INSERT INTO availability VALUES ('Tina', '01-01-2001', '03-01-2001', 'Golden Retriever');

/* Drops a availability entry /*

DELETE FROM availability
      WHERE username = 'Tina' AND
            start_date = '01-01-2001' AND
            end_date = '03-01-2001' AND
            pet_type = 'Golden Retriever';

/* Get all availability slots /*

  SELECT *
    FROM availability
ORDER BY pet_type   ASC,
	 start_date ASC,
	 end_date   ASC,
	 username   ASC;