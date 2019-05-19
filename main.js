$(document).ready(function () {
    var signedIn = false;
    $(".signInContent").hide();
    $(".signOutContent").show();
    $("#login-form").submit(function (e) {
        e.preventDefault();
        if (signedIn) {
            $(".signInContent").hide();
            $(".signOutContent").show();
            $("#sign-in-btn").addClass("btn-success").removeClass("btn-danger").html("<i class=\"fas fa-sign-in-alt\"></i>");
            signedIn = false;
        } else {
            var username = encodeURI($("#in-game-name").val());
            $.get("https://api.minetools.eu/uuid/" + username).done(function (result) {
                console.log(result);
                $("#face").attr("src", "https://minotar.net/helm/" + username + "/38.png");
                $("#name").html(result.name);
                $(".signInContent").show();
                $(".signOutContent").hide();
                $("#sign-in-btn").removeClass("btn-success").addClass("btn-danger").html("<i class=\"fas fa-sign-out-alt\"></i>");
                signedIn = true;
            });
        }
    });
});