import { IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class UpdateCarDto {
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @IsString()
  @IsOptional()
  readonly brand?: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  readonly model?: string;
}
