// Failure Summary Pie Chart
const failureCtx = document.getElementById('failureChart').getContext('2d');
const failureChart = new Chart(failureCtx, {
  type: 'pie',
  data: {
    labels: mockData.failureSummary.map(f => f.type),
    datasets: [{
      data: mockData.failureSummary.map(f => f.count),
      backgroundColor: ['#9146FF', '#6E2CFF', '#BB86FC', '#E0B3FF']
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { position: 'bottom' } }
  }
});

// Latency Metrics Bar Chart
const latencyCtx = document.getElementById('latencyChart').getContext('2d');
const latencyChart = new Chart(latencyCtx, {
  type: 'bar',
  data: {
    labels: ['P50', 'P90', 'P99', 'Average'],
    datasets: [{
      label: 'Latency (ms)',
      data: [
        mockData.latencyMetrics.percentiles.p50,
        mockData.latencyMetrics.percentiles.p90,
        mockData.latencyMetrics.percentiles.p99,
        mockData.latencyMetrics.averageMs
      ],
      backgroundColor: '#9146FF'
    }]
  },
  options: { responsive: true }
});

// Severity Levels Bar Chart
const severityCtx = document.getElementById('severityChart').getContext('2d');
const severityChart = new Chart(severityCtx, {
  type: 'bar',
  data: {
    labels: mockData.severityLevels.map(s => s.level),
    datasets: [{
      label: 'Count',
      data: mockData.severityLevels.map(s => s.count),
      backgroundColor: ['#E03C8A', '#F78DA7', '#FADADD']
    }]
  },
  options: { responsive: true }
});

// Test Coverage Bar Chart
const coverageCtx = document.getElementById('coverageChart').getContext('2d');
const coverageChart = new Chart(coverageCtx, {
  type: 'bar',
  data: {
    labels: Object.keys(mockData.testCoverage),
    datasets: [{
      label: 'Number of Tests',
      data: Object.values(mockData.testCoverage),
      backgroundColor: '#6E2CFF'
    }]
  },
  options: { responsive: true }
});

// Populate Top Problematic Prompts Table
const tableBody = document.querySelector('#topPromptsTable tbody');
mockData.topPrompts.forEach(({ prompt, failures }) => {
  const row = document.createElement('tr');
  row.innerHTML = `<td>${prompt}</td><td>${failures}</td>`;
  tableBody.appendChild(row);
});
