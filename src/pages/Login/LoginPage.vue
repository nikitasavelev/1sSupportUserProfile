<template>
  <main>
    <v-container fill-height class="mw-50">
      <v-layout column justify-center align-center>
        <image-with-aspect-ratio class="v-img-logo img-logo-login mb-5" :source="'/logo.jpeg'">
        </image-with-aspect-ratio>
        <form v-if="!isLoading" class="login-form pa-5" @submit="signIn">
          <v-layout align-center column class="pa-4">
            <div class="login-system">Вход в систему</div>
            <v-text-field
                v-model="email"
                :rules="emailRules"
                :counter="25"
                label="Логин"
                @input="isAlertShown = false"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :type="'password'"
                label="Пароль"
                @input="isAlertShown = false"
                required
              ></v-text-field>
              <v-alert
                :value="isAlertShown"
                type="error"
              >
                Ошибка авторизации
              </v-alert>
              <v-btn color="primary" class="text-uppercase" type="submit">Войти</v-btn>
              <router-link :to="{ name: 'RegistrationPage'}">
                Зарегистрироваться
              </router-link>
            </v-layout>
        </form>
        <v-layout v-else justify-center mt-5>
          <v-progress-circular
            :size="70"
            :width="7"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-layout>
      </v-layout>
    </v-container>
  </main>
</template>

<script>
import LoginService from "Services/LoginService.js";
import ImageWithAspectRatio from "Components/ImageWithAspectRatio";
import { roleTypes } from "Constants/ROLE_TYPES.js";

export default {
  name: "LoginPage",
  components: { ImageWithAspectRatio },
  data() {
    return {
      serverResponse: {},
      accessToken: "",
      roleType: "",
      email: "",
      password: "",
      isAlertShown: false,
      emailRules: [
        v => !!v || "Заполните поле логина",
        v => v.length <= 25 || "Логин должен быть длиной 25 символов"
      ],
      passwordRules: [
        v => !!v || "Пароль не может быть пуст",
        v => v.length >= 6 || "Слабый пароль"
      ],
      isLoading: false,
    };
  },
  methods: {
    async signIn(event) {
      event.preventDefault();
      this.isLoading = true;
      this.serverResponse = await LoginService.signIn(
        this.email,
        this.password
      );
      this.isLoading = false;
      if (this.serverResponse.accessToken && this.serverResponse.roleType) {
        this.accessToken = this.serverResponse.accessToken;
        this.roleType = this.serverResponse.roleType;
        this.userId = this.serverResponse.userId;
        this.$store.dispatch("updateAuthorizationToken", this.accessToken);
        this.$store.dispatch("updateRoleType", this.roleType);
        this.$store.dispatch("updateUserId", this.userId);
        this.redirectToStartPageForRole(this.roleType);
      } else {
        this.isAlertShown = true;
      }
    },
    redirectToStartPageForRole(roleType) {
      switch (roleType) {
        case roleTypes.Client:
          this.$router.push({ name: "MainPage" });
          break;
        case roleTypes.Operator:
        case roleTypes.Admin:
          this.$router.push({ name: "ProfilePage" });
          break;
      }
    },
  }
};
</script>

<style scoped>
.mw-50 {
  max-width: 50vw;
}

.img-logo-login {
  max-width: 650px;
  height: 150px;
}

.login-form {
  border: 1px solid gray;
}

.login-system {
  font-size: 1.625rem;
  font-family: "Open Sans", sans-serif;
}

.login-btn {
  background-color: #003399;
}
</style>

