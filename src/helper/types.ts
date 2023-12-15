export type ValCurs = {
  _attributes: { Date: string; name: string };
  Valute: Valute[];
};

export type Valute = {
  _attributes: { ID: string };
  NumCode: { _text: string };
  CharCode: { _text: string };
  Nominal: { _text: string };
  Name: { _text: string };
  Value: { _text: string };
  VunitRate: { _text: string };
};

export type valutesParse = {
  id: string;
  name: string;
  charCode: string;
  numCode: string;
  nominal: number;
  value: number;
  vunitRate: number;
};

export type getExchangeRatesByDateRes = {
  date: string;
  valutes: valutesParse[];
};

export type userType = {
  id: string;
  name: string;
  wallets: usersWallets[];
};

export type usersWallets = {
  id: string;
  name: string;
  charCode: string;
  value: number;
};
