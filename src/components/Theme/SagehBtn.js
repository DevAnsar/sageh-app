import React from "react";
import LoadingComponent from '../Loading';

function SagehBtn({
                      children,
                      styles,
                      onClickFn = () => {
                      },
                      className,
                      Color,
                      Border,
                      Pointer = true,
                      FontSize = '10pt',
                      BgColor = 'inherit',
                      BorderRadius = '5px',
                      Width = 'auto',
                      Height = 'auto',
                      Title = '',
                      Loading=false,
                
                  }) {

    return (
        <span title={Title} onClick={onClickFn} className={`${className} sageh-custom-btn`}
              style={{
                  ...styles,
                  color: Color,
                  border: Border,
                  cursor: Pointer ? 'pointer' : '',
                  'font-size': FontSize,
                  'background-color': BgColor,
                  'border-radius': BorderRadius,
                  width: Width,
                  height: Height
              }}>
            {Loading ? <LoadingComponent />: children}
        </span>
    )
}

export default SagehBtn;