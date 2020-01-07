# Backend

## Spotify Song Suggester API Guide 
# 
### Authentication Routes 
## User Registeration
## POST api/auth/register
Creates a new account for the user
# 

| Method | Endpoint      |
| - | - |
| POST   | /api/auth/register | 
    Input:
    email : "email@mail.com", (string required, unique) 
	username: "name123", (string required, unique)
	password: "password1" (string required) 
    
    Output:
    id: 5,
    email: "email@mail.com",
    username: "name123",
    password: "hashed password"
# 
## User Login
## POST api/auth/login
Signs user in and returns a JSON web token
# 

| Method | Endpoint      |
| - | - |
| POST   | /api/auth/login | 
    Input: 
	username: "name123", (string required, unique)
	password: "password1" (string required) 
    
    Output:
    token: "JSON webtoken returned"
    message: "Welcome to Spotify Song Suggester {username of user}!"
## Gets All Songs
## GET api/songs
Signed in user can view all songs

No input needed.
# 

| Method | Endpoint      |
| - | - |
| GET   | /api/songs |
    
    Output:
    {
    id: 1,
    artist: "Adele",
    genre: "Country",
    title: "Chasing Pavements",
    album: "19"
     },
      {
    id: 2,
    artist: "CHIKA",
    genre: "Rap",
    title: "High Rises",
    album: "High Rises"
    },
    {
    id: 3,
    artist: "Chance the Rapper",
    genre: "Rap",
    title: "Pusha Man",
    album: "Acid Rap"
    }

 #   
## Favorite songs
## GET api/songs/:id/favorites
Specific user favorites show up.

No input needed.
# 

| Method | Endpoint      |
| - | - |
| GET   | /api/songs/:id/favorites |
    
    Output:
    {
    users_id: (the id of the user),
    songs_id: (the id of the song),
    id: (id of the output),
    artist: (artist name),
    genre: (genre name),
    title: (title of song),
    album: (album title)
    },

## Save Favorite Songs
## GET api/songs/save
User can save songs
# 
| Method | Endpoint      |
| - | - |
| POST   | /api/songs/save | 
    Input:
    {
	users_id: (integer),
	songs_id: (integer, unique (cannot save same song twice))
    } 
    
    Output: 
    {id: 3,
    artist: "Chance the Rapper",
    genre: "Rap",
    title: "Pusha Man",
    album: "Acid Rap"
    }
# 


