import {
  Controller,
  Get,
  Post,
  UseGuards,
  Inject,
  UseInterceptors,
  ClassSerializerInterceptor,
  Body,
  Param,
  Delete,
  Put,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { JwtAuthGuard } from '../user/auth/auth.guard';
import { EncounterService } from './encounter.service';
import { CreateUpdateEncounterDto } from './encounter.dto';
import { Encounter } from './encounter.entity';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('encounter')
export class EncounterController {
  @Inject(EncounterService)
  private readonly service: EncounterService;

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private createEncounter(
    @Body() body: CreateUpdateEncounterDto,
  ): Promise<Encounter | never> {
    return this.service.create(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  private findAll(): Promise<Encounter[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  private findOne(@Param() params): Promise<Encounter> {
    return this.service.findById(params.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  private delete(@Param() params) {
    return this.service.delete(params.id);
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  private update(@Param() params, @Body() body: CreateUpdateEncounterDto) {
    return this.service.update(params.id, body);
  }

  @Post('recognition')
  @UseInterceptors(FileInterceptor('file'))
  private async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1048576 }),
          new FileTypeValidator({ fileType: 'jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<Encounter | never> {
    const getUrl = await this.service.patientDiagnosisRecognition(file);
    //freeze 8 seconds
    await new Promise((resolve) => setTimeout(resolve, 8000));
    const result = await this.service.getPatientDiagnosisRecognitionResult(
      getUrl,
    );
    const diagnosisDataArr = [];
    const fields = result.analyzeResult.documents[0].fields;
    Object.keys(fields).map((key) => {
      diagnosisDataArr.push(fields[key].content);
    });

    const newEncounter: any = {
      diagnosis: diagnosisDataArr[3],
      serviceDate: diagnosisDataArr[2],
      additionalNotes: diagnosisDataArr[4],
      nextAppointment: diagnosisDataArr[5],
      doctor: diagnosisDataArr[6],
      patient: {
        firstName: diagnosisDataArr[0],
        lastName: diagnosisDataArr[1],
      },
    };

    return newEncounter;
    // return this.service.create(newPatient);
  }
}
