/* Creates pcs_admins table */

CREATE TABLE pcs_admins (
    username VARCHAR(20) PRIMARY KEY REFERENCES users(username)
	     ON DELETE CASCADE
	     ON UPDATE CASCADE
);

/* Drops pcs_admins table */

DROP TABLE IF EXISTS pcs_admins;

/* Creates a new pcs_admins /*

INSERT INTO pcs_admins 
SELECT 'John'
 WHERE NOT EXISTS (
    SELECT 1 
      FROM main_users
     WHERE username = 'John');

/* Drops a psc_admin /*

DELETE FROM pcs_admins
      WHERE username = 'John';

/* Get all pcs_admins /*

  SELECT * 
    FROM pcs_admins
ORDER BY username ASC;