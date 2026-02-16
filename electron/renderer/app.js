const startBtn = document.getElementById('startBtn')
const stopBtn = document.getElementById('stopBtn')
const statusDiv = document.getElementById('status')

function updateStatus(message, type = 'idle') {
    statusDiv.textContent = message;
    statusDiv.className = `status-${type}`;
}


async function onStart() {
    try {
        startBtn.disabled = true
        updateStatus("Starting recording...", "recording")

        const result = await window.recorder.start()
        console.log("start result", result)

        if (result.success) {
            stopBtn.disabled = false;
            updateStatus("Recording in progress", "recording")
        } else {
            startBtn.disabled = false;
            console.log(result.message || "Failed to start", "error")
        }


    } catch (err) {
        console.error("Failed to start recording:", err);
        startBtn.disabled = false;
        updateStatus("Error: " + err.message, "error");
    };
}
async function onStop() {
    try {
        stopBtn.disabled = true
        updateStatus("Stoping recording..", "idle")

        const result = await window.recorder.stop()
        console.log("start result", result)

        startBtn.disabled = false;

        if (result.success) {
            updateStatus("✅ Recording saved to output.wav", "idle");
        } else {
            updateStatus(result.message || "Failed to stop", "error");
        }

    } catch (err) {
        console.error("Failed to stop recording:", err);
        updateStatus("Error: " + err.message, "error");
        startBtn.disabled = false;

    }
}

startBtn.addEventListener("click", onStart)
stopBtn.addEventListener("click", onStop)
console.log("Renderer loaded and ready");
