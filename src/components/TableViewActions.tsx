import React from "react";
import { Tooltip, Button, message, Popconfirm } from "antd";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { unitRemove } from "../store/units/actions";

import { AffiliateUnitWithKey } from "./TableView";
import EditUnitModal from "./EditUnitModal";

type Props = {
  unit: AffiliateUnitWithKey;
  doRemove: (index: number) => void;
};

function TableViewActions({ unit, doRemove }: Props) {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  function doCancel() {
    message.error("Unit not deleted");
  }

  return (
    <React.Fragment>
      <Button.Group>
        <Tooltip title="Edit">
          <Button
            shape="circle"
            icon="edit"
            type="primary"
            onClick={() => setShowModal(true)}
          />
        </Tooltip>
        <Tooltip title="Delete">
          <Popconfirm
            title="Confirm deletion of this unit"
            onConfirm={() => doRemove(unit.key)}
            onCancel={doCancel}
            okText="DELETE"
            cancelText="Cancel"
          >
            <Button shape="circle" icon="delete" type="danger" />
          </Popconfirm>
        </Tooltip>
      </Button.Group>
      {showModal && <EditUnitModal unit={unit} onClose={() => setShowModal(false)} />}
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  doRemove: (index: number) => {
    message.success("Unit deleted");
    dispatch(unitRemove(index));
  }
});

export default connect(null, mapDispatchToProps)(TableViewActions);
