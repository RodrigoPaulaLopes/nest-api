import { UserIdCheckMiddleware } from './user-id-check.middleware';

describe('UserIdCheckMiddleware', () => {
  it('should be defined', () => {
    expect(new UserIdCheckMiddleware()).toBeDefined();
  });
});
