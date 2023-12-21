import { IncomingDataValidationRule } from './incoming-data-validation.rule';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('IncomingDataValidationRule', () => {
  let rule: IncomingDataValidationRule;
  const password = 'StrongPassword123';
  const hashedPassword = 'hashedPassword';

  beforeEach(() => {
    rule = new IncomingDataValidationRule(password, hashedPassword);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return true when passwords match', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await rule.isSatisfied();

    expect(result).toBe(true);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
  });

  it('should return false when passwords do not match', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const result = await rule.isSatisfied();

    expect(result).toBe(false);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
  });
});
