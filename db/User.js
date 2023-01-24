// user database model 

const client = require('./connect');

const Model = require('./Model');

class User extends Model {
    constructor() {
        super(client, 'users', 'id');
    }

    //  create a new annon user the first time someone visists the site
    // this user should be deleted after 24 hours of inactivity
    // this users should only keep track of gameSessions the user is apart of and the users name

    async create(username, color) {
        const sql = `INSERT INTO ${this.table} (username, color) VALUES ($1, $2) RETURNING *`;
        const result = await this.client.query(sql, [username, color]);
        return result.rows[0];
    }

}

module.exports = new User();

