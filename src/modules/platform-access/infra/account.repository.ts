import { Account } from '../core/account/account.aggregate-root';

export interface AccountRepository {
  findByEmail(email: string): Promise<Account | null>;
}
