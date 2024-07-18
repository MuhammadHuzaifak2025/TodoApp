const asynchandler = (reuqesthandler) => {
  (req, res, next) => {
    Promise.resolve(reuqesthandler(res, req, next)).catch((error) => {
      next(error);
    });
  };
};
export default asynchandler;
