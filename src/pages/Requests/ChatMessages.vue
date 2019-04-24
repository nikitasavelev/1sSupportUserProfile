<template>
    <v-container v-if="isLoaded">
        <v-layout
            column
            v-for="(message, index) in messages"
            :key="message.id"
            class="clearfix chat-message-and-time"
            :align-end="message.isMe"
            :align-start="!message.isMe">
            <v-layout                 
                v-if="index === 0 || messages[index].firstName !== messages[index-1].firstName"
                :class="{'right': message.isMe, 'left': !message.isMe}"
                class="chat-message-name"
                align-end
            >
                {{message.firstName}}
            </v-layout>            
            <v-card
                class="chat-message pa-2 mt-2"
                :class="{'right': message.isMe, 'left': !message.isMe}">
                <div class="">{{message.text}}</div>
                <div
                    class="chat-message-time"
                    :class="{'right': message.isMe, 'left': !message.isMe}"
                >
                    {{message.createdAt}}
                </div>
            </v-card> 
        </v-layout>
    </v-container>
    <v-layout v-else justify-center mt-5>
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
        ></v-progress-circular>
     </v-layout>
</template>
<script>
import QuestionsService from "Services/QuestionsService.js";
import NotificationsService from "Services/NotificationsService.js";
import formatDate from "Constants/FORMAT_DATE.js";
export default {
  name: "ChatMessages",
  props: { questionId: Number },
  data() {
    return {
      messages: [],
      isLoaded: false,
      notificationsConnection: null
    };
  },
  async mounted() {
    this.messages = await QuestionsService.getMessages(this.questionId);
    this.isLoaded = true;
    this.notificationsConnection = await NotificationsService.connectToNotificationsHub();
    this.notificationsConnection
      .start()
      .then(() => {
        this.notificationsConnection.invoke(
          "connect",
          this.$store.getters.getAuthorizationToken
        );
      })
      .catch(err => console.log(err));

    this.notificationsConnection.on("message_added", data => {
      data.isMe = false;
      data.createdAt = formatDate(data.createdAt);
      this.messages.push(data);
    });
  },
  async beforeDestroy() {
    this.notificationsConnection.stop();
  },
  methods: {
    sendOwnMessage(message) {
      message.isMe = true;
      this.messages.push(message);
    }
  }
};
</script>

<style scoped>
.chat-message {
  max-width: 40vw;
}

.chat-message-time {
  color: gray;
  font-size: 0.6rem;
}

.left {
  float: left !important;
}

.right {
  float: right !important;
}

.chat-message-name {
  color: blue;
  font-size: 1.2rem;
}
</style>
