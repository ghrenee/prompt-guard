// frontend/script.js

console.log("Walking Skeleton JS Loaded.");

async function testBackendConnection() {
    try {
        // The URL now points directly to your backend server
        const backendUrl = 'https://expert-eureka-7vpq655wwvpx3x59-5001.app.github.dev/api/analyze';

        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: "test" }) // Dummy body
        });

        const data = await response.json();
        console.log("✅ Success! Message from backend:", data);

    } catch (error) {
        console.error("❌ Error connecting to backend:", error);
    }
}

// Run the test as soon as the page loads
testBackendConnection();