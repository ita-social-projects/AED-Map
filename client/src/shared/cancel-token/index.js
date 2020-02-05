import axios from 'axios';

export default () => ({
  instance: null,
  cancel() {
    if (this.instance) this.instance.cancel();
    this.instance = axios.CancelToken.source();
  }
});
