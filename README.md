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


