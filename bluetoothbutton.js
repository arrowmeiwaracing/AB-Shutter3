// licence
module.exports = function(RED) {
    "use strict";
    var exec = require('child_process').exec;
    var spawn = require('child_process').spawn;
    var fs = require('fs');
    var pycmd = __dirname+'/keyaccess';
 
    // the magic to make python print stuff immediately
    //process.env.PYTHONUNBUFFERED = 1;

    function BluetoothButtonNode(n) {
        RED.nodes.createNode(this,n);
        var node = this;
        
        //var node.child = null;
        node.log("DEBUG: START");

        node.on('input', function(msg) {
            //msg.node-input-name;
             node.log(msg.payload);

        node.child = spawn(pycmd + ".py", [msg.payload]);
        node.status({fill:"green",shape:"dot",text:"common.status.ok"});
        node.log("ready");

        node.child.stdout.on('data', function (data) {
            //node.log(data);
            var b = data.toString().trim().split(",");
            var act = "up";
            node.send({ topic:"pi/key", payload:{code: Number(b[0]), mode: Number(b[1]), tvsec: Number(b[2]), tvusec: Number(b[3])} });
        });

        node.child.stderr.on('data', function (data) {
            if (RED.settings.verbose) { node.log("err: "+data+" :"); }
        });

        node.child.on('close', function (code) {
            node.running = false;
            node.child = null;
            if (RED.settings.verbose) { node.log(RED._("bluetoothbutton.status.closed")); }
            if (node.done) {
                node.status({fill:"grey",shape:"ring",text:"bluetoothbutton.status.closed"});
                node.done();
            }
            else { node.status({fill:"red",shape:"ring",text:"bluetoothbutton.status.stopped"}); }
        });

        node.child.on('error', function (err) {
            if (err.errno === "ENOENT") { node.error(RED._("bluetoothbutton.errors.commandnotfound")); }
            else if (err.errno === "EACCES") { node.error(RED._("bluetoothbutton.errors.commandnotexecutable")); }
            else { node.error(RED._("bluetoothbutton.errors.error")+': ' + err.errno); }
        });
        });


        node.on("close", function(done) {
            node.status({});
            if (node.child != null) {
                node.done = done;
                node.child.kill('SIGINT');
                node.child = null;
            }
            else { done(); }
        });
    };
    RED.nodes.registerType("bluetoothbutton",BluetoothButtonNode);
}