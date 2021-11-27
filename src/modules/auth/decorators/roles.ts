import { SetMetadata } from '@nestjs/common';

import { IRoles } from '@app/types';
import { METADATA } from '@app/config';

export const Roles = (roles: IRoles) => SetMetadata(METADATA.keys.roles, roles);
