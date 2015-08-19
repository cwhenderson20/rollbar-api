## Functions
<dl>
<dt><a href="#inviteUserToTeam">`inviteUserToTeam(teamId, options, callback)`</a></dt>
<dd><p>Invite a user to a team.</p>
</dd>
<dt><a href="#getInvite">`getInvite(inviteId, callback)`</a></dt>
<dd><p>Get information about an invite</p>
</dd>
<dt><a href="#listInvites">`listInvites(teamId, callback)`</a></dt>
<dd><p>List invites for a team</p>
</dd>
<dt><a href="#cancelInvite">`cancelInvite(inviteId, callback)`</a></dt>
<dd><p>Cancel an invite</p>
</dd>
<dt><a href="#getItemById">`getItemById()`</a></dt>
<dd><p>Get an item by its ID</p>
</dd>
<dt><a href="#getItemByCounter">`getItemByCounter()`</a></dt>
<dd><p>Get an item by its counter</p>
</dd>
<dt><a href="#listItems">`listItems()`</a></dt>
<dd><p>List all items</p>
</dd>
<dt><a href="#modifyItem">`modifyItem()`</a></dt>
<dd><p>Modify a specific item</p>
</dd>
<dt><a href="#createItem">`createItem()`</a></dt>
<dd><p>Create an item</p>
</dd>
<dt><a href="#getOccurrenceById">`getOccurrenceById()`</a></dt>
<dd><p>Get an occurrence by its ID</p>
</dd>
<dt><a href="#listOccurrences">`listOccurrences()`</a></dt>
<dd><p>List all occurrences</p>
</dd>
<dt><a href="#listOccurrencesOfItem">`listOccurrencesOfItem()`</a></dt>
<dd><p>List all occurrences of a specific item</p>
</dd>
<dt><a href="#deleteOccurrence">`deleteOccurrence()`</a></dt>
<dd><p>Permanently delete an occurrence</p>
</dd>
<dt><a href="#listProjects">`listProjects(callback)`</a></dt>
<dd><p>List projects in the account</p>
</dd>
<dt><a href="#getProject">`getProject(projectId, callback)`</a></dt>
<dd><p>Gets information about the specified project.</p>
</dd>
<dt><a href="#deleteProject">`deleteProject(projectId, callback)`</a></dt>
<dd><p>Deletes the specified project.</p>
</dd>
<dt><a href="#createProject">`createProject(projectName, callback)`</a></dt>
<dd><p>Creates a new project in the authenticated account.</p>
</dd>
<dt><a href="#listProjectAccessTokens">`listProjectAccessTokens(projectId, callback)`</a></dt>
<dd><p>List all access tokens for the specified project.</p>
</dd>
<dt><a href="#updateAccessTokenRateLimit">`updateAccessTokenRateLimit(projectId, accessToken, [options], callback)`</a></dt>
<dd><p>Updates a project access token&#39;s rate limit settings</p>
</dd>
<dt><a href="#topRecentActiveItems">`topRecentActiveItems()`</a></dt>
<dd><p>Analogous to the &#39;Top 10 items in last 24 hours&#39; report on the Dashboard.
Returns the top 10 active items in the specified environments (default &#39;any environment&#39;), ordered descending by level (critical first) and then descending by the count within the specied time period (default &#39;last 24 hours&#39;).</p>
<p>The return value includes both the items and an array of the counts for each hour. The counts array has the oldest counts first.</p>
</dd>
<dt><a href="#occurrenceCounts">`occurrenceCounts()`</a></dt>
<dd><p>Analogous to &#39;Hourly Error/Critical Occurrences&#39; and &#39;Daily Error/Critical Occurrences&#39; on the Dashboard.
Returns an array of recent counts as [timestamp, count] pairs, where each count is the number of matching occurrences in the time range [timestamp, timestamp + bucket_size - 1].</p>
</dd>
<dt><a href="#activatedCounts">`activatedCounts()`</a></dt>
<dd><p>Analogous to &#39;Daily New/Reactivated Items&#39; graph on the Dashboard.
Returns an array of recent counts as [timestamp, count] pairs, where each count is the number of items that were first seen or reactivated in the time range [timestamp, timestamp + bucket_size - 1].</p>
</dd>
<dt><a href="#getTeam">`getTeam(teamId, callback)`</a></dt>
<dd><p>Get info about a team</p>
</dd>
<dt><a href="#listTeams">`listTeams([options], callback)`</a></dt>
<dd><p>List teams for the authenticated account</p>
</dd>
<dt><a href="#createTeam">`createTeam(options, callback)`</a></dt>
<dd><p>Create a new Rollbar team</p>
</dd>
<dt><a href="#deleteTeam">`deleteTeam(teamId, callback)`</a></dt>
<dd><p>Delete a specified team</p>
</dd>
<dt><a href="#isProjectInTeam">`isProjectInTeam()`</a></dt>
<dd><p>Check if a project is in a team</p>
</dd>
<dt><a href="#addProjectToTeam">`addProjectToTeam(teamId, projectId, callback)`</a></dt>
<dd><p>Adds a specified project to a specified team</p>
</dd>
<dt><a href="#removeProjectFromTeam">`removeProjectFromTeam(teamId, projectId, callback)`</a></dt>
<dd><p>Remove a project from a team</p>
</dd>
<dt><a href="#checkTeamMembership">`checkTeamMembership(teamId, userId, callback)`</a></dt>
<dd><p>Check team membership</p>
</dd>
<dt><a href="#listTeamMembers">`listTeamMembers(teamId, [options], callback)`</a></dt>
<dd><p>List team members</p>
</dd>
<dt><a href="#removeUserFromTeam">`removeUserFromTeam(teamId, userId, callback)`</a></dt>
<dd><p>Remove a user from a team</p>
</dd>
<dt><a href="#getUser">`getUser(userId, callback)`</a></dt>
<dd><p>Return basic information about the user</p>
</dd>
</dl>
## Typedefs
<dl>
<dt><a href="#requestCallback">`requestCallback`</a> : <code>function</code></dt>
<dd><p>A function to be called after request completion</p>
</dd>
<dt><a href="#responseObject">`responseObject`</a></dt>
<dd><p>A response object for successful API calls</p>
</dd>
<dt><a href="#RollbarAPIError">`RollbarAPIError`</a></dt>
<dd><p>A Rollbar API error</p>
</dd>
</dl>
<a name="inviteUserToTeam"></a>
## `inviteUserToTeam(teamId, options, callback)`
Invite a user to a team.

**Kind**: global function  
**See**: https://rollbar.com/docs/api/provisioning/#invite-the-user-to-the-team  

| Param | Type | Description |
| --- | --- | --- |
| teamId | <code>String</code> | Team ID of the team to which the user will be invited. |
| options | <code>Object</code> | Options object |
| options.email | <code>String</code> | Email address of the user to invite |
| callback | <code>[requestCallback](#requestCallback)</code> |  |

<a name="getInvite"></a>
## `getInvite(inviteId, callback)`
Get information about an invite

**Kind**: global function  
**See**: https://rollbar.com/docs/api/invites/#get-an-invite  

| Param | Type | Description |
| --- | --- | --- |
| inviteId | <code>String</code> | Invite ID about which to get information |
| callback | <code>[requestCallback](#requestCallback)</code> |  |

<a name="listInvites"></a>
## `listInvites(teamId, callback)`
List invites for a team

**Kind**: global function  
**See**: https://rollbar.com/docs/api/invites/#list-invites-for-a-team  

| Param | Type | Description |
| --- | --- | --- |
| teamId | <code>String</code> | Team ID for which to list invites |
| callback | <code>[requestCallback](#requestCallback)</code> |  |

<a name="cancelInvite"></a>
## `cancelInvite(inviteId, callback)`
Cancel an invite

**Kind**: global function  
**See**: https://rollbar.com/docs/api/invites/#cancel-an-invite  

| Param | Type | Description |
| --- | --- | --- |
| inviteId | <code>String</code> | Invite ID of the invite to cancel |
| callback | <code>[requestCallback](#requestCallback)</code> |  |

<a name="getItemById"></a>
## `getItemById()`
Get an item by its ID

**Kind**: global function  
**See**: https://rollbar.com/docs/api/items/#get-an-item-by-id  
<a name="getItemByCounter"></a>
## `getItemByCounter()`
Get an item by its counter

**Kind**: global function  
**See**: https://rollbar.com/docs/api/items/#get-an-item-by-counter  
<a name="listItems"></a>
## `listItems()`
List all items

**Kind**: global function  
**See**: https://rollbar.com/docs/api/items/#list-all-items  
<a name="modifyItem"></a>
## `modifyItem()`
Modify a specific item

**Kind**: global function  
**See**: https://rollbar.com/docs/api/items/#modify-an-item  
<a name="createItem"></a>
## `createItem()`
Create an item

**Kind**: global function  
**See**: https://rollbar.com/docs/api/items_post/  
<a name="getOccurrenceById"></a>
## `getOccurrenceById()`
Get an occurrence by its ID

**Kind**: global function  
**See**: https://rollbar.com/docs/api/occurrences/#get-an-occurrence-by-id  
<a name="listOccurrences"></a>
## `listOccurrences()`
List all occurrences

**Kind**: global function  
**See**: https://rollbar.com/docs/api/occurrences/#list-all-occurrences  
<a name="listOccurrencesOfItem"></a>
## `listOccurrencesOfItem()`
List all occurrences of a specific item

**Kind**: global function  
**See**: https://rollbar.com/docs/api/occurrences/#list-all-occurrences-of-an-item  
<a name="deleteOccurrence"></a>
## `deleteOccurrence()`
Permanently delete an occurrence

**Kind**: global function  
**See**: https://rollbar.com/docs/api/occurrences/#delete-an-occurrence  
<a name="listProjects"></a>
## `listProjects(callback)`
List projects in the account

**Kind**: global function  
**See**: https://rollbar.com/docs/api/projects/#list-your-projects  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>[requestCallback](#requestCallback)</code> | Callback for response |

**Example**  
```js
listProjects(function (err, res) {...});
```
<a name="getProject"></a>
## `getProject(projectId, callback)`
Gets information about the specified project.

**Kind**: global function  
**See**: https://rollbar.com/docs/api/projects/#get-a-project  

| Param | Type | Description |
| --- | --- | --- |
| projectId | <code>String</code> | Project ID of the project about which to return information |
| callback | <code>[requestCallback](#requestCallback)</code> |  |

<a name="deleteProject"></a>
## `deleteProject(projectId, callback)`
Deletes the specified project.

**Kind**: global function  
**See**: https://rollbar.com/docs/api/projects/#delete-a-project  

| Param | Type | Description |
| --- | --- | --- |
| projectId | <code>String</code> | Project ID of the project to be deleted. |
| callback | <code>[requestCallback](#requestCallback)</code> |  |

<a name="createProject"></a>
## `createProject(projectName, callback)`
Creates a new project in the authenticated account.

**Kind**: global function  
**See**: https://rollbar.com/docs/api/projects/#create-a-project  

| Param | Type | Description |
| --- | --- | --- |
| projectName | <code>String</code> | Name of the project. Must start with a letter and can contain letters, numbers, spaces, underscores, hyphens, periods, and commas. Max length 32 characters. |
| callback | <code>[requestCallback](#requestCallback)</code> |  |

<a name="listProjectAccessTokens"></a>
## `listProjectAccessTokens(projectId, callback)`
List all access tokens for the specified project.

**Kind**: global function  
**See**: https://rollbar.com/docs/api/projects/#list-project-access-tokens  

| Param | Type | Description |
| --- | --- | --- |
| projectId | <code>String</code> | Project ID whose access tokens should be returned. |
| callback | <code>[requestCallback](#requestCallback)</code> |  |

<a name="updateAccessTokenRateLimit"></a>
## `updateAccessTokenRateLimit(projectId, accessToken, [options], callback)`
Updates a project access token's rate limit settings

**Kind**: global function  
**See**: https://rollbar.com/docs/api/projects/#update-rate-limits-for-a-project-access-token  

| Param | Type | Description |
| --- | --- | --- |
| projectId | <code>String</code> | Project ID whose access token will be updated |
| accessToken | <code>String</code> | Access token to update |
| [options] | <code>Object</code> | Access token settings |
| [options.rate_limit_window_count] | <code>Integer</code> | Optional. Max number of calls the token is permitted within each window. Must be greater than -1. |
| [options.rate_limit_window_size] | <code>Integer</code> | Optional. Window duration, in seconds. Must be greater than -1. |
| callback | <code>[requestCallback](#requestCallback)</code> |  |

<a name="topRecentActiveItems"></a>
## `topRecentActiveItems()`
Analogous to the 'Top 10 items in last 24 hours' report on the Dashboard.
Returns the top 10 active items in the specified environments (default 'any environment'), ordered descending by level (critical first) and then descending by the count within the specied time period (default 'last 24 hours').

The return value includes both the items and an array of the counts for each hour. The counts array has the oldest counts first.

**Kind**: global function  
**See**: https://rollbar.com/docs/api/reports/#top-recent-active-items  
<a name="occurrenceCounts"></a>
## `occurrenceCounts()`
Analogous to 'Hourly Error/Critical Occurrences' and 'Daily Error/Critical Occurrences' on the Dashboard.
Returns an array of recent counts as [timestamp, count] pairs, where each count is the number of matching occurrences in the time range [timestamp, timestamp + bucket_size - 1].

**Kind**: global function  
**See**: https://rollbar.com/docs/api/reports/#occurrence-counts  
<a name="activatedCounts"></a>
## `activatedCounts()`
Analogous to 'Daily New/Reactivated Items' graph on the Dashboard.
Returns an array of recent counts as [timestamp, count] pairs, where each count is the number of items that were first seen or reactivated in the time range [timestamp, timestamp + bucket_size - 1].

**Kind**: global function  
**See**: https://rollbar.com/docs/api/reports/#activated-counts  
<a name="getTeam"></a>
## `getTeam(teamId, callback)`
Get info about a team

**Kind**: global function  
**See**: https://rollbar.com/docs/api/teams/#get-a-team  

| Param | Type | Description |
| --- | --- | --- |
| teamId | <code>String</code> | Team ID of the team about which to return information |
| callback | <code>[requestCallback](#requestCallback)</code> |  |

<a name="listTeams"></a>
## `listTeams([options], callback)`
List teams for the authenticated account

**Kind**: global function  
**See**: https://rollbar.com/docs/api/teams/#list-your-teams  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | Optional object to access pagination in results |
| options.page | <code>String</code> &#124; <code>Integer</code> | The Rollbar API will list 20 teams per page; view more results by increasing the page number |
| callback | <code>[requestCallback](#requestCallback)</code> |  |

<a name="createTeam"></a>
## `createTeam(options, callback)`
Create a new Rollbar team

**Kind**: global function  
**See**: https://rollbar.com/docs/api/teams/#create-a-team  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options for the newly created team |
| options.name | <code>String</code> | The name of the newly created team |
| options.access_level | <code>String</code> | Access level of the new team |
| callback | <code>[requestCallback](#requestCallback)</code> |  |

<a name="deleteTeam"></a>
## `deleteTeam(teamId, callback)`
Delete a specified team

**Kind**: global function  
**See**: https://rollbar.com/docs/api/teams/#delete-a-team  

| Param | Type | Description |
| --- | --- | --- |
| teamId | <code>String</code> | Team ID of the team to delete |
| callback | <code>[requestCallback](#requestCallback)</code> |  |

<a name="isProjectInTeam"></a>
## `isProjectInTeam()`
Check if a project is in a team

**Kind**: global function  
**See**: https://rollbar.com/docs/api/teams/#check-if-a-project-is-in-a-team  
<a name="addProjectToTeam"></a>
## `addProjectToTeam(teamId, projectId, callback)`
Adds a specified project to a specified team

**Kind**: global function  
**See**: https://rollbar.com/docs/api/teams/#add-a-project-to-a-team  

| Param | Type | Description |
| --- | --- | --- |
| teamId | <code>String</code> &#124; <code>Integer</code> | Team ID of the team to add to a project |
| projectId | <code>String</code> &#124; <code>Integer</code> | Project ID of the project to which the team will be added |
| callback | <code>[requestCallback](#requestCallback)</code> |  |

<a name="removeProjectFromTeam"></a>
## `removeProjectFromTeam(teamId, projectId, callback)`
Remove a project from a team

**Kind**: global function  
**See**: https://rollbar.com/docs/api/teams/#remove-a-project-from-a-team  

| Param | Type | Description |
| --- | --- | --- |
| teamId | <code>String</code> &#124; <code>Integer</code> | Team ID of the team from which to remove the project |
| projectId | <code>String</code> &#124; <code>Integer</code> | Project ID of the project to remove from the team |
| callback | <code>[requestCallback](#requestCallback)</code> |  |

<a name="checkTeamMembership"></a>
## `checkTeamMembership(teamId, userId, callback)`
Check team membership

**Kind**: global function  
**See**: https://rollbar.com/docs/api/teams/#check-team-membership  

| Param | Type | Description |
| --- | --- | --- |
| teamId | <code>String</code> &#124; <code>Integer</code> | Team ID to check for membership |
| userId | <code>String</code> &#124; <code>Integer</code> | User ID to check for membership |
| callback | <code>[requestCallback](#requestCallback)</code> |  |

<a name="listTeamMembers"></a>
## `listTeamMembers(teamId, [options], callback)`
List team members

**Kind**: global function  
**See**: https://rollbar.com/docs/api/teams/#list-team-members  

| Param | Type | Description |
| --- | --- | --- |
| teamId | <code>String</code> &#124; <code>Integer</code> | Team ID for which to list members |
| [options] | <code>Object</code> | Optional object for pagination settings |
| options.page | <code>Integer</code> | The Rollbar API lists 5000 results by default. Increase the page number to list more |
| callback | <code>[requestCallback](#requestCallback)</code> |  |

<a name="removeUserFromTeam"></a>
## `removeUserFromTeam(teamId, userId, callback)`
Remove a user from a team

**Kind**: global function  
**See**: https://rollbar.com/docs/api/teams/#remove-a-user-from-a-team  

| Param | Type | Description |
| --- | --- | --- |
| teamId | <code>String</code> &#124; <code>Integer</code> | Team ID of the team from which to remove a user |
| userId | <code>String</code> &#124; <code>Integer</code> | User ID of the user to remove from a team |
| callback | <code>[requestCallback](#requestCallback)</code> |  |

<a name="getUser"></a>
## `getUser(userId, callback)`
Return basic information about the user

**Kind**: global function  
**See**: https://rollbar.com/docs/api/users/#get-a-user  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>String</code> &#124; <code>Integer</code> | User ID for the user about which to get information |
| callback | <code>[requestCallback](#requestCallback)</code> |  |

<a name="requestCallback"></a>
## `requestCallback` : <code>function</code>
A function to be called after request completion

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> &#124; <code>[RollbarAPIError](#RollbarAPIError)</code> | An error object, indicating that something went wrong with the request or the request was received but unsuccessful. |
| response | <code>[responseObject](#responseObject)</code> | Contains response information if the request was complete and successful. |

<a name="responseObject"></a>
## `responseObject`
A response object for successful API calls

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| statusCode | <code>Number</code> | The HTTP status code of the response (always 200) |
| headers | <code>Object</code> | A JSON-serialized copy of the response headers for the request |
| body | <code>Object</code> &#124; <code>Array</code> | The response body of the request |

<a name="RollbarAPIError"></a>
## `RollbarAPIError`
A Rollbar API error

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Is always RollbarAPIError |
| message | <code>String</code> | Contains the error message returned from the server |
| statusCode | <code>Number</code> | The HTTP response code of the request |
| statusMessage | <code>String</code> | The message corresponding to the HTTP response code |

