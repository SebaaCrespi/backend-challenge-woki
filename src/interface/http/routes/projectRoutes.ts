import express, { Request, Response } from 'express';
import { ProjectRepository } from '../../../infrastructure/persistence/repositories/ProjectRepository';
import { ProjectService } from '../../../domain/services/ProjectService';
import { ProjectController } from '../controllers/ProjectController';
import { validateCreateProject, validateProjectId, validateUpdateProject } from '../middleware/ProjectMiddleware';
import { authenticateJWT } from '../middleware/AuthenticationMiddleware';

const projectRouter = express.Router();
const projectRepository = new ProjectRepository();
const projectService = new ProjectService(projectRepository);
const projectController = new ProjectController(projectService);

projectRouter.post('/', authenticateJWT, validateCreateProject, (req: Request, res: Response) => projectController.createProject(req, res));
projectRouter.get('/', authenticateJWT, (req: Request, res: Response) => projectController.getProjects(req, res));
projectRouter.get('/:id', authenticateJWT, validateProjectId, (req: Request, res: Response) => projectController.getProjectById(req, res));
projectRouter.delete('/:id', authenticateJWT, validateProjectId, (req: Request, res: Response) => projectController.deleteProject(req, res));
projectRouter.put('/:id', authenticateJWT, validateUpdateProject, (req: Request, res: Response) => projectController.updateProject(req, res));

export default projectRouter;