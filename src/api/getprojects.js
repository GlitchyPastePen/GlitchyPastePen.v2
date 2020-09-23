const Endb = require('endb');
var user = new Endb({
    uri: process.env.MONGO_URI + "user?retryWrites=true&w=majority",
    adapter: "mongodb"
});

var project = new Endb({
    uri: process.env.MONGO_URI + "projects?retryWrites=true&w=majority",
    adapter: "mongodb"
});

module.exports = (req, res) => {
    const { user } = req.query;

    var projects = await project.all();

    projects = projects.filter(
        project => project.value.owner === this.$route.params.user
    );

    res.json(projects);
}