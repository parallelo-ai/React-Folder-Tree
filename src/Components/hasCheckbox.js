import React, { Component } from 'react';
import Checkbox from './Checkbox';

function hasCheckbox(checkbox,checked,handleCheck){
  if (checkbox) {
    return (
      <Checkbox status={checked} handleCheck={handleCheck} />
    );
  } else {
      return "";
  }
}

export default hasCheckbox;
