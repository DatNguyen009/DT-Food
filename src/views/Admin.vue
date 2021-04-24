<template>
  <div class="admin">
    <div id="layoutSidenav">
      <app-left-nav/>
     
      <div id="layoutSidenav_content">
        <app-qtv v-if="$route.name == 'Admin' && typeAdmin == 'qtv' " />
        <app-kitchen  v-if="$route.name == 'Admin' && typeAdmin == 'nhabep' " />
        <app-ncc  v-if="$route.name == 'Admin' && typeAdmin == 'nhacungcap' " />
        <router-view></router-view>
        <app-footer-admin/>
      </div>
    </div>
  </div>
</template>

<script>
import LeftNav from '../components/LeftNav'
import FooterAdmin from '../components/FooterAdmin'
import QTV from '../components/QTV'
import NCC from '../components/Ncc'
import NB from '../components/Kitchen'
import ElementUI from 'element-ui'
import Vue from 'vue'
Vue.use(ElementUI)
export default {
  data() {
    return {
      typeAdmin: ""
    }
  },
  created() {
    this.checkAdmin();
  },
  methods: {
    checkAdmin(){
      let admin = localStorage.getItem("Admin");
      this.typeAdmin = admin;
      if (admin != "qtv" && admin != "nhabep" && admin != "nhacungcap") {
        this.$router.push({path: "/adminLogin"})
      }
    }
  },
  components:{
    'app-left-nav': LeftNav,
    'app-footer-admin': FooterAdmin,
    'app-ncc': NCC,
    'app-qtv': QTV,
    'app-kitchen': NB,
  }
  
};
</script>

<style lang="scss">
@import url("//unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css");
@import '../assets/css/style.css';
.admin{
  color: black;
}
.el-tag{
  margin: 1rem;
}
</style>