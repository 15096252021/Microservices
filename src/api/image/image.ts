import request from '@/request/imageRequest';
import qs from 'qs';

export function getBlobImageByte(data?: any) {
  return request({
    url: '/File/ShowImages?filePath=' + data,
    method: 'get',
    data: qs.stringify(data),
  });
}
