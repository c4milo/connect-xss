var xssfilter = require('./support/sanitizer');
module.exports = function xss(options) {
	return function(req, res, next) {
		var params = req.params;
		var query = req.query;
		var headers = req.headers;
        //TODO filtering cookies

		//headers filtering
		if (headers) {
			for (var i in headers) {
				headers[i] = xssfilter(headers[i]);
			}
			req.headers = headers;
		}

		//params filtering
		if (params) {
			for (var i in params) {
				params[i] = xssfilter(params[i]);
			}
			req.params = params;
		}

		//query filtering
		if (query) {
            for (var i in query) {
                query[i] = xssfilter(query[i]);
            }
            req.query = query;
		}

		//body filtering
		var onData, onEnd = {};
		var data = '';
		req.setEncoding('utf8');

		req.on('data', onData = function(chunk, encoding) {
			data += chunk;
		});

		req.on('end', onEnd = function() {
			data = xssfilter(data);

			req.removeListener('data', onData);
			req.emit('data', data);

			req.removeListener('end', onEnd);
			req.emit('end');
            next();
		});

		res.setHeader('X-XSS-Protection', 1);
    };
}

