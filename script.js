
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

            handleServerStatus(true);

        }

        else {

            counter.textContent =
            "Offline";

            handleServerStatus(false);

        }

    }

    catch (error) {

        const counter =
        document.getElementById("playerCount");

        if (counter) {

            counter.textContent =
            "Error";

        }

        handleServerStatus(false);

    }

}

/* =========================
   SERVER START NOTIFICATIONS
========================= */

const serverStatusKey = "blockheaven-server-online";

function handleServerStatus(isOnline) {

    const previousStatus = localStorage.getItem(serverStatusKey);
    const notifyButton = document.getElementById("notifyButton");

    if (notifyButton) {
        notifyButton.hidden = isOnline;
    }

    if (isOnline && previousStatus === "false" && "Notification" in window && Notification.permission === "granted") {

        new Notification("BlockHeaven is online!", {
            body: "The server has started. Come join the adventure!",
            icon: "assets/images/favicon.png"
        });

    }

    localStorage.setItem(serverStatusKey, String(isOnline));

}

function setupNotifications() {

    const notifyButton = document.getElementById("notifyButton");
    const modal = document.getElementById("notificationModal");
    const closeButton = document.getElementById("notificationClose");
    const cancelButton = document.getElementById("notificationCancel");
    const enableButton = document.getElementById("notificationEnable");
    const status = document.getElementById("notificationStatus");

    if (!notifyButton || !modal || !closeButton || !cancelButton || !enableButton || !status) return;

    const closeModal = () => {
        modal.hidden = true;
        notifyButton.focus();
    };

    const openModal = () => {
        modal.hidden = false;
        status.textContent = "";

        if (!("Notification" in window)) {
            status.textContent = "Notifications are not supported by this browser.";
            enableButton.disabled = true;
        } else if (Notification.permission === "granted") {
            status.textContent = "Notifications are already enabled on this device.";
            enableButton.textContent = "Notifications Enabled";
            enableButton.disabled = true;
        }

        enableButton.focus();
    };

    notifyButton.addEventListener("click", openModal);
    closeButton.addEventListener("click", closeModal);
    cancelButton.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) closeModal();
    });

    enableButton.addEventListener("click", async () => {

        if (!("Notification" in window)) return;

        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            status.textContent = "You’re all set! We’ll notify you when BlockHeaven starts.";
            enableButton.textContent = "Notifications Enabled";
            enableButton.disabled = true;
        } else {
            status.textContent = "Permission was not granted. You can enable it in your browser settings.";
        }

    });

}

setupNotifications();

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


/*==========================
    AGREE BUTTON
==========================*/

const agreeBtn =
document.getElementById("agreeBtn");

if (agreeBtn) {

    agreeBtn.addEventListener(
        "click",
        () => {

            const modal =
            document.getElementById(
                "termsModal"
            );

            if (modal) {

                modal.style.display =
                "none";

            }

        }
    );

}
