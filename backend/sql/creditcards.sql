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
-- Note YYYY-MM-DD or MM-DD-YYYY
INSERT INTO creditcards VALUES ('1232321321', '2020-10-10');
INSERT INTO creditcards VALUES ('12323213321', '10-10-2020');
INSERT INTO creditcards VALUES ('1232333213321', '1-1-2020');
INSERT INTO creditcards VALUES ('123233321331', '1/1/2020');
INSERT INTO creditcards VALUES ('1232133321331', '12.1.2020');
INSERT INTO creditcards VALUES ('11232133321331', '12.31.2020');
INSERT INTO creditcards VALUES ('112321133321331', '2020/12/31');
