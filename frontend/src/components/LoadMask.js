
import React, { Component } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const LoadMask = (props) => {
    const { loading, children }= props;

    return (
        <div className="load-mask">
            {loading && (
                <div className="loader-container">
                    <LoadingOutlined className="loader-icon" />
                    <p className="loader-texto">Cargando...</p>
                </div>
            )}
            <div className="w-100">
                {children}
            </div>
        </div>
    )
}

export default LoadMask;
