-- How many times blocklength >= 150 days? we call this count, K
SELECT COUNT(*) FROM (SELECT DISTINCT enddate-startdate+1 AS days FROM availabilities WHERE username_caretaker = 'johndoe98') blocklengths WHERE days >= 150;

-- Is K == 2 ?
SELECT EXISTS (SELECT 1 FROM (SELECT COUNT (*) cnt FROM (SELECT DISTINCT enddate-startdate+1 AS blocklength FROM availabilities WHERE username_caretaker = 'johndoe98') blocklengths WHERE blocklength >= 150) c WHERE c.cnt = 2);

-- Is caretakerpt eligible to convert ?
SELECT 
	CASE WHEN EXISTS (SELECT 1 FROM (SELECT COUNT(*) cnt FROM (SELECT DISTINCT enddate-startdate+1 AS days FROM availabilities WHERE username_caretaker = 'johndoe98') blocklengths WHERE days >= 150) c WHERE c.cnt = 2)
		THEN 'eligible'
		ELSE 'not eligible'
	END;

-- include 1 x 300 day block

SELECT 
	CASE WHEN EXISTS ((SELECT 1 FROM (SELECT COUNT(*) cnt FROM (
			SELECT DISTINCT enddate-startdate+1 AS days 
			FROM availabilities 
			WHERE username_caretaker = 'PARTIMERCARETAKER') blocklengths 
			WHERE days >= 150) c WHERE c.cnt = 2) UNION 
			(SELECT 1 
			FROM (SELECT count(*) 
			FROM (SELECT DISTINCT enddate-startdate+1 AS availdays 
			FROM availabilities WHERE username_caretaker = 'PARTIMERCARETAKER') as c
			WHERE availdays >= 300) AS n 
			WHERE n.count = 1))
		THEN 'eligible'
		ELSE 'not eligible'
	END;
