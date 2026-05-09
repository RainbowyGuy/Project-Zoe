fetch("https://api.github.com/repos/RainbowyGuy/Project-Zoe/releases/latest")
    .then(response => response.json())
    .then(data => {
        document.getElementById("versionText").innerText = "Latest Version: " + data.tag_name;

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
    .catch(err => {
        console.error("Failed to fetch release data:", err);
        document.getElementById("versionText").innerText = "Error loading version.";
    });