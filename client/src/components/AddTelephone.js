import React, { Component } from 'react';
import MuiPhoneNumber from 'material-ui-phone-number';

export default function AddTelephone(props) {
  function handleOnChange(value) {
    props.setPhone(value);
  }
  const mystyle = {
    color: 'rgba(0, 0, 0, 0.54)',
    padding: '0',
    fontSize: '1rem',
    fontFamily:
      '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '400',
    lineHeight: '1',
    letterSpacing: '0.00938em',
  };
  return (
    <div
      style={{ margin: '0px 23px', marginBottom: '23px' }}>
      <p style={mystyle}>Ваш номер телефону</p>
      <MuiPhoneNumber
        style={{
          width: '100%',
        }}
        value={props.phone}
        defaultCountry={'ua'}
        regions={'europe'}
        onChange={handleOnChange}
      />
    </div>
  );
}
