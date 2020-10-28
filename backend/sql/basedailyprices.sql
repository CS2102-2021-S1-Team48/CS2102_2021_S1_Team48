-- Create basedailyprices table
-- POST /basedailyprices/createtable , createBaseDailyPricesTable
CREATE TABLE basedailyprices (
  amount		    NUMERIC,
  pettype		    VARCHAR(20),
  minrating		    NUMERIC,
  username_admin	VARCHAR(20)	REFERENCES admins(username),
  PRIMARY KEY (pettype, minrating)
);

-- Drop basedailyprices table
-- DEL  /basedailyprices/droptable , dropBaseDailyPricesTable
DROP TABLE basedailyprices;

-- Add a new base daily price of a pet type and its minimal rating into the table
-- POST /basedailyprices?amount=123&pettype=dog&minrating=3 , addBaseDailyPrice
INSERT INTO basedailyprices VALUES (13, 'dog', 3, 'sam');
INSERT INTO basedailyprices VALUES (10, 'dog', 2, 'duc');
INSERT INTO basedailyprices VALUES (10, 'cat', 2, 'duc');

-- Get all the base daily prices in the table
-- GET /basedailyprices , getAllBaseDailyPrices
SELECT * FROM basedailyprices;

-- Get the specific base daily price of a specific pet type and/or a specific minimum rating
-- GET /basedailyprices/specific?pettype=cat&minrating=5 , getSpecificBaseDailyPrices
SELECT * FROM basedailyprices WHERE pettype = 'dog';
SELECT * FROM basedailyprices WHERE minrating = 2;
SELECT * FROM basedailyprices WHERE pettype = 'cat' AND minrating = 2;

-- Edit the existing base daily price of a specific pet type and minimum rating. 
-- PATCH /basedailyprices/:pettype/:minrating?amount=3 , editBaseDailyPrice

UPDATE basedailyprices SET amount = 20, username_admin = 'ju' WHERE pettype = 'dog' AND minrating = 3;

-- Delete the existing base daily price of a specific pet type and minimum rating
-- DEL /basedailyprices/:pettype/:minrating , deleteBaseDailyPrice
DELETE FROM basedailyprices WHERE pettype = 'cat' AND minrating = 2;