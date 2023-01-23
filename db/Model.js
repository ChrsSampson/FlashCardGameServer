// Basic DB querys and methods

class Model {
    constructor(client, table=null, primaryKey='id') {
        this.table = table;
        this.primaryKey = primaryKey
        this.client = client;
        this.init()
    }

    init () {
        if(this.table === null) {
            throw new Error('Table name is required')
        }
    }
    
    async findAll() {
        const sql = `SELECT * FROM ${this.table}`;
        const result = await this.client.query(sql);
        return result.rows;
    }

    async findOneByPrimaryKey(id) {
        const sql = `SELECT * FROM ${this.table} WHERE ${this.primaryKey} = $1`;
        const result = await this.client.query(sql, [id]);
        return result.rows[0];
    }

    async findoneByColumn(column, value) {
        const sql = `SELECT * FROM ${this.table} WHERE ${column} = $1`;
        const result = await this.client.query(sql, [value]);
        return result.rows[0];
    } 
    
    async create(data) {
        const sql = `INSERT INTO ${this.table} (${Object.keys(data).join(',')}) VALUES (${Object.keys(data).map((key, index) => `$${index + 1}`)}) RETURNING *`;
        const result = await this.client.query(sql, Object.values(data));
        return result.rows[0];
    }

    async updateById(id, data) {
        const sql = `UPDATE ${this.table} SET ${Object.keys(data).map((key, index) => `${key} = $${index + 1}`)} WHERE ${this.primaryKey} = $${Object.keys(data).length + 1} RETURNING *`;
        const result = await this.client.query(sql, [...Object.values(data), id]);
        return result.rows[0];
    }

    async deleteById(id) {
        const sql = `DELETE FROM ${this.table} WHERE ${this.primaryKey} = $1 RETURNING *`;
        const result = await this.client.query(sql, [id]);
        return result.rows[0];
    }
}

module.exports = Model;