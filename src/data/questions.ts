type DestinyKey = 'STRATEGIST' | 'HOTBLOOD' | 'COWARD' | 'UNDERDOG' | 'SLACKER' | 'YANDERE' | 'CHOSEN_ONE' | 'VILLAIN'

interface QuestionOption {
  text: string
  scores: Partial<Record<DestinyKey, number>>
}

export interface Question {
  id: string
  scene: string
  options: QuestionOption[]
}

export const questions: Question[] = [
  {
    id: 'q1',
    scene: '你穿越到了修仙世界，醒来发现自己在宗门大比的擂台上，对面是筑基期高手，你只是练气期菜鸟——但你必须上场',
    options: [
      {
        text: '先鞠躬认输，等对方转身时悄悄溜下擂台',
        scores: { COWARD: 3 },
      },
      {
        text: '管他什么境界！先出一拳再说，气势不能输！',
        scores: { HOTBLOOD: 3 },
      },
      {
        text: '上场前就已经在擂台布了三重阵法，等对方自己踩进来',
        scores: { STRATEGIST: 3 },
      },
      {
        text: '深吸一口气，摆出认真的架势——输赢不重要，重在参与',
        scores: { UNDERDOG: 3 },
      },
    ],
  },
  {
    id: 'q2',
    scene: '你获得了一个金手指，选哪个？',
    options: [
      {
        text: '命运之眼——能看到所有人的命数和弱点',
        scores: { STRATEGIST: 3 },
      },
      {
        text: '不灭战魂——越打越强，永远不会倒下',
        scores: { HOTBLOOD: 3 },
      },
      {
        text: '气运加身——出门就能捡到宝，修炼事半功倍',
        scores: { CHOSEN_ONE: 3 },
      },
      {
        text: '执念锁链——你锁定的人永远逃不出你的感知',
        scores: { YANDERE: 3 },
      },
    ],
  },
  {
    id: 'q3',
    scene: '宗门里你最信任的人背叛了你，你？',
    options: [
      {
        text: '从此不再相信任何人，只信自己',
        scores: { YANDERE: 3 },
      },
      {
        text: '卧薪尝胆，总有一天要让他后悔',
        scores: { UNDERDOG: 3 },
      },
      {
        text: '早就防着这一天了，后手已经准备好',
        scores: { STRATEGIST: 3 },
      },
      {
        text: '无所谓，换个宗门继续修仙，在哪不是修',
        scores: { SLACKER: 3 },
      },
    ],
  },
  {
    id: 'q4',
    scene: '秘境里你和另一名修士同时发现了一件上古神器，谁先拿到归谁，你？',
    options: [
      {
        text: '先观察对方实力，比自己强就假装没看见',
        scores: { COWARD: 3 },
      },
      {
        text: '直接冲过去抢！先拿到再说！',
        scores: { HOTBLOOD: 3 },
      },
      {
        text: '跟对方说"这神器有诅咒"，等他犹豫时自己拿',
        scores: { VILLAIN: 3 },
      },
      {
        text: '跟对方合作，神器一人一半，双赢多好',
        scores: { UNDERDOG: 2, SLACKER: 1 },
      },
    ],
  },
  {
    id: 'q5',
    scene: '你的道侣被魔修抓走了，你？',
    options: [
      {
        text: '谁敢动我的人？我让整个魔修一族陪葬',
        scores: { YANDERE: 3 },
      },
      {
        text: '冷静分析魔修的弱点，制定精确营救计划',
        scores: { STRATEGIST: 3 },
      },
      {
        text: '先去借人找帮手，团结一切能团结的力量',
        scores: { UNDERDOG: 3 },
      },
      {
        text: '道侣？什么道侣？哦那个啊...我再去找一个吧',
        scores: { SLACKER: 3 },
      },
    ],
  },
  {
    id: 'q6',
    scene: '修仙界大战，你被推举为盟主，你？',
    options: [
      {
        text: '终于轮到我了！兄弟们跟我冲！',
        scores: { HOTBLOOD: 3 },
      },
      {
        text: '盟主只是个名头，真正的权力在暗处掌控',
        scores: { STRATEGIST: 2, VILLAIN: 1 },
      },
      {
        text: '什么？当盟主？不了不了我还有事先走了',
        scores: { SLACKER: 3 },
      },
      {
        text: '当就当，但规矩得按我的来',
        scores: { VILLAIN: 3 },
      },
    ],
  },
  {
    id: 'q7',
    scene: '你在秘境里被困住了，只有一条出路，但需要一个人留下来断后，你？',
    options: [
      {
        text: '断后？我先走，活着的人才能报仇',
        scores: { COWARD: 3 },
      },
      {
        text: '我来断后！你们先走！',
        scores: { HOTBLOOD: 3 },
      },
      {
        text: '断后不等于送死，我来安排所有人都能出去',
        scores: { STRATEGIST: 3 },
      },
      {
        text: '断后？我？行吧...但得给我记个头功',
        scores: { SLACKER: 3 },
      },
    ],
  },
  {
    id: 'q8',
    scene: '修仙千年，你终于站在了巅峰，回头看，你最大的遗憾是？',
    options: [
      {
        text: '当初不该那么冲动，失去了太多人',
        scores: { HOTBLOOD: 3 },
      },
      {
        text: '遗憾？我每一步都是算好的，没有遗憾',
        scores: { STRATEGIST: 3 },
      },
      {
        text: '遗憾就是当初应该更苟一点，差点翻车',
        scores: { COWARD: 3 },
      },
      {
        text: '遗憾就是这一路太顺了，都没什么故事可以吹',
        scores: { CHOSEN_ONE: 3 },
      },
    ],
  },
  {
    id: 'q9',
    scene: '你捡到一本神秘功法，修炼后可能走火入魔，但威力无比，你？',
    options: [
      {
        text: '风险太大，还是老老实实练基础功法吧',
        scores: { COWARD: 3 },
      },
      {
        text: '不入虎穴焉得虎子！直接开练！',
        scores: { HOTBLOOD: 3 },
      },
      {
        text: '先研究功法结构，找到规避风险的方法再练',
        scores: { STRATEGIST: 3 },
      },
      {
        text: '走火入魔？那又怎样？我命由我不由天！',
        scores: { UNDERDOG: 3 },
      },
    ],
  },
  {
    id: 'q10',
    scene: '你发现宗门里有人偷偷修炼禁术，你？',
    options: [
      {
        text: '假装没看见，多一事不如少一事',
        scores: { COWARD: 3 },
      },
      {
        text: '直接上去制止！修炼禁术是邪道！',
        scores: { HOTBLOOD: 3 },
      },
      {
        text: '先收集证据，再找合适的时机揭发',
        scores: { STRATEGIST: 3 },
      },
      {
        text: '这关我什么事？继续睡我的觉',
        scores: { SLACKER: 3 },
      },
    ],
  },
  {
    id: 'q11',
    scene: '你遇到了一个千年难遇的机缘，但需要放弃现在的一切，你？',
    options: [
      {
        text: '放弃一切太冒险了，还是安稳点好',
        scores: { COWARD: 3 },
      },
      {
        text: '机缘难得！拼了！',
        scores: { HOTBLOOD: 3 },
      },
      {
        text: '分析利弊，看看是否值得放弃',
        scores: { STRATEGIST: 3 },
      },
      {
        text: '顺其自然吧，该是我的就是我的',
        scores: { CHOSEN_ONE: 3 },
      },
    ],
  },
  {
    id: 'q12',
    scene: '有人当众羞辱你，你？',
    options: [
      {
        text: '忍一时风平浪静，退一步海阔天空',
        scores: { COWARD: 3 },
      },
      {
        text: '是可忍孰不可忍！动手！',
        scores: { HOTBLOOD: 3 },
      },
      {
        text: '君子报仇十年不晚，记下来慢慢算',
        scores: { VILLAIN: 3 },
      },
      {
        text: '无所谓，他说的又不是真的',
        scores: { SLACKER: 3 },
      },
    ],
  },
  {
    id: 'q13',
    scene: '你被困在一个山洞里，唯一的食物是一只会说话的兔子，你？',
    options: [
      {
        text: '吃了它！活着最重要',
        scores: { COWARD: 3 },
      },
      {
        text: '怎么能吃兔子！我宁愿饿死！',
        scores: { HOTBLOOD: 3 },
      },
      {
        text: '和兔子做交易，让它带我出去',
        scores: { STRATEGIST: 3 },
      },
      {
        text: '跟着兔子走，说不定它能找到出路',
        scores: { CHOSEN_ONE: 3 },
      },
    ],
  },
  {
    id: 'q14',
    scene: '你发现自己修炼的功法是别人改过的，你？',
    options: [
      {
        text: '赶紧换功法，这太危险了',
        scores: { COWARD: 3 },
      },
      {
        text: '不管！继续练！我命硬！',
        scores: { HOTBLOOD: 3 },
      },
      {
        text: '研究功法漏洞，反推原版',
        scores: { STRATEGIST: 3 },
      },
      {
        text: '随他去吧，反正我也懒得换',
        scores: { SLACKER: 3 },
      },
    ],
  },
  {
    id: 'q15',
    scene: '你的好友要去挑战一个几乎不可能战胜的敌人，你？',
    options: [
      {
        text: '劝他别去，太危险了',
        scores: { COWARD: 3 },
      },
      {
        text: '跟他一起去！兄弟同生共死！',
        scores: { HOTBLOOD: 3 },
      },
      {
        text: '帮他分析敌人弱点，制定战术',
        scores: { STRATEGIST: 3 },
      },
      {
        text: '在后面给他们加油吧',
        scores: { SLACKER: 3 },
      },
    ],
  },
]
