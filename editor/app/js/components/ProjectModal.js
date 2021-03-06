import React from 'react';
import { connect } from 'react-redux';

import { Modal, Button, Input } from 'react-bootstrap';

export default class ProjectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {projectName: this.props.editor.name, packageName: this.props.editor.package};
  }
  onSave() {
    this.props.setProjectProperties(this.state.projectName, this.state.packageName);
  }
  onEdit() {
    this.props.setProjectProperties(this.state.projectName, this.state.packageName);
  }
  render() {
    // Key listener
    let onKeydownProp = (e) => {
      if (e.keyCode == 13) {
        this.onSave();
      }
    };

    let modalTitle = (!this.props.projectEdit) ? "Create project" : "Edit project";
    let onChangeProjectName = (e) => {
      this.setState({projectName: e.target.value})
    };
    let onChangePackageName = (e) => {
      this.setState({packageName: e.target.value})
    };
    return (
      <Modal show={true} onHide={this.props.closeProjectModal} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-horizontal">
            <Input type="text"
                   name="project_name"
                   label="Project name: "
                   labelClassName="col-xs-3"
                   wrapperClassName="col-xs-9"
                   onChange={onChangeProjectName}
                   onKeyDown={onKeydownProp}
                   value={this.state.projectName}
                   autoFocus={true}/>
          </div>
          <div className="form-horizontal">
            <Input type="text"
                   name="package_name"
                   label="Package name: "
                   labelClassName="col-xs-3"
                   wrapperClassName="col-xs-9"
                   onChange={onChangePackageName}
                   onKeyDown={onKeydownProp}
                   value={this.state.packageName}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeProjectModal}>Close</Button>
          <Button onClick={() => this.onEdit()} bsStyle="primary">Save</Button>
        </Modal.Footer>;
      </Modal>
    );
  }
}