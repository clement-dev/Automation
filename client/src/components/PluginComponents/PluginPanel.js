import React from 'react';
import {PluginItem} from './PluginItem.js';

class PluginPanel extends React.Component {

  PluginContent(props){
    if(props.type==="List"){
      return (<div className="modal-body">
                {props.items.map((item, index) => (
                  <PluginItem key = {"switch-"+index} itemType={props.itemType} title={item.name? item.name:item.title} itemId={item.itemId} type={item.type} icon={item.icon} file={item.file} activated={item.activated} apiEvent={item.event} apiEventSubscribe={item.eventSubscribe}/>
                ))}
              </div>);
    }else{
      return '';
    }
  }

  render(){
    const PluginContent = this.PluginContent;
    return (
      <div className="modal fade pluginPanel" id={this.props.id} role="dialog">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4> className="modal-title">{this.props.title}</h4>
            </div>
            <PluginContent type={this.props.type} items={this.props.items} itemType={this.props.itemType}/>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default PluginPanel;
