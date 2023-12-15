import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import CancelIcon from '@mui/icons-material/CancelOutlined';
import SearchIcon from '@mui/icons-material/SearchOffOutlined';

import Input from '../../components/input';
import { valutesStore as $valutes } from '../../stores';
import { valutesParse } from '../../helper/types';

import $ from './style.module.scss';

const CurrencyTable = observer(() => {
  const dateNow = new Date().toISOString().split('T')[0];
  const [data, setData] = useState<valutesParse[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchDate, setSearchDate] = useState(dateNow);

  useEffect(() => {
    setData($valutes.valutes);
    setLoading(false);
  }, [$valutes.valutes]);

  useEffect(() => {
    setLoading(true);
    $valutes.getRate(dateNow);
    $valutes.getValutesNow();
  }, []);

  const handleFilterChange = () => {
    setData(
      $valutes.valutes.filter(
        (d) =>
          d.name.toUpperCase().indexOf(search.toUpperCase()) + 1 ||
          d.charCode.toUpperCase().indexOf(search.toUpperCase()) + 1,
      ),
    );
  };

  const handleKeyDownSearch = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleFilterChange();
    }
  };

  const handleKeyDownDate = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setLoading(true);
      $valutes.getRate(searchDate);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'charCode', headerName: 'charCode' },
    { field: 'nominal', headerName: 'Единиц' },
    { field: 'name', headerName: 'Валюта', width: 300 },
    { field: 'value', headerName: 'Курс' },
    { field: 'vunitRate', headerName: 'Курс за еденицу' },
  ];

  return (
    <div>
      <Typography variant="h4">Курс на {$valutes.valutesDate}</Typography>
      <Box className={$.inputBlock}>
        <Input
          value={search}
          label="Поиск вылюты"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          buttons={[
            {
              Icon: CancelIcon,
              onClick: () => {
                setSearch('');
                setData($valutes.valutes);
              },
              hidden: search.length === 0,
              tooltip: 'Очистить',
            },
            {
              Icon: SearchIcon,
              onClick: () => {
                handleFilterChange();
              },
              tooltip: 'Поиск',
            },
          ]}
          onKeyDown={handleKeyDownSearch}
        />

        <Input
          value={searchDate}
          label="Поиск по дате"
          type="date"
          onChange={(e) => {
            setSearchDate(e.target.value);
          }}
          buttons={[
            {
              Icon: CancelIcon,
              onClick: () => {
                setLoading(true);
                setSearchDate(dateNow);
                $valutes.getRate(dateNow);
              },
              hidden: searchDate === dateNow,
              tooltip: 'Очистить',
            },
            {
              Icon: SearchIcon,
              onClick: () => {
                setLoading(true);
                $valutes.getRate(searchDate);
              },
              tooltip: 'Поиск',
            },
          ]}
          onKeyDown={handleKeyDownDate}
        />
      </Box>

      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50]}
        loading={loading}
      />
    </div>
  );
});

export default CurrencyTable;
