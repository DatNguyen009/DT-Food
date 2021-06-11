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
        getNccA: [],
        getSupplier: [],
        getSupplierA: [],
        allSlug: [],
        slugCategory: [],
        slugMaterial: [],
        imageURL: "",
        relatedFood: [],
        getNccTimeSub: [],
        dataChartOrder: [],
        multipleSelection: [],
        trendingFood: [],
        getInforUser: [],
        getHistoryMaterial: []
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
            for (let index = 0; index < state.multipleSelection.length; index++) {
                totalPrice += state.multipleSelection[index].product_totalPrice;
            }
            return totalPrice;
        },

        getRelatedFood(state) {
            let arr = state.relatedFood;
            let slug = state.slugCategory;
            let slugProduct = state.productDetail[0].product_slug;

            let helper = {};
            let result = arr.reduce((r, item) => {
                item.product_category.forEach(itemA => {
                    slug.forEach(itemB => {
                        let key = item.product_slug;
                        if (itemA.category_name == itemB.category_name) {
                            if (!helper[key] && key != slugProduct) {
                                helper[key] = Object.assign({}, item);
                                r.push(helper[key]);
                            }
                        }
                    });
                })

                return r;
            }, []);


            return result;
            // state.trendingFood.forEach(item => {
            //     if (result.length < 4) {
            //         result.push(item);
            //     }
            // });
            // return result;
            // return result.filter((item, index) => {
            //     return index < 4;
            // })



        },
        getDataChartOrder(state) {
            return state.dataChartOrder.map(item => {
                return {
                    'nameMonths': item.nameMonth,
                    'orderMonths': item.orderMonths
                }
            })
        },
        getPriceCalculation(state) {
            var b = state.getNccA.reduce((a, item) => {
                state.getSupplierA.filter(itemA => {
                    if (item.materials_name === itemA.materials_name) {
                        if (item.materials_unit == "gram") {
                            item.materials_price = (item.materials_amount * itemA.materials_price) / 1000;
                            a.push(item);
                        } else {
                            if (item.materials_unit == "miếng" || item.materials_unit == "củ" || item.materials_unit == "cái" || item.materials_unit == "trái") {
                                item.materials_price = (item.materials_amount * itemA.materials_price);
                                a.push(item);
                            }
                        }
                    }
                })
                return a;
            }, [])

            var c = b.map(item => {
                return {
                    "NCC_dateCreated": item.NCC_dateCreated,
                    "materials_amount": item.materials_amount,
                    "materials_name": item.materials_name,
                    "materials_price": item.materials_price,
                    "materials_unit": item.materials_unit,
                    "materials_priceDetail": state.getSupplierA.filter(itemA => {
                        if (item.materials_name === itemA.materials_name) {
                            return itemA.materials_price;
                        }
                    }),
                };
            });

            return c;

        }
    },

    mutations: {
        SaveProduct(state, data) {
            state.product = data;
        },
        trendingFood(state, data) {
            state.trendingFood = data;
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

        getNccA(state, data) {
            state.getNccA = data;
        },
        getSupplier(state, data) {
            state.getSupplier = data;
        },
        getSupplierA(state, data) {
            state.getSupplierA = data;
        },
        AllSlug(state, data) {
            state.allSlug = data;
        },
        SlugCategory(state, data) {
            state.slugCategory = data;
        },
        SlugMaterial(state, data) {
            state.slugMaterial = data;
        },
        imageURL(state, data) {
            state.imageURL = data;
        },
        relatedFood(state, data) {
            state.relatedFood = data;
        },
        getNccTimeSub(state, data) {
            state.getNccTimeSub = data;
        },
        getHistoryMaterial(state, data) {
            state.getHistoryMaterial = data;
        },
        DataChartOrder(state, data) {
            state.dataChartOrder = data;
        },
        multipleSelection(state, data) {
            state.multipleSelection = data;
        },
        getInforUser(state, data) {
            state.getInforUser = data;
        }
    },
    actions: {
        async product(context, credentials) {
            await Axios.get(credentials.url)
                .then(res => {
                    context.commit("SaveProduct", res.data);
                })
                .catch(err => console.log(err))
            await Axios.get(credentials.url_trendFood)
                .then(res => {
                    context.commit("trendingFood", res.data);
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
            await Axios.get(`${credentials.url_inforUser}`)
                .then(res => context.commit("getInforUser", res.data))
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
            await Axios.get(`${credentials.url_supplier}`)
                .then(res => context.commit("getSupplier", res.data))
                .catch(err => console.log(err))
        },

        async getNccA(context, credentials) {
            await Axios.get(`${credentials.url}`)
                .then(res => context.commit("getNccA", res.data))
                .catch(err => console.log(err))
            await Axios.get(`${credentials.url_supplier}`)
                .then(res => context.commit("getSupplierA", res.data))
                .catch(err => console.log(err))
        },

        async AllSlug(context, credentials) {
            await Axios.get(`${credentials.url}`)
                .then(res => context.commit("AllSlug", res.data))
                .catch(err => console.log(err))
        },
        async SlugCategory(context, credentials) {
            await Axios.get(`${credentials.url}`)
                .then(res => context.commit("SlugCategory", res.data))
                .catch(err => console.log(err))
        },
        async SlugMaterial(context, credentials) {
            await Axios.get(`${credentials.url}`)
                .then(res => context.commit("SlugMaterial", res.data))
                .catch(err => console.log(err))
        },

        imageURL(context, credentials) {
            context.commit("imageURL", credentials.image_url);
        },
        async RelatedFood(context, credentials) {
            await Axios.get(`${credentials.url}`)
                .then(res => context.commit("relatedFood", res.data))
                .catch(err => console.log(err))

            await Axios.get(`http://localhost:8080/apiDTfood/public/api/v1/getSlug/${credentials.product_slug}`)
                .then(res => context.commit("SlugCategory", res.data))
                .catch(err => console.log(err))
        },

        async getNccTimeSub(context, credentials) {
            await Axios.get(`${credentials.url}`)
                .then(res => context.commit("getNcc", res.data))
                .catch(err => console.log(err))
        },
        async getHistoryMaterial(context, credentials) {
            await Axios.get(`${credentials.url}`)
                .then(res => context.commit("getHistoryMaterial", res.data))
                .catch(err => console.log(err))

        },
        async fetchDataMonths(context, credentials) {
            await Axios.get(`${credentials.url}`)
                .then(res => context.commit("DataChartOrder", res.data))
                .catch(err => console.log(err))

        },
        multipleSelection(context, credentials) {
            context.commit("multipleSelection", credentials.data);

        },

    },
    modules: {}
});