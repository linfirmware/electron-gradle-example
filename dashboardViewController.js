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
	/*var mvn = require('node-java-maven');

	mvn(function(err, mvnResults) {
	  if (err) {
	    return console.error('could not resolve maven dependencies', err);
	  }
	  mvnResults.classpath.forEach(function(c) {
	    console.log('adding ' + c + ' to classpath');
	    java.classpath.push(c);
	  });
	});*/

	java.classpath.push('lib/gradle-tooling-api-2.11.jar');
	java.classpath.push('lib/slf4j-api-1.7.10.jar');

	var system = java.import('java.lang.System');
	java.import('org.gradle.tooling.GradleConnector');

	java.callStaticMethod("org.gradle.tooling.GradleConnector", "newConnector", function(err, results) {
	  if(err) { console.error(err); return; }
	  console.log(results);
	});
}
