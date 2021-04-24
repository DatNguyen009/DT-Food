import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

firebase.initializeApp({
    apiKey: "AIzaSyD93wAdVJjwX3ZUfx0GR0co5bqt1I7so48",
    authDomain: "vue-dtfood.firebaseapp.com",
    databaseURL: "https://vue-dtfood-default-rtdb.firebaseio.com",
    projectId: "vue-dtfood",
    storageBucket: "vue-dtfood.appspot.com",
    messagingSenderId: "692286664670",
    appId: "1:692286664670:web:5910b22edc60cfc5aa374f",
    measurementId: "G-GYYG9RZ96H"
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')