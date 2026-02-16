console.log("record.js started");

const { spawn } = require("child_process");

const MICROPHONE_NAME = "Microphone Array (Realtek(R) Audio)";
const SYSTEM_AUDIO = "Stereo Mix (Realtek(R) Audio)";

let ffmpegProcess = null;

function startRecording() {
    if (ffmpegProcess) {
        console.log("Already recording")
        return { success: false, messege: "already recording" };
    }

    console.log("Starting recording...");

    ffmpegProcess = spawn(
        "ffmpeg",
        [
            "-f", "dshow",
            "-i", `audio=${MICROPHONE_NAME}`,

            "-f", "dshow",
            "-i", `audio=${SYSTEM_AUDIO}`,

            "-filter_complex",
            // CHANGED HERE: Added volume=4.0 (400% boost) to the mic input [0:a]
            "[0:a]volume=4.0[mic];[mic][1:a]amix=inputs=2:weights=3 1,acompressor=threshold=-20dB:ratio=2.5:attack=10:release=100",

            "-ar", "44100",
            "-ac", "1",
            "-acodec", "pcm_s16le",

            "-y",
            "output.wav"
        ],
        { stdio: ["pipe", "inherit", "inherit"] }
    );
}

function stopRecording() {
    if (!ffmpegProcess) {
        console.log("Not recording");
        return { success: false, messege: "Not recording" };
    }

    console.log(" Recording stopped");
    ffmpegProcess.stdin.write("q");
    ffmpegProcess = null;

    return { success: true, messege: "Recording stoped" }
}

// process.on("SIGINT", () => {
//     stopRecording();
//     process.exit();
// });
module.exports = { startRecording, stopRecording }