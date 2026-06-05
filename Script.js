// ====================================
// EWONZ LINGUA - SCRIPT.JS
// ====================================

// Voice list
let voices = [];

// Load available voices
function loadVoices() {
    voices = speechSynthesis.getVoices();
}

loadVoices();

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
}

// ====================================
// JAPANESE PRONUNCIATION
// ====================================

function speakJapanese(text) {

    // Stop previous speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "ja-JP";
    utterance.rate = 0.8;
    utterance.pitch = 1;

    // Find Japanese voice
    const japaneseVoice = voices.find(
        voice => voice.lang.includes("ja")
    );

    if (japaneseVoice) {
        utterance.voice = japaneseVoice;
    }

    speechSynthesis.speak(utterance);
}

// ====================================
// BLOCK CTRL + SCROLL ZOOM
// ====================================

document.addEventListener(
    "wheel",
    function (event) {
        if (event.ctrlKey) {
            event.preventDefault();
        }
    },
    { passive: false }
);

// ====================================
// BLOCK PINCH ZOOM
// ====================================

document.addEventListener(
    "touchmove",
    function (event) {
        if (
            event.scale !== undefined &&
            event.scale !== 1
        ) {
            event.preventDefault();
        }
    },
    { passive: false }
);

// ====================================
// BLOCK DOUBLE TAP ZOOM
// ====================================

let lastTouchEnd = 0;

document.addEventListener(
    "touchend",
    function (event) {

        const now = Date.now();

        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }

        lastTouchEnd = now;

    },
    false
);

// ====================================
// CARD CLICK EFFECT
// ====================================

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".hira-card");

    cards.forEach(card => {

        card.addEventListener("click", () => {

            card.style.transform = "scale(0.92)";

            setTimeout(() => {
                card.style.transform = "";
            }, 150);

        });

    });

});

// ====================================
// END OF FILE
// ====================================
