import React from "react";
import {
  Row,
  Col,
  Spin,
} from "antd";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
} from "recharts";
import { getMonitorZoneMetrics } from "../../services/statistics";

export default function MonitorZoneDashboard() {
  const [areaFrequencyMetrics, setAreaFrequencyMetrics] = React.useState(null);
  const [zoneFrequencyMetrics, setZoneFrequencyMetrics] = React.useState(null);
  const chartAreaData = React.useMemo(() => {
    if (!areaFrequencyMetrics) return [];
    return areaFrequencyMetrics.map((areaFrequencyItem) => ({
      name: areaFrequencyItem.name,
      value: areaFrequencyItem.times,
    }));
  }, [areaFrequencyMetrics]);
  const chartZoneData = React.useMemo(() => {
    if (!zoneFrequencyMetrics) return [];
    return zoneFrequencyMetrics.map((zoneFrequencyItem) => ({
      name: zoneFrequencyItem.name,
      value: zoneFrequencyItem.times,
    }));
  }, [zoneFrequencyMetrics]);
  React.useEffect(() => {
    const fetchAll = async () => {
      const monitorAreaZone = await getMonitorZoneMetrics();
      const { area, zone } = monitorAreaZone;
      setAreaFrequencyMetrics(area);
      setZoneFrequencyMetrics(zone);
    };
    fetchAll();
  }, []);

  const renderChart = (data, color) => (
    <Col style={{ overflowY: "scroll", height: "250px" }}>
      <BarChart
        layout="vertical"
        width={950}
        height={60 * data.length}
        data={data}
        margin={{
          left: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Bar dataKey="value" fill={color} label />
      </BarChart>
    </Col>
  );

  return (
    <>
      <h1>Miền giám sát</h1>
      <div />
      <h3>Thống kê khu vực giám sát theo tần suất sự cố</h3>
      {!areaFrequencyMetrics ? (
        <Spin />
      ) : (
        <Row>
          {renderChart(chartAreaData, "#0088FE")}
        </Row>
      )}
      <h3>Thống kê miền giám sát theo tần suất sự cố</h3>
      {!zoneFrequencyMetrics ? (
        <Spin />
      ) : (
        <Row>
          {renderChart(chartZoneData, "#FF8042")}
        </Row>
      )}
    </>
  );
}
