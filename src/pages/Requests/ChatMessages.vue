<template>
    <v-layout column v-if="isLoaded" class="chat" ref="chat">
        <div ref="highestElementToDownloadMessages"/>
        <v-layout
            column
            v-for="(message, index) in messages"
            :key="message.id"
            class="clearfix chat-message-and-time"
            style="min-height: 60px !important;"
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
      isFirstScroll: true,
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
      this.observer = new IntersectionObserver(this.intersectionObserverCallback);
      this.observer.observe(this.$refs.highestElementToDownloadMessages);
      this.$emit("messagesLoaded");
    });
  },
  async beforeDestroy() {
    this.notificationsConnection.stop();
    this.observer.unobserve(this.$refs.highestElementToDownloadMessages)
  },
  methods: {
    sendOwnMessage(message) {
      message.isMe = true;
      this.messages.push(message);
    },
    async intersectionObserverCallback(entries) {
      // if scroll is moving towards top
      if (entries[0].boundingClientRect.y > 0 && !this.isFirstScroll) {
        this.messageHeight = this.$root.$el.querySelector(".chat-message-and-time").offsetHeight;
        this.offset += 5;
        const newMessages = await QuestionsService.getMessages(this.questionId, this.offset, 5);
        // if no messages recieved then no messages left
        if (newMessages.length === 0) {
          this.observer.unobserve(this.$refs.highestElementToDownloadMessages)
        } else {
          this.messages.unshift(...newMessages);
          this.$refs.chat.scrollBy({ 
            top: this.messageHeight * 5,
            left: 0, 
            behavior: 'auto' 
          });
        }
      }
      if (this.isFirstScroll) {
        this.$refs.chat.scrollTo({
          top: this.$refs.chat.offsetHeight + 50,
          behavior: 'smooth' 
        });            
        this.isFirstScroll = false; 
      } 
    }  
  }
};
</script>

<style scoped>
.chat-message {
  max-width: 40vw;
  min-height: 3rem;
}

.chat-message-time {
  color: #757575;
  font-size: 0.6rem;
  min-height: 60px !important;
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
</style>
