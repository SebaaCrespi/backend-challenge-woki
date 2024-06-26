import express from 'express';
import { ProjectRepository } from '../../../infrastructure/persistence/repositories/ProjectRepository';
import { ProjectService } from '../../../domain/services/ProjectService';
import { ProjectController } from '../controllers/ProjectController';

const projectRouter = express.Router();
const projectRepository = new ProjectRepository();
const projectService = new ProjectService(projectRepository);
const projectController = new ProjectController(projectService);

projectRouter.post('/', (req, res) => projectController.createProject(req, res));
projectRouter.get('/', (req, res) => projectController.getProjects(req, res));
projectRouter.get('/:id', (req, res) => projectController.getProjectById(req, res));
projectRouter.delete('/:id', (req, res) => projectController.deleteProject(req, res));
projectRouter.put('/:id', (req, res) => projectController.updateProject(req, res));

export default projectRouter;