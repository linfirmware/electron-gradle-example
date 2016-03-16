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