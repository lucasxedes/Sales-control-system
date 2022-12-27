import { IsNotEmpty, IsString } from 'class-validator';

export class createUnityDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsString({ message: 'O nome não pode ser fazer.' })
  name: string;
}
