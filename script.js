fetch("https://api.github.com/repos/RainbowyGuy/Project-Zoe/releases/latest")
    .then(response => response.json())
    .then(data => {
        document.getElementById("versionText").innerText = "Latest Version: " + data.tag_name;

        if (data.published_at) {
            const releaseDate = new Date(data.published_at);
            const today = new Date();

            const diffTime = Math.abs(today - releaseDate);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            let dayText = diffDays === 0 ? "today" :
                diffDays === 1 ? "1 day ago" :
                `${diffDays} days ago`;

            const formattedDate = releaseDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });

            document.getElementById("updateDate").innerText = `Last Updated: ${formattedDate} (${dayText})`;
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