-- Create admins table
-- POST /admins/createtable , createAdminsTable
CREATE TABLE admins (
  username   VARCHAR(20) PRIMARY KEY,
  pw         VARCHAR(20) NOT NULL
);

-- Drop admins table
-- DEL  /admins/droptable , dropAdminsTable
DROP TABLE admins;

-- Insert a new admin into the table
-- POST /admins?username=johndoe99&password=password1 , createAdmin
INSERT INTO admins VALUES ('johndoe99', 'password1');

-- Change the username of an existing admin
-- PATCH /admins/changeusername/:newusername , changeAdminUsername
UPDATE admins SET username = 'janedoe99' WHERE username = 'johndoe99';

-- Change the username of an existing admin
-- PATCH /admins/changepassword/:newpassword , changeAdminPassword
UPDATE admins SET password = 'qwerty' WHERE username = 'janedoe99';