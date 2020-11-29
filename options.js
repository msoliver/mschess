$(document).ready(pageInit);

async function pageInit() {
    var options = await getOptions();

    $("#UserNameText").val(options.userName);
    $("#PollingText").val(options.polling);

    $("#ApplyBtn").click(async function(){
        var options = {};
        options.userName = $("#UserNameText").val();
        options.polling = $("#PollingText").val();

        await setOptions(options);
    });
}
