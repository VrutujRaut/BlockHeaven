
/* =========================
   MINECRAFT PLAYER COUNT
========================= */

async function updatePlayerCount() {

    const serverIP = "BlockHeaven.aternos.me";

    try {

        const response = await fetch(
            `https://api.mcsrvstat.us/2/${serverIP}`
        );

        const data = await response.json();

        const counter =
        document.getElementById("playerCount");

        if (!counter) return;

        if (data.online) {

            counter.textContent =
            data.players.online;

        }

        else {

            counter.textContent =
            "Offline";

        }

    }

    catch (error) {

        const counter =
        document.getElementById("playerCount");

        if (counter) {

            counter.textContent =
            "Error";

        }

    }

}

updatePlayerCount();

setInterval(
    updatePlayerCount,
    30000
);

/* =========================
   SIDEBAR TOGGLE
========================= */

function toggleSidebar() {

    const sidebar =
    document.querySelector(".sidebar");

    if (!sidebar) return;

    sidebar.classList.toggle(
        "collapsed"
    );

    document.body.classList.toggle(
        "sidebar-collapsed"
    );

}

/* =========================
   PAGE LOAD
========================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

        const formSection =
        document.querySelector(
            ".form-section"
        );

        if (formSection) {

            formSection.style.opacity =
            "1";

        }

    }
);

/* =========================
   MOBILE WARNING
========================= */

function closeWarning() {

    const warning =
    document.getElementById(
        "mobileWarning"
    );

    if (warning) {

        warning.style.display =
        "none";

    }

}

/* =========================
   DISCORD SERVER STATS
========================= */

async function loadDiscordStats() {

    try {

        const response =
        await fetch(
            "https://discord.com/api/guilds/1511259635208687646/widget.json"
        );

        const data =
        await response.json();

        const memberCount =
        document.getElementById(
            "memberCount"
        );

        const onlineCount =
        document.getElementById(
            "onlineCount"
        );

        if (memberCount) {

            memberCount.textContent =
            data.presence_count + "+";

        }

        if (onlineCount) {

            onlineCount.textContent =
            data.presence_count;

        }

    }

    catch (error) {

        console.log(
            "Discord widget failed."
        );

    }

}

loadDiscordStats();

/* =========================
   STORE CARD ANIMATIONS
========================= */

const cards =
document.querySelectorAll(
    ".rank-card"
);

if (cards.length > 0) {

    const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                    }

                }
            );

        },

        {
            threshold: 0.15
        }

    );

    cards.forEach(
        (card) => {

            observer.observe(
                card
            );

        }
    );

}

/* =========================
   BUY BUTTON RIPPLE
========================= */

document
.querySelectorAll(
    ".buy-btn"
)
.forEach(

(button) => {

    button.addEventListener(
        "click",

        function(e) {

            const ripple =
            document.createElement(
                "span"
            );

            ripple.classList.add(
                "ripple"
            );

            const rect =
            this.getBoundingClientRect();

            ripple.style.left =
            `${e.clientX - rect.left}px`;

            ripple.style.top =
            `${e.clientY - rect.top}px`;

            this.appendChild(
                ripple
            );

            setTimeout(
                () => {

                    ripple.remove();

                },
                600
            );

        }

    );

});

/* =========================
   ACTIVE PAGE HIGHLIGHT
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const currentPage =
        window.location.pathname
        .split("/")
        .pop();

        const links =
        document.querySelectorAll(
            ".sidebar-links a"
        );

        links.forEach(link => {

            const linkPage =
            link.getAttribute("href")
            .split("/")
            .pop();

            if (
                linkPage === currentPage
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }
);
