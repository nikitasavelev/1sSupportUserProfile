<template>
    <v-container fill-height class="mw-50">
        <v-layout column justify-center align-center>
        <image-with-aspect-ratio class="v-img-logo img-logo-login mb-5" :source="'/logo.jpeg'">
        </image-with-aspect-ratio>
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
                    v-model="partnerLogin"
                    type="text"
                    label="Логин компании"
                    required
                ></v-text-field>
                 <v-text-field
                    v-model="partnerPassword"
                    type="password"
                    label="Пароль компании"
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
      partnerLogin: "",
      partnerPassword: "",
      passwordRules: [
        v => !!v || "Пароль не может быть пуст",
        v => v.length >= 6 || "Пароль должен быть длиннее 6 символов"
      ],
      isSent: false
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
        this.partnerLogin,
        this.partnerPassword
      );
      console.log(response);
      this.isSent = true;
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
