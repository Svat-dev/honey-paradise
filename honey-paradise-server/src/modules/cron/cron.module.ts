import { CronService } from "./cron.service";
import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ScheduleModule } from "@nestjs/schedule/dist/schedule.module";

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [CronService],
})
export class CronModule {}
