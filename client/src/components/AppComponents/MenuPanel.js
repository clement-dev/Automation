import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { getPluginsViews } from '../../utils/merryhome-api';
import PluginPanel from '../PluginsComponents/PluginPanel';
import { Glyphicon } from 'react-bootstrap';
import './css/MenuPanel.css';

class MenuPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { plugins: [] };
  }

  componentDidMount() {
    getPluginsViews()
      .then(plugins => this.setState({ plugins }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <Menu>
          <div className="menuPluginList">
            {this.state.plugins.map((plugin, index) => (
              <button
                key={`pluginLink-${index}`}
                type="button"
                className="btn btn-info btn-lg"
                data-toggle="modal"
                data-target={`#plugin-${index}`}>
                <Glyphicon glyph={plugin.linkicon} />
                <span>{plugin.link}</span>
              </button>
            ))}
          </div>
        </Menu>
        {this.state.plugins.map((plugin, index) => (
          <PluginPanel
            key={`plugin-${index}`}
            id={`plugin-${index}`}
            title={plugin.link}
            type={plugin.type}
            itemType={plugin.itemType}
            items={plugin.list}
          />
        ))}
      </div>
    );
  }
}

export default MenuPanel;
