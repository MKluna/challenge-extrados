const handleError = (res,message,code) =>{
    res.status(code);
  res.send({ error: message });
};

module.exports = { handleError };