function wrapperVersion(e) {
	const spawn = require('child_process').spawn;
	const proc = spawn('./gradlew', ['-v']);

	proc.stdout.on('data', (data) => {
		console.log(`${data}`);

		/*data += "";
		data = data.replace(/\r\n/g, "<br />");
		data = data.replace(/\n/g, "<br />");

		var paragraph = document.createElement("p");
		paragraph.innerHTML = data;

		var element = document.getElementById("console");
		element.appendChild(paragraph);*/
	});
}

function wrapperListTasks(e) {
	const spawn = require('child_process').spawn;
	const proc = spawn('./gradlew', ['tasks']);

	proc.stdout.on('data', (data) => {
		console.log(`${data}`);

		/*data += "";
		data = data.replace(/\r\n/g, "<br />");
		data = data.replace(/\n/g, "<br />");

		var paragraph = document.createElement("p");
		paragraph.innerHTML = data;

		var element = document.getElementById("console");
		element.appendChild(paragraph);*/
	});
}

function wrapperExecuteBuild(e) {
	const spawn = require('child_process').spawn;
	const proc = spawn('./gradlew', ['hello']);

	proc.stdout.on('data', (data) => {
		console.log(`${data}`);

		/*data += "";
		data = data.replace(/\r\n/g, "<br />");
		data = data.replace(/\n/g, "<br />");

		var paragraph = document.createElement("p");
		paragraph.innerHTML = data;

		var element = document.getElementById("console");
		element.appendChild(paragraph);*/
	});
}

function javaPluginListTasks(e) {
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
}
