import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { PageHeader, Alert, Table, Icon, Tooltip, Button } from "antd";
import { ColumnProps } from "antd/es/table";

import AffiliateUnit from "../models/AffiliateUnit";
import { AppState } from "../store/store";
import { setJsonMode } from "../store/user/actions";

import TableViewImage from "./TableViewImage";
import TableViewDetails from "./TableViewDetails";
import TableViewFeatures from "./TableViewFeatures";
import TableViewActions from "./TableViewActions";
import EditUnitModal from "./EditUnitModal";

type Props = {
  doExport: () => void;
  units?: AffiliateUnit[];
};

export class AffiliateUnitWithKey extends AffiliateUnit {
  key: number = -1;
  static empty(): AffiliateUnitWithKey {
    return new AffiliateUnitWithKey();
  }
};

function TableView({ units, doExport }: Props) {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  let data: AffiliateUnitWithKey[] = [];

  // add `key` prop and juggle the types a bit
  if (units && units.length > 0) {
    data = units.map((unit, key) => ({
      ...unit,
      key
    })) as AffiliateUnitWithKey[];
  }

  const columns: ColumnProps<AffiliateUnitWithKey>[] = [
    {
      title: "Campaign and catgory",
      key: "cc",
      render: (text: any, record: AffiliateUnitWithKey) => (
        <span>
          <Tooltip placement="topLeft" title="Campaign">
            {record.campaign}
          </Tooltip>
          &nbsp;/&nbsp;
          <Tooltip placement="topLeft" title="Category">
            {record.category}
          </Tooltip>
        </span>
      )
    },
    {
      title: "Big",
      key: "isbig",
      render: (text: any, record: AffiliateUnitWithKey) =>
        record.isBig ? (
          <Tooltip title="Big unit">
            <Icon type="check" />
          </Tooltip>
        ) : null,
      width: "55px"
    },
    {
      title: "Image",
      key: "image",
      render: (text: any, record: AffiliateUnitWithKey) => (
        <TableViewImage src={record.image} alt="" />
      ),
      width: "55px"
    },
    {
      title: "Unit",
      key: "unit",
      render: (text: any, record: AffiliateUnitWithKey) => (
        <TableViewDetails unit={record} />
      )
      // sorter: (a: AffiliateUnit, b: AffiliateUnit) =>
      //   a.category.length - b.category.length
    },
    {
      title: "Features",
      key: "features",
      render: (text: any, record: AffiliateUnitWithKey) => (
        <TableViewFeatures unit={record} />
      )
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: AffiliateUnitWithKey) => (
        <TableViewActions unit={record} />
      ),
      width: "100px"
    }
  ];

  return (
    <PageHeader
      ghost={false}
      title={`Affiliate Units (${data.length})`}
      extra={[
        <Button key="add" type="primary" icon="plus" onClick={() => setShowModal(true)}>
          Add unit
        </Button>,
        <Button key="export" icon="export" onClick={doExport}>
          Export JSON
        </Button>
      ]}
    >
      {(!units || units.length === 0) ? (
        <Alert message="No units available" type="error" />
      ) : (
        <Table<AffiliateUnitWithKey>
          dataSource={data}
          columns={columns}
          pagination={false}
          />
      )}
      {showModal && <EditUnitModal onClose={() => setShowModal(false)} />}
    </PageHeader>
  );
}

const mapStateToProps = (state: AppState): Partial<Props> => ({
  units: state.units,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  doExport: () => {
    dispatch(setJsonMode());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TableView);
