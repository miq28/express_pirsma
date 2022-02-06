module.exports = app => {   
    require("./user.routes")(app);
    require("./test.routes")(app);
};