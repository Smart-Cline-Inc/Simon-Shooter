function pickRandomSphere() {
  return Math.floor(Math.random() * 4 + 1)
}

function lightUpSphere() {
  let randomSphere = pickRandomSphere()
  if (randomSphere === 1) {
    material1.color.setHex(0xFFFFFF);
  } else if (randomSphere === 2) {
    material2.color.setHex(0xFFFFFF);
  } else if (randomSphere === 3) {
    material3.color.setHex(0xFFFFFF);
  } else if (randomSphere === 4) {
    material4.color.setHex(0xFFFFFF);
  }
  setTimeout(revertBack, 800)
}

function revertBack() {
  material1.color.setHex(0x00FF00);
  material2.color.setHex(0x0000FF);
  material3.color.setHex(0xFF0000);
  material4.color.setHex(0xFFFF00);
}
