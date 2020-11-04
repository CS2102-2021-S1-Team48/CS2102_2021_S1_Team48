/* Creates main_users table */

CREATE TABLE main_users (
    username VARCHAR(20) PRIMARY KEY REFERENCES users(username)
	     ON DELETE CASCADE
	     ON UPDATE CASCADE,
    cc_no    VARCHAR(20) UNIQUE
);

/* Drops main_users table */

DROP TABLE IF EXISTS main_users

/* Creates a new main_user /*

INSERT INTO main_users 
SELECT 'Tina', '1234-1234-1234-1234'
 WHERE NOT EXISTS (
     SELECT 1
       FROM pcs_admins
      WHERE username = 'Tina');

/* Drops a main_user /*

DELETE FROM main_users 
      WHERE username = 'Tina';

/* Get all main_users /*

  SELECT * 
    FROM main_users
ORDER BY username ASC;