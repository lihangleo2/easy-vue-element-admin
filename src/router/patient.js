import PatientMessage from '../views/patient/patientMessage.vue'
import PatientMessageEditor from '../views/patient/patientMessageEditor.vue'
import PatientManager from '../views/patient/patientManager.vue'

export default [
  {
    path: '/patientMessage',
    name: 'PatientMessage',
    component: PatientMessage,
    meta: {
      name: '患者信息',
      parentPath: [
        { parentUrl: '', parentName: '患者' },
      ],
      index: 0
    }
  },
  {
    path: '/patientManager',
    name: 'PatientManager',
    component: PatientManager,
    meta: {
      name: '患者管理',
      parentPath: [
        { parentUrl: '', parentName: '患者' },
      ],
      index: 0
    }
  },
  {
    path: '/patientMessageEditor',
    name: 'PatientMessageEditor',
    component: PatientMessageEditor,
    meta: {
      name: '患者信息编辑',
      parentPath: [
        { parentUrl: '', parentName: '患者' },
        { parentUrl: '/patientMessage', parentName: '患者信息' },
      ],
      index: 1
    }
    
  }
]