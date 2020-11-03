/* Creates leave_schedules table */

-- TODO cannot apply leave if there is at least one pet under their care on that day
CREATE TABLE leave_schedules (
    username   VARCHAR(20) REFERENCES fulltimers(username)
	       ON DELETE CASCADE
	       ON UPDATE CASCADE,
    start_date DATE        NOT NULL,
    end_date   DATE        NOT NULL,

    PRIMARY KEY(username, start_date),
    CHECK(end_date >= start_date)
);

/* Drops leave_schedules table */

DROP TABLE IF EXISTS leave_schedules;

/* Creates a new leave_schedule /*

INSERT INTO leave_schedules VALUES ('Tina', '01-01-2001', '06-01-2001');

/* Drops a leave_schedule /*

DELETE FROM leave_schedules
      WHERE username = 'Tina';

/* Get all leave_schedules /*

  SELECT * 
    FROM leave_schedules
ORDER BY username ASC;