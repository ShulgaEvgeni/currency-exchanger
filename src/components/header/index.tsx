import React from 'react';
import $ from './style.module.scss';

const Header = (props: React.AllHTMLAttributes<HTMLElement>) => {
  const { children, className, ...headerProps } = props;

  return (
    <header className={$.header}>
      <div {...headerProps} className={[$.content, className].join(' ')}>
        {children}
      </div>
    </header>
  );
};

export default Header;
