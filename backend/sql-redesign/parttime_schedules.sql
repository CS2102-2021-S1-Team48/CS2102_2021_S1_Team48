/* Creates parttime_schedules table */

CREATE TABLE parttime_schedules (
    username   VARCHAR(20) REFERENCES parttimers(username)
	       ON DELETE CASCADE
	       ON UPDATE CASCADE,
    avail_date DATE        NOT NULL,
    
    PRIMARY KEY(username, avail_date),
);

/* Drops parttime_schedules table */

DROP TABLE IF EXISTS parttime_schedules;

/* Creates a new parttime_schedule /*

INSERT INTO parttime_schedules VALUES ('Tina', '01-01-2001');

/* Drops a parttime_schedule /*

DELETE FROM parttime_schedules
      WHERE username = 'Tina';

/* Get all parttime_schedules /*

  SELECT * 
    FROM parttime_schedules
ORDER BY username ASC;