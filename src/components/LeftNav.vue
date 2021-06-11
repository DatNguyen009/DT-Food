<template>
<div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div class="sb-sidenav-menu">
            <div class="nav">
                <div class="sb-sidenav-menu-heading">Core</div>

                <router-link class="nav-link" to="/admin/addFood">
                    <div class="sb-nav-link-icon">
                        <i class="fas fa-plus"></i>
                    </div>
                    Thêm món ăn
                </router-link>

                <div class="sb-sidenav-menu-heading">Interface</div>

                <router-link class="nav-link" to="/admin/manageFood">
                    <div class="sb-nav-link-icon">
                        <i class="fas fa-hamburger"></i>
                    </div>
                    Quản lý món ăn
                </router-link>

                <router-link class="nav-link" to="/admin/orderManagement">
                    <div class="sb-nav-link-icon">
                        <i class="fab fa-first-order"></i>
                    </div>
                    Quản lý đơn hàng
                </router-link>

                <router-link class="nav-link" to="/admin/user">
                    <div class="sb-nav-link-icon">
                        <i class="fa fa-users"></i>
                    </div>
                      Quản lý User
                </router-link>

                <router-link class="nav-link" to="/admin/statistical">
                    <div class="sb-nav-link-icon"><i class="fa fa-coins"></i></div>
                    Thống kê
                </router-link>

                <router-link class="nav-link" to="/admin/historyMaterial">
                    <div class="sb-nav-link-icon"><i class="fas fa-history"></i></div>
                    Lịch sử giá hằng ngày
                </router-link>

                <div class="sb-sidenav-menu-heading">Addons</div>

                <router-link class="nav-link" to="/admin/chart">
                    <div class="sb-nav-link-icon">
                        <i class="fas fa-chart-area"></i>
                    </div>
                    Charts
                </router-link>
            </div>
        </div>
    </nav>
</div>
</template>

<script>
export default {

};
</script>

<style lang="scss">
@import '../assets/css/style.css';
</style>
