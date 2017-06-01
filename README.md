# README #
# All Kept Origional #
## Actors ##
* User

### User ###
* view/browse ads
    * sort by latest/earliest
    * browse by category
* search ad
    * filter by location/category
* bookmark ad
* create account
* login/logout with account
* manage account
    * edit info/details
    * delete account
* manage ads
    * create ad
    * edit ad
    * remove ad
    * request ad promotion
* compose message
* manage inbox
    * view messages
    * reply to messages
    * delete messages
* report bug issues
* report misused ads

## URLs ##
* GET /ads (get list of ads)
    * limit, count as params
    * responds with json array
* GET /ads/:query (get list of searched ads)
    * query, limit, count as params
    * responds with json array
* GET /ads/:id (Get single ad)
    * id as param
    * repsonds json object
* GET /image/:id.jpg
    * id as param
    * return base64 resource
* GET /image/thumb/:id.jpg
    * id as param
    * returns base64 resource
* GET /users/messages (get messages)
    * returns json resource
    * requires access token
* POST /users/messages (send new message)
    * returns status code
    * requires access token
* POST /users/new (create new user)
    * returns status code
* POST /users/auth (user auth)
    * returns access token
* POST /users/recovery (recover account)
    * returns status code
* POST /users/ads (create new ad)
    * resurns status code
    * requires access token
* PUT /promotion/ads/:id (request promotion)
    * returns status code
    * requires access token
* DELETE /ads/:id (Delete single ad)
    * returns status code
    * requires access token
* DELETE /users/:id (Delete account)
    * requires access token, password