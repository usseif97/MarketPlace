import * as firebase from "firebase";

class ChatFirebase {
  constructor() {}

  get db() {
    return firebase.database().ref("Messages");
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  send = (messages) => {
    messages.forEach((item) => {
      const message = {
        text: item.text,
        timeStamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };
      this.db.push(message);
    });
  };

  parse = (message) => {
    const { user, text, timeStamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timeStamp);

    return { _id, createdAt, text, user };
  };

  get = (callback) => {
    this.db.on("child_added", (snapshot) => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }
}

export default new ChatFirebase();
