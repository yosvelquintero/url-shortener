import { SetMetadata } from '@nestjs/common';

import { IRoles } from '@app/types/index';
import { METADATA } from '@app/config/index';

export const Roles = (roles: IRoles) => SetMetadata(METADATA.keys.roles, roles);
