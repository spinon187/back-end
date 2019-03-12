# back-end

| Endpoint | Description |
| --- | --- |
| User Database Endpoints |
| --- |
| `POST /api/register` | Expects an object with a username and password |
| `POST /api/login` | Expects an object with a username and password, returns a security token |
| `GET /api/users` | Returns a list of all registered users |
| `GET /api/users/:user_id` | Returns only the specified user |
| `PUT /api/users/:user_id` | Updates username and password |
| `DELETE /api/users/:user_id` | Deletes the specified user |
| Item Database Endpoints |
| --- |
| `GET /api/users/:user_id/all` | Returns a list of all available items in the item database |
| `POST api/users/:user_id/add` | Expects an object with a name(string) and category(string), and adds it to the items database |
| `GET /api/users/:user_id/:item_id` | Returns an item with the specified id number |
| `PUT /api/users/:user_id/update/:item_id` | Need to test this one out first |
| `DELETE /api/users/:user_id/delete/:item_id` | Deletes an item with the specified id from the items database |
| Top 9 Database Endpoints |
| --- |
| `GET /api/users/:user_id/topnine` | Returns a list of the specified user's Top 9 items |
| `POST /api/users/:user_id/topnine` | Expects an object with id(integer), category(string), and position(integer) properties and adds it to the user's Top 9 |
| `PUT /api/users/:user_id/topnine/:id` | Expects an object with id(integer), category(string), and position(integer) properties and updates an entry already in the user's Top 9|
| `DELETE /api/users/:user_id/topnine/:id` | Deletes an item with the specified id from the user's Top 9 |