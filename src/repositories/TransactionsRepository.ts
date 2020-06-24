import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];
  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0
    }
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  private setBalance(value: number, type: 'income' | 'outcome') {
      if (type === 'income') {
        this.balance.income += value;
        this.balance.total += value;
      } else {
        if(value > this.balance.total) {
          throw Error('value not is avaible to outcome');
        }
        this.balance.outcome += value;
        this.balance.total -= value;
      }
  }

  public create({title, value, type}: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type
    })
    this.setBalance(transaction.value, transaction.type)
    this.transactions.push(transaction);
    return transaction;

  }
}

export default TransactionsRepository;
