import React from 'react';
import SensorItem from './SensorItem';

export function PluginItem(props) {
  if ('SensorItem' === props.itemType) {
    return (
      <SensorItem
        title={props.title}
        apiEventSubscribe={props.apiEventSubscribe}
      />
    );
  }

  return '';
}
