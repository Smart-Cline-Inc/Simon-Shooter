var audioCtx = new (window.AudioContext || window.webkitAudioContext)()
var frequency = 0

function getTone(tone) {
  if (tone == (-500)) {
    frequency = 100
    playTone(frequency)
  } else if (tone == (-175 )) {
    frequency = 200
    playTone(frequency)
  } else if (tone == 175) {
    frequency = 300
    playTone(frequency)
  } else {
    frequency = 400
    playTone(frequency)
  }
}

function playTone(frequency) {
      let time = audioCtx.currentTime
      let gainNode = audioCtx.createGain()
      gainNode.gain.value = 0
      gainNode.connect(audioCtx.destination)

      let oscillator = audioCtx.createOscillator()
      oscillator.connect(gainNode)
      oscillator.type = "sawtooth"
      oscillator.attackTime = 0.01
      oscillator.releaseTime = 0.39

      oscillator.frequency.value = frequency

      // make a sound
      oscillator.start();
      // attack
      gainNode.gain.linearRampToValueAtTime(1.0, time + 0.05);
      // decay
      gainNode.gain.exponentialRampToValueAtTime(0.2, time + 0.1);
      // sustain
      gainNode.gain.linearRampToValueAtTime(1.0, time + 0.2);
      // release
      gainNode.gain.exponentialRampToValueAtTime(0.2, time + 0.2);
      // stop
      oscillator.stop(time + 0.3)
}
