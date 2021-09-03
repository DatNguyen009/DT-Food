<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  async mounted() {
    let date = new Date();
    let url = "http://localhost:8080/apiDTfood/public/api/v1/dataOrder/"+date.getFullYear();
    await this.$store.dispatch('fetchDataMonths',{
      url: url,
    });
    this.renderChart(
      {
        labels: this.$store.state.dataChartOrder.map(item => item.nameMonth),
        datasets: [
          {
            label: "Lợi nhuận",
            backgroundColor: "#f87979",
            data: this.$store.state.dataChartOrder.map(item => item.doanhthu - item.chiphi),
          }
        ]
      },
      { 
          responsive: true, 
          maintainAspectRatio: false,
        title: {
          display: true,
          text: "Biểu đồ thống kê lợi nhuận theo tháng",
        },  
        
        }
    );
  }
};
</script>