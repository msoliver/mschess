$(document).ready(pageInit);

function pageInit() {
    initGames();
}

function initGames() {
    chrome.storage.sync.get("games", function (data) {
        var games = data.games;
        var jqGameInfo = $("#gameInfo");
        $.each(games, function (i, g) {
            var jqRow = $(document.createElement("tr"));
            var white = "<a class='text-dark' href='" + g.whiteLink + "' target='_blank'>" + g.white + "</a>";
            var black = "<a class='text-dark' href='" + g.blackLink + "' target='_blank'>" + g.black + "</a>";
            var gameLink = "<a class='text-dark' href='" + g.gameLink + "' target='_blank'><i class='fad fa-external-link'></i>" + "</a>";
            $(document.createElement("td")).attr("scope", "row").html(white).appendTo(jqRow);
            $(document.createElement("td")).html(black).appendTo(jqRow);
            $(document.createElement("td")).html(gameLink).appendTo(jqRow);
            jqRow.appendTo(jqGameInfo);
        });
    });
}