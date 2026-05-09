const repo = "RainbowyGuy/Project-Zoe";

fetch(`https://api.github.com/repos/${repo}/releases`)
    .then(response => response.json())
    .then(releases => {
        let globalTotal = 0;
        releases.forEach(release => {
            release.assets.forEach(asset => {
                globalTotal += asset.download_count;
            });
        });
        document.getElementById("globalDownloads").innerText = `Times downloaded: ${globalTotal}`;
    })
    .catch(err => console.error(err));

fetch(`https://api.github.com/repos/${repo}/releases/latest`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("versionText").innerText = "Latest Version: " + data.tag_name;

        if (data.published_at) {
            const releaseDate = new Date(data.published_at);
            const updateClock = () => {
                const today = new Date();
                const diffTime = Math.abs(today - releaseDate);
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                const diffHours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
                const diffMinutes = Math.floor((diffTime / (1000 * 60)) % 60);
                const diffSeconds = Math.floor((diffTime / 1000) % 60);
                const formattedDate = releaseDate.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                });
                document.getElementById("updateDate").innerText =
                    `Last Updated: ${formattedDate} (${diffDays}d ${diffHours}h ${diffMinutes}m ${diffSeconds}s ago)`;
            };
            updateClock();
            setInterval(updateClock, 1000);
        }

        const availableFiles = data.assets.map(asset => asset.name);
        document.querySelectorAll('.downloadButton').forEach(button => {
            const urlParts = button.href.split('/');
            const filename = urlParts[urlParts.length - 1];
            if (!availableFiles.includes(filename)) {
                button.classList.add('disabled');
                button.innerHTML += " <span style='font-size: 14px;'>(Unavailable)</span>";
                button.onclick = (e) => e.preventDefault();
            }
        });
    })
    .catch(err => console.error(err));