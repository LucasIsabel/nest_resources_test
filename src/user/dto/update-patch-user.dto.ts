import { PartialType } from '@nestjs/swagger';
import { CreateUserDTO } from './create-user.dto';

export class updateUserPatchDTO extends PartialType(CreateUserDTO) {}
