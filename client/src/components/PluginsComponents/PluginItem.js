import React from 'react';
import SwitchContainer from './SwitchContainer';
import MediaItem from './MediaItem';
import InputItem from './InputItem';
import SensorItem from './SensorItem';

export function PluginItem(props) {
  if ('SwitchContainer' === props.itemType) {
    return (
      <SwitchContainer
        title={props.title}
        itemId={props.itemId}
        activated={props.activated}
        apiEvent={props.apiEvent}
        apiEventSubscribe={props.apiEventSubscribe}
      />
    );
  }

  if ('MediaItem' === props.itemType) {
    return (
      <MediaItem
        title={props.title}
        itemId={props.itemId}
        apiEvent={props.apiEvent}
        file={props.file}
      />
    );
  }

  if ('Input' === props.itemType) {
    return (
      <InputItem
        itemId={props.itemId}
        apiEvent={props.apiEvent}
        type={props.type}
        icon={props.icon}
        title={props.title}
      />
    );
  }

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
