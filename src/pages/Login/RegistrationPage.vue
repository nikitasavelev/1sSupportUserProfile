<template>
    <v-container fill-height class="mw-50 pb-0">
        <v-layout column justify-center align-center>
        <image-with-aspect-ratio class="v-img-logo img-logo-login mb-1" :source="'/logo.jpeg'"/>
        <router-link :to="'/login'" style="font-size: 1.5rem;" class="mb-2">
          Назад
        </router-link>
        <form class="register-form" @submit="signUp">
            <v-layout align-center column class="pa-3 px-5">
                <div class="login-system">Регистрация</div>
                <v-text-field
                    v-model="lastName"
                    class="pt-0"
                    :counter="30"
                    label="Фамилия"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="firstName"
                    :counter="30"
                    label="Имя"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="secondName"
                    :counter="30"
                    label="Отчество"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="email"
                    :type="'email'"
                    label="E-mail"
                    :rules="[
                        () => /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/.test(email) || 'Введите email'
                    ]"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    class="mt-3"
                    :rules="passwordRules"
                    :type="'password'"
                    label="Пароль"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="confirmPassword"
                    class="mt-3"
                    :rules="passwordRules"
                    :type="'password'"
                    label="Подтвердите пароль"
                    required
                ></v-text-field>
                <v-text-field
                    class="mt-3"
                    v-model="phone"
                    label="Контактный телефон"
                    color="#003399"
                    mask="# (###) ###-##-##"
                    placeholder="8 (123) 456-78-90"
                    :rules="[
                      () => !!phone || 'Введите номер телефона',
                    ]"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="secretKey"
                    type="text"
                    label="Секретный ключ"
                    required
                ></v-text-field>
                <v-text-field
                    v-if="isProvider"
                    v-model="crmLogin"
                    type="text"
                    label="Имя входа в 1С CRM"
                    required
                ></v-text-field>
                <v-btn color="primary" class="text-uppercase" type="submit">Зарегистрироваться</v-btn>
            </v-layout>
        </form>
        <div v-if="isSent">Отправлено!</div>
    </v-layout>
  </v-container>
</template>
<script>
import ImageWithAspectRatio from "Components/ImageWithAspectRatio";
import LoginService from "Services/LoginService";

export default {
  name: "RegistrationPage",
  components: { ImageWithAspectRatio },
  data() {
    return {
      phone: "",
      email: "",
      firstName: "",
      lastName: "",
      secondName: "",
      password: "",
      confirmPassword: "",
      secretKey: "",
      crmLogin: "",
      passwordRules: [
        v => !!v || "Пароль не может быть пуст",
        v => v.length >= 6 || "Длина пароля менее 6 символов"
      ],
      isSent: false,
      isProvider: false
    };
  },
  methods: {
    async signUp(event) {
      event.preventDefault();
      const response = await LoginService.signUp(
        this.firstName,
        this.secondName,
        this.lastName,
        this.email,
        this.password,
        this.confirmPassword,
        this.phone,
        this.secretKey,
        this.crmLogin
      );
      this.isSent = true;
    },
    defineRole(valueAfterColon) {
      if (valueAfterColon != null && valueAfterColon.length > 0) {
        return `${valueAfterColon[2]}${valueAfterColon[6]}${
          valueAfterColon[12]
        }${valueAfterColon[20]}`;
      }
      return "";
    }
  },
  watch: {
    secretKey(value) {
      const valueAfterColon = value.split(":")[1];
      if (this.defineRole(valueAfterColon) === "prov") {
        this.isProvider = true;
      } else {
        this.isProvider = false;
      }
    }
  }
};
</script>

<style scoped>
.register-form {
  border: 1px solid gray;
}
.v-text-field {
  padding-top: 0 !important;
}
</style>
