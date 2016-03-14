'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
	// Create the browser window.
	mainWindow = new BrowserWindow({width: 800, height: 600});

	// and load the index.html of the app.
	mainWindow.loadURL('file://' + __dirname + '/index.html');

	// Open the DevTools.
	mainWindow.webContents.openDevTools();

	const spawn = require('child_process').spawn;
	const ls = spawn('./gradlew', ['-v']);

	ls.stdout.on('data', (data) => {
	  console.log(`stdout: ${data}`);
	});

	ls.stderr.on('data', (data) => {
	  console.log(`stderr: ${data}`);
	});

	ls.on('close', (code) => {
	  console.log(`child process exited with code ${code}`);
	});

	/*var java = require('java');

	java.classpath.push('lib/gradle-tooling-api-2.11.jar');

	var system = java.import('java.lang.System');
	java.import('org.gradle.tooling.GradleConnector');
	java.import('org.gradle.tooling.ProjectConnection');
	java.import('org.gradle.tooling.model.GradleProject');
	java.import('org.gradle.tooling.model.GradleTask');

	java.callStaticMethod("org.gradle.tooling.GradleConnector", "newConnector", function(err, results) {
	  if(err) { console.error(err); return; }
	  console.log(results);
	});*/

	/*ProjectConnection connection = GradleConnector.newConnector().forProjectDirectory(new File("someProjectFolder")).connect();

	try {
	   connection.newBuild().forTasks("tasks").run();
	} finally {
	   connection.close();
	}*/

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});
