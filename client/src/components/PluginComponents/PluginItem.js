import React from 'react';
import SensorItem from './SensorItem';

export function PluginItem(props){
  if(props.itemType==="SensorItem"){
    return <SensorItem title={props.title} apiEventSubscribe={props.apiEventSubscribe}/>;
  }else{
    return "";
  }
}
