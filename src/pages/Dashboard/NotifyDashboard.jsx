import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Table, Spin } from 'antd';
import {
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { getNotifyMetrics } from '../../services/statistics';

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.1) return null;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ff8279'];

const RADIAN = Math.PI / 180;

export default function PayloadDashboard() {
  const users = useSelector((state) => state.user.user);
  const projectType = users.type;
  const token = users.api_token;
  // const role = users.role;
  const [notifyMetrics, setNotifyMetrics] = React.useState(null);
  const chartData = React.useMemo(() => {
    if (!notifyMetrics) return [];
    return [
      { name: 'Cảnh báo đúng: ', value: notifyMetrics.all.isTrue },
      { name: 'Cảnh báo sai: ', value: notifyMetrics.all.isFalse },
    ];
  }, [notifyMetrics]);

  const chartData2 = React.useMemo(() => {
    if (!notifyMetrics) return [];
    return [
      { name: 'Level 1', value: notifyMetrics.lv1 },
      { name: 'Level 2', value: notifyMetrics.lv2 },
      { name: 'Level 3', value: notifyMetrics.lv3 },
      { name: 'Level 4', value: notifyMetrics.lv4 },
      { name: 'Level 5', value: notifyMetrics.lv5 },
    ];
  }, [notifyMetrics]);
  const chartData3 = React.useMemo(() => {
    if (!notifyMetrics) return [];
    if (projectType != 'ALL_PROJECT') return [];
    return [
      { name: 'Cháy rừng', value: notifyMetrics.CR.total },
      { name: 'Đê điều', value: notifyMetrics.DD.total },
      { name: 'Lưới điện', value: notifyMetrics.LD.total },
      { name: 'Cây trồng', value: notifyMetrics.CT.total },
    ];
  }, [notifyMetrics]);
  const tableData = React.useMemo(() => {
    if (!notifyMetrics) return [];
    return [
      { status: 'Cảnh báo đúng: ', amount: notifyMetrics.all.isTrue },
      { status: 'Cảnh báo sai: ', amount: notifyMetrics.all.isFalse },
      { status: 'Tổng số', amount: notifyMetrics.all.total },
    ];
  }, [notifyMetrics]);
  const tableData2 = React.useMemo(() => {
    if (!notifyMetrics) return [];
    return [
      { status: 'Level 1', amount: notifyMetrics.lv1 },
      { status: 'Level 2', amount: notifyMetrics.lv2 },
      { status: 'Level 3', amount: notifyMetrics.lv3 },
      { status: 'Level 4', amount: notifyMetrics.lv4 },
      { status: 'Level 5', amount: notifyMetrics.lv5 },
    ];
  }, [notifyMetrics]);
  const tableData3 = React.useMemo(() => {
    if (!notifyMetrics) return [];
    if (projectType != 'ALL_PROJECT') return [];
    return [
      { status: 'Cháy rừng', amount: notifyMetrics.CR.total },
      { status: 'Đê điều', amount: notifyMetrics.DD.total },
      { status: 'Lưới điện', amount: notifyMetrics.LD.total },
      { status: 'Cây trồng', amount: notifyMetrics.CT.total },
    ];
  }, [notifyMetrics]);
  const columns = [
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => <a href="#">Chi tiết</a>,
    },
  ];
  const columns2 = [
    {
      title: 'Mức độ quan trọng',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => <a href="#">Chi tiết</a>,
    },
  ];
  const columns3 = [
    {
      title: 'Số lượng cảnh báo theo dự án',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => <a href="#">Chi tiết</a>,
    },
  ];

  React.useEffect(() => {
    const fetchAll = async () => {
      const notifications = await getNotifyMetrics(projectType, token);
      console.log({ notifications });
      setNotifyMetrics(notifications);
    };

    fetchAll();
  }, []);

  return (
    <>
      <h1>Cảnh báo</h1>
      {!notifyMetrics ? (
        <Spin />
      ) : (
        <Row>
          <Col span={10} offset={0} className="mt-5">
            <h3 className="ml-5">Tổng quan</h3>
            <ResponsiveContainer
              height={300}
              width={300}
              className="alight-item-center mx-auto mt-5"
            >
              <PieChart>
                <Pie
                  data={chartData}
                  cx={100}
                  cy={100}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  margin={{ bottom: 10 }}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend style={{ marginTop: 16 }} />
              </PieChart>
            </ResponsiveContainer>
          </Col>
          <Col span={12} offset={2} className="mt-5">
            <h3 className="ml-1"> Số lượng thông báo theo trạng thái </h3>
            <Table
              className="mt-5"
              dataSource={tableData}
              columns={columns}
              size="small"
              bordered
            />
          </Col>

          <Col span={10} offset={0} className="mt-5">
            <h3 className="ml-5">Tổng quan</h3>
            <ResponsiveContainer
              height={300}
              width={300}
              className="alight-item-center mx-auto mt-5"
            >
              <PieChart>
                <Pie
                  data={chartData2}
                  cx={100}
                  cy={100}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  margin={{ bottom: 10 }}
                >
                  {chartData2.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend style={{ marginTop: 16 }} />
              </PieChart>
            </ResponsiveContainer>
          </Col>

          <Col span={12} offset={2} className="mt-5">
            <h3 className="ml-1"> Số lượng thông báo sự cố theo độ quan trọng</h3>
            <Table
              className="mt-5"
              dataSource={tableData2}
              columns={columns2}
              size="small"
              bordered
            />
          </Col>
          {projectType == 'ALL_PROJECT' ? (
            <Col span={10} offset={0} className="mt-5">
              <h3 className="ml-5">Lượng cảnh báo theo dự án</h3>
              <ResponsiveContainer
                height={300}
                width={300}
                className="alight-item-center mx-auto mt-5"
              >
                <PieChart>
                  <Pie
                    data={chartData3}
                    cx={100}
                    cy={100}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    margin={{ bottom: 10 }}
                  >
                    {chartData3.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend style={{ marginTop: 16 }} />
                </PieChart>
              </ResponsiveContainer>
            </Col>
          ) : null}
          {projectType == 'ALL_PROJECT' ? (
            <Col span={12} offset={2} className="mt-5">
              <h3 className="ml-1">Số lượng thông báo sự cố theo dự án</h3>
              <Table
                className="mt-5"
                dataSource={tableData3}
                columns={columns3}
                size="small"
                bordered
              />
            </Col>
          ) : null}
        </Row>
      )}
    </>
  );
}
