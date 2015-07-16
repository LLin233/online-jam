$(document).ready(function() {
    var noteMap = {};
    $(window).keydown(function(e) {
        var key = e.which;
        if (!noteMap[key]) {
            switch(key) {
                case 65:
                    noteMap[key] = AudioEngine.play(261.63);
                    break;
                case 83:
                    noteMap[key] = AudioEngine.play(293.66);
                    break;
                case 68:
                    noteMap[key] = AudioEngine.play(329.63);
                    break;
                case 70:
                    noteMap[key] = AudioEngine.play(349.23);
                    break;
                case 71:
                    noteMap[key] = AudioEngine.play(392.00);
                    break;
                case 72:
                    noteMap[key] = AudioEngine.play(440);
                    break;
                case 74:
                    noteMap[key] = AudioEngine.play(493.88);
                    break;
                case 75:
                    noteMap[key] = AudioEngine.play(523.25);
                    break;
                case 76:
                    noteMap[key] = AudioEngine.play(587.33);
                    break;
            }
        }   
   });

    $(window).keyup(function(e) {
        var key = e.which;
        if (noteMap[key]) {
            AudioEngine.stop(noteMap[key]);
            noteMap[key] = null;
        }
   });
});