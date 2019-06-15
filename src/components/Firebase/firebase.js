import app from 'firebase/app';
// eslint-disable-next-line
import * as firebase from 'firebase' 

import flamelink from 'flamelink'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

class Firebase {
  constructor() {
    const firebaseApp = app.initializeApp(config);
    this.app = firebaseApp;

    /* Flamelink */

    this.flamelink = flamelink({
      firebaseApp,
      dbType: 'cf', // can be either 'rtdb' or 'cf' for Realtime DB or Cloud Firestore
      locale: 'en-US',
      precache: true
    })

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Message API ***

  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');

  // *** Photos API ***
  photos = () => this.storage.ref("images");

  // *** Rooms API ***
  rooms = () => this.flamelink.content.get({ schemaKey: 'room' });

  // *** Services API ***
  services = () => this.flamelink.content.get({ schemaKey: 'service' });

  // *** Nearby API ***
  nearby = () => this.flamelink.content.get({ schemaKey: 'nearby' });

  // *** Hotel API ***

  hotel = () => this.flamelink.content.get({ schemaKey: 'hotel', populate: [{
    field: 'images'}]});

  // *** Titles API ***

  titles = () => this.flamelink.content.get({ schemaKey: 'titles' });

  // *** Images API ***

  getURL = (id) => this.flamelink.storage.getURL(id)

  // *** Language API ***

  setLocale = (locale) => this.flamelink.settings.setLocale(locale)
}

export default Firebase;
