import { Request } from '@nestjs/common';
import { User } from '../../users/entity/user.entity';

type RequestWithUser = Request & { user?: User };
