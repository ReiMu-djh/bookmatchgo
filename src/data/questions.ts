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
        text: '能拖就拖！先认个怂，等对方放松警惕再找机会',
        scores: { COWARD: 2, SLACKER: 1 },
      },
      {
        text: '管他什么境界！先出一拳再说，气势不能输！',
        scores: { HOTBLOOD: 2, UNDERDOG: 1 },
      },
      {
        text: '上场前就已经在擂台布了三重阵法，等对方自己踩进来',
        scores: { STRATEGIST: 2, VILLAIN: 1 },
      },
      {
        text: '不管了先打，打不过就跑，跑了再想办法回来打',
        scores: { UNDERDOG: 2, CHOSEN_ONE: 1 },
      },
    ],
  },
  {
    id: 'q2',
    scene: '你获得了一个金手指，选哪个？',
    options: [
      {
        text: '命运之眼——能看到所有人的命数和弱点',
        scores: { STRATEGIST: 2, VILLAIN: 1 },
      },
      {
        text: '不灭战魂——越打越强，永远不会倒下',
        scores: { HOTBLOOD: 2, UNDERDOG: 1 },
      },
      {
        text: '隐身遁术——没人能发现你，包括你的债主',
        scores: { COWARD: 2, SLACKER: 1 },
      },
      {
        text: '执念锁链——你锁定的人永远逃不出你的感知',
        scores: { YANDERE: 2, CHOSEN_ONE: 1 },
      },
    ],
  },
  {
    id: 'q3',
    scene: '宗门里你最信任的人背叛了你，你？',
    options: [
      {
        text: '原来如此...那从今天起，我不会再信任任何人',
        scores: { YANDERE: 2, VILLAIN: 1 },
      },
      {
        text: '我要变强！然后当着全宗门的面打回来！',
        scores: { UNDERDOG: 2, HOTBLOOD: 1 },
      },
      {
        text: '背叛？我早就防着了，你以为我为什么留了后手',
        scores: { STRATEGIST: 2, COWARD: 1 },
      },
      {
        text: '算了，反正我也没多信任他，换一家宗门吧',
        scores: { SLACKER: 2, COWARD: 1 },
      },
    ],
  },
  {
    id: 'q4',
    scene: '秘境里你和另一名修士同时发现了一件上古神器，谁先拿到归谁，你？',
    options: [
      {
        text: '先观察对方实力，比自己强就装没看见，比自己弱就动手',
        scores: { COWARD: 2, STRATEGIST: 1 },
      },
      {
        text: '直接冲过去抢！先拿到再说！',
        scores: { HOTBLOOD: 2, CHOSEN_ONE: 1 },
      },
      {
        text: '跟对方说\'这神器有诅咒\'，等他犹豫的时候自己拿了',
        scores: { VILLAIN: 2, STRATEGIST: 1 },
      },
      {
        text: '跟对方合作，神器一人一半，反正你也不亏',
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
        scores: { YANDERE: 2, HOTBLOOD: 1 },
      },
      {
        text: '冷静分析魔修的弱点，制定精确营救计划',
        scores: { STRATEGIST: 2, COWARD: 1 },
      },
      {
        text: '先去借人，再去找帮手，团结一切能团结的力量',
        scores: { UNDERDOG: 2, CHOSEN_ONE: 1 },
      },
      {
        text: '道侣？什么道侣？哦那个啊...我再去找一个吧',
        scores: { SLACKER: 2, VILLAIN: 1 },
      },
    ],
  },
  {
    id: 'q6',
    scene: '修仙界大战，你被推举为盟主，你？',
    options: [
      {
        text: '终于轮到我了！兄弟们跟我冲！',
        scores: { HOTBLOOD: 2, CHOSEN_ONE: 1 },
      },
      {
        text: '盟主只是个名头，真正的权力在暗处',
        scores: { STRATEGIST: 2, VILLAIN: 1 },
      },
      {
        text: '什么？当盟主？不了不了我还有事先走了',
        scores: { SLACKER: 2, COWARD: 1 },
      },
      {
        text: '当就当，但谁敢不听我的...后果自负',
        scores: { YANDERE: 2, VILLAIN: 1 },
      },
    ],
  },
  {
    id: 'q7',
    scene: '你在秘境里被困住了，只有一条出路，但需要一个人留下来断后，你？',
    options: [
      {
        text: '断后？我先走，你们断后，活着的人才能替死去的人报仇',
        scores: { COWARD: 2, VILLAIN: 1 },
      },
      {
        text: '我来断后！你们先走！',
        scores: { HOTBLOOD: 2, CHOSEN_ONE: 1 },
      },
      {
        text: '断后不等于送死，我来安排，保证所有人都能出去',
        scores: { STRATEGIST: 2, UNDERDOG: 1 },
      },
      {
        text: '断后？我？行吧...但你们出去后得给我烧三百年纸',
        scores: { SLACKER: 2, YANDERE: 1 },
      },
    ],
  },
  {
    id: 'q8',
    scene: '修仙千年，你终于站在了巅峰，回头看，你最大的遗憾是？',
    options: [
      {
        text: '当初不该那么冲动，失去了太多人',
        scores: { HOTBLOOD: 2, YANDERE: 1 },
      },
      {
        text: '遗憾？我每一步都是算好的，没有遗憾',
        scores: { STRATEGIST: 2, VILLAIN: 1 },
      },
      {
        text: '遗憾就是当初应该更苟一点，差点翻车',
        scores: { COWARD: 2, SLACKER: 1 },
      },
      {
        text: '遗憾就是这一路太顺了，都没什么故事可以吹',
        scores: { CHOSEN_ONE: 2, UNDERDOG: 1 },
      },
    ],
  },
]
