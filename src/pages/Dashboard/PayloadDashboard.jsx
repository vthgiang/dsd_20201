import React from 'react';
import { Row, Col, Table, Spin, DatePicker, Space, Button } from 'antd';
import moment from 'moment';
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
import { getPayloadDetailedMetrics } from '../../services/statistics';

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
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

export default function PayloadDashboard() {
  const [payloadMetrics, setPayloadMetrics] = React.useState(null);
  const [feeMetrics, setFeeMetrics] = React.useState(null);
  const [year, setYear] = React.useState(moment());
  console.log(year);

  const fetchYear = async () => {
    setFeeMetrics(null);
    const payloads = await getPayloadDetailedMetrics();
    setFeeMetrics(payloads);
  };

  const chartData = React.useMemo(() => {
    if (!payloadMetrics) return [];
    return [
      { name: 'Đang rảnh', value: payloadMetrics.idle },
      { name: 'Đang hoạt động', value: payloadMetrics.working },
      { name: 'Đang sạc', value: payloadMetrics.charging },
      { name: 'Đang bảo trì', value: payloadMetrics.fixing },
    ];
  }, [payloadMetrics]);
  const tableData = React.useMemo(() => {
    if (!payloadMetrics) return [];
    return [
      { status: 'Đang rảnh', amount: payloadMetrics.idle },
      { status: 'Đang bay', amount: payloadMetrics.working },
      { status: 'Đang sạc', amount: payloadMetrics.charging },
      { status: 'Đang bảo trì', amount: payloadMetrics.fixing },
    ];
  }, [payloadMetrics]);
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
  const lineChartData = React.useMemo(() => {
    const sellectYear = year.format('YYYY');

    const getMonthData = (month) => ({
      fixing:
        feeMetrics?.fee?.fixing?.filter(
          (item) =>
            new Date(item.startedAt).getMonth() == month &&
            new Date(item.startedAt).getFullYear() == sellectYear,
        ).length || 0,
      working:
        feeMetrics?.fee?.working?.filter(
          (item) =>
            new Date(item.startedAt).getMonth() === month &&
            new Date(item.startedAt).getFullYear() == sellectYear,
        ).length || 0,
    });
    const data = Array.from(Array(12).keys()).map((month) => ({
      name: `Th${month + 1}`,
      ...getMonthData(month),
    }));
    return data;
  }, [feeMetrics]);

  const yearFormat = 'YYYY';

  React.useEffect(() => {
    const fetchAll = async () => {
      const payload = await getPayloadDetailedMetrics();
      setPayloadMetrics(payload);
      setFeeMetrics(payload);
    };

    fetchAll();
  }, []);

  return (
    <>
      <h1>Payload</h1>
      {!payloadMetrics ? (
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
            <h3 className="ml-5"> Số lượng payload theo trạng thái </h3>
            <Table
              className="mt-5"
              dataSource={tableData}
              columns={columns}
              size="small"
              bordered
            />
          </Col>
          <Col span={20} className="mt-5">
            <h3 className="ml-5">Chi phí hoạt động và sửa chữa</h3>
            <h4 className="ml-5 mt-3 mb-1">Năm: </h4>
            <DatePicker
              value={year}
              onChange={setYear}
              picker="year"
              className="ml-5"
            />
            <br />
            <Button type="primary" className="mt-3 ml-5" onClick={fetchYear}>
              Duyệt
            </Button>
            <Button href="http://" className={'ml-3 btn-success'}>
              Chi tiết
            </Button>
            <LineChart
              className="mt-5"
              width={1000}
              height={600}
              data={lineChartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="fixing"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="working" stroke="#82ca9d" />
            </LineChart>
          </Col>
        </Row>
      )}
    </>
  );
}
