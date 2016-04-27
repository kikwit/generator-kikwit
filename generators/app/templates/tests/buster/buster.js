var config = module.exports;
 
config["<%= appName %> Tests"] = {
    environment: "node",
    rootPath: "../",
    tests: [
        "test/**/*.js"
    ]
}
