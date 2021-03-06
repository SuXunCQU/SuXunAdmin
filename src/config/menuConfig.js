const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: 'home', // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: '事件管理',
    key: '/incident',
    icon: 'unordered-list',
  },

  {
    title: '队员管理',
    key: '/user',
    icon: 'user'
  },
  {
    title: '任务管理',
    key: '/task',
    icon: 'safety',
  },

  {
    title: '数据统计',
    key: '/charts',
    icon: 'area-chart',
    children: [
      {
        title: '事件统计',
        key: '/charts/incidentStats',
        icon: 'bar-chart'
      },
      {
        title: '任务统计',
        key: '/charts/taskStats',
        icon: 'line-chart'
      },
    ]
  },
  {
    title: '人脸比对',
    key: '/faceCompare',
    icon: 'smile',
  },
  {
    title: '启动标准',
    key: '/startStandard',
    icon: 'clock-circle',
  },
  {
    title: '角色管理',
    key: '/role',
    icon: 'appstore',
  },
]

export default menuList
