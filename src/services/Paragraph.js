import { paragraph } from './mock.json'

export default {
  get: () => new Promise(resolve => setTimeout(() => resolve(paragraph), 1500)),
}
