exports.handler = function(event, context, callback) {
    // Reach back to the main layer, and pull out the export
    const app = require("../../opt/library")
    callback(null, app.hello());
};
