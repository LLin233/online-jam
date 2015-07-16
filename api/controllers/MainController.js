/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) {
        if(req.isSocket && req.method === 'POST') {
            console.log('POST');
        }
        res.view('homepage');
    }
};

