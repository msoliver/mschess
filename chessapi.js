async function getOptions() {
    var p = new Promise(function (r, j){
        chrome.storage.sync.get("options", function (data) {
            r(data.options);
        });
    });
    
    var options = await p;
    options = options ? JSON.parse(options) : {};

    options.userName = options.userName || "msoliver";
    options.polling = options.polling || 1;

    return options;
}

async function setOptions(options) {
    var p = new Promise(function (r, j){
        chrome.storage.sync.set({"options": JSON.stringify(options)}, function () {
            console.loge('Options saved');
            r();
        });
    });
    
    await p;
}

async function getGames() {
    var options = await getOptions();
    var url = "https://api.chess.com/pub/player/" + options.userName + "/games";

    $.ajax({
        url: url
    }).then(async function(data) {
        var games = [];
        var users = [];
        for (const g of data.games) {
            var white = users[g.white];
            if (!white) {
                white = await getProfile(g.white);
                users[g.white] = white;
            }
            var black = users[g.black];
            if (!black) {
                black = await getProfile(g.black);
                users[g.black] = black;
            }

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