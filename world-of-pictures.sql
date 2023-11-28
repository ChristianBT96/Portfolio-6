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
	('nicorobin@email.com', 'Nico', 'Robin');

CREATE TABLE albums (
	album_id int AUTO_INCREMENT,
	album_name varchar(255),
    user_id int,
    PRIMARY KEY (album_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

INSERT INTO albums (album_name, user_id)
VALUES 
    ('Going Merry', 1),
    ('Fishman Island', 1),
    ('Grand Line', 2);

CREATE TABLE pictures (
	picture_id int AUTO_INCREMENT,
    img_name varchar(255),
	img_path varchar(255),
    date_created datetime,
    alt_text varchar(255),
    tags varchar(255),
    lat float(10),
	lng float(10),
    city varchar(255),
    country varchar(255),
    album_id int,
    favourite boolean,
    PRIMARY KEY (picture_id),
    FOREIGN KEY(album_id) REFERENCES albums(album_id)
);

INSERT INTO pictures (img_name, img_path, date_created, alt_text, tags, lat, lng, city, country, album_id, favourite)
VALUES 
    ('friends at sea', 'https://i.ibb.co/vwBKWwD/friends-at-sea.png', '2023-01-01 09:31:14', 'me and my friends on Going Merry', 'onepiece, anime', '55.676098', '12.568337', 'Copenhagen', 'Denmark', 1, true),
    ('birthday party', 'https://i.ibb.co/6JzKJ3N/birthday-party.png', '2023-01-04 19:13:45', 'my birthday party with friends', 'birthday, celebration', '55.676098', '12.568337', 'Copenhagen', 'Denmark', 1, false),
    ('family at beach', 'https://i.ibb.co/4fJyJ5S/family-at-beach.png', '2023-01-02 10:45:23', 'my family and I at the beach', 'vacation, family', '55.676098', '12.568337', 'Copenhagen', 'Denmark', 2, false),
    ('sunset at pier', 'https://i.ibb.co/7gjJZzv/sunset-at-pier.png', '2023-01-03 16:22:11', 'a beautiful sunset at the pier', 'sunset, nature', '-23.501348', '-46.862508', 'San Paulo', 'Brazil', 3, false),
    ('sightseeing', 'https://i.ibb.co/0jJQJ5J/sightseeing.png', '2023-01-05 14:56:32', 'sightseeing in Copenhagen', 'tourism, travel', '-23.501348', '-46.862508', 'San Paulo', 'Brazil', 3, false);
