// 使用 Mock
const Mock = require('mockjs');

const Random = Mock.Random;
Random.cname(); // 中文姓名
Random.id(); // 身份证
Random.county(); // 真实地址
Random.float(); // 经纬度
Random.integer(); // 电话
Random.guid(); // 微信id
Random.url(); // 照片url
Random.csentence(); // 文字情况
Random.datetime(); // 走失时间

const hobbies = ['篮球', '足球', '羽毛球', '跑步', '游泳', '阅读', '远足', 'DIY', '擅长沟通', '善于交际', '组织能力强', '有领导意识'];
const vehicles = ['驾车', '公共交通', '骑行', '步行', '其他'];
const equipments = ['手机', '急救箱', '搜救工具箱'];
const relation = ['夫妻','父母','子女','亲兄弟姐妹','祖父母','外祖父母','孙子女','外孙子女','儿媳','公婆','女婿','岳父母'];
const roles = ['管理员', '指挥员', '分队长', '小队长'];
const authorities = [
    ['首页', '事件管理', '队员管理', '任务管理', '数据统计', '任务统计', '队员统计', '角色管理'],
    ['首页', '事件管理', '队员管理', '任务管理', '数据统计', '任务统计', '队员统计'],
    ['首页', '事件管理', '队员管理', '任务管理'],
    ['首页'],
];
const quit_reason = [
    '时间太长', '任务达到上限，需要先接别的任务', '要去其他城市了', '没时间做了', '无理由', '不想再继续了'
];
const pause_reason = [
    '搜寻时间过长', '投入的人力物力财力已经远超预期', '其他理由'
];

const incident_mock_data =
[
    {
        "lost_name": "张春芳",
        "lost_gender": "女",
        "lost_age": 55,
        "lost_time": 1189699200000,
        "lost_place": "安徽省阜阳市太和县健康路",
        "lost_appearance": "160厘米 ",
        "lost_frequent_place": "",
        "reporter_phone": "",
        "reporter_wechat": ""
    },
    {
        "lost_name": "陈珏",
        "lost_gender": "女",
        "lost_age": 56,
        "lost_time": 1220371200000,
        "lost_place": "武汉市武昌区锅炉厂",
        "lost_appearance": "1.58米  ，上身绿色短袖下身西装裤，脚上穿的拖鞋 ，长相大眼睛双眼皮，头发披肩长发，四方脸，有间歇性的精神分裂症，说话逻辑不清。  ",
        "lost_frequent_place": "",
        "reporter_phone": "",
        "reporter_wechat": ""
    },
    {
        "lost_name": "钟柏安",
        "lost_gender": "男",
        "lost_age": 21,
        "lost_time": 1514304000000,
        "lost_place": "广东省中山市横栏镇",
        "lost_appearance": "160厘米，上身中山装，黑裤，黄色解放鞋 ，略有驼背，头发全白，长有胡须，操江西萍乡口音，老人精神异常，不喜欢说话，此前也曾走失过。此次是出门散步时走失",
        "lost_frequent_place": "老家在江西省萍乡市",
        "reporter_phone": "",
        "reporter_wechat": ""
    },
    {
        "lost_name": "谢寿林",
        "lost_gender": "男",
        "lost_age": 52,
        "lost_time": 1553529600000,
        "lost_place": "",
        "lost_appearance": "蓝色中山装，纽扣掉光，黑色裤子，棉鞋",
        "lost_frequent_place": "",
        "reporter_phone": 13512571545,
        "reporter_wechat": "QQ:52820553"
    },
    {
        "lost_name": "徐海豹",
        "lost_gender": "男",
        "lost_age": 58,
        "lost_time": 1056384000000,
        "lost_place": "河北衡水市",
        "lost_appearance": "1.76米，上身白衬衣，下身深色或者蓝色裤子，用普通话夹杂河北省深州市地方口音，因夫妻怄气离家出走至今未有消息，职业销售眼睛镜，左后背胛骨有一块青色胎记",
        "lost_frequent_place": "深圳市或河北周边地区",
        "reporter_phone": "",
        "reporter_wechat": ""
    },
    {
        "lost_name": "陆海军",
        "lost_gender": "男",
        "lost_age": 52,
        "lost_time": 699379200000,
        "lost_place": "如皋市下原镇文南村6组(现邹庄村18组)",
        "lost_appearance": "170cm",
        "lost_frequent_place": " ",
        "reporter_phone": "",
        "reporter_wechat": ""
    },
    {
        "lost_name": "田金涛",
        "lost_gender": "男",
        "lost_age": 53,
        "lost_time": 1211731200000,
        "lost_place": "河北省沧州市任丘市林庄",
        "lost_appearance": "170cm，好看小说，嘴唇略厚，性格腼腆",
        "lost_frequent_place": "河南周边",
        "reporter_phone": "",
        "reporter_wechat": ""
    },
    {
        "lost_name": "梁先生",
        "lost_gender": "男",
        "lost_age": 54,
        "lost_time": 1589472000000,
        "lost_place": "河北省保定市定兴县",
        "lost_appearance": "180厘米，浅白色衣服",
        "lost_frequent_place": "",
        "reporter_phone": "",
        "reporter_wechat": ""
    },
    {
        "lost_name": "杜光英",
        "lost_gender": "女",
        "lost_age": 60,
        "lost_time": 852048000000,
        "lost_place": "四川达州渠县",
        "lost_appearance": "1.6米左右，蓝色上衣，人很笨，头脑时不时不清醒",
        "lost_frequent_place": "渠县城南",
        "reporter_phone": "",
        "reporter_wechat": ""
    },
    {
        "lost_name": "任继德",
        "lost_gender": "男",
        "lost_age": 42,
        "lost_time": 1591459200000,
        "lost_place": "山西省阳高县",
        "lost_appearance": "1.78米，白加黑格半袖衫，黑蓝裤子白色网状旅游鞋，有抑郁症，走的时候清醒，没带药。爱好看书。",
        "lost_frequent_place": "6月12日8点32分45秒出现在北京西站",
        "reporter_phone": "",
        "reporter_wechat": ""
    },
    {
        "lost_name": "李如意",
        "lost_gender": "男",
        "lost_age": 28,
        "lost_time": 1496246400000,
        "lost_place": "江苏省相城区",
        "lost_appearance": "172厘米，2015年河南中医学院毕业，性格内向",
        "lost_frequent_place": " ",
        "reporter_phone": "",
        "reporter_wechat": ""
    },
    {
        "lost_name": "张雨欣",
        "lost_gender": "女",
        "lost_age": 25,
        "lost_time": 1593532800000,
        "lost_place": "江苏省苏州市虎丘区何山路",
        "lost_appearance": "165厘米",
        "lost_frequent_place": "苏州市虎丘区何山路",
        "reporter_phone": "",
        "reporter_wechat": ""
    },
    {
        "lost_name": "杨贵芝",
        "lost_gender": "女",
        "lost_age": 49,
        "lost_time": 685555200000,
        "lost_place": " 山东省枣庄市山亭区桑村镇盘石沟村",
        "lost_appearance": "151厘米",
        "lost_frequent_place": "贵州省毕节市织金县",
        "reporter_phone": "",
        "reporter_wechat": ""
    },
    {
        "lost_name": "胡勇",
        "lost_gender": "男",
        "lost_age": 61,
        "lost_time": 946656000000,
        "lost_place": "",
        "lost_appearance": "172厘米",
        "lost_frequent_place": "",
        "reporter_phone": 18021837993,
        "reporter_wechat": "QQ:52820553"
    }
]


Random.extend({
    // 爱好
    hobby: () => {
        return Random.pick(hobbies, 1, hobbies.length);
    },
    // 常用交通方式
    vehicle: () => {
        return Random.pick(vehicles, 1, vehicles.length);
    },
    // 救援工具
    equipment: () => {
        return Random.pick(equipments, 1, equipments.length);
    },
    // 关系
    relation: () => {
        return Random.pick(relation, 1);
    },
    // 电话号码
    phone_number: () => {
        const head = Random.integer(100, 199).toString();
        const content = Random.string('number', 8);
        return head + content;
    },
    role: () => {
        return Random.pick(roles, 1, roles.length);
    },
    quit_reason: () => {
        return Random.pick(quit_reason, 1, 1);
    },
    pause_reason: () => {
        return Random.pick(pause_reason, 1, 1);
    }
})

// 1.走失事件信息表 start
// const incident_data = Mock.mock({
//     'items|10': [{
//         // 自增id
//         'incident_id|+1': 1,
//         // 姓名
//         'lost_name': '@cname',
//         // 性别
//         'lost_gender|0-1': 0,
//         // 年龄
//         'lost_age|10-100': 21,
//         // 走失时间
//         'lost_time': '@datetime("yyyy-MM-dd H:mm")',
//         // 走失地点
//         'lost_place': '@county(true)',
//         // 身份证号码
//         'lost_idcard_number': '@id',
//         // 走失者外表特征
//         // todo 需要爬取更加真实的数据从中抽取
//         'lost_appearance': '@csentence',
//         // 走失者常去地点
//         'lost_frequent_place|0-5': [['@float(-180, 180)', '@float(-90, 90)']],
//         // 走失者照片
//         'lost_photo|0-9': ['@url'],
//         // 报失者姓名
//         'reporter_name': '@cname',
//         // 报失者性别
//         'reporter_gender|0-1': 0,
//         // 联系电话
//         'reporter_phone': '@phone_number',
//         // 身份证号码
//         'lost_idcard_number': '@id',
//         // 报失者身份证照片
//         'reporter_idcard_photo|2': ['@url'],
//         // 关系
//         'relation': '@relation',
//         // 报失者家庭住址
//         'reporter_address': '@county(true)',
//         // 微信联系方式：以wxid为例
//         'reporter_wechat': '@guid',
//         // 是否开始
//         'is_start': '@boolean',
//     }]
// })
const incident_data = {
    'items': generateIncidentItem(incident_mock_data),
}

// 1.走失者信息表 end

// 2.队员信息表 start
const member_data = Mock.mock({
    'items|30': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'member_id|+1': 1,
        // 姓名
        'member_name': '@cname',
        // 性别
        'member_gender|1': ['男', '女'],
        // 年龄
        'member_age|16-60': 21,
        // 家庭住址
        'member_address': '@county(true)',
        // 家庭住址坐标
        'member_location': ['@float(-180, 180)', '@float(-90, 90)'],
        // 当前位置
        'current_pos': ['@float(-180, 180)', '@float(-90, 90)'],
        // 联系电话
        'member_phone': '@phone_number',
        // 微信联系方式：以wxid为例
        'member_wechat': '@guid',
        // 身份证号码
        'member_idcard_number': '@id',
        // 特长
        'member_strength': '@hobby',
        // 救援装备
        'member_equipment': '@equipment',
        // 常用交通方式
        'member_transportType': '@vehicle',
        // 个人照片url
        'member_photo': '@url',
        // 身份证照片url
        'member_idcard_photo': '@url',
        // 密码
        'password|6-30': /[a-z]?[A-Z]?[0-9]?/,
        // 角色id
        'role_id': '@integer(20)',
        // 是否出勤:
        'is_work|1': true,
    }]
})
// 2.队员信息表 end

// 3.队员角色表 start
const role_data = {
    'items': generateRoleItem(member_data)
}
// 3.队员角色表 end

// 4.任务信息表 start
Random.extend({
    // 走失者信息
    incident_item : () => {
        return Random.pick(incident_data.items, 1)
    }
})
let index = 1;
const task_data = Mock.mock({
    'items|15':[ () => {
        const item = Mock.mock('@incident_item');
        const start_timestamp = Mock.Random.integer(1000000000000, 1700000000000);
        const end_timestamp = start_timestamp + Mock.Random.integer(10000000, 1000000000);
        const start_time = new Date(start_timestamp).toLocaleString();
        const end_time = new Date(end_timestamp).toLocaleString();
        return {
            'task_id': index,
            'incident_id': item.incident_id,
            'task_name': `寻找${item.lost_age}岁${item.lost_name}`,
            'task_level': Math.floor(Math.random() * 16),
            'start_time': start_time,
            'start_timestamp': start_timestamp,
            'end_time': end_time,
            'status': Math.ceil(Math.random() * 3),
            'description_id': index++,
        }
    }]
})
// 4.任务信息表 end

// 5.行动队员表
const force_data = {
    'items': generateForceItem(task_data, member_data),
};
// 6.退出任务信息表
const quit_data = {
    'items': generateQuitItem(task_data, member_data),
};
// 7.线索信息表
const clue_data = {
    'items': generateClueItem(task_data, member_data),
};
// 8.指令信息表
const order_data = {
    'items': generateOrderItem(task_data, member_data),
};
// 9.行动暂缓信息表
const postpone_data = {
    'items': generatePostponeItem(task_data, member_data),
};
// 10.行动完成信息表
const complete_data = {
    'items': generateCompleteItem(task_data, member_data),
};


// 1.1 生成走失事件信息表
function generateIncidentItem(incident_mock_data){
    const size = incident_mock_data.length;
    for(let i = 0; i < size; i++){
        let item = incident_mock_data[i];
        item.lost_gender = item.lost_gender === "男" ? 1 : 0;
        if(!item.lost_place)
            item.lost_place = Random.county(true);
        if(!item.reporter_phone)
            item.reporter_phone = Mock.mock("@phone_number");
        if(!item.reporter_wechat)
            item.reporter_wechat = Mock.mock('@guid');
        item.incident_id = i;
        item.lost_time = new Date(item.lost_time).toLocaleString();
        item.lost_idcard_number = Random.id();
        item.lost_phone = Random.url();
        item.reporter_name = Random.cname();
        item.reporter_gender = Random.boolean();
        item.reporter_idcard_number = Random.id();
        item.reporter_idcard_photo = [Random.url(), Random.url()];
        item.relation = Mock.mock('@relation');
        item.reporter_address = Random.county(true);
        item.is_start = Random.boolean();
    }
    return incident_mock_data;
}
// 1.1 生成走失事件信息表

// 3.1 生成队员角色表 start
function generateRoleItem(member_data){
    const member_items = member_data.items;
    const member_items_length = member_items.length;
    const results = [];
    for(let i = 0; i < 4; i++){
        const member_item = Random.pick(member_items, 1, 1);
        const create_timestamp = Mock.Random.integer(1000000000000, 1700000000000);
        const authorize_timestamp = create_timestamp + Mock.Random.integer(1000000000, 10000000000);
        const create_time = new Date(create_timestamp).toLocaleString();
        const authorize_time = new Date(authorize_timestamp).toLocaleString();
        results.push({
            'role_id': i,
            'role_name': roles[i],
            'role_authority': authorities[i].join(","),
            'role_create_time': create_time,
            'authorize_time': authorize_time,
            'authorize_member_id': i == 0 ? 1 : member_item.member_id
        })
    }
    return results;

}
// 3.1 生成队员角色表 end

// 5.1 生成行动队员表信息 start
function generateForceItem(task_data, member_data){
    const task_items = task_data.items;
    const task_items_length = task_items.length;
    const results = [];
    const member_id_list = getValueList(member_data, "id");
    let index = 1;
    for(let i = 0; i < task_items_length; i++){
        let random_list = Random.pick(member_id_list, 1, member_id_list.length);
        random_list.sort(compareFromSmallToLarge);
        let size = random_list.length;
        for(let j = 0; j < size; j++, index++){
            results.push({
                'id': index,
                'task_id': i,
                'member_id': random_list[j],
                'group_id': Random.integer(0, 100),
                'location_list': [

                ]
            });
        }
    }
    return results;
}
// 5.1 生成行动队员表信息 end

// 6.1 生成退出任务申请信息 start
function generateQuitItem(task_data, member_data){
    const task_items = task_data.items;
    const task_items_length = task_items.length;
    const results = [];
    const member_id_list = getValueList(member_data, "id");
    let index = 1;
    for(let i = 0; i < task_items_length; i++){
        let random_list = Random.pick(member_id_list, 1, member_id_list.length);
        random_list.sort(compareFromSmallToLarge);
        let size = random_list.length;
        for(let j = 0; j < size; j++, index++){
            const timestamp = new Date(task_items[i].start_time).getTime() + Mock.Random.integer(10000000, 1000000000);
            const time = new Date(timestamp).toLocaleString();
            results.push({
                'apply_id': index,
                'task_id': i,
                'member_id': random_list[j],
                'reason': Mock.mock('@quit_reason'),
                'status': Mock.Random.boolean(),
                'apply_time': time
            });
        }
    }
    return results;
}
// 6.1 生成退出任务申请信息 end

// 7.1 生成线索信息 start
function generateClueItem(task_data, member_data){
    const task_items = task_data.items;
    const task_items_length = task_items.length;
    const results = [];
    const member_id_list = getValueList(member_data, "id");
    let index = 1;
    for(let i = 0; i < task_items_length; i++){
        let random_list = Random.pick(member_id_list, 1, member_id_list.length);
        random_list.sort(compareFromSmallToLarge);
        let size = random_list.length;
        for(let j = 0; j < size; j++, index++){
            const timestamp = task_items[i].start_timestamp+ Mock.Random.integer(10000000, 1000000000);
            const time = new Date(timestamp).toLocaleString();
            results.push(Mock.mock({
                'clue_id': index,
                'task_id': i,
                'member_id': random_list[j],
                'text': '@csentence',
                'photo': '@url',
                'video': '@url',
                'post_time': time,
                'post_location': ['@float(-180, 180)', '@float(-90, 90)'],
                'type|0-2': 1,
                'is_noticed': Random.boolean(),
            }));
        }
    }
    return results;
}
// 7.1 生成线索信息 end

// 8.1 生成指令信息 start
function generateOrderItem(task_data, member_data){
    const task_items = task_data.items;
    const task_items_length = task_items.length;
    const results = [];
    const member_id_list = getValueList(member_data, "id");
    let index = 1;
    for(let i = 0; i < task_items_length; i++){
        let random_list = Random.pick(member_id_list, 1, member_id_list.length);
        random_list.sort(compareFromSmallToLarge);
        let size = random_list.length;
        for(let j = 0; j < size; j++, index++){
            const timestamp = task_items[i].start_timestamp + Mock.Random.integer(10000000, 1000000000);
            const time = new Date(timestamp).toLocaleString();
            results.push(Mock.mock({
                'order_id': index,
                'task_id': i,
                'member_id': random_list[j],
                'text': '@csentence',
                'photo': '@url',
                'video': '@url',
                'time': time,
                'location': ['@float(-180, 180)', '@float(-90, 90)'],
            }));
        }
    }
    return results;
}
// 8.1 生成指令信息 end

// 9.1 生成行动暂缓信息 start
function generatePostponeItem(task_data, member_data){
    const task_items = task_data.items;
    const task_items_length = task_items.length;
    const results = [];
    const member_id_list = getValueList(member_data, "member_id");
    for(let i = 0; i < task_items_length; i++){
        let random_list = Random.pick(member_id_list, 1, member_id_list.length);
        random_list.sort(compareFromSmallToLarge);
        const timestamp = task_items[i].start_timestamp+ Mock.Random.integer(10000000, 1000000000);
        const time = new Date(timestamp).toLocaleString();
        results.push(Mock.mock({
            'pause_id': i,
            'task_id': i,
            'member_id': random_list[Random.integer(0, random_list.length)],
            'reason': '@pause_reason',
            'signature_photo': '@url',
            'time': time,
            'status': Random.boolean(),
        }));
    }
    return results;
}
// 9.1 生成行动暂缓信息 end


// 10.1 生成行动完成信息 start
function generateCompleteItem(task_data, member_data){
    const task_items = task_data.items;
    const task_items_length = task_items.length;
    const results = [];
    const member_id_list = getValueList(member_data, "member_id");
    let index = 1;
    for(let i = 0; i < task_items_length; i++){
        let random_list = Random.pick(member_id_list, 1, member_id_list.length);
        random_list.sort(compareFromSmallToLarge);
        const timestamp = task_items[i].start_timestamp + Mock.Random.integer(10000000, 1000000000);
        const time = new Date(timestamp).toLocaleString();
        results.push({
            'finish_id': i,
            'task_id': i,
            'member_id': random_list[Random.integer(0, random_list.length)],
            'certificate_photo': Random.url(),
            'group_photo': Random.url(),
            'location': [Random.float(-180, 180), Random.float(-90, 90)],
            'time': time,
            'status': Random.boolean(),
        });
    }
    return results;
}
// 10.1 生成行动完成信息 end

// 工具函数
function getValueList(src, key) {
    const items = src.items;
    // console.log(items);
    if(items.length === 0)
        return;
    const results = [];
    for(let i = 0; i < items.length; i++){
        results.push(items[i][key]);
    }
    return results;
}

function compareFromSmallToLarge(value1, value2) {
    if (value1 < value2) {
        return -1;
    }
    else if (value1 > value2) {
        return 1;
    }
    else {
        return 0;
    }
}


export {
    incident_data,
    member_data, role_data,
    task_data, force_data, quit_data, clue_data, order_data, postpone_data, complete_data
};

// console.log(JSON.stringify(complete_data, null, 5));
// console.log(new Date("2000/1/1").getTime());
