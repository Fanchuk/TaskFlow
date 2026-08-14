import { IsString, IsOptional, IsIn, IsInt, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString() title: string;
  @IsString() projectId: string;
  @IsOptional() @IsIn(['low', 'medium', 'high']) priority?: string;
  @IsOptional() @IsIn(['todo', 'in_progress', 'done']) status?: string;
  @IsOptional() @IsDateString() dueDate?: string;
}

export class UpdateTaskDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsIn(['low', 'medium', 'high']) priority?: string;
  @IsOptional() @IsDateString() dueDate?: string;
}

export class ReorderItemDto {
  @IsString() id: string;
  @IsIn(['todo', 'in_progress', 'done']) status: string;
  @IsInt() order: number;
}