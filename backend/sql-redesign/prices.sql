/* Creates prices table */

CREATE TABLE prices (
    pcs_username VARCHAR(20) REFERENCES pcs_admins(username)
	         ON DELETE SET NULL
		 ON UPDATE CASCADE,
    ct_username  VARCHAR(20) REFERENCES caretakers(username)
		 ON DELETE CASCADE
	 	 ON UPDATE CASCADE,
    pet_type VARCHAR(40),
    daily_price MONEY NOT NULL,
	
    PRIMARY KEY (ct_username, pet_type)
);

/* Drops prices table */

DROP TABLE IF EXISTS prices;

/* Creates a new price entry for a pet for a caretaker /*

INSERT INTO prices VALUES ('John', 'Tina', 'German Shephard', 12);

/* Drops a price entry /*

DELETE FROM prices
      WHERE ct_username = 'Tina';

/* Get all prices /*

  SELECT ct_username, pet_type, daily_price
    FROM prices
ORDER BY ct_username ASC,
	 pet_type ASC,
	 daily_price DESC;