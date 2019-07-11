export default {
    methods: {
        reset: function (self, fieldsArray) {
            fieldsArray.forEach(field => {
                self[field] = '';
            });
        }
    }
}