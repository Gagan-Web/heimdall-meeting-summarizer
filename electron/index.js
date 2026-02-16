const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path");
const { startRecording, stopRecording } = require("../sound-recorder/record")

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile(path.join(__dirname, "index.html"));

    // Opens DevTools for debugging will diable in production
    win.webContents.openDevTools();
}

// ipcMain.handle("record:start", () => {
//     console.log("Main: starting recording")
//     return startRecording();
// })
// ipcMain.handle("record:stop", () => {
//     console.log("Main: stoped recording")
//     return stopRecording();
// })
ipcMain.handle("record:start", async () => {
    console.log("Main: starting recording");

    try {
        await startRecording();
        return { success: true };
    } catch (err) {
        return {
            success: false,
            message: err.message
        };
    }
});

ipcMain.handle("record:stop", async () => {
    console.log("Main: stopped recording");

    try {
        await stopRecording();
        return { success: true };
    } catch (err) {
        return {
            success: false,
            message: err.message
        };
    }
});


// app.whenReady().then(() => {
//     createWindow()
// }) 
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
