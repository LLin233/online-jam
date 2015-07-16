// web audio api engine

// init
var AudioContext;
(function init() {
    try {
        // Fix up for prefixing
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        audioContext = new AudioContext();
      }
      catch(e) {
        alert('Web Audio API is not supported in this browser');
      }
})();

var AudioEngine = (function () {
    function play(type, freq) {
        var oscillator = audioContext.createOscillator();
        oscillator.connect(audioContext.destination);
        oscillator.frequency.value = freq;
        oscillator.type = type;
        oscillator.start(0);

        return oscillator;
    }

    function stop(oscillator) {
        oscillator.stop(0);
    }

    return {
        play: play,
        stop: stop
    }

})();