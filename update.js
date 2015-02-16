var fs = require('fs');

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var output = '';

fs.readdir('./doc/', function (err, files) {
	if (err) {
		return err;
	}
	var len = files.length;
	for (var i = 0; i < len; i++) {
		if (files[i].endsWith('.html')) {
			var fixedFileName = files[i].replace(/_/g, ' ').substr(0, files[i].length - 5);
			output += '<a class="list-group-item" href="./doc/' + files[i] + '">' + fixedFileName + '</a>\n';
		}
	}

	console.log(output);

	fs.writeFile('toc.html', output, function (err) {
		if (err) {
			return err;
		}
		console.log('toc.html updated');
	});
});