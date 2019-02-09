exports.handler = function(event, context, callback) {
    // Reach back to the main layer, and pull out the export
    const app = require("../../opt/layer/app")
    callback(null, app.hello());
};
