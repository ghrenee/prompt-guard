// Assume mockData is loaded globally from mockData.js

// Chart rendering functions

function renderFailureChart(data) {
  const ctx = document.getElementById('failureChart').getContext('2d');
  return new Chart(ctx, {
    type: 'pie',
    data: {
      labels: data.failureSummary.map(f => f.type),
      datasets: [{
        data: data.failureSummary.map(f => f.count),
        backgroundColor: ['#9146FF', '#6E2CFF', '#BB86FC', '#E0B3FF']
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } }
    }
  });
}

function renderLatencyChart(data) {
  const ctx = document.getElementById('latencyChart').getContext('2d');
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['P50', 'P90', 'P99', 'Average'],
      datasets: [{
        label: 'Latency (ms)',
        data: [
          data.latencyMetrics.percentiles.p50,
          data.latencyMetrics.percentiles.p90,
          data.latencyMetrics.percentiles.p99,
          data.latencyMetrics.averageMs
        ],
        backgroundColor: '#9146FF'
      }]
    },
    options: { responsive: true }
  });
}

function renderSeverityChart(data) {
  const ctx = document.getElementById('severityChart').getContext('2d');
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.severityLevels.map(s => s.level),
      datasets: [{
        label: 'Count',
        data: data.severityLevels.map(s => s.count),
        backgroundColor: ['#E03C8A', '#F78DA7', '#FADADD']
      }]
    },
    options: { responsive: true }
  });
}

function renderCoverageChart(data) {
  const ctx = document.getElementById('coverageChart').getContext('2d');
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(data.testCoverage),
      datasets: [{
        label: 'Number of Tests',
        data: Object.values(data.testCoverage),
        backgroundColor: '#6E2CFF'
      }]
    },
    options: { responsive: true }
  });
}

function populateTopPromptsTable(data) {
  const tbody = document.querySelector('#topPromptsTable tbody');
  tbody.innerHTML = '';  // Clear existing rows
  data.topPrompts.forEach(({ prompt, failures }) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${prompt}</td><td>${failures}</td>`;
    tbody.appendChild(row);
  });
}

// Render charts and table with given data
function renderDashboard(data) {
  renderFailureChart(data);
  renderLatencyChart(data);
  renderSeverityChart(data);
  renderCoverageChart(data);
  populateTopPromptsTable(data);
}

// Initial render with mock data
renderDashboard(mockData);

// Fetch real test cases from backend and log them
async function fetchTestCases() {
  try {
    const response = await fetch('/api/testcases');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const testCases = await response.json();
    console.log("Fetched test cases:", testCases);

    // TODO: Integrate testCases to update dashboard dynamically

  } catch (error) {
    console.error("Error fetching test cases:", error);
  }
}

// Call fetchTestCases when page loads
fetchTestCases();
