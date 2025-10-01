import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Milestone } from "../entities/milestone.entity";
import { WorkspaceService } from "src/modules/workspace/services/workspace.service";
import { CreateMilestoneDto } from "../dto/milestone/create-milestone.dto";
import { MilestoneStatus } from "../constants/milestone.constant";
import { UpdateMilestoneDto } from "../dto/milestone/update-milestone.dto";

@Injectable()
export class MilestoneService {
  constructor(
    @InjectRepository(Milestone)
    private readonly milestoneRepository: Repository<Milestone>,
    private readonly workspaceService: WorkspaceService,
    private readonly datasource: DataSource
  ) {}

  async createMilestone(
    workspaceId: string,
    newMilestone: CreateMilestoneDto
  ): Promise<Milestone> {
    const workspace = await this.workspaceService.getWorkspaceById(workspaceId);

    const exists = await this.existsMilestoneByName(
      workspaceId,
      newMilestone.name
    );
    if (exists) {
      throw new ForbiddenException(
        `Milestone with name "${newMilestone.name}" already exists`
      );
    }

    const milestone = this.milestoneRepository.create({
      ...newMilestone,
      workspace,
    });

    return this.milestoneRepository.save(milestone);
  }

  async bulkCreateMilestones(
    workspaceId: string,
    milestones: CreateMilestoneDto[]
  ): Promise<Milestone[]> {
    const workspace = await this.workspaceService.getWorkspaceById(workspaceId);

    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Check for duplicate names in the input array
      const duplicate = await queryRunner.manager
        .createQueryBuilder(Milestone, "milestone")
        .where(
          "milestone.workspaceId = :workspaceId AND milestone.name IN (:...names)",
          {
            workspaceId,
            names: milestones.map((m) => m.name),
          }
        )
        .getOne();

      if (duplicate) {
        throw new ForbiddenException(
          `Milestone with name "${duplicate.name}" already exists`
        );
      }
      // Create and save milestone entities
      const milestoneEntities = milestones.map((milestone) =>
        this.milestoneRepository.create({
          ...milestone,
          workspace,
        })
      );
      const createdMilestones = await queryRunner.manager.save(
        milestoneEntities
      );

      await queryRunner.commitTransaction();
      return createdMilestones;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateMilestone(
    workspaceId: string,
    milestoneId: string,
    infoMilestone: UpdateMilestoneDto
  ) {
    await this.workspaceService.getWorkspaceById(workspaceId);

    await this.existsMilestoneById(milestoneId);

    const updatedMilestone = await this.milestoneRepository.save({
      id: milestoneId,
      ...infoMilestone,
    });
  }

  async deleteMilestone(workspaceId: string, milestoneId: string) {
    await this.workspaceService.getWorkspaceById(workspaceId);

    await this.existsMilestoneById(milestoneId);
    await this.milestoneRepository.delete({ id: milestoneId });
  }

  async getMilestoneById(
    workspaceId: string,
    milestoneId: string
  ): Promise<Milestone> {
    const milestone = await this.milestoneRepository.findOne({
      where: { id: milestoneId, workspaceId },
      relations: ["sections"],
    });
    if (!milestone) {
      throw new ForbiddenException(
        `Milestone with ID "${milestoneId}" not found`
      );
    }
    return milestone;
  }

  async getAllMilestones(workspaceId: string): Promise<Milestone[]> {
    await this.workspaceService.getWorkspaceById(workspaceId);

    return this.milestoneRepository.find({
      where: { workspaceId },
      relations: ["sections"],
      order: { order: "ASC" },
    });
  }

  private async existsMilestoneById(id: string): Promise<boolean> {
    return this.milestoneRepository.exists({ where: { id } });
  }

  private async existsMilestoneByName(
    workspaceId: string,
    name: string
  ): Promise<boolean> {
    return this.milestoneRepository.exists({ where: { name, workspaceId } });
  }
}
