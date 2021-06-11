<template>
  <div id="app" >
    <app-header-admin  v-if="$route.name == 'Admin' || $route.name == 'AddFood' || $route.name == 'ManageFood' ||  $route.name == 'SoftDeleted' || $route.name == 'HistoryMaterial' || $route.name == 'ManagerChangeFood' || $route.name == 'Statistical' || $route.name == 'OrderManagement' || $route.name == 'Chart' || $route.name == 'OrderCanceled' || $route.name == 'OrderPacking' || $route.name == 'OrderSuccess' || $route.name == 'User'"/>

    <app-header :class="checkPath" v-if="$route.name != 'Admin' &&  $route.name != 'AddFood' &&  $route.name != 'ManageFood' &&  $route.name != 'SoftDeleted'  &&  $route.name != 'AdminLogin' && $route.name != 'HistoryMaterial' && $route.name != 'ManagerChangeFood' && $route.name != 'Statistical' && $route.name != 'OrderManagement' && $route.name != 'Chart' && $route.name != 'OrderCanceled' && $route.name != 'OrderPacking' && $route.name != 'OrderSuccess' && $route.name != 'User'"/>

    <router-view />
    <app-footer v-if="$route.name != 'Admin' &&  $route.name != 'AddFood' &&  $route.name != 'ManageFood' &&  $route.name != 'SoftDeleted' &&  $route.name != 'AdminLogin' && $route.name != 'HistoryMaterial' && $route.name != 'ManagerChangeFood' && $route.name != 'Statistical' && $route.name != 'OrderManagement' && $route.name != 'Chart' && $route.name != 'OrderCanceled'  && $route.name != 'OrderPacking' && $route.name != 'OrderSuccess' && $route.name != 'User' "/>
  
  </div>
</template>
<script>
import Header from './components/Header'
import HeaderAdmin from './components/HeaderAdmin'
import Footer from './components/Footer'
import Vue from 'vue'
import ElementUI from 'element-ui'
import elementLocale  from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI ,{locale: elementLocale});

export default {
  
  data() {
    return {
      
    }
  },
 
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    checkPath(){
      if (this.$route.name == "Admin") {
        return "Admin";
      } else {
        return "User";
      }
    }
  },
  components:{
    'app-header' : Header,
    'app-header-admin': HeaderAdmin,
    'app-footer' : Footer,
  }

}

</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  scroll-behavior: smooth;
  color: #fff;
  font-size: 14px;
  font-weight: normal;
}
.row {
  width: 100%;
}
</style>
