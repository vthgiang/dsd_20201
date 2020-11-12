import React from 'react';
import { Card, Col, Image, Row, Typography } from 'antd';
import StyleHomeContent from './index.style';
import Meta from 'antd/lib/card/Meta';
import { withRouter } from 'react-router-dom';
import { IMAGES } from '../../constants';

const { Title } = Typography;

const HomeContent = ({ history }) => {
  console.log({ history });
  return (
    <StyleHomeContent>
      <Title level={2} className='title'>
        Hệ thống giám sát, phát hiện, cảnh báo và xử lý sự số sử dụng UAV
      </Title>
      <Row gutter={20} className='problems'>
        <Col span={6}>
          <Card
            hoverable
            className='card-content'
            onClick={() => history.push('/dashboard')}
            cover={
              <Image
                alt='example'
                height='300px'
                src={IMAGES.forestFires}
              />
            }
          >
            <Meta
              title='Sự cố cháy rừng'
              description='Giải pháp giúp theo dõi khu vực rừng một cách thường xuyên và có thể dự đoán được sự sự cố xảy ra, giúp ngăn chặn và bảo vệ nguồn tài nguyên rừng.'
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            hoverable
            className='card-content'
            onClick={() => history.push('/dashboard')}
            cover={
              <Image
                alt='example'
                height='300px'
                src={IMAGES.dike}
              />
            }
          >
            <Meta
              title='Sự cố đê điều'
              description='Giám sát và đảm bảo chất lượng cho hệ thống đê điều một cách chặt chẽ, hạn chế tối đa khả năng xảy ra sự cố và đưa ra những cảnh báo có thể xảy ra sự cố cũng như theo dõi tình hình khi sự cố đã xảy ra.'
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            hoverable
            className='card-content'
            onClick={() => history.push('/dashboard')}
            cover={
              <Image
                alt='example'
                height='300px'
                src={IMAGES.highVoltageGrid}
              />
            }
          >
            <Meta
              title='Sự cố lưới điện'
              description='Ứng dụng khoa học công nghệ tiên tiến vào việc giám sát và phát hiện sự cố lưới điện và việc sử dụng UAV được xem như giải pháp tốt và hợp lí nhất hiện nay.'
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            hoverable
            className='card-content'
            onClick={() => history.push('/dashboard')}
            cover={
              <Image
                alt='example'
                height='300px'
                src={IMAGES.tree}
              />
            }
          >
            <Meta
              title='Sự cố cây trồng'
              description='Giám sát sử dụng UAV theo dõi cây trồng có thể tiết kiệm một lượng lớn thời gian và công sức nhờ các UAV. Ngoài ra sử dụng UAV để phun thuốc trừ sâu sẽ hiệu quả hơn khi áp dụng với trang trại quy mô lớn, đảm bảo sức khỏe cho người thực hiện.'
            />
          </Card>
        </Col>
      </Row>
    </StyleHomeContent>
  );
};

export default withRouter(HomeContent);
