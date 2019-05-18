<template>
    <v-layout column v-if="isLoaded" class="chat clearfix" ref="chat">
        <div ref="highestElementToDownloadMessages"/>
        <v-layout
            column
            v-for="(message, index) in messages"
            :key="message.id"
            class="clearfix chat-message-and-time"
            :class="{'more-height': index === 0 || messages[index].firstName !== messages[index-1].firstName}"
            :align-end="message.isMe"
            :align-start="!message.isMe">
            <div                 
              v-if="index === 0 || messages[index].firstName !== messages[index-1].firstName"    
              class="chat-message-name"
            >
              {{message.firstName}}
            </div>            
            <v-card
                class="chat-message pa-2 mt-2 d-block"
                :align-end="message.isMe"
                :align-start="!message.isMe">
                <div class="">{{message.text}}</div>
                <div
                    class="chat-message-time"
                    :class="{'right': message.isMe, 'left': !message.isMe}"
                >
                    {{message.createdAt}}
                </div>
            </v-card> 
        </v-layout>
    </v-layout>
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
import formatDate from "Constants/COMMON_METHODS.js";
export default {
  name: "ChatMessages",
  props: { questionId: Number },
  data() {
    return {
      messages: [],
      isLoaded: false,
      notificationsConnection: null,
      offset: 10,
      messageHeight: 0,
      isFirstScroll: true
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

    this.$nextTick(() => {
      this.observer = new IntersectionObserver(
        this.intersectionObserverCallback
      );
      this.observer.observe(this.$refs.highestElementToDownloadMessages);
      this.$emit("messagesLoaded");
    });
  },
  async beforeDestroy() {
    this.notificationsConnection.stop();
    this.observer.unobserve(this.$refs.highestElementToDownloadMessages);
  },
  methods: {
    sendOwnMessage(message) {
      message.isMe = true;
      this.messages.push(message);
    },
    async intersectionObserverCallback(entries) {
      // if scroll is moving towards top
      if (entries[0].boundingClientRect.y > 0 && !this.isFirstScroll) {
        this.messageHeight = this.$root.$el.querySelector(
          ".chat-message-and-time"
        ).offsetHeight;        
        const newMessages = await QuestionsService.getMessages(
          this.questionId,
          this.offset,
          5
        );
        this.offset += 5;
        // if no messages recieved then no messages left
        if (newMessages.length === 0) {
          this.observer.unobserve(this.$refs.highestElementToDownloadMessages);
        } else {
          this.messages.unshift(...newMessages);
          this.$refs.chat.scrollBy({
            top: this.messageHeight * newMessages.length,
            left: 0,
            behavior: "auto"
          });
        }
      }
      if (this.isFirstScroll) {
        this.$refs.chat.scrollTo({
          top: this.$refs.chat.offsetHeight + 50,
          behavior: "smooth"
        });
        this.isFirstScroll = false;
      }
    }
  }
};
</script>

<style scoped>
.chat-message {
  max-width: 30vw;
}

.chat-message-time {
  color: #757575;
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

.chat {
  overflow-y: scroll;
  height: 40vh;
}

.chat-message-and-time {
  min-height: 3.75rem !important;
}

.chat-message-and-time:last-child {
  margin-bottom: 0.5rem;
}

.layout {
  flex: 0 1 auto !important;
  display: -webkit-box;
  display: -ms-flexbox;
}
</style>
