<template>
    <v-container fill-height class="mw-50">
        <v-layout column justify-center align-center>
        <image-with-aspect-ratio class="v-img-logo img-logo-login mb-5" :source="'/logo.jpeg'">
        </image-with-aspect-ratio>
        <form class="register-form" @submit="register">
            <v-layout align-center column class="pa-3 px-5">
                <div class="login-system">Регистрация</div>
                <v-text-field
                    v-model="surname"
                    class="pt-0"
                    :counter="30"
                    label="Фамилия"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="name"
                    :counter="30"
                    label="Имя"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="middlename"
                    :counter="30"
                    label="Отчество"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="login"
                    :counter="20"
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
                <v-text-field
                    v-model="repeatPassword"
                    :rules="passwordRules"
                    :type="'password'"
                    label="Подтвердите пароль"
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
                    v-model="phone"
                    label="Контактный телефон"
                    color="#003399"
                    mask="# (###) ###-##-##"
                    placeholder="8 (123) 456-78-90"
                    :rules="[
                      () => !!phone || 'Пожалуйста, введите номер телефона',
                    ]"
                    required
                ></v-text-field>
                <v-btn color="primary" class="text-uppercase" type="submit">Зарегистрироваться</v-btn>
            </v-layout>
        </form>
    </v-layout>
  </v-container>
</template>
<script>
import ImageWithAspectRatio from "Components/ImageWithAspectRatio";

export default {
  name: "RegistrationPage",
  components: { ImageWithAspectRatio },
  data() {
    return {
      phone: "",
      email: "",
      name: "",
      surname: "",
      middlename: "",
      login: "",
      password: "",
      repeatPassword: "",
      passwordRules: [
        v => !!v || "Пароль не может быть пуст",
        v => v.length >= 6 || "Пароль должен быть длиннее 6 символов"
      ]
    };
  },
  methods: {
    register() {}
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
