# Endpoints
🌐https://bw-water-my-plants-07-back-end.herokuapp.com/

## ---AUTH----

`[POST]` /api/auth/login

`[POST]` /api/auth/register


## ---PLANTS---

`[GET]` /api/plants/

* NEED AUTHORIZATION HEADER
* View a User's plants by user_id


`[GET]` /api/plants/:id

* NEED AUTHORIZATION HEADER
* View a User's specific plant by plant_id

  
`[POST]` /api/plants/

* NEED AUTHORIZATION HEADER
* Update the info of a given plant

Fields:
* nickname
* species
* h2oFrequency: enum \*\*
* image: link or path (optional)

\*\* **Options:** [ 'none', 'daily', 'twice a week', 'weekly', 'every two weeks', 'every three weeks' ]



## ---USERS---

`[GET]` /api/users/

* NEED AUTHORIZATION HEADER
* view user info of LOGGED IN User

`[PUT]` /api/users

* NEED AUTHORIZATION HEADER
* update user info of LOGGED IN User

Fields:
* username
* phoneNumber
