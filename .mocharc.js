module.exports = {
    color: true,
    extensions: ['js'],
    package: './package.json',
    require: "dotenv/config",
    env: {
        NODE_ENV: 'test'
    },
    timeout: 10000,
}