/* Creates bids table */

CREATE TABLE bids (
    owner_name      VARCHAR(20),
    petname         VARCHAR(20),
    pet_type        VARCHAR(20),
    caretaker       VARCHAR(20),
    start_date      DATE,
    end_date        DATE,
    quantity        INTEGER, -- dont have quantity in the original table
    payment_method  VARCHAR(20) NOT NULL,
    transfer_method VARCHAR(20) NOT NULL,
    bid_price       MONEY       NOT NULL, -- dont have bid_price in the original table
    isAccepted      BOOLEAN     NOT NULL,
    rating          INTEGER,
    review          VARCHAR(100),

    PRIMARY KEY(owner_name, petname, pet_type, caretaker, start_date, end_date),
    FOREIGN KEY(owner_name, petname) REFERENCES pets(owner_name, petname),
    FOREIGN KEY(caretaker, start_date, end_date, pet_type) REFERENCES availability(username, start_date, end_date, pet_type)
);

/* Drops bids table */

DROP TABLE IF EXISTS bids;

/* Creates a new bid /*

INSERT INTO bids VALUES ('Tina', 'Coco', 'Labrador', 'John', '01-01-2001', '01-02-2001', 1, 'Cash', 'Physical Transfer', '$24', 'False'); // not implemented yet

/* Drops a bid /*

DELETE FROM bids
      WHERE caretaker = 'Tina';

/* Get all bids /*

  SELECT * 
    FROM bids
ORDER BY start_date ASC,
         end_date   ASC,
         caretaker  ASC,
         owner      ASC,
         petname    ASC;