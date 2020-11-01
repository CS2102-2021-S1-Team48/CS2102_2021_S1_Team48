-- Create bids table
-- POST /bids/createtable , createBidsTable
CREATE TABLE bids (
  transfermethod		VARCHAR(20) 	NOT NULL,
  paymentmethod		    VARCHAR(20)	    NOT NULL,
  petname			    VARCHAR(20),	
  username_petowner	    VARCHAR(20),	
  username_caretaker	VARCHAR(20),	
  startdate			    DATE,
  enddate			    DATE,
  pettype			    VARCHAR(20),
  accepted			    BOOLEAN		    DEFAULT FALSE,
  review 			    VARCHAR(100)	DEFAULT NULL,
  rating 			    INTEGER		    DEFAULT NULL,
  
  FOREIGN KEY (username_caretaker, startdate, enddate, pettype) REFERENCES availabilities (username_caretaker, startdate, enddate, pettype),
  FOREIGN KEY (petname, username_petowner) REFERENCES pets (petname, username_petowner),
  PRIMARY KEY (petname, username_petowner, username_caretaker, startdate, enddate)
);


-- TRIGGER AFTER INSERT IF CARETAKER = FULLTIMER -> AUTO ACCEPT WHEN PETLIMIT UNDER HIM NOT REACHED
CREATE OR REPLACE FUNCTION checkFullTime() RETURNS TRIGGER AS 
' BEGIN IF NEW.username_caretaker IN (SELECT username FROM caretakers_pt) THEN NEW.accepted := False; ELSIF (SELECT petlimit FROM caretakers c WHERE NEW.username_caretaker = c.username) > (SELECT COUNT(*) FROM bids WHERE startdate = NEW.startdate AND enddate = NEW.enddate AND accepted = True AND username_caretaker = NEW.username_caretaker) THEN NEW.accepted := True; END IF; RETURN NEW; END; ' 
LANGUAGE plpgsql;

CREATE TRIGGER insertBids
BEFORE INSERT ON bids
FOR EACH ROW EXECUTE PROCEDURE checkFullTime();


-- TRIGGER BEFORE UPDATE IF ACCEPTED = TRUE -> CHECK IF CARETAKER IS PARTIMER. IF PARTIMER CHECK PETLIMIT AND HOW MANY PETS IS UNDER HIS CARE IN THE BIDS TABLE
CREATE OR REPLACE FUNCTION checkPartTime() RETURNS TRIGGER AS 
' BEGIN IF NEW.accepted = False THEN NEW.accepted = False; ELSIF (SELECT petlimit FROM caretakers c WHERE NEW.username_caretaker = c.username) > (SELECT COUNT(*) FROM bids WHERE startdate = NEW.startdate AND enddate = NEW.enddate AND accepted = True AND username_caretaker = NEW.username_caretaker) THEN NEW.accepted = True; ELSE raise EXCEPTION ''pet limit reached''; END IF; RETURN NEW; END; ' 
LANGUAGE plpgsql;

CREATE TRIGGER updateBids
BEFORE UPDATE ON bids
FOR EACH ROW EXECUTE PROCEDURE checkPartTime();


-- TRIGGER AFTER INSERT INTO REVIEWS -> UPDATE TABLE CARETAKERS ON RATING
CREATE OR REPLACE FUNCTION updateRating() RETURNS TRIGGER AS
' DECLARE r INTEGER; 
BEGIN SELECT AVG(bids.rating) INTO r FROM bids WHERE bids.username_caretaker = NEW.username_caretaker AND bids.rating IS NOT NULL; 
IF r IS NULL THEN r = 3; END IF; 
UPDATE caretakers SET rating = r WHERE username = NEW.username_caretaker;
RETURN NEW; 
END;'
LANGUAGE plpgsql;

CREATE TRIGGER updateRating
AFTER UPDATE ON bids
FOR EACH ROW EXECUTE PROCEDURE updateRating();


-- Drop bids table
-- DEL  /bids/droptable , dropBidsTable
DROP TABLE bids;

-- Add a new bid into the table
-- POST /bids?transfermethod=deliver&paymentmethod=123&petname=emma&username_caretake=Duc&startdate=27102020&enddate=28102020&pettype=dog , addBid
INSERT INTO bids VALUES ('pickup', 'cash', 'sam', 'johndoe9999', 'johndoe99', '2020-10-31', '2020-11-01', 'dog');

-- Get all accepted bids from the table
-- GET /bids/accepted, getAcceptedBids
SELECT * FROM bids WHERE accepted = True;

-- Get all unaccepted bids from the table
-- GET /bids/unaccepted , getUnacceptedBids
SELECT * FROM bids WHERE accepted = False;

-- Get all bids with a specific caretaker username, pet owner username and pet name from the table.
-- GET /bids?petname=eva&usernamect=john&usernamepo=lim , getBids
SELECT * FROM bids WHERE petname = 'sam' AND username_caretaker = 'parttimer' AND username_petowner = 'johndoe9999';

-- Get all the reviews of a specific caretake
-- GET /bids/review/:usernamect , getReviewsOfCaretaker
SELECT * FROM bids WHERE username_caretaker = 'parttimer';

-- Accept an existing bid in the table
-- PATCH /bids/accept/:petname/:usernamepo/:usernamect/:startdate/:enddate , acceptBid
 UPDATE bids SET accepted = True WHERE petname = 'saam' AND username_petowner = 'johndoe9999' AND username_caretaker = 'parttimer' AND startdate = '2020-10-31' AND enddate = '2020-11-01';

-- Undo an accepted bid in the table
-- PATCH /bids/undoaccept/:petname/:usernamepo/:usernamect/:startdate/:enddate , undoAcceptBid
 UPDATE bids SET accepted = False WHERE petname = 'sam' AND username_petowner = 'johndoe9999' AND username_caretaker = 'parttimer' AND startdate = '2020-10-31' AND enddate = '2020-11-01';

-- Delete an existing bid in the table
-- DEL /bids/:petname/:usernamepo/:usernamect/:startdate/:enddate , deleteBid
DELETE from bids WHERE petname = 'sam' AND username_petowner = 'johndoe9999' AND username_caretaker = 'parttimer' AND startdate = '2020-10-31' AND enddate = '2020-11-01';