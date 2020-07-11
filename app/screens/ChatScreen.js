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

export default class ChatScreen extends React.Component {
  //const [messages, setMessages] = useState([]);

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
