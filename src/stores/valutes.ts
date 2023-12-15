import { makeAutoObservable, runInAction } from 'mobx';

import $$valutes from '../services/valutes-services';
import { valutesParse } from '../helper/types';

class valutes {
  constructor() {
    makeAutoObservable(this);
  }

  valutesNow: valutesParse[] | null = null;
  valutes: valutesParse[] = [];
  valutesDate = '';

  async getRate(date: string) {
    const res = await $$valutes.getExchangeRatesByDate(date);

    runInAction(() => {
      this.valutes = res.valutes;
      this.valutesDate = res.date;
    });
  }

  async getValutesNow() {
    const res = await $$valutes.getRateNow();

    runInAction(() => {
      this.valutesNow = res.valutes;
    });
  }
}

const valutesStore = new valutes();

export default valutesStore;
