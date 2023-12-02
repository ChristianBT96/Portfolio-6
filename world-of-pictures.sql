-- CREATE DATABASE world_of_pictures;
-- USE world_of_pictures;

DROP TABLE IF EXISTS users, pictures, albums, favourites;

CREATE TABLE users (
	user_id int AUTO_INCREMENT,
	email varchar(255),
    first_name varchar(255),
    last_name varchar(255),
    PRIMARY KEY (user_id)
);

INSERT INTO users (email, first_name, last_name)
VALUES 
    ('luffy@email.com', 'Luffy', 'D. Monkey'),
    ('chopper@email.com', 'Tony Tony', 'Chopper'),
	('nicorobin@email.com', 'Nico', 'Robin'),
    ('john.doe@example.com', 'John', 'Doe'),
	('jane.doe@example.com', 'Jane', 'Doe'),
	('jim.smith@example.com', 'Jim', 'Smith');

CREATE TABLE albums (
	album_id int AUTO_INCREMENT,
    date_created datetime,
	album_name varchar(255),
    user_id int,
    PRIMARY KEY (album_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

INSERT INTO albums (album_name, date_created, user_id)
VALUES 
    ('Going Merry', '2023-05-05 07:22:10', 1),
    ('Fishman Island', '2023-10-19 10:52:10', 1),
    ('Grand Line', '2023-12-01 09:22:10', 2),
    ('Family Vacation', '2022-12-01 17:22:10', 1),
	('Graduation', '2022-12-20 10:22:10', 2),
	('Wedding', '2020-12-24 14:22:10', 3),
    ('Beach Vacation', '2023-06-20 15:22:10', 1),
	('Honeymoon', '2021-01-05 17:22:10', 3),
	('Road Trip', '2023-08-01 12:22:10', 2),
	('Birthday Party', '2023-11-12 11:46:10', 1);

CREATE TABLE pictures (
	picture_id int AUTO_INCREMENT,
    img_name varchar(255),
	img_path varchar(255),
    date_created datetime,
    alt_text varchar(255),
    tags varchar(255),
    city varchar(255),
    country varchar(255),
    user_id int,
    album_id int,
    favourite boolean,
    PRIMARY KEY (picture_id),
    FOREIGN KEY(album_id) REFERENCES albums(album_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

INSERT INTO pictures (img_name, img_path, date_created, alt_text, tags, city, country, user_id, album_id, favourite)
VALUES 
    ('friends at sea', 'https://i.ibb.co/vwBKWwD/friends-at-sea.png', '2023-01-01 09:31:14', 'me and my friends on Going Merry', 'onepiece, anime', 'Copenhagen', 'Denmark', 1, 1, true),
    ('birthday party', 'https://i.ibb.co/6JzKJ3N/birthday-party.png', '2023-01-04 19:13:45', 'my birthday party with friends', 'birthday, celebration', 'Copenhagen', 'Denmark', 1, 1, false),
    ('family at beach', 'https://i.ibb.co/4fJyJ5S/family-at-beach.png', '2023-01-02 10:45:23', 'my family and I at the beach', 'vacation, family', 'Copenhagen', 'Denmark',1, 2, false),
    ('sunset at pier', 'https://i.ibb.co/7gjJZzv/sunset-at-pier.png', '2023-01-03 16:22:11', 'a beautiful sunset at the pier', 'sunset, nature', 'San Paulo', 'Brazil',2, 3, false),
    ('sightseeing', 'https://i.ibb.co/0jJQJ5J/sightseeing.png', '2023-01-05 14:56:32', 'sightseeing in Copenhagen', 'tourism, travel', 'San Paulo', 'Brazil',2, 3, false),
    ('IMG_001.jpg', '/path/to/IMG_001.jpg', '2023-11-28 15:00:00', 'A beautiful sunset', 'sunset, nature', 'San Francisco', 'United States',1, 1, true),
	('IMG_002.jpg', '/path/to/IMG_002.jpg', '2023-11-28 16:00:00', 'A family photo', 'family, vacation', 'London', 'United Kingdom',1, 1, false),
	('IMG_003.jpg', '/path/to/IMG_003.jpg', '2023-11-28 17:00:00', 'A graduation photo', 'graduation, friends', 'New York', 'United States',1, 2, true),
	('IMG_004.jpg', '/path/to/IMG_004.jpg', '2023-11-28 18:00:00', 'A wedding photo', 'wedding, couple', 'Paris', 'France',2, 3, true),
    ('IMG_005.jpg', '/path/to/IMG_005.jpg', '2023-11-28 19:00:00', 'A beach photo', 'beach, vacation', 'Long Beach', 'United States',1, 2, true),
	('IMG_006.jpg', '/path/to/IMG_006.jpg', '2023-11-28 20:00:00', 'A honeymoon photo', 'honeymoon, couple', 'Paris', 'France',1, 4, false),
	('IMG_007.jpg', '/path/to/IMG_007.jpg', '2023-11-28 21:00:00', 'A road trip photo', 'road trip, friends', 'London', 'United Kingdom',2, 3, true),
	('IMG_008.jpg', '/path/to/IMG_008.jpg', '2023-11-28 22:00:00', 'A birthday party photo', 'birthday, friends', 'Copenhagen', 'Denmark', 1, 4, true),
    ('IMG_009.jpg', '/path/to/IMG_009.jpg', '2023-11-28 23:00:00', 'A beach photo', 'beach, vacation', 'Long Beach', 'United States', 1, 2, true),
	('IMG_010.jpg', '/path/to/IMG_010.jpg', '2023-11-29 00:00:00', 'A honeymoon photo', 'honeymoon, couple', 'Paris', 'France', 1, 4, false),
	('IMG_011.jpg', '/path/to/IMG_011.jpg', '2023-11-29 01:00:00', 'A road trip photo', 'road trip, friends', 'London', 'United Kingdom', 2, 3, true),
	('IMG_012.jpg', '/path/to/IMG_012.jpg', '2023-11-29 02:00:00', 'A birthday party photo', 'birthday, friends', 'Copenhagen', 'Denmark', 1, 4, true);
