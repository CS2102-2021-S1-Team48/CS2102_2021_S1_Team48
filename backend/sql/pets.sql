-- Create pets table
-- POST /pets/createtable , createPetsTable
CREATE TABLE pets (
  petname			VARCHAR(20), 
  pettype			VARCHAR(20) 	NOT NULL,
  requirements		VARCHAR(20),
  username_petowner VARCHAR(20) 	REFERENCES petowners(username) ON DELETE CASCADE ON UPDATE CASCADE,  
  PRIMARY KEY(petname, username_petowner)
);

-- Drop pets table
-- DEL  /pets/droptable , dropPetsTable
DROP TABLE pets;

-- Add a new pet into the pets table
-- POST /pets?petname=eva&pettype=cat&requirements=aircon , addPet
INSERT INTO pets VALUES ('emma', 'dog', NULL, 'johndoe99');
INSERT INTO pets VALUES ('emma2', 'dog', NULL, 'johndoe99');
INSERT INTO pets VALUES ('emma', 'dog', NULL, 'johndoe999');
INSERT INTO pets VALUES ('emma2', 'dog', 'Aircon', 'johndoe999');
INSERT INTO pets VALUES ('duc' , 'cat', 'Aircon', 'johndoe999');
INSERT INTO pets VALUES ('sam' , 'monkey', 'Aircon', 'johndoe9999');

-- Get all pets in the table
-- GET /pets , getPet
SELECT * FROM pets;

-- Get a specific pet by its name and owner
-- GET /pets/:petname , getPetByPetname
SELECT * FROM PETS WHERE petname = 'sam' AND username_petowner = 'johndoe9999';


-- Edit the details of a specific pet in the table 
-- PATCH /pets/:petname?petname=evaline&requirements=coldaircon , editPetDetails
UPDATE pets SET petname = 'evaline' WHERE petname = 'emma' AND username_petowner = 'johndoe99';
UPDATE pets SET requirements = 'hugs daily' WHERE petname = 'emma2' AND username_petowner = 'johndoe99';
UPDATE pets SET petname = 'evaline', requirements = 'carnivore' WHERE petname = 'emma' AND username_petowner = 'johndoe999';


-- Delete a specific pet in the table
-- DEL /pet/:petname , deletePetByPetname
DELETE FROM pets WHERE username_petowner = 'muthar' AND petname = 'evaline';
