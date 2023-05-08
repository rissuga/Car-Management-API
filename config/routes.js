const express = require("express");
const controllers = require("../app/controllers");


const apiRouter = express.Router();

/**
 * TODO: Implement your own API
 *       implementations
 */
apiRouter.get("/api/v1/posts", controllers.api.v1.authController.authorize,controllers.api.v1.authController.checkRole,controllers.api.v1.postController.list);
apiRouter.post("/api/v1/posts",  controllers.api.v1.authController.authorize,controllers.api.v1.postController.create);
apiRouter.put("/api/v1/posts/:id", controllers.api.v1.authController.authorize,controllers.api.v1.postController.update);
apiRouter.get("/api/v1/posts/:id", controllers.api.v1.postController.show);
apiRouter.delete(
  "/api/v1/posts/:id",
  controllers.api.v1.postController.destroy
);



/**Car**/
apiRouter.post(
  "/api/v1/cars",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.authController.checkRole,
  controllers.api.v1.carController.create);

apiRouter.put(
  "/api/v1/cars/:id",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.authController.checkRole,
  controllers.api.v1.carController.update);

apiRouter.delete(
  "/api/v1/cars/:id",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.authController.checkRole,
  controllers.api.v1.carController.checkCar,
  controllers.api.v1.carController.destroy);

apiRouter.get("/api/v1/cars/:id",controllers.api.v1.carController.checkCar,controllers.api.v1.carController.showDetail);
apiRouter.get("/api/v1/cars",controllers.api.v1.carController.list);


/**User**/
// Register Admin
apiRouter.post(
  "/api/v1/register-admin",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.authController.isSuperAdmin,
  controllers.api.v1.authController.registerAdmin);

// Register member
apiRouter.post("/api/v1/register", controllers.api.v1.authController.register);

// Login sebagai superadmin, admin, maupun member.
apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);



/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
