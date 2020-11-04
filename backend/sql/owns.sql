-- For reference only
-- This table is needed as owns depends on users
CREATE TABLE users (
  username	VARCHAR(20)	PRIMARY KEY,
  pw	    VARCHAR(20)	NOT NULL
);

-- For reference only
-- This table is needed as owns depends on creditcards
CREATE TABLE creditcards (
  cardnum	VARCHAR(20)	PRIMARY KEY,
  expiry	DATE        NOT NULL
);

-- Create  owns table
-- POST /owns/createtable , createOwnsTable
CREATE TABLE owns (
  cardnum 	VARCHAR(20) REFERENCES creditcards(cardnum) ON DELETE CASCADE ON UPDATE CASCADE UNIQUE NOT NULL,
  username	VARCHAR(20)	PRIMARY KEY REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Drop owns drop
-- DEL  /owns/droptable , dropOwnsTable
DROP TABLE owns;