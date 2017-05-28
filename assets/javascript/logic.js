//Intializing Firebase Database
  var config = {
    apiKey: "AIzaSyCzHXRoMtiWxoDwW8BJdNKkmJTYmpAHEoA",
    authDomain: "train-schedule-ad4be.firebaseapp.com",
    databaseURL: "https://train-schedule-ad4be.firebaseio.com",
    projectId: "train-schedule-ad4be",
    storageBucket: "train-schedule-ad4be.appspot.com",
    messagingSenderId: "672277355668"
  };
  firebase.initializeApp(config);
  var database=firebase.database();
//grabbing values from forum when the submit button is clicked
$("#submit").on("click",function(event){
	// preventing the page from refreshing
	event.preventDefault();
	var trainName=$("#name-input").val().trim();
	var trainDestination=$("#Destination-input").val().trim();
	var time=$("#first-time-input").val().trim();
	var frequency=$("#frequency-input").val().trim();
	// creating a new object for the values in order to push it to the firebase
	var NewTrain={
		name:trainName,
		destination:trainDestination,
		time:time,
		frequency:frequency
	};
		// pushing the values to database
	database.ref().push(NewTrain);
	
		// clearing the inputs field
	$("#name-input").val("");
	$("#Destination-input").val("");
	$("#first-time-input").val("");
	$("#frequency-input").val("");	

});
//whenever an object is added we start our calculations
database.ref().on('child_added',function(snapshot){
	var TrainName=snapshot.val().name;
	var TrainDestination = snapshot.val().destination;
	var Traintime= (snapshot.val().time);
	var TrainFrequency =snapshot.val().frequency;
   var convertedTime = moment(Traintime, "HH:mm")
    console.log(convertedTime);

  // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(convertedTime), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var trnRemainder = diffTime % TrainFrequency;
    console.log("trainremainder:"+trnRemainder);

    // Minute Until Train
    var trnMinutesTill = TrainFrequency - trnRemainder;
    console.log("MINUTES TILL TRAIN: " + trnMinutesTill);

    // Next Train
    var nextArrival = moment().add(trnMinutesTill, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("HH:mm"));

  

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + TrainName + "</td><td>" + TrainDestination + "</td><td>" +
  TrainFrequency + "</td><td>" + moment(nextArrival).format("HH:mm") + "</td><td>" + trnMinutesTill + "</td><td>" + "" + "</td></tr>");
});



