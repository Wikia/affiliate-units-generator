import React from "react";
import {
  Form,
  Input,
  Checkbox,
  DatePicker,
  Button,
  InputNumber,
  Select,
  message
} from "antd";
import { FormComponentProps } from "antd/lib/form";
import moment from "moment";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import AffiliateUnit from "../models/AffiliateUnit";
import { unitUpdate, unitAdd } from "../store/units/actions";

import countries from "./countries.json";
import { AffiliateUnitWithKey } from "./TableView";

const { Option } = Select;

type Props = FormComponentProps & {
  unit: AffiliateUnitWithKey;
  doCloseModal: () => void;
  doSave: (index: number, unit: AffiliateUnit) => void;
};

function EditUnitForm({ unit, form, doCloseModal, doSave }: Props) {
  const {
    getFieldDecorator,
    getFieldError,
    isFieldTouched
  } = form;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const newUnit = AffiliateUnit.load(values);
        if (newUnit) {
          // manually fix the launchOn, because we're having Moment object here and we want string
          if (values.launchOn) newUnit.launchOn = values.launchOn.format("YYYY-MM-DD\THH:mm:ss\Z");
          // save it
          doSave(unit.key, newUnit);
          doCloseModal();
        } else {
          message.error("Error saving unit");
        }
      } else {
          message.error("Errors validating unit");
        }
    });
  };

  const campaignError = isFieldTouched("campaign") && getFieldError("campaign");
  const categoryError = isFieldTouched("category") && getFieldError("category");
  const imageError = isFieldTouched("image") && getFieldError("image");
  const headingError = isFieldTouched("heading") && getFieldError("heading");
  const subheadingError =
    isFieldTouched("subheading") && getFieldError("subheading");
  const linkError = isFieldTouched("link") && getFieldError("link");

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item
        label="Campaign"
        validateStatus={campaignError ? "error" : ""}
        help={campaignError || ""}
      >
        {getFieldDecorator("campaign", {
          initialValue: unit.campaign,
          rules: [{ required: true, message: "Please input campaign!" }]
        })(<Input />)}
      </Form.Item>
      <Form.Item
        label="Category"
        validateStatus={categoryError ? "error" : ""}
        help={categoryError || ""}
      >
        {getFieldDecorator("category", {
          initialValue: unit.category,
          rules: [{ required: true, message: "Please input category!" }]
        })(<Input />)}
      </Form.Item>
      <Form.Item
        label="Image"
        validateStatus={imageError ? "error" : ""}
        help={imageError || ""}
      >
        {getFieldDecorator("image", {
          initialValue: unit.image,
          rules: [{ required: true, message: "Please input image!" }]
        })(<Input />)}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        {getFieldDecorator("isBig", {
          initialValue: unit.isBig,
          valuePropName: "checked"
        })(<Checkbox>This is a big affiliate unit</Checkbox>)}
      </Form.Item>
      <Form.Item
        label="Heading"
        validateStatus={headingError ? "error" : ""}
        help={headingError || ""}
      >
        {getFieldDecorator("heading", {
          initialValue: unit.heading,
          rules: [{ required: true, message: "Please input heading!" }]
        })(<Input />)}
      </Form.Item>
      <Form.Item
        label="Subheading"
        validateStatus={subheadingError ? "error" : ""}
        help={subheadingError || ""}
      >
        {getFieldDecorator("subheading", {
          initialValue: unit.subheading,
          rules: [{ required: true, message: "Please input subheading!" }]
        })(<Input />)}
      </Form.Item>
      <Form.Item
        label="Link"
        validateStatus={linkError ? "error" : ""}
        help={linkError || ""}
      >
        {getFieldDecorator("link", {
          initialValue: unit.link,
          rules: [{ required: true, message: "Please input link!" }]
        })(<Input />)}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        {getFieldDecorator("isExternal", {
          initialValue: unit.isExternal,
          valuePropName: "checked"
        })(<Checkbox>Link is external</Checkbox>)}
      </Form.Item>
      <Form.Item
        label="Tagline"
      >
        {getFieldDecorator("tagline", {
          initialValue: unit.tagline,
        })(<Input placeholder="Optional special tagline" />)}
      </Form.Item>
      <Form.Item label="Exclusive countries">
        {getFieldDecorator('country', {
          initialValue: unit.country,
        })(
          <Select mode="multiple" placeholder="Countries that the unit appear in">
            {countries.map(c => (
              <Option key={c.Code} value={c.Code}>{c.Name}</Option>
            ))}
          </Select>,
        )}
      </Form.Item>
      <Form.Item label="Launch">
        {getFieldDecorator("launchOn", {
          initialValue: unit.launchOn && moment.utc(unit.launchOn, "YYYY-MM-DDTHH:mm:ssZ", true),
        })(<DatePicker format="YYYY-MM-DD\THH:mm:ss\Z" showTime />)}
        <span className="ant-form-text">&nbsp;(UTC timezone)</span>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        {getFieldDecorator("disableOnSearch", {
          initialValue: unit.disableOnSearch,
          valuePropName: "checked"
        })(<Checkbox>Disable unit on search</Checkbox>)}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        {getFieldDecorator("disableOnPage", {
          initialValue: unit.disableOnPage,
          valuePropName: "checked"
        })(<Checkbox>Disable unit on page</Checkbox>)}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        {getFieldDecorator("onlyOnIOS", {
          initialValue: unit.onlyOnIOS,
          valuePropName: "checked"
        })(<Checkbox>Display unit only on iOS devices</Checkbox>)}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        {getFieldDecorator("onlyOnAndroid", {
          initialValue: unit.onlyOnAndroid,
          valuePropName: "checked"
        })(<Checkbox>Display unit only on Android devices</Checkbox>)}
      </Form.Item>
      <Form.Item label="Priority">
        {getFieldDecorator('priority', {
          initialValue: unit.priority,
        })(<InputNumber min={1} max={100} />)}
      </Form.Item>
      <Form.Item label="Preferred index">
        {getFieldDecorator('preferredIndex', {
          initialValue: unit.preferredIndex,
        })(<InputNumber min={0} max={2} />)}
        <span className="ant-form-text"> on the search page</span>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}

const EditForm = Form.create<Props>({ name: "unit_form" })(EditUnitForm);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  doSave: (index: number, unit: AffiliateUnit) => {
    if (index > -1) {
      message.success("Unit saved");
      dispatch(unitUpdate(index, unit));
    } else {
      message.success("Unit added");
      dispatch(unitAdd(unit));
    }
  }
});

export default connect(null, mapDispatchToProps)(EditForm);
