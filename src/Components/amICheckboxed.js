import React, { Component } from 'react';
import Checkbox from './Checkbox';

function amICheckboxed(value,checked,handleCheck){
  if (value) {
    return (
      <Checkbox status={checked} handleCheck={handleCheck} />
    );
  } else {
      return "";
  }
}

export default amICheckboxed;
