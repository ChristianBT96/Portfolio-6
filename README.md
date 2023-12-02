## !!! IMPORTANT !!!
1. To create connection to database, please down the SQL file to your pc and add your MySQL Workbench password to the code.
2. There is a variable called userID which makes sure that only the selected user with that ID will have their data shown in the results. If you want to look at another user then change the userID.
3. The pictures are supposed to be saved in cloud storage, but in the examples the links are just for show.
# GET requests
## query parameters
Query parameters can be used on all GET requests ***except /albums and /pictures/:pictureID***.
```
http://localhost:3000/pictures?city=copenhagen          // Shows all pictures from Copenhagen
http://localhost:3000/album/beach-vacation?tag=family   // Shows all pictures from the album 'beach vacation' with the tag 'family'
http://localhost:3000/pictures?tag=friends&year=2023     // Shows all pictures with the tag 'friends' from 2023
...
```
Also **country**, **year**, **month**, and **day** can be added as query parameters. Multiple parameters can be used at once.
> month and day can be written as both single and double digits if less than 10. Meaning both are valid: 1 and 01

## /pictures
Shows all user's pictures.
```
http://localhost:3000/pictures
```

## /pictures/:pictureID
Shows a specific picture using its ID.
```
http://localhost:3000/pictures/1
```
Be wary that the ID is global among all pictures from all users and not for the individual user. Therefore ID = 1 only works for a specific user and not the rest.

## /albums
Shows all of user's albums.
```
http://localhost:3000/albums
```

## /albums/:albumName
Shows all pictures in selected album.
```
http://localhost:3000/albums/going-merry
http://localhost:3000/albums/going merry
```
Album name is more recognisable for users than ID, especially when these ID's are global among all users.
Names with multiple words can be written with dashes (-) or with spaces ( ).

## /favourites
Shows all of user's favourite pictures.
```
http://localhost:3000/favourites
```

# POST requests
## /new-album
Create a new album. Both ID and date_created are added automatically.
```
{
    "album_name": "Christmas 2023"
}
```
## /new-pictures
To add new pictures, you need to add following information: img_name, img_path, date_created, alt_text, tags, city, country, album_id, favourite
#### Query examples with array of arrays:
```
[
    ["IMG_005.jpg", "/path/to/IMG_005.jpg", "2023-11-28 19:00:00", "A beach photo", "beach, vacation", "Long Beach", "United States", 1, true],
    ["IMG_006.jpg", "/path/to/IMG_006.jpg", "2023-11-28 20:00:00", "A honeymoon photo", "honeymoon, couple", "Paris", "France", 2, false],
    ["IMG_007.jpg", "/path/to/IMG_007.jpg", "2023-11-28 21:00:00", "A road trip photo", "road trip, friends", "London", "United Kingdom", 1, true],
    ["IMG_008.jpg", "/path/to/IMG_008.jpg", "2023-11-28 22:00:00", "A birthday party photo", "birthday, friends", "Copenhagen", "Denmark", 3, true]
];
```
#### Query example with array of objects
```
[
    {
        "img_name": "IMG_005.jpg",
        "img_path": "/path/to/IMG_005.jpg",
        "date_created": "2023-11-28 19:00:00",
        "alt_text": "A beach photo",
        "tags": "beach, vacation",
        "city": "Long Beach",
        "country": "United States",
        "album_id": 9,
        "favourite": true
    },
    {
        "img_name": "IMG_006.jpg",
        "img_path": "/path/to/IMG_006.jpg",
        "date_created": "2023-11-28 20:00:00",
        "alt_text": "A honeymoon photo",
        "tags": "honeymoon, couple",
        "city": "Paris",
        "country": "France",
        "album_id": 8,
        "favourite": false
    }
];
```

## /add-favourite
Add a picture to your favourites by specifying the picture id.
```
{
	"picture_id": 3
}
```

## /remove-favourite
Remove a picture from your favourites by specifying the picture id.
```
{
	"picture_id": 3
}
```

## /move-picture
Move picture to another album by specifying picture_id and the name of the album it should be moved to.
```
{
	"picture_id": 3,
	"album_name": "going merry"
}
```

## /rename-album
Rename an album by specifying album_name and the new_name for the album.
```
{
	"album_name": "going merry",
	"new_name": "happy days with friends"
}
```