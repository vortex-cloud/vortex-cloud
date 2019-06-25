const el1 = document.getElementById("dark-theme");
if (localStorage.getItem("dark") === null) localStorage.setItem("dark", "disabled");
el1.disabled = localStorage.getItem("dark") !== "enabled";

function dark_toggle() {
    el1.disabled = !el1.disabled;
    localStorage.setItem("dark", el1.disabled ? "disabled" : "enabled");
    return el1.disabled ? $("#navbar").addClass("bg-light").addClass("navbar-light").removeClass("bg-dark").removeClass("navbar-dark") : $("#navbar").removeClass("bg-light").removeClass("navbar-light").addClass("bg-dark").addClass("navbar-dark");
}

$(document).ready(function () {
    el1.disabled ? $("#navbar").addClass("bg-light").addClass("navbar-light").removeClass("bg-dark").removeClass("navbar-dark") : $("#navbar").removeClass("bg-light").removeClass("navbar-light").addClass("bg-dark").addClass("navbar-dark");
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
            } else {
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