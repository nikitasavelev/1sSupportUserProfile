<template>
  <v-container>
    <v-layout row>
      <v-dialog v-model="dialog" max-width="700">
        <p @click="opForm()" class ="activ" slot="activator" persistent maxwidth="100px" color="grey" dark>Я не нашел подоходящей статьи</p>
        <!-- окно форма связи начало -->
        <v-card v-if="modlst == 1" ref="form" class="text-xs-center">

          <div class = "header-logo">
            <img class="img-logo" src="@/assets/logo.png">
            <v-btn flat icon color="#003399" class="ic-btn" @click.native="dialog = false">
              <v-icon>clear</v-icon>
            </v-btn>
          </div>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>

                <v-flex xs12>
                  <v-text-field
                    v-model="phone"
                    label="Контактный телефон"
                    color="#003399"
                    mask="# (###) ###-##-##"
                    placeholder="8 (123) 456-78-90"
                    ref="phone"
                    :rules="[
                      () => !!phone || 'Пожалуйста, введите номер телефона',
                    ]"
                    :error-messages="errorMessages"
                    required
                  ></v-text-field>
                </v-flex>

                <v-flex xs12>
                   <v-text-field
                      v-model="theme"
                      ref="theme"
                      label="Напишите тему"
                      class="mt-2 choose-title"
                      required
                  ></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-textarea
                    v-model="probl"
                    color="#003399"
                    rows='3'
                    label="Пожалуйста, опишите вашу проблему и мы свяжемся с вами"
                    ref="probl"
                    :rules="[() => !!probl || 'Пожалуйста, опишите вашу проблему']"
                    :error-messages="errorMessages"
                    required
                  ></v-textarea>
                </v-flex>

              </v-layout>
            </v-container>
            <small></small>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="v-btn-save" color="#003399" @click="submit()" dark>ОТПРАВИТЬ ЗАЯВКУ</v-btn>
          </v-card-actions>

        </v-card>
        <!-- окно форма связи конец -->
        <!-- окно спасибо за заявку начало -->
        <v-card v-else class="text-xs-center">

          <div class = "header-logo">
            <img class="img-logo" src="@/assets/logo.png">
            <!-- <v-img class="v-img-logo" src="https://argos1c.ru/templates/argos/images/logo.png"></v-img> -->
            <v-btn flat icon color="#003399" class="ic-btn" @click.native="dialog = false">
              <v-icon>clear</v-icon>
            </v-btn>
          </div>

          <v-card-text>
            <v-flex xs12>
              <br><br><br>
              <p class="p1">Спасибо!<br>Ваша заявка успешно отправлена!</p>
              <br>
              <p class="p2">В скором времени с Вами свяжется наш специалист.<br>Надеемся, наши совместные усилия сделают Вашу работу проще и приятнее.</p>
              <br><br>
            </v-flex>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="v-btn-save" color="#003399" @click.native="dialog = false" dark>ГОТОВО</v-btn>
          </v-card-actions>

        </v-card>
        <!-- окно спасибо за заявку конец -->
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import { serverAPIUrls } from "Constants/SERVER_API_URLS";
export default {
  name: "ModalComponent",
  props: {},
  data() {
    return {
      dialog: false,
      modlst: 1,
      themes: ["Кажется, что-то пошло не так"],
      errorMessages: "",
      phone: null,
      theme: null,
      probl: null,
      formHasErrors: false,
    };
  },
  computed: {
    form() {
      return {
        phone: this.phone,
        theme: this.theme,
        probl: this.probl
      };
    },
    token: function() {
      return this.$store.state.authorizationToken;
    },
    sessionId: function() {
      return this.$store.state.sessionId;
    }
  },
  watch: {
    phone() {
      this.errorMessages = "";
    },
    dialog: async function() {
      this.themes = await this.getMessageThemes();
    }
  },
  methods: {
    opForm() {
      this.modlst = 1;
      this.theme = null;
      this.probl = null;
    },
    submit() {
      this.formHasErrors = false;
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true;
        this.$refs[f].validate(true);
      });
      if (this.formHasErrors == false) this.closeAndSend();
    },
    getMessageThemes: async function() {
      let axiosConfig = {
        method: "get",
        url: serverAPIUrls.GET_SUPPORT_MESSAGES_TITLES,
        headers: {
          Authorization: "Bearer " + this.token
        }
      };
      var response = await axios(axiosConfig);
      return response.data.data;
    },
    closeAndSend: async function() {
      this.modlst = 2;
      debugger;
      let axiosConfig = {
        method: "post",
        url: serverAPIUrls.SOLUTION_NOT_FOUND,
        headers: {
          Authorization: "Bearer " + this.token
        },
        data: {
          contactdata: this.phone,
          text: this.probl,
          title: this.theme
        }
      };
      await axios(axiosConfig);
      // return response.data
    }
  },
  mounted() {}
};
</script>

<!-- "scoped" нужно что бы CSS действовало только на этот компонент -->
<style scoped>
.v-btn-save {
  bottom: 30px;
  top: -35px;
  right: 32px;
  width: 620px;
  color: white;
  font-weight: bold;
}
.header-logo {
  height: 80px;
  margin-bottom: -50px;
  background: rgb(175, 175, 175);
  background: linear-gradient(
    180deg,
    rgba(213, 213, 225, 1) 0%,
    rgba(228, 228, 235, 1) 50%,
    rgba(255, 255, 255, 1) 100%
  );
  text-align: left;
}
.v-img-logo {
  left: 40px;
  top: 10px;
  width: 80%;
  height: auto;
}
.img-logo {
  margin-left: 40px;
  margin-top: 10px;
  width: 140px;
  height: auto;
}
.ic-btn {
  margin-left: 465px;
  margin-top: -20px;
}
p.p1 {
  color: #003399;
  font-size: 24px;
}
p.p2 {
  color: #808080;
  font-size: 20px;
  padding-bottom: 2px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>