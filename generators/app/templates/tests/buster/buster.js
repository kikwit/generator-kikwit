var config = module.exports;
 
config["<%= appname %> Tests"] = {
    environment: "node",
    rootPath: "../",
    tests: [
        "tests/**/*.js"
    ]
}
