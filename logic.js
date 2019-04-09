//initialize firebase
var config = {
    apiKey: "AIzaSyDM_B6NIyvj5XspHHozlWR94e73hFFdhn0",
    authDomain: "train-schedule-29344.firebaseapp.com",
    databaseURL: "https://train-schedule-29344.firebaseio.com",
    projectId: "train-schedule-29344",
    storageBucket: "train-schedule-29344.appspot.com",
    messagingSenderId: "554670128763"
  };


  firebase.initializeApp(config);

  var trainData = firebase.database();
  
  $("#addTrainBtn").on("click", function () {
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      //first train - pushed back 1 year to make sure it comes before the next train
      var firstTrain = $("#firstTrainInput").val().trim() //moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(1, "years").format("X");
      console.log(firstTrain);
  
      var frequency = $("#frequencyInput").val().trim(); // "5" stringafied number
  
      var train = {
          name: trainName,
          destination, //destination: destination, object restructuring googles
          frequency, // frequency: frequency,
          firstTrain //firstTrain: firstTrain
      };
      firebase.database().ref().push(train)
  
      console.log(firstTrain);
      return false;
  })
  
  trainData.ref().on("child_added", function (snapshot) {
      console.log("train added to database");
      var name = snapshot.val().name;
      var destination = snapshot.val().destination;
      var frequency = parseInt(snapshot.val().frequency);
      var firstTrain = snapshot.val().firstTrain;
      console.log("this is firstTrain", firstTrain);
  
  
      var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
      //current time
      var current = moment();
      console.log("The current time is: " + moment(current).format("HH:mm A"));
      //difference between the times
      var differenceTime = moment().diff(moment(firstTrainConverted), "minutes");
      console.log("Difference in time: " + differenceTime);
  
      //remaining time
      var remainder = differenceTime % frequency; //divide by our fequency and only give me back the numbers remaining
      console.log(remainder);
  
      //minutes until train arrives
      var minutes = frequency - remainder;
      console.log("Minutes until train arrives: " + minutes);
      // if (mins === true) return minutes;
  
      //next train to arrive
  
      var nextTrain = moment().add(minutes, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
      
  
      // var arrival = current.clone();
      // console.log(arrival);
      // arrival.add(minutes, "minutes")
      var arrival = moment(nextTrain).format("hh:mm");
  
  
  
      $("#trainTable > tBody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td><tr>");
  })