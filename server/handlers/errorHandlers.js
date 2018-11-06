function catchErrors(fn) {
  return (req, res, next) =>
    fn(req, res, next).catch(error => {
      console.error(error);
      next(error);
    });
}

function notFound(req, res, next) {
  var err = new Error('Not found');
  err.status = 404;
  next(err);
}

function developmentErrors(err, req, res, next) {
  res.status = err.status || 500;
  res.format({
    'text/html': () => res.send(`<h1>${err.message}</h1>`),
    'application/json': () => res.json(err)
  });
}

function productionErrors(err, req, res, next) {
  res.status = err.status || 500;
  res.send(err.message);
  res.format({
    'text/html': () => res.send(`<h1>${err.message}</h1>`),
    'application/json': () => res.json({ message: err.message })
  });
}

exports.catchErrors = catchErrors;
exports.notFound = notFound;
exports.developmentErrors = developmentErrors;
exports.productionErrors = productionErrors;
