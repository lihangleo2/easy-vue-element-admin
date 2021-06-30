import RecoverPlan from '../views/recover/recoverPlan.vue'
import RecoverRecord from '../views/recover/recoverRecord.vue'

export default [
  {
    path: '/recoverPlan',
    name: 'RecoverPlan',
    component: RecoverPlan,
    meta: {
      name: '康复方案',
      parentPath: [
        { parentUrl: '', parentName: '康复' },
      ],
      index: 0
    }
  },
  {
    path: '/recoverRecord',
    name: 'RecoverRecord',
    component: RecoverRecord,
    meta: {
      name: '康复记录',
      parentPath: [
        { parentUrl: '', parentName: '康复' },
      ],
      index: 0
    }
  }
]