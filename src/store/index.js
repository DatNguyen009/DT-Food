import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'



Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        product: [],
        username: localStorage.getItem('username') || null,
        customers_address: localStorage.getItem('customers_address') || null,
        customers_phone: localStorage.getItem('customers_phone') || null,
        customers_email: localStorage.getItem('customers_email') || null,
        // accessToken: localStorage.getItem('accessToken') || null,
        statusLogin: localStorage.getItem('statusLogin') || null,
        resultSearch: [],
        productDetail: [{ product_material: [{ materials_name: "Xương heo", materials_amount: "100", materials_unit: "gram", materials_image: "xuongheo.jpg", materials_slug: "xuong-heo" }] }],
        reviews: [],
        getCart: [],
        getNB: [],
        dataKitchen: [],
        detailKitchenData: [{ order_materials: [{ materials_amount: 200, materials_name: "Xương heo", materials_unit: "gram" }] }],
        getNcc: [],
        allSlug: []
    },

    getters: {
        getProductName(state) {
            for (let index = 0; index < state.productDetail.length; index++) {
                return state.productDetail[index].product_name;
            }
        },
        getProductPrice(state) {
            for (let index = 0; index < state.productDetail.length; index++) {
                return state.productDetail[index].product_price;
            }
        },
        getTotalPrice(state) {
            let totalPrice = 0;
            for (let index = 0; index < state.getCart.length; index++) {
                totalPrice += state.getCart[index].product_totalPrice;
            }
            return totalPrice;
        },

        // getNB(state) {
        //     var arr = state.getNB;
        //     var helper = {};
        //     var result = arr.reduce(function(r, o) {
        //         var key = o.material_name;
        //         if (!helper[key]) {
        //             helper[key] = Object.assign({}, o); // create a copy of o
        //             r.push(helper[key]);
        //         } else {
        //             helper[key].material_amount += o.material_amount;
        //         }

        //         return r;
        //     }, []);

        //     return result;
        // }
    },

    mutations: {
        SaveProduct(state, data) {
            state.product = data;
        },
        SaveUsername(state, data) {
            state.username = data[0].customers_name;
            state.customers_email = data[0].customers_email;
            state.customers_phone = data[0].customer_phone;
            state.customers_address = data[0].customers_address;
        },
        StatusLogin(state, data) {
            state.statusLogin = data;
        },
        search(state, data) {
            state.resultSearch = data;
        },
        logout(state) {
            state.username = null;
            state.statusLogin = null;
        },
        ProductDetail(state, data) {
            state.productDetail = data;
        },
        reviews(state, data) {
            state.reviews = data;
        },
        getCart(state, data) {
            state.getCart = data;
        },
        getNB(state, data) {
            state.getNB = data;
        },
        DataKitchen(state, data) {
            state.dataKitchen = data;
        },
        DetailKitchenData(state, data) {
            state.detailKitchenData = data;
        },
        getNcc(state, data) {
            state.getNcc = data;
        },
        AllSlug(state, data) {
            state.allSlug = data;
        }
    },
    actions: {
        async product(context, credentials) {
            await Axios.get(credentials.url)
                .then(res => {
                    context.commit("SaveProduct", res.data);
                })
                .catch(err => console.log(err))
        },
        login(context, credentials) {
            localStorage.setItem('username', credentials.SaveUsername[0].customers_name);
            localStorage.setItem('customers_address', credentials.SaveUsername[0].customers_address);
            localStorage.setItem('customers_email', credentials.SaveUsername[0].customers_email);
            localStorage.setItem('customers_phone', credentials.SaveUsername[0].customer_phone);
            localStorage.setItem('statusLogin', "Login");
            context.commit("SaveUsername", credentials.SaveUsername);
            context.commit("StatusLogin", "Login");
        },
        async search(context, credentials) {
            await Axios.get(`${credentials.url}/${credentials.key}`)
                .then(res => {
                    context.commit("search", res.data);
                })
                .catch(err => console.log(err))
        },
        logout(context) {
            localStorage.removeItem('username');
            localStorage.removeItem('statusLogin');
            context.commit('logout');
        },
        async productDetail(context, credentials) {
            await Axios.get(`${credentials.url}${credentials.product_slug}`)
                .then(res => context.commit("ProductDetail", res.data))
                .catch(err => console.log(err))
        },
        async getReviews(context, credentials) {
            await Axios.get(`${credentials.url}`)
                .then(res => context.commit("reviews", res.data))
                .catch(err => console.log(err))
        },
        async getCart(context, credentials) {
            await Axios.get(`${credentials.url}`)
                .then(res => context.commit("getCart", res.data))
                .catch(err => console.log(err))
        },
        async getNB(context, credentials) {
            await Axios.get(`${credentials.url}`)
                .then(res => context.commit("getNB", res.data))
                .catch(err => console.log(err))
        },
        async DataKitchen(context, credentials) {
            await Axios.get(`${credentials.url}`)
                .then(res => context.commit("DataKitchen", res.data))
                .catch(err => console.log(err))
        },
        async DetailKitchenData(context, credentials) {
            await Axios.get(`${credentials.url}`)
                .then(res => context.commit("DetailKitchenData", res.data))
                .catch(err => console.log(err))
        },
        async getNcc(context, credentials) {
            await Axios.get(`${credentials.url}`)
                .then(res => context.commit("getNcc", res.data))
                .catch(err => console.log(err))
        },

        async AllSlug(context, credentials) {
            await Axios.get(`${credentials.url}`)
                .then(res => context.commit("AllSlug", res.data))
                .catch(err => console.log(err))
        },


    },
    modules: {}
});