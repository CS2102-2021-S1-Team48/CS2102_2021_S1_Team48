-- Create availabilities table
-- POST /availabilities/createtable , createAvailabilitiesTable



-- Drop availabilities table
-- DEL  /availabilities/droptable , dropAvailabilitiesTable



-- Add a new availability for a specific caretaker into the table
-- POST /availabilities?startdate=01072020&enddate=19032020&pettype=dog&price=100 , postAvailability




-- Get all availabilities in the table
-- GET /availabilities , getAllAvailabilities




-- Get all availabilities of a specific caretaker and/or a specific pet type in the table.
-- GET /availabilities/specific?usernamect=john&pettype=cat , getSpecificAvailabilities




-- Edit a specific availability of the caretaker in the table
-- PATCH /availabilities/:startdate/:enddate/:pettype?startdate=01072020&enddate=19032020&pettype=dog&price=100 , editAvailability




-- Delete a specific availability of the caretaker in the table
-- DEL /availabilities/:startdate/:enddate/:pettype , deleteAvailability

