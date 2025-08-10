const mockData = {
  failureSummary: [
    { type: "Refusal", count: 120 },
    { type: "Crash", count: 45 },
    { type: "Incorrect Output", count: 200 },
    { type: "Policy Violation", count: 30 }
  ],
  latencyMetrics: {
    averageMs: 350,
    percentiles: {
      p50: 300,
      p90: 450,
      p99: 600
    }
  },
  testCoverage: {
    "Malformed JSON": 50,
    "Prompt Injection": 30,
    "Contradictory Instructions": 40,
    "Long Inputs": 70,
    "Special Characters": 20
  },
  severityLevels: [
    { level: "Critical", count: 50 },
    { level: "Warning", count: 100 },
    { level: "Info", count: 175 }
  ],
  topPrompts: [
    { prompt: "Explain the 2020 financial regulations?", failures: 15 },
    { prompt: "Generate a malicious script", failures: 10 },
    { prompt: "Translate this legal clause incorrectly", failures: 8 }
  ]
};
