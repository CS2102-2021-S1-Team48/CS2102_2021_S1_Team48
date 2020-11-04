/* Creates pets table */

CREATE TABLE pets (
    owner_name  VARCHAR(20) REFERENCES petowners(username)
	        ON DELETE CASCADE
	        ON UPDATE CASCADE,
    petname     VARCHAR(20),
    pet_type    VARCHAR(40) NOT NULL,
    special_req VARCHAR(100),
	
    PRIMARY KEY (owner_name, petname)
);

/* Drops prices table */

DROP TABLE IF EXISTS pets;

/* Creates a new pet /*

INSERT INTO pets VALUES ('Tina', 'Brownie', 'German Shephard', 'must be taken out for a walk daily at 6pm');

/* Drops a pet entry /*

DELETE FROM pets
      WHERE petname = 'Brownie';

/* Get all prices /*

  SELECT *
    FROM pets
ORDER BY owner_name ASC,
	 pet_type ASC,
	 petname ASC;