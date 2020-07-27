import api from '~/api';

export default ({}, inject) => {
  inject('api', api);
};