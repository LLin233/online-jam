/**
 * SocketController
 *
 * @description :: Server-side logic for managing sockets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var _ = require('underscore');

module.exports = {
    // socket ids for all the connected clients
    clients: {},
    // clientsList: [],

    receive: function(req, res) {
        var id = sails.sockets.id(req.socket);
        var actionName = _.keys(req.query)[0];
        var keyCode = Number(_.values(req.query)[0].toString());
        var type = _.values(req.query)[1];
        if (!this.clients[id]) {
            this.clients[id] = {};
        }
        this.clients[id][keyCode] = actionName;

        this.send(id, actionName, keyCode, type);
    },

    send: function(id, actionName, keyCode, type) {
        console.log('Send: actionName: ' + actionName + ', keyCode: ' + keyCode + ', type: ' + type);
        sails.sockets.blast('serverSocketSignal', {id: id, actionName: actionName, keyCode: keyCode, type: type});
    },

    init: function(req, res) {
        var id = sails.sockets.id(req.socket);
        res.send(id);
    }
};

