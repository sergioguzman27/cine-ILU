import React from 'react';
import NumberFormat from 'react-number-format';

export const RenderCurrency = ({ value, className }) => {
    return (
      <NumberFormat
        className={className}
        decimalScale={2}
        fixedDecimalScale
        value={value}
        thousandSeparator
        prefix="Q "
        displayType="text"
        suffix=""
      />
    );
};