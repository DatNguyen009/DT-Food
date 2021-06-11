<template>
  <div class="my__header">
    <div class="header__content">
      <div class="row">
        <div class="col-5">
          <div class="header__left">
            <ul>
              <li><router-link to="/">TRANG CHỦ</router-link></li>
              <li><router-link to="/shops">THỰC ĐƠN</router-link></li>

              <li><router-link to="/contact">LIÊN HỆ</router-link></li>
              <li><router-link to="/about">GIỚI THIỆU</router-link></li>
            </ul>
          </div>
        </div>
        <div class="col-2">
          <div class="header__center">
            <img src="../assets/logo.png" alt="logo" />
          </div>
        </div>
        <div class="col-5">
          <div class="header__right">
            <div class="row">
              <div class="col-6 left">
                <ul>
                  <li>
                    <input
                      type="text"
                      placeholder="Tìm kiếm"
                      v-model="name"
                      @keyup.enter="Search(name)"
                    />
                  </li>
                </ul>
              </div>
              <div class="col-6 right">
                <ul v-if="this.$store.state.statusLogin == null">
                  <li><router-link to="/login">ĐĂNG NHẬP</router-link></li>
                  <li><router-link to="/register">ĐĂNG KÝ</router-link></li>
                </ul>
                <ul v-if="this.$store.state.statusLogin == 'Login'">
                  <li></li><router-link to="/cart"><i class="fas fa-cart-plus"></i></router-link>
                  <li>
                    <router-link to="/inforUser">{{
                      this.$store.state.username
                    }}</router-link>
                  </li>
                  <li><a @click="Logout()">ĐĂNG XUẤT</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    Search(value) {
      this.$router.push({ path: "/search", query: { q: `${value}` } });
      this.name = "";
    },
    Logout() {
      this.$store.dispatch("logout");
      this.$router.push({path: '/home'});
    },
  },

//   watch: {
//     '$store.state.username': function() {
//         console.log("thay doi");
//     },
//   },
};
</script>

<style lang="scss">
.my__header {
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.my__header .row {
  width: 100%;
}
.header__center img {
  width: 100px;
}
.header__content ul {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header__center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.header__content a {
  color: #fff;
  text-decoration: none;
}
.header__left ul li {
  padding: 16px 16px;
  letter-spacing: 3px;
}
.left ul li {
  padding: 10px 20px;
  letter-spacing: 3px;
}
.right ul li {
  padding: 16px 10px;
}
.header__right input {
  color: white;
  background-color: transparent;
  border: solid #999 1px;
  padding: 6px 0 6px 6px;
  width: 210px;
  border-radius: 6px;
}
.header__right input:focus {
  border: solid #999 1px !important;
}
.header__right input::placeholder {
  color: white;
}
.header__content {
  padding-top: 20px;
  font-weight: 500;
}
.header__content ul li a {
  transition: all 0.5s;
}
.header__content ul li a:hover {
  color: #00cdce;
  text-decoration: none;
}
</style>