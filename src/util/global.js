import Vue from "vue";
import ElementUI from "element-ui";

Vue.use(ElementUI);

export default {
    notifyMessage: (title, message, type, position)=>{

        return this.$notify({
            title: title,
            message: message,
            type: type,
            position: position,
        });

    }
};
