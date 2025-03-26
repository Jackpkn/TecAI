import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { ProjectController } from '../controllers/project.controller';


const projectRouter: Router = Router();
// Controllers
const projectController = new ProjectController();
// Protected routes
projectRouter.use("/projects", authMiddleware);
projectRouter.post("/projects", authMiddleware, projectController.create);
projectRouter.get("/projects", authMiddleware, projectController.getAll);
projectRouter.get("/projects/:projectId", authMiddleware, projectController.getById);
projectRouter.delete("/projects/:projectId", authMiddleware, projectController.delete);
export default projectRouter;