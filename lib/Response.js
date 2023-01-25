// server response class to standardize response format


class Response {
    constructor(status, message, data, error=null) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.error = error;
    }

    send (res) {
        res.status(this.status).json({result: this});
    }
}

module.exports = Response;