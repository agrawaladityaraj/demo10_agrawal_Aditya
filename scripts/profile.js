let currentUser; //global variable

function populateInfo() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (user) {
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        //get the data fields of the user
        // var userName = userDoc.data().name;
        // var userSchool = userDoc.data().school;
        // var userCity = userDoc.data().city;
        const { name, school, city } = userDoc.data();

        //if the data fields are not empty, then write them in to the form.
        if (name != null) {
          document.getElementById("nameInput").value = name;
        }
        if (school != null) {
          document.getElementById("schoolInput").value = school;
        }
        if (city != null) {
          document.getElementById("cityInput").value = city;
        }
      });
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}

//call the function to run it
populateInfo();

function editUserInfo() {
  //Enable the form fields
  document.getElementById("personalInfoFields").disabled = false;
}

function saveUserInfo() {
  document.getElementById("personalInfoFields").disabled = true;
  const name = document.getElementById("nameInput").value;
  const school = document.getElementById("schoolInput").value;
  const city = document.getElementById("cityInput").value;
  if (name && school && city) {
    currentUser
      .update({
        name,
        school,
        city,
      })
      .then(() => {
        console.log("done!!");
      });
  } else {
    console.log("Fields cannot be empty!");
    document.getElementById("personalInfoFields").disabled = false;
  }
}
