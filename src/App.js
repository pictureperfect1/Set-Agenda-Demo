import React from 'react';
import './App.css';
import Button from 'antd/lib/button';
import 'antd/dist/antd.css';
import './index.css';

import {
  Form,
  Input,
  Icon,
  DatePicker,
  TimePicker,
  Upload
} from 'antd';
function App() {
 
  let id = 0;

  class DynamicFieldSet extends React.Component {
    remove = k => {
      const { form } = this.props;
      // can use data-binding to get
      const keys = form.getFieldValue("keys");
      // We need at least one passenger
      if (keys.length === 1) {
        return;
      }

      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter(key => key !== k)
      });
    };

    add = () => {
      const { form } = this.props;
      // can use data-binding to get
      const keys = form.getFieldValue("keys");
      const nextKeys = keys.concat(id++);
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys
      });
    };

    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          const { keys, names } = values;
          console.log("Received values of form: ", values);
          console.log("Merged values:", keys.map(key => names[key]));
        }
      });
    };

    render() {
      const { getFieldDecorator, getFieldValue } = this.props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 }
        }
      };
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 }
        }
      };
      getFieldDecorator("keys", { initialValue: [] });
      const keys = getFieldValue("keys");
      const formItems = keys.map((k, index) => (

        <Form.Item
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? "Agenda" : ""}
          required={true}
          key={k}
        >
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Please input Agenda or delete this field."
              }
            ]
          })(
            <Input
              placeholder="Agenda name"
              style={{ width: "60%", marginRight: 8 }}
              autosize={{minRows: 2, maxRows:8}}
            />
          )}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(k)}
            />
          ) : null}
        </Form.Item>
      ));
      return (
        <Form onSubmit={this.handleSubmit}>
          {formItems}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
              <Icon type="plus" /> Add field
          </Button>
          </Form.Item>
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="primary" htmlType="submit">
              Submit
          </Button>
          </Form.Item>
        </Form>
      );
    }
  }


  const SetAgenda = Form.create({ name: "dynamic_form_item" })(
    DynamicFieldSet);
  const ProgressReport = Form.create({ name: "dynamic_form_item" })(
    DynamicFieldSet)
 
  return (
    <div className="App">
     Date: <DatePicker  required></DatePicker><br />
    <br></br>
    
     Time: <TimePicker required></TimePicker>
     <br /><br />
      <p className="Venue"> Venue:</p> <Input className="Venue" suffix={<Icon type="pin"></Icon>} width={'20px'} type="text " required autosize={{ minRows: 2, maxRows: 6}}></Input>
      <br /><br />

      <hr></hr>
      <h2 text-align="center">Please add Agenda:</h2>
      <SetAgenda className="Agenda" />
      <hr></hr>
      <h2 text-align="left">Administration Report</h2>
      <ProgressReport />
      
      <hr></hr>

      <h2>Upload financial reports</h2>
      <Upload multiple={true} directory={true} >
      
        <Button><Icon type="upload" />Upload</Button>
      </Upload>
    </div>
  );
}

export default App;

