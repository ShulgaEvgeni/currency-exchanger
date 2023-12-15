import axios from 'axios';
import { xml2json } from 'xml-js';
import { ValCurs, Valute, getExchangeRatesByDateRes } from '../helper/types';

interface ICacheValutes {
  [key: string]: getExchangeRatesByDateRes;
}

class valutes {
  private $api = axios.create({
    withCredentials: true,
    baseURL: 'https://www.cbr.ru/scripts/',
  });

  private rateNow: getExchangeRatesByDateRes | null = null;
  private cacheValutes: ICacheValutes = {};
  private dateNow = new Date().toISOString().split('T')[0];

  getExchangeRatesByDate = async (date: string): Promise<getExchangeRatesByDateRes> => {
    const tempDate = date.split('-');
    const dateReq = `${tempDate[2]}/${tempDate[1]}/${tempDate[0]}`;
    const dateCache = `${tempDate[2]}.${tempDate[1]}.${tempDate[0]}`;

    if (Object.hasOwn(this.cacheValutes, dateCache)) {
      return this.cacheValutes[dateCache];
    }

    const { data } = await this.$api.get('/XML_daily.asp', {
      params: {
        date_req: dateReq,
      },
    });

    const parseData: ValCurs = JSON.parse(xml2json(data, { compact: true })).ValCurs;

    const parseDataTemp: getExchangeRatesByDateRes = {
      date: parseData._attributes.Date,
      valutes: parseData.Valute.map((item: Valute) => ({
        id: item._attributes.ID,
        name: item.Name._text,
        charCode: item.CharCode._text,
        numCode: item.NumCode._text,
        nominal: Number(item.Nominal._text.replace(',', '.')),
        value: Number(item.Value._text.replace(',', '.')),
        vunitRate: Number(item.VunitRate._text.replace(',', '.')),
      })),
    };

    this.cacheValutes[parseDataTemp.date] = parseDataTemp;
    this.cacheValutes[dateCache] = parseDataTemp;

    this.cacheValutes;

    if (this.dateNow === date) {
      this.rateNow = parseDataTemp;
    }

    return parseDataTemp;
  };

  getRateNow = async () => {
    if (this.rateNow) {
      return this.rateNow;
    }

    this.rateNow = await this.getExchangeRatesByDate(this.dateNow);
    return this.rateNow;
  };
}

const valutesServices = new valutes();

export default valutesServices;
