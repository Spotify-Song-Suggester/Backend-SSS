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
    id: "id of user",
    username: "username of user",
    token: "JSON webtoken returned"
    message: "Welcome to Spotify Song Suggester {username of user}!"
# 
## Updates Profile
## PUT api/auth/:id
User can update profile infomation. 

Must be logged in to update profile. 

# 
| Method | Endpoint      |
| - | - |
| PUT   | /api/auth/:id | 
    Input: 
	username: "user",
	password: "user"
    
    Output: 
    username: "updated username",
	password: "updated password"
    

# 
## Gets All Songs
## GET api/songs
Signed in user can view all songs

No input needed.
# 

| Method | Endpoint      |
| - | - |
| GET   | /api/songs |
    
    Output:
    id: 1,
    artist: "Adele",
    track: "Chasing Pavements",
    danceability: "0.78",
    energy: "0.87",
    key: "9",
    loudness: "0.87",
    mode: "1",
    speechiness: "0.87",
    acousticness: "0.87",
    instrumentalness: "0.87",
    liveness: "0.87",
    valence: "0.87",
    tempo: "0.87",
    duration_ms: "0.87",
    time_signature: "4"

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
    users_id: 4,
    songs_id: 3,
    id: 3,
    artist: "Chance the Rapper",
    track: "Pusha Man",
    danceability: "0.78",
    energy: "0.87",
    key: "9",
    loudness: "0.87",
    mode: "1",
    speechiness: "0.87",
    acousticness: "0.87",
    instrumentalness: "0.87",
    liveness: "0.87",
    valence: "0.87",
    tempo: "0.87",
    duration_ms: "0.87",
    time_signature: "4"
    

## Save Favorite Songs
## POST api/songs/save
User can save songs
# 
| Method | Endpoint      |
| - | - |
| POST   | /api/songs/save | 
    Input:
	users_id: (integer),
	songs_id: (integer, unique (cannot save same song twice))
    
    Output: 
    id: 3,
    artist: "Chance the Rapper",
    track: "Pusha Man",
    danceability: "0.78",
    energy: "0.87",
    key: "9",
    loudness: "0.87",
    mode: "1",
    speechiness: "0.87",
    acousticness: "0.87",
    instrumentalness: "0.87",
    liveness: "0.87",
    valence: "0.87",
    tempo: "0.87",
    duration_ms: "0.87",
    time_signature: "4"
    
# 
## Delete Favorite Songs
## DEL api/songs/:users_id/favorites/songs_id
User can delete songs from favorites list

No input needed. 

GET api/songs/:id/favorites will be automatically updated with new favorites list. 
# 
| Method | Endpoint      |
| - | - |
| DEL   | /api/songs/:users_id/favorites/songs_id | 
    Output: 
    message: "Song deleted from favorites!"
    
    Output if song does not exist in favorites list: "Song ID does not exist in favorites list."
# 


