// eslint-disable-next-line no-unused-vars
import { testService } from './test.service';

export default function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(testService);
};
