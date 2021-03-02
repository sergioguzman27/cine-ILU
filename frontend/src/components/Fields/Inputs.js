import React, { Fragment } from 'react';
import { Input, InputNumber } from 'antd';
import NumberFormat from 'react-number-format';

export const InputField = (props) => {
    const { input, size, placeholder, allowClear, meta: { touched, error }, feedBack } = props;
    const invalid = touched && error;

    return (
        <div className="w-100">
            <Input
                className={`basic-input ${invalid && 'input-error'}`}
                placeholder={placeholder}
                size={size || 'default'}
                bordered={false}
                allowClear={allowClear || false}
                {...input}
                // value={input.value}
                // onChange={(e) => input.onChange(e)}
            />
            {(invalid && feedBack) && (
                <div className="text-error">
                    {error}
                </div>
            )}
        </div>
    )
}

export const NumberField = (props) => {
    const { input, numberFormat, decimalScale, placeholder, prefix='', suffix='',
            minValue, maxValue, meta: { touched, error }, disabled, feedBack } = props;
    const invalid = touched && error;

    return (
        <div className="w-100">
            <InputNumber
                placeholder={placeholder}
                className={`basic-input number-input ${invalid && 'input-error'}`}
                size="large"
                // decimalScale={decimalScale || 0}
                // format={numberFormat}
                // fixedDecimalScale
                disabled={disabled}
                value={input.value}
                // thousandSeparator
                // prefix={prefix}
                // suffix={suffix}
                onChange={(value) => {
                    console.log("value ", value)
                    input.onChange(value);
                }}
            />
            {(invalid && feedBack) && (
                <div className="text-error">
                    {error}
                </div>
            )}
        </div>
    )
}