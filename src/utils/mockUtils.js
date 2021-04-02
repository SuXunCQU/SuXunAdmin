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
const equipments = ['手机', '急救箱', '搜救工具箱']
const relationship = ['夫妻','父母','子女','亲兄弟姐妹','祖父母','外祖父母','孙子女','外孙子女','儿媳','公婆','女婿','岳父母'];
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
    relationship: () => {
        return Random.pick(relationship, 1);
    },
})

// 1.走失者信息表 start
const lost_data = Mock.mock({
    'items|10': [{
        // 自增id
        'lost_id|+1': 1,
        // 姓名
        'lost_name': '@cname',
        // 性别
        'lost_gender|1': ['男', '女'],
        // 年龄
        'lost_age|10-100': 21,
        // 身份证号码
        'lost_identification': '@id',
        // 是否患有精神类疾病
        'lost_isPsycho|1': true,
        // 患病情况
        'lost_psycho_condition': '@csentence',
        // 走失时间
        'lost_time': '@datetime("yyyy-MM-dd H:mm")',
        // 走失地点
        'lost_location': '@county(true)',
        // 走失者外表特征
        'lost_appearance': '@csentence',
        // 走失者常去地点
        'lost_latilong|0-5': [['@float(-180, 180)', '@float(-90, 90)']],
        // 走失者照片
        'lost_photo|0-9': ['@url'],
        // 报失者姓名
        'reporter_name': '@cname',
        // 报失者性别
        'reporter_gender|1': ['男', '女'],
        // 报失者年龄
        'reporter_age|10-100': 21,
        // 报失者身份证号码
        'reporter_identification': '@id',
        // 报失者身份证照片
        'reporter_id_photo|2': ['@url'],
        // 关系
        'lost_relationship': '@relationship',
        // 报失者家庭住址
        'reporter_address': '@county(true)',
        // 联系电话
        'reporter_phone': '@integer(15)',
        // 微信联系方式：以wxid为例
        'reporter_wxid': '@guid',
    }]
})
// 1.走失者信息表 end

// 2.队员信息表 start
const member_data = Mock.mock({
    'items|30': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        // 姓名
        'name': '@cname',
        // 性别
        'gender|1': ['男', '女'],
        // 年龄
        'age|16-60': 21,
        // 身份证号码
        'identification': '@id',
        // 家庭住址
        'address': '@county(true)',
        // 经纬度
        'latilong': ['@float(-180, 180)', '@float(-90, 90)'],
        // 近2小时内的经纬度
        'recent_latilong': ['@float(-180, 180)', '@float(-90, 90)'],
        // 联系电话
        'phone': '@integer(15)',
        // 微信联系方式：以wxid为例
        'wxid': '@guid',
        // 特长
        'hobby': '@hobby',
        // 常用交通方式
        'vehicle': '@vehicle',
        // 救援装备
        'equipment': '@equipment',
        // 个人照片url
        'photo': '@url',
        // 身份证照片url
        'id_photo': '@url',
        // 密码
        'password|6-30': /[a-z]?[A-Z]?[0-9]?/,
        // 是否为管理员
        'admin|1': true,
        // 是否出勤:
        'attendance|1': true,
    }]
})
// 2.队员信息表 end

// 3.任务信息表 start
Random.extend({
    // 走失者信息
    lost_item : () => {
        return Random.pick(lost_data.items, 1)
    }
})
let index = 1;
const mission_data = Mock.mock({
    'items|15':[ () => {
        const item = Mock.mock('@lost_item');
        return {
            'id': index,
            'lost_id': item.lost_id,
            'name': `寻找${item.lost_age}岁老人${item.lost_name}`,
            'level': Math.floor(Math.random() * 16),
            'starttime': Mock.mock('@datetime("yyyy-MM-dd H:mm")'),
            'endtime': Mock.mock('@datetime("yyyy-MM-dd H:mm")'),
            'status': Math.ceil(Math.random() * 3),
            'detail_id': index++,
        }
    }]
})
// 3.任务信息表 end

// 4.行动队员表
const force_data = {
    'items': generateForceItem(mission_data, member_data),
};
// 5.退出任务信息表
const quit_data = {
    'items': generateQuitItem(mission_data, member_data),
};
// 6.线索信息表
const clue_data = {
    'items': generateClueItem(mission_data, member_data),
};
// 7.指令信息表
const order_data = {
    'items': generateOrderItem(mission_data, member_data),
};
// 8.行动暂缓信息表
const postpone_data = {
    'items': generatePostponeItem(mission_data, member_data),
};
// 9.行动完成信息表
const complete_data = {
    'items': generateCompleteItem(mission_data, member_data),
};
// 10.对话消息信息表
const dialog_data = {
    'items': generateDialogItem(mission_data, member_data),
}

export {
    lost_data,
    member_data,
    mission_data, force_data, quit_data, clue_data, order_data, postpone_data, complete_data, dialog_data};

// 4.1 生成行动队员表信息 start
function generateForceItem(mission_data, member_data){
    const mission_items = mission_data.items;
    const mission_items_length = mission_items.length;
    const results = [];
    const member_id_list = getValueList(member_data, "id");
    let index = 1;
    for(let i = 0; i < mission_items_length; i++){
        let random_list = Random.pick(member_id_list, 1, member_id_list.length);
        random_list.sort(compareFromSmallToLarge);
        let size = random_list.length;
        for(let j = 0; j < size; j++, index++){
            results.push({
                'id': index,
                'mission_id': i,
                'member_id': random_list[j]
            });
        }
    }
    return results;
}
// 4.1 生成行动队员表信息 end

// 5.1 生成退出任务申请信息 start
function generateQuitItem(mission_data, member_data){
    const mission_items = mission_data.items;
    const mission_items_length = mission_items.length;
    const results = [];
    const member_id_list = getValueList(member_data, "id");
    let index = 1;
    for(let i = 0; i < mission_items_length; i++){
        let random_list = Random.pick(member_id_list, 1, member_id_list.length);
        random_list.sort(compareFromSmallToLarge);
        let size = random_list.length;
        for(let j = 0; j < size; j++, index++){
            results.push({
                'id': index,
                'mission_id': i,
                'member_id': random_list[j],
                'reason': Mock.mock('@csentence'),
                'apply_time': Mock.mock('@datetime("yyyy-MM-dd H:mm")')
            });
        }
    }
    return results;
}
// 5.1 生成退出任务申请信息 end

// 6.1 生成线索信息 start
function generateClueItem(mission_data, member_data){
    const mission_items = mission_data.items;
    const mission_items_length = mission_items.length;
    const results = [];
    const member_id_list = getValueList(member_data, "id");
    let index = 1;
    for(let i = 0; i < mission_items_length; i++){
        let random_list = Random.pick(member_id_list, 1, member_id_list.length);
        random_list.sort(compareFromSmallToLarge);
        let size = random_list.length;
        for(let j = 0; j < size; j++, index++){
            results.push(Mock.mock({
                'id': index,
                'mission_id': i,
                'member_id': random_list[j],
                'text': '@csentence',
                'photo': '@url',
                'video': '@url',
                'post_time': '@datetime("yyyy-MM-dd H:mm")',
                'post_location': ['@float(-180, 180)', '@float(-90, 90)'],
                'type|0-2': 1,
                'call_dependent|1': true,
            }));
        }
    }
    return results;
}
// 6.1 生成线索信息 end

// 7.1 生成指令信息 start
function generateOrderItem(mission_data, member_data){
    const mission_items = mission_data.items;
    const mission_items_length = mission_items.length;
    const results = [];
    const member_id_list = getValueList(member_data, "id");
    let index = 1;
    for(let i = 0; i < mission_items_length; i++){
        let random_list = Random.pick(member_id_list, 1, member_id_list.length);
        random_list.sort(compareFromSmallToLarge);
        let size = random_list.length;
        for(let j = 0; j < size; j++, index++){
            results.push(Mock.mock({
                'id': index,
                'mission_id': i,
                'member_id': random_list[j],
                'text': '@csentence',
                'photo': '@url',
                'video': '@url',
                'post_time': '@datetime("yyyy-MM-dd H:mm")',
                'post_location': ['@float(-180, 180)', '@float(-90, 90)'],
            }));
        }
    }
    return results;
}
// 7.1 生成指令信息 end

// 8.1 生成行动暂缓信息 start
function generatePostponeItem(mission_data, member_data){
    const mission_items = mission_data.items;
    const mission_items_length = mission_items.length;
    const results = [];
    const member_id_list = getValueList(member_data, "id");
    let index = 1;
    for(let i = 0; i < mission_items_length; i++){
        let random_list = Random.pick(member_id_list, 1, member_id_list.length);
        random_list.sort(compareFromSmallToLarge);
        let size = random_list.length;
        for(let j = 0; j < size; j++, index++){
            results.push(Mock.mock({
                'id': index,
                'mission_id': i,
                'member_id': random_list[j],
                'reason': '@csentence',
                'apply_time': '@datetime("yyyy-MM-dd H:mm")',
            }));
        }
    }
    return results;
}
// 8.1 生成行动暂缓信息 end


// 9.1 生成行动完成信息 start
function generateCompleteItem(mission_data, member_data){
    const mission_items = mission_data.items;
    const mission_items_length = mission_items.length;
    const results = [];
    const member_id_list = getValueList(member_data, "id");
    let index = 1;
    for(let i = 0; i < mission_items_length; i++){
        let random_list = Random.pick(member_id_list, 1, member_id_list.length);
        random_list.sort(compareFromSmallToLarge);
        let size = random_list.length;
        for(let j = 0; j < size; j++, index++){
            results.push(Mock.mock({
                'id': index,
                'mission_id': i,
                'member_id': random_list[j],
                'comfirm_photo': '@url',
                'group_photo': '@url',
                'location': ['@float(-180, 180)', '@float(-90, 90)'],
                'apply_time': '@datetime("yyyy-MM-dd H:mm")',
            }));
        }
    }
    return results;
}
// 9.1 生成行动完成信息 end

// 10.1 生成对话消息信息 start
function generateDialogItem(mission_data, member_data){
    const mission_items = mission_data.items;
    const mission_items_length = mission_items.length;
    const results = [];
    const member_id_list = getValueList(member_data, "id");
    let index = 1;
    for(let i = 0; i < mission_items_length; i++){
        let random_list = Random.pick(member_id_list, 1, member_id_list.length);
        random_list.sort(compareFromSmallToLarge);
        let size = random_list.length;
        for(let j = 0; j < size; j++, index++){
            let item = Mock.mock({
                'id': index,
                'mission_id': i,
                'member_id': random_list[j],
                'type|1': ['text', 'url'],
            })
            if(item.type === "url")
                item.content = Mock.mock('@csentence');
            else if(item.type === "text")
                item.content = Mock.mock('@url');
            item.status = Mock.mock('@boolean');
            item.time = Mock.mock('@datetime("yyyy-MM-dd H:mm")');
            results.push(item);
        }
    }
    return results;
}
// 10.1 生成对话消息信息 end



// 工具函数
function getValueList(src, key) {
    const items = src.items;
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
