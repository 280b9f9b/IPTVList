$(document).ready(function () {
    fetchAndRenderChannels('https://iptv-org.github.io/iptv/countries/ae.m3u.m3u', '#container1');
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
