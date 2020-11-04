/* Creates a petowners table /*

CREATE TABLE petowners (
    username varchar(20) PRIMARY KEY,

    FOREIGN KEY(username) REFERENCES users(username) 
	ON DELETE CASCADE 
	ON UPDATE CASCADE
);

/* Drops a user table /*

DROP TABLE IF EXISTS petowners