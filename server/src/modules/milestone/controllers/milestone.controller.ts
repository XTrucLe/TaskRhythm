import {
  Post,
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
} from "@nestjs/common";
import { MilestoneService } from "../services/milestone.sevice";
import { MilestoneMapper } from "../mappers/milestone.mapper";
import { AuthGuard } from "@nestjs/passport";
import { CreateMilestoneDto } from "../dto/milestone/create-milestone.dto";

@Controller("workspace/:workspaceId/milestones")
@UseGuards(AuthGuard("jwt"))
export class MilestoneController {
  constructor(
    private readonly milestoneService: MilestoneService,
    private readonly milestoneMapper: MilestoneMapper
  ) {}

  @Post("create")
  async createMilestone(
    @Param("workspaceId") workspaceId: string,
    @Body() createMilestoneDto: CreateMilestoneDto
  ) {
    const milestone = await this.milestoneService.createMilestone(
      workspaceId,
      createMilestoneDto
    );
    return this.milestoneMapper.toDto(milestone);
  }
  @Post("bulkCreate")
  async bulkCreateMilestones(
    @Param("workspaceId") workspaceId: string,
    @Body() createMilestonesDto: CreateMilestoneDto[]
  ) {
    const milestones = await this.milestoneService.bulkCreateMilestones(
      workspaceId,
      createMilestonesDto
    );
    return this.milestoneMapper.toDtos(milestones);
  }

  @Delete(":milestoneId")
  async deleteMilestone(
    @Param("workspaceId") workspaceId: string,
    @Param("milestoneId") milestoneId: string
  ) {
    await this.milestoneService.deleteMilestone(workspaceId, milestoneId);
    return { message: "Milestone deleted successfully" };
  }

  @Get("getAll")
  async getAllMilestones(@Param("workspaceId") workspaceId: string) {
    const milestones = await this.milestoneService.getAllMilestones(
      workspaceId
    );
    return this.milestoneMapper.toDtos(milestones);
  }

  @Get(":milestoneId")
  async getMilestoneById(
    @Param("workspaceId") workspaceId: string,
    @Param("milestoneId") milestoneId: string
  ) {
    const milestone = await this.milestoneService.getMilestoneById(
      workspaceId,
      milestoneId
    );
    return this.milestoneMapper.toDto(milestone);
  }
}
