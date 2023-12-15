import { makeAutoObservable } from 'mobx';

import $$user from '../services/user-service';
import { userType, valutesParse } from '../helper/types';

class User {
  constructor() {
    makeAutoObservable(this);
  }

  walletBuy: string | null = null;
  userId: string | null = null;
  user: userType | null = null;

  getUser() {
    const res = $$user.getUser();
    this.userId = res.id;
    this.user = res.user;
  }

  signInUser(login: string, password: string) {
    const res = $$user.login(login, password);
    if (res) {
      this.getUser();
    }
    return res;
  }

  signUpUser(name: string, login: string, password: string) {
    $$user.createUser({ name, login, password });
    this.getUser();
    return true;
  }

  logOutUser() {
    $$user.logout();
    this.user = null;
    this.userId = null;
  }

  addWallet(valute: valutesParse) {
    if (this.userId) {
      $$user.addWalletForUser(this.userId, valute);
      this.getUser();
    }
  }

  buyFromCard(sum: number): boolean {
    let isSuccess = false;
    if (this.userId && this.walletBuy) {
      isSuccess = $$user.buyFromCard(this.userId, sum, this.walletBuy);
    }
    if (isSuccess) this.getUser();
    return isSuccess;
  }

  async buyFromWallet(sum: number, idWallet: string): Promise<boolean> {
    let isSuccess = false;
    if (this.userId && this.walletBuy) {
      isSuccess = await $$user.buyFromWallet(this.userId, sum, this.walletBuy, idWallet)
    }
    if (isSuccess) this.getUser();
    return isSuccess;
  }
}

const userStore = new User();

export default userStore;
