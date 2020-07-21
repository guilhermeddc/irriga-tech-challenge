CREATE DATABASE IRRIGA;

USE IRRIGA;

CREATE TABLE cities (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(100) NOT NULL,
	latitude VARCHAR(50),
	longitude VARCHAR(50),
	gmt INT NOT NULL
);

INSERT INTO cities (name, latitude, longitude, gmt) VALUES ('Santa Maria', '-29.6841666667', '-53.8069444444', -3);
INSERT INTO cities (name, latitude, longitude, gmt) VALUES ('Campo Grande', '-20.4427777778', '-54.6463888889', -4);
INSERT INTO cities (name, latitude, longitude, gmt) VALUES ('Deutsch Jahrndorf', '48.0086111111', '17.1097222222', 2);


