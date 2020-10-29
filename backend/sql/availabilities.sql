-- Create availabilities table
-- POST /availabilities/createtable , createAvailabilitiesTable
CREATE TABLE availabilities (
  startdate			    DATE,
  enddate			    DATE,
  pettype			    VARCHAR(20)	NOT NULL,
  price				    NUMERIC, 
  username_caretaker 	VARCHAR(20) REFERENCES caretakers(username) ON DELETE CASCADE ON UPDATE CASCADE,
  
  PRIMARY KEY (username_caretaker, startdate, enddate, pettype)
);

-- Trigger 
-- Before inserting availability into the table, check that the price specificed by the caretaker is not lower than what is specificed in the base daily prices table
-- Note the single quote in line 17 and 25 can be replaced with $$ (Used single quote because db-fiddle cannot do multiline $$ quote)
-- If replacing with $$, then have to scan function body for string literals
CREATE OR REPLACE FUNCTION checkBasePrice() RETURNS TRIGGER AS 
' DECLARE 
    basePrice NUMERIC; rating NUMERIC; 
  BEGIN 
    SELECT c.rating INTO rating FROM caretakers c WHERE c.username = NEW.username_caretaker;
    SELECT b.amount INTO basePrice FROM basedailyprices b WHERE b.minrating = rating AND b.pettype = NEW.pettype; 
    IF new.price < basePrice THEN RAISE EXCEPTION ''cannot be lower than base price'';
    END IF;
  RETURN NEW; 
  END; ' 
LANGUAGE plpgsql;

CREATE TRIGGER insert_availabilities
BEFORE INSERT ON availabilities
FOR EACH ROW EXECUTE PROCEDURE checkBasePrice();


-- Drop availabilities table
-- DEL  /availabilities/droptable , dropAvailabilitiesTable



-- Add a new availability for a specific caretaker into the table
-- POST /availabilities?startdate=01072020&enddate=19032020&pettype=dog&price=100 , postAvailability




-- Get all availabilities in the table
-- GET /availabilities , getAllAvailabilities




-- Get all availabilities of a specific caretaker and/or a specific pet type in the table.
-- GET /availabilities/specific?usernamect=john&pettype=cat , getSpecificAvailabilities




-- Edit a specific availability of the caretaker in the table
-- PATCH /availabilities/:startdate/:enddate/:pettype?startdate=01072020&enddate=19032020&pettype=dog&price=100 , editAvailability




-- Delete a specific availability of the caretaker in the table
-- DEL /availabilities/:startdate/:enddate/:pettype , deleteAvailability

