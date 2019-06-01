$(document).ready(function () {
    $.get("https://api.minetools.eu/query/play.vortexcloud.tk"
    ).done(function (query) {
        if (query.status === "OK") {
            $("#server-online").html('<i class="fa fa-check"></i>');
            $("#player-count").html(query.Players + "/" + query.MaxPlayers);
            if (query.Playerlist.length > 0) {
                let final = "";
                for (let a = 0; a < query.Playerlist.length; a++) {
                    let name = query.Playerlist[a];
                    final += "<br><img class='ml-2' style='height:24px;' src='https://minotar.net/helm/" + name + "/128.png'> " + name;
                }
                final = final.substring(4);
                $("#players").html(final);
            }else{
                $("#players").html("<i class='ml-2'>No Players Online</i>");
            }
        } else {
            $("#server-online").html('<i class="fas fa-times"></i>');
            $("#player-count").html(query.status);
        }
    }).fail(function () {
        $("#server-online").html('?');
    });
});