import { userType, valutesParse } from '../helper/types';
import $$valutes from './valutes-services';

class user {
  getUser(): { id: string | null; user: userType | null } {
    const id = localStorage.getItem('token');
    if (id) {
      return {
        id: id,
        user: JSON.parse(localStorage.getItem(`user${id}`) as string) as userType,
      };
    }
    return {
      id: id,
      user: null,
    };
  }

  login(login: string, password: string): boolean {
    let users: users[] = [];

    if (localStorage.getItem('users') === null) {
      localStorage.setItem('users', JSON.stringify([]));
    } else {
      users = JSON.parse(localStorage.getItem('users') as string);
    }

    const user = users.find((u) => u.login === login && u.password === password);

    if (user) {
      localStorage.setItem('token', user.id);
      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem('token');
  }

  createUser(data: { name: string; login: string; password: string }) {
    let users: users[] = [];

    if (localStorage.getItem('users') === null) {
      localStorage.setItem('users', JSON.stringify([]));
    } else {
      users = JSON.parse(localStorage.getItem('users') as string);
    }

    const id = users.length.toString();

    users.push({
      id,
      ...data,
    });

    const user: userType = {
      id,
      name: data.name,
      wallets: [
        {
          id: 'RUB',
          name: 'Российский рубль',
          charCode: 'RUB',
          value: 0,
        },
      ],
    };

    localStorage.setItem('token', id);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem(`user${id}`, JSON.stringify(user));
  }

  addWalletForUser(id: string, valute: valutesParse) {
    const user: userType = JSON.parse(localStorage.getItem(`user${id}`) as string);

    user.wallets.push({
      id: valute.charCode,
      name: valute.name,
      charCode: valute.charCode,
      value: 0,
    });

    localStorage.setItem(`user${id}`, JSON.stringify(user));
  }

  buyFromCard(id: string, sum: number, walletToId: string): boolean {
    const user: userType = JSON.parse(localStorage.getItem(`user${id}`) as string);

    const wallet = user.wallets.find((w) => w.id === walletToId);
    if (wallet) {
      wallet.value += sum;
      localStorage.setItem(`user${id}`, JSON.stringify(user));
      return true;
    }

    return false;
  }

  async buyFromWallet(
    id: string,
    sum: number,
    walletToId: string,
    walletFromId: string,
  ): Promise<boolean> {
    const user: userType = JSON.parse(localStorage.getItem(`user${id}`) as string);

    const walletTo = user.wallets.find((w) => w.id === walletToId);
    const walletFrom = user.wallets.find((w) => w.id === walletFromId);

    const rate = await $$valutes.getRateNow();

    const walletToRate =
      walletTo?.charCode === 'RUB'
        ? 1
        : rate.valutes.find((v) => v.charCode === walletTo?.id)?.vunitRate || 0;
    const walletFromRate =
      walletFrom?.charCode === 'RUB'
        ? 1
        : rate.valutes.find((v) => v.charCode === walletFrom?.id)?.vunitRate || 0;

    if (walletTo && walletFrom && walletFrom.value - sum >= 0) {
      walletFrom.value -= sum;
      walletTo.value += sum * (walletFromRate / walletToRate);
      localStorage.setItem(`user${id}`, JSON.stringify(user));
      return true;
    }

    return false;
  }
}

const userServices = new user();

export default userServices;

type users = {
  id: string;
  name: string;
  login: string;
  password: string;
};
