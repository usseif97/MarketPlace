import * as firebase from "firebase";

class ChatFirebase {
  constructor(_to) {
    this.to = _to;
  }

  get toWho() {
    return this.to;
  }

  set toWho(x) {
    this.to = x;
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
      firebase
        .database()
        .ref("Messages")
        .child(this.uid + "/" + this.to)
        .push(message);

      firebase
        .database()
        .ref("Messages")
        .child(this.to + "/" + this.uid)
        .push(message);
    });
  };

  parse = (message) => {
    const { user, text, timeStamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timeStamp);

    return { _id, createdAt, text, user };
  };

  get = (callback) => {
    firebase
      .database()
      .ref("Messages")
      .child(this.uid + "/" + this.to)
      .on("child_added", (snapshot) => callback(this.parse(snapshot)));
  };

  off() {
    firebase
      .database()
      .ref("Messages")
      .child(this.uid + "/" + this.to)
      .off();
  }
}

export default new ChatFirebase("ss");
