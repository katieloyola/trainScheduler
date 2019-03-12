//initialize firebase
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
    messagingSenderId: "",

};

firebase.initializeApp(config);

var trainData = firebase.database();

$("#addTrainBtn").on("click", function () {
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    //first train - pushed back 1 year to make sure it comes before the next train
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(1, "years").format("X");
    console.log(firstTrain);

    var frequency = $("#frequencyInput").val().trin();

    console.log(firstTrain);
    return false;
})

trainData.ref().on("child_added", function (snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    //current time
    var current = moment();
    console.log("The current time is: " + moment(current).format("HH:mm A"));
    //difference between the times
    var differenceTime = moment().diff(moment(firstTrain), "minutes");
    console.log("Difference in time: " + differenceTime);

    //remaining time
    var remainder = differenceTime % frequency;
    console.log(remainder);

    //minutes until train arrives
    var minutes = frequency - remainder;
    console.log("Minutes until train arrives: " + minutes);
    if (mins === true) return minutes;

    //next train to arrive
    var arrival = current.clone();
    console.log(arrival);
    arrival.add(minutes, "minutes")


    $("#trainTable > tBody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td><tr>");
})