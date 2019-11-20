import React from "react";
import { Modal } from "antd";

import EditUnitForm from "./EditUnitForm";
import { AffiliateUnitWithKey } from "./TableView";

type Props = {
  onClose: () => void;
  unit?: AffiliateUnitWithKey;
};

function EditUnitModal({ onClose, unit }: Props) {
  const currentUnit = typeof unit === "undefined" ? AffiliateUnitWithKey.empty() : unit;

  return (
    <Modal
      title={unit ? "Edit unit" : "Create new unit"}
      visible={true}
      footer={null}
      onCancel={() => onClose()}
    >
      <EditUnitForm unit={currentUnit} doCloseModal={onClose} />
    </Modal>
  );
}

export default EditUnitModal;
