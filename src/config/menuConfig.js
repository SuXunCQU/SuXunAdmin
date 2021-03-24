const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: 'home', // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: '事件管理',
    key: '/product',
    icon: 'unordered-list',
    // children: [ // 子菜单列表
    //   {
    //     title: '品类管理',
    //     key: '/category',
    //     icon: 'bars'
    //   },
    //   {
    //     title: '商品管理',
    //     key: '/product',
    //     icon: 'tool'
    //   },
    // ]
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
        title: '走失事件统计',
        key: '/charts/bar',
        icon: 'bar-chart'
      },
      {
        title: '行动队员统计',
        key: '/charts/line',
        icon: 'line-chart'
      },
    ]
  },
  {
    title: '角色管理',
    key: '/role',
    icon: 'appstore',
  },
]

export default menuList
