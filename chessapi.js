function getGames() {
    var url = "https://api.chess.com/pub/player/msoliver/games";

    $.ajax({
        url: url
    }).then(async function(data) {
        var games = [];
        for (const g of data.games) {
            var white = await getProfile(g.white);
            var black = await getProfile(g.black);
            var whiteLink = "https://www.chess.com/member/" + white.username;
            var blackLink = "https://www.chess.com/member/" + black.username;

            games.push({gameLink: g.url, white: white.name || white.username, black: black.name || black.username, whiteLink: whiteLink, blackLink: blackLink, tournament: g.tournament});
        }
        chrome.storage.sync.set({"games": games}, function () {
            console.log('Games logged to storage');
        });
    }); 
}

async function getProfile(profileUrl) {
    return $.ajax({
        url: profileUrl
    }).then(function (data){
        return data;
    });
}