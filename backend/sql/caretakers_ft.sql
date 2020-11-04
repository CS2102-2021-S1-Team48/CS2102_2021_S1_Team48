/* Creates caretakers_ft table /*

CREATE TABLE caretakers_ft (
    username varchar(20) PRIMARY KEY,
    startdate1 DATE NOT NULL, 
    enddate1 DATE NOT NULL, 
    startdate2 DATE NOT NULL, 
    enddate2 DATE NOT NULL, 

    FOREIGN KEY(username) REFERENCES users(username)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
    CHECK(enddate1 - startdate1 >= 150 AND 
	  enddate2 - startdate2 >= 150 AND 
          startdate2 > enddate1)
);

/* Drops caretakers_ft table /*

DROP TABLE IF EXISTS caretakers_ft

/* Updates caretaker type /*

CREATE PROCEDURE update_caretaker_type(user_name VARCHAR, sd1 DATE, ed1 DATE, sd2 DATE, ed2 DATE)
LANGUAGE 'plpgsql'
AS $BODY$ BEGIN
DELETE FROM caretakers_pt
      WHERE username = user_name;

INSERT INTO caretakers_ft VALUES (user_name, sd1, ed1, sd2, ed2);
END $BODY$;

CALL update_caretaker_type('ExampleName', date1, date2, date3, date4)

/* Retrieve all caretakers_ft /*

SELECT * 
  FROM caretakers_ft

/* Updates startdate1 /*

CREATE PROCEDURE update_startdate1(user_name VARCHAR, new DATE)
LANGUAGE 'plpgsql'
AS $BODY$ BEGIN
UPDATE caretakers_ft
   SET startdate1 = new
 WHERE username = user_name;
END $BODY$;

CALL update_startdate1('ExampleName', date)

/* Updates enddate1 /*

CREATE PROCEDURE update_enddate1(user_name VARCHAR, new DATE)
LANGUAGE 'plpgsql'
AS $BODY$ BEGIN
UPDATE caretakers_ft
   SET enddate1 = new
 WHERE username = user_name;
END $BODY$;

CALL update_enddate1('ExampleName', date)

/* Updates startdate2 /*

CREATE PROCEDURE update_startdate2(user_name VARCHAR, new DATE)
LANGUAGE 'plpgsql'
AS $BODY$ BEGIN
UPDATE caretakers_ft
   SET startdate2 = new
 WHERE username = user_name;
END $BODY$;

CALL update_startdate2('ExampleName', date)

/* Updates startdate1 /*

CREATE PROCEDURE update_enddate2(user_name VARCHAR, new DATE)
LANGUAGE 'plpgsql'
AS $BODY$ BEGIN
UPDATE caretakers_ft
   SET enddate1 = new
 WHERE username = user_name;
END $BODY$;

CALL update_enddate2('ExampleName', date)
