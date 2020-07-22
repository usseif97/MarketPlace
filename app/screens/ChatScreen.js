import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

import Screen from "../components/Screen";
import ChatFirebase from "../chat/ChatFirebase";
import * as firebase from "firebase";

export default class ChatScreen extends React.Component {
  state = {
    messages: [],
  };

  get user() {
    return {
      _id: ChatFirebase.uid,
      name: "usseif",
    };
  }

  componentDidMount() {
    const { route } = this.props;
    const to = route.params.to;
    console.log("to: ", to);
    var from = firebase.auth().currentUser.uid;
    console.log("from: ", from);

    ChatFirebase.toWho = to;

    ChatFirebase.get((message) =>
      this.setState((previous) => ({
        messages: GiftedChat.append(previous.messages, message),
      }))
    );
  }

  componentWillUnmount() {
    ChatFirebase.off();
  }

  render() {
    return (
      <Screen>
        <GiftedChat
          messages={this.state.messages}
          onSend={ChatFirebase.send}
          user={this.user}
        />
      </Screen>
    );
  }
}

//const styles = StyleSheet.create({});
