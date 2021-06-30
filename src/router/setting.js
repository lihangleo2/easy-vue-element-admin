import Setting from '../views/setting/setting.vue'

export default [
  {
    path: '/setting',
    name: 'Setting',
    component: Setting,
    meta: {
      name: '设置',
      parentPath: [
        { parentUrl: '', parentName: '设置' },
      ],
      index: 0
    }
  },
  
]