// Imports
const firestoreService = require("firestore-export-import");
const firebaseConfig = require("./config.js");
const serviceAccount = require("./serviceAccount.json");

// Sends JSON To Firestore
//Launched by going into upload-script folder and using 'node import.js' to load.
const jsonToFirestore = async () => {
  try {
    console.log("Initialzing Firebase");
    await firestoreService.initializeApp(
      serviceAccount,
      firebaseConfig.databaseURL
    );
    console.log("Firebase Initialized");

    //Looks for file with spells
    await firestoreService.restore("./spells.json");
    console.log("Upload Success");
  } catch (error) {
    console.log("Could not upload: " + error);
  }
};

jsonToFirestore();
