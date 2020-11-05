-- Create creditcards table
-- POST /creditcards/createtable , createCreditCardsTable
CREATE TABLE creditcards (
  cardnum	VARCHAR(20)	PRIMARY KEY,
  expiry	DATE        NOT NULL
);

-- Drop creditcards table
-- DEL  /creditcards/droptable , dropCreditCardsTable
DROP TABLE creditcards;

-- Add a new creditcard into the creditcards table
-- POST /creditcards?cardnum=123&expiry=21082020 , addCreditCard
-- Note the different date entries, but in general is YYYY-MM-DD or MM-DD-YYYY
INSERT INTO creditcards VALUES ('1232321321', '2020-10-10');
INSERT INTO creditcards VALUES ('12323213321', '10-10-2020');
INSERT INTO creditcards VALUES ('1232333213321', '1-1-2020');
INSERT INTO creditcards VALUES ('123233321331', '1/1/2020');
INSERT INTO creditcards VALUES ('1232133321331', '12.1.2020');
INSERT INTO creditcards VALUES ('11232133321331', '12.31.2020');
INSERT INTO creditcards VALUES ('112321133321331', '2020/12/31');

-- Get all creditcards in the table
-- GET /creditcards , getCreditCard
SELECT * FROM creditcards;

-- Get an existing creditcard information
-- No equivalent GET
SELECT * FROM creditcards WHERE cardnum = '1232321321';

-- Change the card number and/or expiry of an existing creditcard
-- PATCH /creditcards?cardnum=456expiry=21072021 , changeCreditCard
UPDATE creditcards SET cardnum = '444555666' WHERE cardnum = '1232321321';
UPDATE creditcards SET expiry = '05.22.2020' WHERE cardnum = '12323213321';
UPDATE creditcards SET cardnum = '999999999', expiry = '05.22.2020' WHERE cardnum = '1232333213321';


-- Remove an existing card from the table
-- DEL /creditcards , removeCreditCard
DELETE FROM creditcards WHERE cardnum = '999999999';