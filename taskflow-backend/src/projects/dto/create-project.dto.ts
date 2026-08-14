import { IsString, MinLength, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  desc: string;

  @IsOptional()
  @IsString()
  color?: string;
}