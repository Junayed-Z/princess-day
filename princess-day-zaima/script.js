const invitation = document.getElementById('invitation');
const site = document.getElementById('site');
const music = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const musicLabel = document.getElementById('musicLabel');

document.getElementById('enterButton').addEventListener('click', () => {
  invitation.classList.add('leave');
  setTimeout(() => {
    invitation.classList.add('hidden');
    site.classList.remove('hidden');
    window.scrollTo({top: 0, behavior: 'smooth'});
    burstPetals(22);
  }, 650);
});

musicToggle.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      musicIcon.textContent = 'Ⅱ';
      musicLabel.textContent = 'Pause our song';
    } catch (error) {
      musicLabel.textContent = 'Add music.mp3 first';
    }
  } else {
    music.pause();
    musicIcon.textContent = '♫';
    musicLabel.textContent = 'Play our song';
  }
});

document.getElementById('readLetter').addEventListener('click', () => {
  document.getElementById('letter').scrollIntoView({behavior:'smooth'});
});
document.getElementById('surpriseButton').addEventListener('click', () => {
  document.getElementById('hiddenSurprise').classList.add('show');
  document.getElementById('surpriseButton').textContent = 'A little reminder for you ♡';
  burstPetals(35);
});
document.getElementById('moreFlowers').addEventListener('click', () => burstPetals(35));

function burstPetals(count) {
  const container = document.getElementById('petals');
  const symbols = ['✿','❀','♡','✧','🌸'];
  for (let i=0; i<count; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    p.style.left = Math.random()*100+'vw';
    p.style.fontSize = (12+Math.random()*17)+'px';
    p.style.animationDuration = (4+Math.random()*5)+'s';
    p.style.animationDelay = (Math.random()*1.4)+'s';
    container.appendChild(p);
    setTimeout(()=>p.remove(),11000);
  }
}
setInterval(()=>burstPetals(2),2200);
