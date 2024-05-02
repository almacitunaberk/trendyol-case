import { appTest } from './app.e2e-spec';
import { deliveryPointTest } from './deliveryPoint.e2e-spec';
import { packageTest } from './package.e2e-spec';
import { sackTest } from './sack.e2e-spec';

describe('AppController (e2e)', () => {
  appTest();
  deliveryPointTest();
  sackTest();
  packageTest();
});
