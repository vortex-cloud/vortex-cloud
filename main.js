$(document).ready(function () {
    MinecraftAPI.getServerStatus('play.vortexcloud.tk', function (err, status) {
        if (err) return $("#server-online").html('?');
        $("#server-online").html(status.online ? '<i class="fa fa-check"></i>' : '<i class="fas fa-times"></i>');
        $("#player-count").html(status.players.now + "/" + status.players.max);
        $("#server-version").html(status.server.name);
    });
});