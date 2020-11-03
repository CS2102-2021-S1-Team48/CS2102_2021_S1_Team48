/* Creates leave_schedules table */

-- TODO cannot apply leave if there is at least one pet under their care on that day
CREATE TABLE leaveschedule (
    username   VARCHAR(20) REFERENCES caretaker_ft(username)
	       ON DELETE CASCADE
	       ON UPDATE CASCADE,
    startdate DATE        NOT NULL,
    enddate   DATE        NOT NULL,

    PRIMARY KEY(username, start_date),
    CHECK(enddate >= startdate)
);

/* Drops leave_schedules table */

DROP TABLE IF EXISTS leave_schedules;

CREATE OR REPLACE FUNCTION checkleavesdate() RETURNS TRIGGER AS 
' BEGIN IF (1 IN (SELECT 1 
FROM bids WHERE NEW.startdate <= bids.startdate
AND NEW.enddate >= bids.enddate 
AND NEW.username = bids.username_caretaker AND accepted = ''True'')) 
OR (1 IN (SELECT 1 FROM bids WHERE (NEW.startdate BETWEEN bids.startdate AND bids.enddate OR NEW.enddate BETWEEN bids.startdate AND bids.enddate) AND NEW.username=bids.username_caretaker AND accepted = ''True''))
THEN RAISE EXCEPTION ''Cannot take leave while you are taking care of a pet''; END IF; RETURN NEW; END; ' 
LANGUAGE plpgsql;

CREATE TRIGGER insertleaves
BEFORE INSERT ON leaveschedule
FOR EACH ROW EXECUTE PROCEDURE checkleavesdate();

/* Creates a new leave_schedule /*

INSERT INTO leave_schedules VALUES ('Tina', '01-01-2001', '06-01-2001');

/* Drops a leave_schedule /*

DELETE FROM leave_schedules
      WHERE username = 'Tina';

/* Get all leave_schedules /*

  SELECT * 
    FROM leave_schedules
ORDER BY username ASC;