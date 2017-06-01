# README #

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
* GET /ads/:id (Get single ad)
* GET /image/:id.jpg
* GET /image/thumb/:id.jpg
* GET /users/messages (get messages)
* POST /users/messages (send new message)
* POST /users/new (create new user)
* POST /users/auth (user auth)
* POST /users/recovery (recover account)
* POST /users/ads (create new ad)
* PUT /promotion/ads/:id (request promotion)
* DELETE /ads/:id (Delete single ad)
* DELETE /users/:id (Delete account)