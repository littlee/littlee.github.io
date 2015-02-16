(function ($) {
	$.include = function (domScript) {
		var includeLen = $('div.include').length;
		$('div.include').each(function (index, element) {
			var path = $(element).data('path');
			$.get(path, function (data) {
				$(element).after(data).remove();
				console.log(path + ' ::loaded');
				if (--includeLen === 0 && domScript) {
					loadDomScript(domScript);
				}
			});
		});
	};

	function loadDomScript(domScript) {
		while(domScript.length) {
			var domScriptPath = domScript.shift();
			$.getScript(domScriptPath);
		}
	}
})(jQuery);

$(document).ready(function () {
	$.include();
});