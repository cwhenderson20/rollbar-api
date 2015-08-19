# Rollbar Web API for Node
[![Build Status](https://travis-ci.org/cwhenderson20/rollbar-api.svg?branch=master)](https://travis-ci.org/cwhenderson20/rollbar-api)
[![Coverage Status](https://coveralls.io/repos/cwhenderson20/rollbar-api/badge.svg?branch=master&service=github)](https://coveralls.io/github/cwhenderson20/rollbar-api?branch=master)

A node.js wrapper for the Rollbar Web API. Rollbar already provides [an SDK for node.js applications](https://rollbar.com/docs/notifier/node_rollbar/), so if you're looking to track errors and crashes, you should check that out first. Although there are plans to implement the Rollbar notifier functionalities in this project, they are not currently included.

What this package does, however, is provide you with a way to access an manipulate Rollbar account information. For example, if you want a way to programmatically look up or create new Rollbar projects and grab the relevent access tokens, this module is for you.

Included functions:

#### Invites
- Invite a user to a team
- Get information about an invitation
- List all invitations for a team
- Cancel a pending invitation

#### Items (GET, PATCH)
- _Coming soon_
  + ~~Get an item by its ID~~
  + ~~Get an item by its counter~~
  + ~~List all items~~
  + ~~Modify an item~~

#### Items (POST)
- _Coming soon_
  + ~~Create an item~~

#### Occurrences
- _Coming soon_
  + ~~Get an occurrence by its ID~~
  + ~~List occurrences~~
  + ~~List occurrences of a specific item~~
  + ~~Delete an occurrence~~

#### Projects
- List projects in an account
- Get information about a specific project
- Delete a project
- Create a project
- List project access tokens
- Update project access token rate limits

#### Reports
- _Coming soon_
  + ~~Get top recent active items~~
  + ~~Get occurrence counts~~
  + ~~Get activated counts~~

#### Teams
- Get information about a specific team
- List teams for an account
- Create a new team
- Delete a team
- Check if a project is within a specific team
- Add a project to a team
- Remove a project from a team
- Check if a user is part of a team
- List team members
- Remove a user from a team

#### Users
- Get information about a specific user


## Installation
```bash
$ npm install --save
```

## Usage
As of now, only account-level functions are included (i.e., any function requiring a project-level access token would not work under the current configuration).

Therefore, the tokens you should pass upon instantiation are the read and write tokens found in your [Rollbar account settings](https://rollbar.com/settings/).

```javascript
var Rollbar = require('rollbar-api');
var rollbar = new Rollbar({
  read: '<account_read_token>',
  write: '<account_write_token>'
});
```

Then, you can use methods to interact directly with Rollbar API
```javascript
// get a list of projects
rollbar.listProjects(function (err, res) {
  if (err) {
    return console.log(err.message);
  }
  console.log("Array of projects", res.body);
});
```

### Interacting with Responses

#### Errors

Callbacks will receive an error object if:
  1. _Either_ the http request itself was unsuccessful
  1. _Or_ the response from Rollbar was an error (http status code of >`200`)

Examples of the latter include attempting to make API calls with the incorrect token or trying to access information that does not exist (e.g., calling `getUser()` on a nonexistent user ID).

Rollbar API-type error objects have the following properties:

```javascript
{
  name: "RollbarAPIError",
  message: "<message from Rollbar API>",
  statusCode: "<numeric http status code from Rollbar API>",
  statusMessage: "<http status message corresponding to statusCode>"
}
```
where `statusCode` can be any of `400`, `403`, `404`, `413`, `422`, or `429`. See [this page](https://rollbar.com/docs/api_overview/) for more information.

#### Responses

If the http request was successful and the Rollbar API processes the request, a response will be returned. All responses have the following properties:

```javascript
{
  statusCode: 200,
  headers: {
    // http headers
  },
  body: {
    // json-encoded reply from the API
  }
}
```
where `headers` are from an [http.incomingMessage](http://nodejs.org/api/http.html#http_http_incomingmessage) instance.

## Methods
View documentation [here](https://github.com/cwhenderson20/rollbar-api/tree/master/docs).

## Debugging
You can start your application with a debug environment variable to view the raw http requests (being sent through the awesome [request](https://github.com/request/request) package) like this:

```bash
NODE_DEBUG=request node app.js
```

## Tests
You can run unit tests with `mocha`.
