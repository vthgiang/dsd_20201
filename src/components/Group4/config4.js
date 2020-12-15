import { PUBLIC_URL } from '../../configs';

      /*loại đối tượng : 
      1: drone,
      2: payload, 
      3: User,
      4: Image/ video,
      5: đối tượng giám sát,
      6: Báo cáo thống kê,
      7: Miền giám sát,
      8: công việc xử lý sự cố,
      9: flight hub,
      10: sự cố lưới điện,
      11: sự cố cây trồng,
      12: sự cố cháy rừng,
      13: sự cố đê điều
      */

const ref = {
    prop: {
        1: {name: 'Drone', value: 1, img: `${PUBLIC_URL}/images/drone.png`},
        2: {name: 'Payload', value: 2, img: `${PUBLIC_URL}/images/payload.png`},
        3: {name: 'User', value: 3, img: `${PUBLIC_URL}/images/user.png`},
        4: {name: 'Image/Video', value: 4, img: `${PUBLIC_URL}/images/image-video.png`},
        5: {name: 'Đối tượng giám sát', value: 5, img: `${PUBLIC_URL}/images/object.png`},
        6: {name: 'Báo cáo thống kê', value: 6, img: `${PUBLIC_URL}/images/baocao.jpg`},
        7: {name: 'Miền giám sát', value: 7, img: `${PUBLIC_URL}/images/area.png`},
        8: {name: 'Công việc xử lý sự cố', value: 8, img: `${PUBLIC_URL}/images/incident.jpg`},
        9: {name: 'Flighthub', value: 9, img: `${PUBLIC_URL}/images/flighthub.jpg`},
        10: {name: 'Sư cố lưới điện', value: 1, img: `${PUBLIC_URL}/images/dike.jpg`},
        11: {name: 'Sư cố cây trồng', value: 1, img: `${PUBLIC_URL}/images/tree.jpg`},
        12: {name: 'Sư cố cháy rừng', value: 1, img: `${PUBLIC_URL}/images/forest_fires.jpg`},
        13: {name: 'Sư cố đê điều', value: 1, img: `${PUBLIC_URL}/images/dike.jpg`},
    }
}

const PROJECT_TYPE_MAP_TITLE = {
  'CHAY_RUNG': 'sự cố cháy rừng',
  'DE_DIEU': 'sự cố đê điều',
  'CAY_TRONG': 'sự cố cây trồng',
  'LUOI_DIEN': 'sự cố lưới điện'
}

export {ref, PROJECT_TYPE_MAP_TITLE};