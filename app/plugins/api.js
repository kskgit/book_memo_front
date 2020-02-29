import api from '~/api';

export default (_, inject) => {
  inject('api', api);
};