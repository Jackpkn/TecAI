import type { Request, Response, NextFunction } from "express";
import { ProjectService } from "../services/project.service";
import { createProjectSchema } from "../validators/schemas";

export class ProjectController {
    private projectService: ProjectService;

    constructor() {
        this.projectService = new ProjectService();
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const input = createProjectSchema.parse({
                ...req.body,
                userId: req.user!.sub  // Include the user ID in validation
            });

            const project = await this.projectService.create(input);

            res.status(201).json({
                success: true,
                data: project,
            });
        } catch (error) {
            next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { projectId } = req.params;
            const project = await this.projectService.findById(projectId!, req.user!.sub);

            if (!project) {
                return res.status(404).json({
                    success: false,
                    error: "Project not found",
                });
            }

            res.json({
                success: true,
                data: project,
            });
        } catch (error) {
            next(error);
        }
    };

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const projects = await this.projectService.findByUserId(req.user!.sub);
            res.json({
                success: true,
                data: projects,
            });
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { projectId } = req.params;
            await this.projectService.delete(projectId!, req.user!.sub);
            res.json({
                success: true,
                message: "Project deleted successfully",
            });
        } catch (error) {
            next(error);
        }
    };
} 