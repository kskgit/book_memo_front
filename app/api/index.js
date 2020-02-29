/* eslint-disable no-throw-literal */
import { apiPut } from '~/api/config';

const BodyOrderStatuses = {
  updateBodyOrderStatus: async (id, paramsData = {}) => {
    const params = paramsData;
    const url = `/api/sys/body_order_statuses/${id}`;
    const response = await apiPut({ url, params });
    if (response.noResponse || response.status !== 200) {
      throw {
        status: response.status,
        message: 'Viewに渡したいエラーメッセージ',
      };
    }
    return response;
  },
};

export { BodyOrderStatuses };