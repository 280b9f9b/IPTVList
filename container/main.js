$(document).ready(function () {
    // Event listeners
    $("#group-title-filter").on("change", function () {
        const selectedGroup = $(this).val().toLowerCase();
        $(".channel-card").each(function () {
            const groupTitle = $(this).find("p").text().toLowerCase();
            $(this).toggle(selectedGroup === "" || groupTitle.includes(selectedGroup));
        });
    });

    $("#search-input").on("input", function () {
        const searchKeyword = $(this).val().toLowerCase();
        $(".channel-card").each(function () {
            const channelName = $(this).find("h2").text().toLowerCase();
            $(this).toggle(channelName.includes(searchKeyword));
        });
    });
});

function parseChannels(str) {
    const array = str.split("\n");
    const channels = [];
    array.forEach(function (line) {
        if (line.startsWith("#EXTINF:")) {
            const tvgLogo = line.match(/tvg-logo="([^"]+)"/);
            const groupTitle = line.match(/group-title="([^"]+)"/);
            if (tvgLogo && tvgLogo.length > 1) {
                const channel = {
                    name: line.split(",")[1],
                    groupTitle: groupTitle ? groupTitle[1] : "",
                    url: "",
                    image: tvgLogo[1]
                };
                channels.push(channel);
            }
        } else if (line.startsWith("http")) {
            channels[channels.length - 1].url = line;
        }
    });
    return channels;
}

function renderChannels(channels, containerId) {
    $(containerId).empty();
    channels.forEach(function (channel) {
        const card = $("<li>").addClass("channel-card");
        const img = $("<img>").attr("src", channel.image);
        const title = $("<h2>").text(channel.name);
        const desc = $("<p>").text(channel.groupTitle);
        card.append(img, title, desc);
        $(containerId).append(card);

        img.on("click", function () {
            playChannel(channel);
            $(".channel-card img").removeClass("selected");
            img.addClass("selected");
        });
    });
}

function playChannel(channel) {
    const player = videojs('my-video');
    player.src({ src: channel.url, type: 'application/x-mpegURL' });
    player.play();
}

function populateFilterDropdown(channels) {
    const groupTitles = [...new Set(channels.map(c => c.groupTitle))];
    const dropdown = $("#group-title-filter");
    dropdown.empty();
    dropdown.append('<option value="">All</option>');
    groupTitles.forEach(function (title) {
        dropdown.append(`<option value="${title}">${title}</option>`);
    });
}

function updateTotalChannelsCount(channels) {
    $("#total-channels").text(`${channels.length}`);
}