import { PasswordMustBeStrongRule } from './password-must-be-strong.rule';

describe('PasswordMustBeStrongRule', () => {
  it('should return true for a strong password', () => {
    const password = 'StrongPassword123';
    const rule = new PasswordMustBeStrongRule(password);

    const result = rule.isSatisfied();

    expect(result).toBe(true);
  });

  it('should return false for a weak password', () => {
    const password = 'Weak123';
    const rule = new PasswordMustBeStrongRule(password);

    const result = rule.isSatisfied();

    expect(result).toBe(false);
  });

  it('should return false for a password with less than 8 characters', () => {
    const password = 'Short1';
    const rule = new PasswordMustBeStrongRule(password);

    const result = rule.isSatisfied();

    expect(result).toBe(false);
  });

  it('should return false for a password with more than 20 characters', () => {
    const password = 'ThisIsAVeryLongPassword123';
    const rule = new PasswordMustBeStrongRule(password);

    const result = rule.isSatisfied();

    expect(result).toBe(false);
  });
});
