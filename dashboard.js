// Fetch the data from prescription.json and initialize the chart
let chart;
const loadChartData = async (parameter) => {
  try {
    const response = await fetch("prescription.json");
    const data = await response.json();
    
    const counts = data.reduce((acc, item) => {
      const value = item[parameter];
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
    
    const labels = Object.keys(counts);
    const values = Object.values(counts);

    if (chart) chart.destroy(); // Destroy existing chart if present

    const ctx = document.getElementById("myChart").getContext("2d");
    chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: [
            "#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff", "#ff9f40"
          ],
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        }
      }
    });
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

const updateChart = () => {
  const parameter = document.getElementById("parameterDropdown").value;
  loadChartData(parameter);
};

window.onload = () => {
  updateChart(); // Initial chart load
};
