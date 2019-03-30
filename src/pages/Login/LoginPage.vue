<template>
  <v-container fill-height class="mw-50">
    <v-layout column justify-center align-center>
      <img class="v-img-logo img-logo-login mb-5" src="@/assets/logo.jpeg"/>
      <form class="login-form pa-5" @submit="login">
        <v-layout align-center column class="pa-5">
          <div class="login-system">Вход в систему</div>
          <v-text-field
              v-model="inn"
              :rules="innRules"
              :counter="12"
              label="Логин"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :type="'password'"
              label="Пароль"
              required
            ></v-text-field>
            <v-btn color="primary" class="text-uppercase" type="submit">Войти</v-btn>
          </v-layout>
      </form>
    </v-layout>
  </v-container>
</template>

<script>
import LoginService from "Services/LoginService.js";
export default {
  name: "LoginPage",
  data() {
    return {
      serverResponse: {},
      accessToken: "",
      role: "",
      inn: "",
      password: "",
      innRules: [
        v => !!v || "Заполните поле инн",
        v => v.length <= 12 || "Инн должен быть длиной 12 символов"
      ],
      passwordRules: [
        v => !!v || "Пароль не может быть пуст",
        v => v.length >= 6 || "Пароль должен быть длиннее 6 символов"
      ]
    };
  },
  methods: {
    async login(event) {
      event.preventDefault();

      // inn:"999999999999",
      // login:"operator",

      // inn:"000000000000",
      // login:"test",

      this.serverResponse = await LoginService.login("000000000000", "test");
      this.accessToken = this.serverResponse.accessToken;
      this.role = this.serverResponse.roleType.name;
      this.$store.dispatch("updateAuthorizationToken", this.accessToken);
      this.$store.dispatch("updateRole", this.role);
      this.redirectToStartPageForRole("Client");
    },
    redirectToStartPageForRole(role) {
      switch (role) {
        case "Client":
          this.$router.push({ name: "MainPage" });
          break;
        case "Operator":
        case "Administrator":
          this.$router.push({ name: "ProfilePage" });
          break;
      }
    }
  }
};
</script>

<style scoped>
.mw-50 {
  max-width: 50vw;
}

.img-logo-login {
  max-width: 450px;
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

