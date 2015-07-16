$(document).ready(function() {
    var noteMap = {};
    var clientID;

    io.socket.on('connect', function(){
        io.socket.get('/init', function(data) {
            clientID = data;
        });
        console.log('Connected to Socket Server successfully!');
    });

    io.socket.on('disconnect', function(){
      console.log('Lost connection to server');
    });
    io.socket.on('serverSocketSignal', function (action) {
        var key = action.keyCode;
        var id = action.id;
        var type = action.type;
        if (action.actionName === 'play') {
            if (!noteMap[id]) {
                noteMap[id] = {};
            }
            if (!noteMap[id][key]) {
                switch(key) {
                    case 65:
                        noteMap[id][key] = AudioEngine.play(type,  261.63);
                        break;
                    case 83:
                        noteMap[id][key] = AudioEngine.play(type,  293.66);
                        break;
                    case 68:
                        noteMap[id][key] = AudioEngine.play(type,  329.63);
                        break;
                    case 70:
                        noteMap[id][key] = AudioEngine.play(type,  349.23);
                        break;
                    case 71:
                        noteMap[id][key] = AudioEngine.play(type,  392.00);
                        break;
                    case 72:
                        noteMap[id][key] = AudioEngine.play(type,  440);
                        break;
                    case 74:
                        noteMap[id][key] = AudioEngine.play(type,  493.88);
                        break;
                    case 75:
                        noteMap[id][key] = AudioEngine.play(type,  523.25);
                        break;
                    case 76:
                        noteMap[id][key] = AudioEngine.play(type,  587.33);
                        break;
                }
            }
        } else {
            if (noteMap[id][key]) {
                AudioEngine.stop(noteMap[id][key]);
                noteMap[id][key] = null;
            }
        }
    });

    
    $(window).keydown(function(e) {
        var key = e.which;
        var type = $('input[name="type"]:checked').val();
        noteMap[clientID] = noteMap[clientID] || {};
        if (!noteMap[clientID][key]) {
            io.socket.post('/socket?play=' + key + '&type=' + type, function (resData) {
                //
            });
        }   
   });

    $(window).keyup(function(e) {
        var key = e.which;
        noteMap[clientID] = noteMap[clientID] || {};
        if (noteMap[clientID][key]) {
            io.socket.post('/socket?stop=' + key, function (resData) {
                //
            });
        }
   });

});