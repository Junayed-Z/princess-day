
document.addEventListener("DOMContentLoaded", () => {
    // =====================================
    // ELEMENTS
    // =====================================

    const music = document.getElementById("backgroundMusic");
    const invitation = document.getElementById("invitation");
    const site = document.getElementById("site");

    const enterButton = document.getElementById("enterButton");
    const musicToggle = document.getElementById("musicToggle");
    const musicIcon = document.getElementById("musicIcon");
    const musicLabel = document.getElementById("musicLabel");

    const readLetter = document.getElementById("readLetter");
    const letter = document.getElementById("letter");

    const moreFlowers = document.getElementById("moreFlowers");
    const surpriseButton = document.getElementById("surpriseButton");
    const hiddenSurprise = document.getElementById("hiddenSurprise");

    const petalsContainer = document.getElementById("petals");

    // =====================================
    // BACKGROUND MUSIC
    // =====================================

    if (music) {
        music.volume = 0.55;
        music.loop = true;
        music.preload = "auto";

        // Attempt autoplay on the first page.
        music.play().catch(() => {
            console.log("Autoplay requires user interaction.");
        });
    }

    function updateMusicButton() {
        if (!music || !musicLabel || !musicIcon) return;

        if (music.paused) {
            musicIcon.textContent = "♫";
            musicLabel.textContent = "Play our song";
        } else {
            musicIcon.textContent = "Ⅱ";
            musicLabel.textContent = "Pause our song";
        }
    }

    async function startMusic() {
        if (!music) return;

        try {
            await music.play();
            updateMusicButton();
        } catch (error) {
            musicLabel.textContent = "Tap to play our song";
            console.log("Music playback blocked:", error);
        }
    }

    if (music) {
        music.addEventListener("play", updateMusicButton);
        music.addEventListener("pause", updateMusicButton);

        music.addEventListener("error", () => {
            if (musicLabel) {
                musicLabel.textContent = "Song unavailable";
            }
            console.error("Could not load assets/music.mp3");
        });
    }

    // =====================================
    // OPEN THE ROYAL INVITATION
    // =====================================

    if (enterButton) {
        enterButton.addEventListener("click", async () => {

            // Start music directly from her click.
            startMusic();

            if (invitation) {
                invitation.classList.add("leave");
            }

            setTimeout(() => {
                invitation?.classList.add("hidden");
                site?.classList.remove("hidden");

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

                burstPetals(25);

            }, 650);
        });
    }

    // =====================================
    // MUSIC PLAY / PAUSE
    // =====================================

    if (musicToggle) {
        musicToggle.addEventListener("click", () => {

            if (!music) return;

            if (music.paused) {
                startMusic();
            } else {
                music.pause();
            }
        });
    }

    // =====================================
    // READ LOVE LETTER
    // =====================================

    if (readLetter && letter) {
        readLetter.addEventListener("click", () => {
            letter.scrollIntoView({
                behavior: "smooth"
            });
        });
    }

    // =====================================
    // FLOWER ANIMATION
    // =====================================

    const flowerSymbols = [
        "🌸",
        "🌷",
        "🌹",
        "🌼",
        "✿",
        "❀",
        "♡",
        "✧"
    ];

    function burstPetals(count) {

        if (!petalsContainer) return;

        for (let i = 0; i < count; i++) {

            const petal = document.createElement("span");

            petal.className = "petal";

            petal.textContent =
                flowerSymbols[
                    Math.floor(Math.random() * flowerSymbols.length)
                ];

            petal.style.left = Math.random() * 100 + "vw";

            petal.style.fontSize =
                (12 + Math.random() * 18) + "px";

            petal.style.animationDuration =
                (4 + Math.random() * 5) + "s";

            petal.style.animationDelay =
                (Math.random() * 1.5) + "s";

            petalsContainer.appendChild(petal);

            setTimeout(() => {
                petal.remove();
            }, 11000);
        }
    }

    // Send more flowers button.
    if (moreFlowers) {
        moreFlowers.addEventListener("click", () => {
            burstPetals(35);
        });
    }

    // =====================================
    // FINAL SURPRISE
    // =====================================

    if (surpriseButton && hiddenSurprise) {

        surpriseButton.addEventListener("click", () => {

            hiddenSurprise.classList.toggle("show");

            if (hiddenSurprise.classList.contains("show")) {

                surpriseButton.textContent =
                    "A little more love for you ♡";

                burstPetals(40);

            } else {

                surpriseButton.textContent =
                    "Open your final surprise ✨";
            }
        });
    }

    // =====================================
    // CONTINUOUS FLOATING PETALS
    // =====================================

    setInterval(() => {
        burstPetals(2);
    }, 2200);

    // Initial music button state.
    updateMusicButton();

});
