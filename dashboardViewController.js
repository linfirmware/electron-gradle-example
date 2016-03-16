function executeBuild() {
	const spawn = require('child_process').spawn;
	const ls = spawn('./gradlew', ['hello']);

	ls.stdout.on('data', (data) => {

		data += "";
		data = data.replace(/\r\n/g, "<br />");
		data = data.replace(/\n/g, "<br />");

		var paragraph = document.createElement("p");
		paragraph.innerHTML = data;

		var element = document.getElementById("console");
		element.appendChild(paragraph);
	});

}

function viewTasks() {
	const spawn = require('child_process').spawn;
	const ls = spawn('./gradlew', ['tasks']);

	ls.stdout.on('data', (data) => {

		data += "";
		data = data.replace(/\r\n/g, "<br />");
		data = data.replace(/\n/g, "<br />");

		var paragraph = document.createElement("p");
		paragraph.innerHTML = data;

		var element = document.getElementById("console");
		element.appendChild(paragraph);
	});

}

function versionInfo() {
	const spawn = require('child_process').spawn;
	const ls = spawn('./gradlew', ['-v']);

	ls.stdout.on('data', (data) => {

		data += "";
		data = data.replace(/\r\n/g, "<br />");
		data = data.replace(/\n/g, "<br />");

		var paragraph = document.createElement("p");
		paragraph.innerHTML = data;

		var element = document.getElementById("console");
		element.appendChild(paragraph);
	});

}

function clearVirtualConsole() {
	var element = document.getElementById("console");
	element.innerHTML = '';
}

function javaGradleToolingTest() {
	var java = require('java');

	var filesystem = require("fs");

    filesystem.readdirSync('lib').forEach(function(file) {
        file = 'lib/'+file;
        java.classpath.push(file);
    });

	var system = java.import('java.lang.System');
	java.import('org.gradle.tooling.GradleConnector');
	java.import('org.gradle.tooling.ProjectConnection');
	java.import('org.gradle.tooling.model.GradleProject');
	java.import('org.gradle.tooling.model.GradleTask');
	java.import('org.gradle.tooling.model.Task');

	var filePath = java.newInstanceSync("java.io.File", ".");

	var connector = java.callStaticMethodSync("org.gradle.tooling.GradleConnector", "newConnector");
	java.callMethodSync(connector, "forProjectDirectory", filePath);
	var connection = java.callMethodSync(connector, "connect");

	var buildLauncher = java.callMethodSync(connection, "newBuild");
	java.callMethodSync(buildLauncher, "forTasks", "tasks");
	java.callMethodSync(buildLauncher, "setStandardOutput", java.getStaticFieldValue("java.lang.System", "out"));
	java.callMethodSync(buildLauncher, "run");

	java.callMethodSync(connection, "close");

	//var project = java.callMethodSync(connection, "getModel", java.getStaticFieldValue("org.gradle.tooling.model.GradleProject", "class"));

	//console.log(project);
}
