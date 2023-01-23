// user database model 

const client = require('./connect');

const Model = require('./Model');

class User extends Model {
    constructor() {
        super(client, 'users', 'id');
    }

    async signUp(data) {
        
    }

}

module.exports = new User();

