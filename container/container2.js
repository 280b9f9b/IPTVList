$(document).ready(function () {
    fetchAndRenderChannels('https://iptv-org.github.io/iptv/languages/ara.m3u', '#container2');
});

function fetchAndRenderChannels(url, containerId) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (message) {
            const channels = parseChannels(message);
            renderChannels(channels, containerId);
            populateFilterDropdown(channels);
            updateTotalChannelsCount(channels);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching channel list:", error);
        }
    });
}
