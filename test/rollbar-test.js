var request = require('request');
var nock = require('nock');
var assert = require('chai').assert;
var Rollbar = require('../lib/rollbar');
var ApiError = require('../lib/api-error');

describe('Rollbar', function () {
  describe('Instantiation', function () {
    it('exists', function () {
      assert.isFunction(Rollbar);
    });

    it('requires an object as a parameter', function () {
      assert.throw(function () {
        new Rollbar('123');
      }, Error);
      assert.throw(function () {
        new Rollbar();
      }, Error);
    });

    it('requires both read and write tokens in the object parameter', function () {
      assert.throw(function () {
        new Rollbar({
          read: '123'
        });
      }, Error);
      assert.throw(function () {
        new Rollbar({
          write: '123'
        }, Error);
      });
    });
  });

  describe('API', function () {
    var api;
    var BASE_URL = 'https://api.rollbar.com/api/1';
    var EXAMPLE_PROJ = {
      id: 1234,
      account_id: 5678,
      status: 'enabled',
      settings_data: {
        fingerprint_versions: {
          'browser.browser-js': 1
        },
        integrations: {
          jira: {},
          pagerduty: {},
          bitbucket: {},
          github: {},
          trello: {},
          slack: {},
          campfire: {},
          webhook: {},
          victorops: {},
          asana: {},
          pivotal: {},
          flowdock: {},
          sprintly: {},
          hipchat: {},
          email: {
            enabled: true
          }
        }
      },
      date_created: 1439701433,
      date_modified: 1439701433,
      name: 'Test-Project'
    };

    beforeEach(function () {
      api = new Rollbar({
        read: 'read123',
        write: 'write123'
      });
    });

    describe('Invite functions', function () {
      it('gets an invite', function () {
        nock(BASE_URL)
          .get('/invite/1234')
          .query({
            access_token: 'read123'
          })
          .reply(200, {
            err: 0,
            result: {
              id: 1234,
              from_user_id: 1234,
              team_id: 1234,
              to_email: 'example@fake.com',
              status: 'pending'
            }
          });

        api.getInvite(1234, function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.deepEqual(res.body, {
            id: 1234,
            from_user_id: 1234,
            team_id: 1234,
            to_email: 'example@fake.com',
            status: 'pending'
          });
        });
      });

      it('lists invites', function () {
        var RESPONSE = [{
          id: 1234,
          from_user_id: 1234,
          team_id: 1234,
          to_email: 'example@fake.com',
          status: 'pending'
        }];

        nock(BASE_URL)
          .get('/team/1234/invites')
          .query({
            access_token: 'read123'
          })
          .reply(200, {
            err: 0,
            result: RESPONSE
          });

        api.listInvites(1234, function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.deepEqual(res.body, RESPONSE);
        });
      });

      it('cancels an invite', function () {
        nock(BASE_URL)
          .delete('/invite/1234')
          .query({
            access_token: 'write123'
          })
          .reply(200, {
            err: 0
          });

        api.cancelInvite(1234, function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.strictEqual(res.body, undefined);
        });
      });

      it('invites a user to a team', function () {
        nock(BASE_URL)
          .post('/team/1234/invites', {
            email: 'example@fake.com'
          })
          .query({
            access_token: 'write123'
          })
          .reply(200, {
            err: 0,
            result: {
              id: 1234,
              team_id: 1234,
              to_email: 'example@fake.com',
              status: 'pending'
            }
          });

        api.inviteUserToTeam(1234, {
          email: 'example@fake.com'
        }, function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.deepEqual(res.body, {
            id: 1234,
            team_id: 1234,
            to_email: 'example@fake.com',
            status: 'pending'
          });
        });
      });

      it('requires the options be in object form', function () {
        assert.throws(function () {
          api.inviteUserToTeam(1234, 'example@fake.com');
        });
      });
    });

    describe('Project functions', function () {
      it('lists projects', function () {
        nock(BASE_URL)
          .get('/projects')
          .query({
            access_token: 'read123'
          })
          .reply(200, {
            err: 0,
            result: [EXAMPLE_PROJ]
          });

        api.listProjects(function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.strictEqual(res.body[0].id, 1234);
        });
      });

      it('gets a specific project', function () {
        nock(BASE_URL)
          .get('/project/1234')
          .query({
            access_token: 'read123'
          })
          .reply(200, {
            err: 0,
            result: EXAMPLE_PROJ
          });

        api.getProject(1234, function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.deepEqual(res.body, EXAMPLE_PROJ);
        });
      });

      it('deletes a project', function () {
        nock(BASE_URL)
          .delete('/project/1234')
          .query({
            access_token: 'write123'
          })
          .reply(200, {
            err: 0
          });

        api.deleteProject(1234, function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.isUndefined(res.body);
        });
      });

      it('creates a project', function () {
        nock(BASE_URL)
          .post('/projects', {
            name: 'Sample-Project'
          })
          .query({
            access_token: 'write123'
          })
          .reply(200, {
            err: 0,
            result: EXAMPLE_PROJ
          });

        api.createProject('Sample-Project', function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.deepEqual(res.body, EXAMPLE_PROJ);
        });
      });

      it('requires the project name to be a string', function () {
        assert.throws(function () {
          api.createProject({
            'Sample-Project': 'Title'
          });
        });
      });

      it('list project access tokens', function () {
        var tokenList = [{
          project_id: 1234,
          access_token: 'abc123',
          name: 'write',
          status: 'enabled',
          scopes: [
            'write'
          ]
        }, {
          project_id: 1234,
          access_token: 'abc123',
          name: 'read',
          status: 'enabled',
          scopes: [
            'read'
          ]
        }];

        nock(BASE_URL)
          .get('/project/1234/access_tokens')
          .query({
            access_token: 'read123'
          })
          .reply(200, {
            err: 0,
            result: tokenList
          });

        api.listProjectAccessTokens(1234, function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.deepEqual(res.body, tokenList);
        });
      });

      it('updates access token rate limits', function () {
        nock(BASE_URL)
          .patch('/project/1234/access_token/abc123')
          .query({
            access_token: 'write123'
          })
          .reply(200, {
            err: 0
          });

        api.updateAccessTokenRateLimit(1234, 'abc123', {
          rate_limit_window_count: 100
        }, function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.isUndefined(res.body);
        });
      });
    });

    describe('Team functions', function () {
      it('gets a specific team', function () {
        nock(BASE_URL)
          .get('/team/1234')
          .query({
            access_token: 'read123'
          })
          .reply(200, {
            err: 0,
            result: {
              id: 1234,
              account_id: 1234,
              name: 'Example Team',
              access_level: 'standard'
            }
          });

        api.getTeam(1234, function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.strictEqual(res.body.id, 1234);
        });
      });

      it('lists teams', function () {
        nock(BASE_URL)
          .get('/teams')
          .query({
            access_token: 'read123',
            page: 2
          })
          .reply(200, {
            err: 0,
            result: {
              team1: 'string'
            }
          });

        api.listTeams({
          page: 2
        }, function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.deepEqual(res.body, {
            team1: 'string'
          });
        });

        nock(BASE_URL)
          .get('/teams')
          .query({
            access_token: 'read123'
          })
          .reply(200, {
            err: 0,
            result: {
              team2: 'string'
            }
          });

        api.listTeams(function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.deepEqual(res.body, {
            team2: 'string'
          });
        });
      });

      it('creates a team', function () {
        var REPLY = {
          id: 1234,
          account_id: 'abc1234',
          name: 'Example Team',
          access_level: 'standard'
        };

        nock(BASE_URL)
          .post('/teams', {
            name: 'Example Team',
            access_level: 'standard'
          })
          .query({
            access_token: 'write123'
          })
          .reply(200, {
            err: 0,
            result: REPLY
          });

        api.createTeam({
          name: 'Example Team',
          access_level: 'standard'
        }, function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.deepEqual(res.body, REPLY);
        });
      });

      it('requires the team options parameter to be an object', function () {
        assert.throws(function () {
          api.createTeam('String');
        });
      });

      it('deletes a team', function () {
        nock(BASE_URL)
          .delete('/team/1234')
          .query({
            access_token: 'write123'
          })
          .reply(200, {
            err: 0
          });

        api.deleteTeam(1234, function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.isUndefined(res.body);
        });
      });

      it('checks if a project is in a team', function () {
        nock(BASE_URL)
          .get('/team/1234/project/1234')
          .query({
            access_token: 'read123'
          })
          .reply(200, {
            err: 0,
            result: {
              team_id: 1234,
              project_id: 1234
            }
          });

        api.isProjectInTeam(1234, 1234, function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.deepEqual(res.body, {
            team_id: 1234,
            project_id: 1234
          });
        });

        nock(BASE_URL)
          .get('/team/1234/project/5678')
          .query({
            access_token: 'read123'
          })
          .reply(404, {
            err: 1,
            message: 'Project is not in this team.'
          });

        api.isProjectInTeam(1234, 5678, function (err, res) {
          assert.isUndefined(res);
          assert.strictEqual(err.statusCode, 404);
          assert.strictEqual(err.message, 'Project is not in this team.');
        });
      });

      it('adds a project to a team', function () {
        nock(BASE_URL)
          .put('/team/1234/project/1234')
          .query({
            access_token: 'write123'
          })
          .reply(200, {
            err: 0,
            result: {
              team_id: 1234,
              project_id: 1234
            }
          });

        api.addProjectToTeam(1234, 1234, function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.deepEqual(res.body, {
            team_id: 1234,
            project_id: 1234
          });
        });
      });

      it('removes a project from a team', function () {
        nock(BASE_URL)
          .delete('/team/1234/project/1234')
          .query({
            access_token: 'write123'
          })
          .reply(200, {
            err: 0
          });

        api.removeProjectFromTeam(1234, 1234, function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.isUndefined(res.body);
        });

        nock(BASE_URL)
          .delete('/team/1234/project/5678')
          .query({
            access_token: 'write123'
          })
          .reply(422, {
            err: 1,
            message: 'Project already not associated with this team'
          });

        api.removeProjectFromTeam(1234, 5678, function (err, res) {
          assert.isUndefined(res);
          assert.strictEqual(err.statusCode, 422);
          assert.deepEqual(err.message, 'Project already not associated with this team');
        });
      });

      it('checks team membership', function () {
        nock(BASE_URL)
          .get('/team/1234/user/1234')
          .query({
            access_token: 'read123'
          })
          .reply(200, {
            err: 0,
            result: {
              team_id: 1234,
              user_id: 1234
            }
          });

        api.checkTeamMembership(1234, 1234, function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.deepEqual(res.body, {
            team_id: 1234,
            user_id: 1234
          });
        });

        nock(BASE_URL)
          .get('/team/1234/user/5678')
          .query({
            access_token: 'read123'
          })
          .reply(404, {
            err: 1,
            message: 'User is not on this Team.'
          });

        api.checkTeamMembership(1234, 5678, function (err, res) {
          assert.isUndefined(res);
          assert.strictEqual(err.statusCode, 404);
          assert.strictEqual(err.message, 'User is not on this Team.');
        });
      });

      it('lists team members', function () {
        nock(BASE_URL)
          .get('/team/1234/users')
          .query({
            access_token: 'read123'
          })
          .reply(200, {
            err: 0,
            result: [{
              team_id: 1234,
              user_id: 1234
            }]
          });

        api.listTeamMembers(1234, function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.deepEqual(res.body, [{
            team_id: 1234,
            user_id: 1234
          }]);
        });

        nock(BASE_URL)
          .get('/team/1234/users')
          .query({
            access_token: 'read123',
            page: 2
          })
          .reply(200, {
            err: 0,
            result: [{
              team_id: 1234,
              user_id: 1234
            }]
          });

        api.listTeamMembers(1234, {
          page: 2
        }, function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.deepEqual(res.body, [{
            team_id: 1234,
            user_id: 1234
          }]);
        });
      });

      it('removes a user from a team', function () {
        nock(BASE_URL)
          .delete('/team/1234/user/1234')
          .query({
            access_token: 'write123'
          })
          .reply(200, {
            err: 0
          });

        api.removeUserFromTeam(1234, 1234, function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.isUndefined(res.body);
        });

        nock(BASE_URL)
          .delete('/team/1234/user/5678')
          .query({
            access_token: 'write123'
          })
          .reply(422, {
            err: 1,
            message: 'User not found for this team'
          });

        api.removeUserFromTeam(1234, 5678, function (err, res) {
          assert.isUndefined(res);
          assert.strictEqual(err.statusCode, 422);
          assert.strictEqual(err.message, 'User not found for this team');
        });
      });
    });

    describe('User functions', function () {

      it('gets information about a user', function () {
        nock(BASE_URL)
          .get('/user/1234')
          .query({
            access_token: 'read123'
          })
          .reply(200, {
            err: 0,
            result: {
              id: 1234,
              username: 'exampleuser',
              email: 'example@fake.com'
            }
          });

        api.getUser(1234, function (err, res) {
          assert.isNull(err);
          assert.strictEqual(res.statusCode, 200);
          assert.deepEqual(res.body, {
            id: 1234,
            username: 'exampleuser',
            email: 'example@fake.com'
          });
        });

        nock(BASE_URL)
          .get('/user/5678')
          .query({
            access_token: 'read123'
          })
          .reply(403, {
            err: 1,
            message: 'User not found in this account.'
          });

        api.getUser(5678, function (err, res) {
          assert.isUndefined(res);
          assert.strictEqual(err.statusCode, 403);
          assert.strictEqual(err.message, 'User not found in this account.');
        });
      });
    });
  });
});
