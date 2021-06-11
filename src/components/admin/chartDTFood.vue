<template>
<main>
    <div class="container-fluid">
        <h1 class="mt-4">Chart</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item active">Dashboard</li>
        </ol>

        <div class="mb-4">
            <app-chart />
        </div>
    </div>
</main>
</template>

<script>
import ChartOrder from '../admin/chartOrder'
export default {
    props: {
        a: {
            type: String
        }
    },
    created() {
        if (this.a != "qtv") {
            this.$router.push({
                path: "/admin"
            });
        }
    },
    components: {
        'app-chart': ChartOrder,
    }
}
</script>

<style>

</style>
