const express = require("express");
const controllers = require("../app/controllers");
const uploadImage = require('../utils/multer');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/openapi.json');

const multer = require('multer');

const apiRouter = express.Router();


apiRouter.use('/api-docs', swaggerUi.serve);
apiRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));

/**Car**/
apiRouter.post("/api/v1/cars",controllers.api.v1.authController.authorize,controllers.api.v1.authController.checkRole,uploadImage.single('image'),controllers.api.v1.carController.create);

apiRouter.put("/api/v1/cars/admin/:id",controllers.api.v1.authController.authorize,controllers.api.v1.authController.checkRole,uploadImage.single('image'),controllers.api.v1.carController.update);

apiRouter.delete("/api/v1/cars/admin/:id",controllers.api.v1.authController.authorize,controllers.api.v1.authController.checkRole,controllers.api.v1.carController.checkCar,controllers.api.v1.carController.destroy);

apiRouter.get("/api/v1/cars/admin/:id",controllers.api.v1.authController.authorize,controllers.api.v1.authController.checkRole,controllers.api.v1.carController.showDetail);

apiRouter.get("/api/v1/cars",controllers.api.v1.authController.authorize,controllers.api.v1.carController.list);
apiRouter.get("/api/v1/cars/:id",controllers.api.v1.authController.authorize,controllers.api.v1.carController.getCarById);


/**User**/


apiRouter.get("/api/v1/users",controllers.api.v1.authController.authorize,controllers.api.v1.authController.isSuperAdmin, controllers.api.v1.userController.list);

// Register Admin
apiRouter.post(
  "/api/v1/users/register-admin",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.authController.isSuperAdmin,
  controllers.api.v1.authController.registerAdmin);


// Register member
apiRouter.post("/api/v1/users/register", controllers.api.v1.authController.register);

// Login sebagai superadmin, admin, maupun member.
apiRouter.post("/api/v1/users/login", controllers.api.v1.authController.login);

apiRouter.get("/api/v1/users/current-user",controllers.api.v1.authController.authorize ,controllers.api.v1.userController.currentUser);



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
