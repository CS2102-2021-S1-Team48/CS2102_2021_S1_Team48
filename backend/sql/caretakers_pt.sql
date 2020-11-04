/* Creates a caretaker_pt table /*

CREATE TABLE caretakers_pt (
    username varchar(20) PRIMARY KEY,

    FOREIGN KEY(username) REFERENCES users(username)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);

/* Drops caretaker_pt table /*

DROP TABLE IF EXISTS caretaker_spt
