import { IsEmail, IsString, IsArray, IsOptional, IsIn } from 'class-validator';

export class CreateInvitationDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsIn(['admin', 'member', 'viewer'], { message: 'Role must be admin, member, or viewer' })
  role: string;

  @IsArray({ message: 'Projects must be an array' })
  projects: string[];

  @IsOptional()
  @IsString()
  message?: string;
}