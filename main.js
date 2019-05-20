var signedIn = false;
var database;
var messages_ref;
var chatShown = false;
$(document).ready(function () {
    $(".signInContent").hide();
    $(".signOutContent").show();
    $("#login-form").submit(function (e) {
        e.preventDefault();
        if (signedIn) {
            $(".signInContent").hide();
            $(".signOutContent").show();
            $("#sign-in-btn").addClass("btn-success").removeClass("btn-danger").html("<i class=\"fas fa-sign-in-alt\"></i>");
            signOut();
            localStorage.removeItem("name");
            localStorage.removeItem("uuid");
            localStorage.removeItem("icon");
            signedIn = false;
        } else {
            var username = encodeURI($("#in-game-name").val());
            $.get("https://api.minetools.eu/uuid/" + username).done(function (result) {
                console.log(result);
                if (result.id !== "null") {
                    localStorage.setItem("name", username);
                    localStorage.setItem("uuid", result.id);
                    localStorage.setItem("icon", "https://minotar.net/helm/" + username + "/38.png");
                    firebase.auth().signInAnonymously().catch(function (error) {
                    });
                } else {
                    alert("Please use a correct minecraft premium account name!");
                }
            });
        }
    });
    $("#chat-open-btn").click(function (e) {
        if (chatShown) {
            $("#chat-open-btn").html("<i class=\"fas fa-caret-up\"></i>");
            $("#chat-messages").slideUp();
            chatShown = false;
        } else {
            $("#chat-open-btn").html("<i class=\"fas fa-caret-down\"></i>");
            $("#chat-messages").slideDown();
            chatShown = true;
        }
    });

    function send() {
        if ($("#chat-input").val().trim()) {
            const postData = {
                username: localStorage.name,
                body: $("#chat-input").val().trim(),
                date: Date.now()
            };
            firebase.database().ref().child('messages_data').push().set(postData);
            $("#chat-input").val("");
        }
    }

    $("#chat-input").keypress(function (e) {
        if (e.keyCode == 13) send();
    });
    $("#chat-send-btn").click(function (e) {
        send();
    });
    MinecraftAPI.getServerStatus('play.vortexcloud.tk', function (err, status) {
        if (err) return $("#server-online").html('?');
        $("#server-online").html(status.online ? '<i class="fa fa-check"></i>' : '<i class="fas fa-times"></i>');
        $("#player-count").html(status.players.now + "/" + status.players.max);
        $("#server-version").html(status.server.name);
    });
});

function firebaseReady() {
    if (typeof localStorage.name !== 'undefined') {
        $("#face").attr("src", localStorage.getItem("icon"));
        $("#name").html(localStorage.getItem("name"));
        $(".signInContent").show();
        $(".signOutContent").hide();
        $("#sign-in-btn").removeClass("btn-success").addClass("btn-danger").html("<i class=\"fas fa-sign-out-alt\"></i>");
        firebase.auth().signInAnonymously().catch(function (error) {
        });
        signedIn = true;
        database = firebase.database();
        messages_ref = firebase.database().ref("messages_data");
        console.log("Setting Up Message Hook");
        $("#chat-messages").html("");
        messages_ref.on('child_added', function (data) {
            console.log("New Message Received");
            var key = data.key;
            data = data.val();
            var date = new Date(data.date);
            var formatted_date = (date.getMonth() + 1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
            $("#chat-messages").prepend("<li data-toggle='tooltip' title='" + formatted_date + "' class='message-node' key='" + key + "'><img src='" + "https://minotar.net/helm/" + data.username + "/20.png" + "'> " + htmlEntities(data.username) + ": " + htmlEntities(data.body) + "</li>");
            $(".message-node:first").tooltip();
        });
        messages_ref.on('child_removed', function (data) {
            console.log("Message Deleted");
            $(".message-node[key=" + data.key + "]").remove();
        });
    } else {
        console.log("localStorage \"name\" do not exist");
        $(".signInContent").hide();
        $(".signOutContent").show();
        $("#sign-in-btn").addClass("btn-success").removeClass("btn-danger").html("<i class=\"fas fa-sign-in-alt\"></i>");
        signOut();
        localStorage.removeItem("name");
        localStorage.removeItem("uuid");
        localStorage.removeItem("icon");
        signedIn = false;
        signOut();
    }
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}