<template>
    <div class="mw-50wv pa-2">
        <span>ООО Вектор</span>
        <span class="pa-1 ml-2 border">1768859955</span>
        <span class="pa-1 border">4335345345</span>
        <v-layout class="mt-2">Екатерина Савельева</v-layout>
        <table class="border" rules="all">
            <tr>
                <th>Сервис Инженеры</th>
                <th>Менеджер</th>
            </tr>
            <tr>
                <td>Круглов Михаил</td>
                <td>Аксенов Юрий</td>
            </tr>
             <tr>
                <td>Говядко Илья</td>
                <td>Консультант</td>
            </tr>
        </table>

        <div class="d-inline-block">
            <div class="border mt-3 pl-1">
                Логин portallc krumih
                <v-btn class="text-capitalize">Восстановить пароль к порталу</v-btn>
            </div>
            <div class="border pl-1">
                Договор: ИТС ПРОФ до 21.09.2019 
                <v-btn class="text-capitalize">Продлить</v-btn>
            </div>
        </div>

        <table class="border mt-2" rules="all">
            <tr>
                <th>Мои продукты</th>
                <th>Ссылка на обновление</th>
            </tr>
            <tr>
                <td>Бухгалтерия предприятия</td>
                <td><a>https://portal.lc.ru/applications/4</a></td>
            </tr>
             <tr>
                <td>ЗУП</td>
                <td><a>https://portal.lc.ru/applications/5</a></td>
            </tr>
        </table>
    </div>
</template>
<style scoped>
.border {
  border: 1px solid gray;
}
th,
td {
  padding: 10px;
}
.mw-50wv {
  max-width: 50vw;
}

.column {
  width: 100%;
}
</style>
