// ----------------dashboard filter---------------
const filterBtn = document.getElementById('filterMenuButton');
const filterMenu = document.getElementById('filterMenu');
const selectedFilter = document.getElementById('selectedFilter');
const hiddenInput = document.getElementById('hiddenFilterInput');
const filterForm = document.getElementById('filterForm');

// Toggle dropdown on button click
filterBtn.addEventListener('click', () => {
  filterMenu.style.display = filterMenu.style.display === 'block' ? 'none' : 'block';
});

// Handle selecting a filter
filterMenu.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', () => {
    const value = li.getAttribute('data-value');
    selectedFilter.textContent = li.textContent;
    hiddenInput.value = value;
    filterForm.submit(); // submit form with selected filter
  });
});

// Close dropdown if clicked outside
document.addEventListener('click', (e) => {
  if (!filterBtn.contains(e.target) && !filterMenu.contains(e.target)) {
    filterMenu.style.display = 'none';
  }
});

// ---------------- Pie Chart ----------------
(function () {
  const chartDiv = document.getElementById("chartData");
  const canvas = document.getElementById('expensePieChart');

  if (!chartDiv || !canvas) return;

  const pieLabels = JSON.parse(chartDiv.dataset.labels);
  const pieData = JSON.parse(chartDiv.dataset.values);

  const shortPieLabels = pieLabels.map(label =>
    label.length > 6 ? label.slice(0, 5) : label
  );

  const ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: pieLabels,
      datasets: [{
        data: pieData,
        backgroundColor: ['#DA6220', '#145DA0', '#F2A65A', '#7FB3D5'],
        borderColor: '#fff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        datalabels: {
          color: '#fff',
          font: { weight: 'bold', size: 10 },
          formatter: (value, ctx) => {
            const sum = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = ((value / sum) * 100).toFixed(0) + '%';
            return shortPieLabels[ctx.dataIndex] + '\n' + percentage;
          }
        }
      }
    },
    plugins: [ChartDataLabels]
  });
})();