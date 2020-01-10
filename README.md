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

Must be logged in to update profile and 

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
## Gets First Fifty Songs
## GET api/songs
Signed in user can view all songs

No input needed.

Returns the first 50 songs ONLY. 
# 

| Method | Endpoint      |
| - | - |
| GET   | /api/songs |
    
    Output:
    id: 0,
    songid: "5PS5dpaLogPzYU9hWiWyZb",
    artist: "Karkkiautomaatti",
    track: "Tanssi vaan",
    danceability: 0.487,
    energy: 0.678,
    key: 9,
    loudness: -7.78,
    mode: 1,
    speechiness: 0.0495,
    acousticness: 0.0013,
    instrumentalness: 0.0551,
    liveness: 0.0846,
    valence: 0.87,
    tempo: 149.94,
    duration_ms: 157307,
    time_signature: 4

 #   
## Gets Favorite songs
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
    
 #   
## Gets Recommended Songs
## GET /:id/recommendation
Will get recommended songs based on the ID of the song. 

No input needed.
# 

| Method | Endpoint      |
| - | - |
| GET   | api/songs/:id(of the song)/recommendation |
    
    Output:
    "id": 1,
    "songid": "41RpZW2lxAdnqDd2nMBzLQ",
    "artist": "Hudson Mohawke",
    "track": "No One Could Ever",
    "danceability": 0.662,
    "energy": 0.823,
    "key": 4,
    "loudness": -1.711,
    "mode": 0,
    "speechiness": 0.0662,
    "acousticness": 0.0000454,
    "instrumentalness": 0.952,
    "liveness": 0.343,
    "valence": 0.621,
    "tempo": 177.745,
    "duration_ms": 138960,
    "time_signature": 4
# 
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


