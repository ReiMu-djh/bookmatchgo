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
        text: '正面硬刚，就算输也要让对方记住你',
        scores: { HOTBLOOD: 2, VILLAIN: 1 },
      },
      {
        text: '被打倒七次又站起来八次，用耐力拖垮对方',
        scores: { UNDERDOG: 2, HOTBLOOD: 1 },
      },
      {
        text: '示弱认输，但暗中记住对方的招式破绽',
        scores: { COWARD: 2, STRATEGIST: 1 },
      },
      {
        text: '找规则漏洞拖延时间，等对方自己犯规',
        scores: { SLACKER: 2, COWARD: 1 },
      },
    ],
  },
  {
    id: 'q2',
    scene: '你获得了一个金手指，选哪个？',
    options: [
      {
        text: '气运加身——出门就能捡到宝，修炼事半功倍',
        scores: { CHOSEN_ONE: 2, SLACKER: 1 },
      },
      {
        text: '因果锁链——与你结缘之人，命运将与你交织',
        scores: { YANDERE: 2, STRATEGIST: 1 },
      },
      {
        text: '命运之眼——能看到所有人的命数和弱点',
        scores: { STRATEGIST: 2, VILLAIN: 1 },
      },
      {
        text: '逆命之种——天赋越差起步越慢，但突破后实力远超同阶',
        scores: { UNDERDOG: 2, COWARD: 1 },
      },
    ],
  },
  {
    id: 'q3',
    scene: '宗门里你最信任的人背叛了你，你？',
    options: [
      {
        text: '忍辱负重，用实力证明离开我是他的损失',
        scores: { UNDERDOG: 2, STRATEGIST: 1 },
      },
      {
        text: '封闭内心，从此只靠利益维系关系',
        scores: { YANDERE: 2, VILLAIN: 1 },
      },
      {
        text: '一笑置之，缘分尽了就各自安好',
        scores: { SLACKER: 2, COWARD: 1 },
      },
      {
        text: '也许他有自己的苦衷，时间会给出答案',
        scores: { CHOSEN_ONE: 2, YANDERE: 1 },
      },
    ],
  },
  {
    id: 'q4',
    scene: '秘境里你和另一名修士同时发现了一件上古神器，谁先拿到归谁，你？',
    options: [
      {
        text: '公平竞争，各凭本事',
        scores: { HOTBLOOD: 2, UNDERDOG: 1 },
      },
      {
        text: '提出共同研究，暗中多学一步',
        scores: { VILLAIN: 2, STRATEGIST: 1 },
      },
      {
        text: '让对方先拿，自己去找更好的',
        scores: { SLACKER: 2, CHOSEN_ONE: 1 },
      },
      {
        text: '主动让出，但要求对方欠你一个人情',
        scores: { COWARD: 2, STRATEGIST: 1 },
      },
    ],
  },
  {
    id: 'q5',
    scene: '你的道侣被魔修抓走了，你？',
    options: [
      {
        text: '不惜代价，哪怕与全世界为敌也要救回',
        scores: { YANDERE: 2, HOTBLOOD: 1 },
      },
      {
        text: '冷静分析魔修弱点，制定精确营救计划',
        scores: { STRATEGIST: 2, VILLAIN: 1 },
      },
      {
        text: '联合其他受害者，组建营救同盟',
        scores: { UNDERDOG: 2, SLACKER: 1 },
      },
      {
        text: '借机打入魔修内部，顺便学他们的功法',
        scores: { VILLAIN: 2, UNDERDOG: 1 },
      },
    ],
  },
  {
    id: 'q6',
    scene: '修仙界大战，你被推举为盟主，你？',
    options: [
      {
        text: '终于轮到我了！兄弟们跟我冲！',
        scores: { HOTBLOOD: 2, UNDERDOG: 1 },
      },
      {
        text: '既然大家选了我，那就是天意，当仁不让',
        scores: { CHOSEN_ONE: 2, HOTBLOOD: 1 },
      },
      {
        text: '什么？当盟主？不了不了我还有事先走了',
        scores: { SLACKER: 2, COWARD: 1 },
      },
      {
        text: '当就当，但规矩得按我的来',
        scores: { VILLAIN: 2, YANDERE: 1 },
      },
    ],
  },
  {
    id: 'q7',
    scene: '宗门分配修炼资源，你被分到了最差的灵石矿脉，别人都嫌弃的地方',
    options: [
      {
        text: '用笨办法，一天磨一块，三年后反而比别人多练了一倍',
        scores: { UNDERDOG: 2, COWARD: 1 },
      },
      {
        text: '找长老理论！凭什么给我最差的！',
        scores: { HOTBLOOD: 2, VILLAIN: 1 },
      },
      {
        text: '先看看最差的地方有没有别人没发现的好处',
        scores: { COWARD: 2, STRATEGIST: 1 },
      },
      {
        text: '随缘吧，说不定这地方有什么机缘',
        scores: { CHOSEN_ONE: 2, SLACKER: 1 },
      },
    ],
  },
  {
    id: 'q8',
    scene: '修仙千年，你终于站在了巅峰，回头看，你最大的遗憾是？',
    options: [
      {
        text: '当初不该那么冲动，失去了太多人',
        scores: { UNDERDOG: 2, HOTBLOOD: 1 },
      },
      {
        text: '遗憾就是没能守住最重要的那个人',
        scores: { YANDERE: 2, UNDERDOG: 1 },
      },
      {
        text: '遗憾就是当初应该更苟一点，差点翻车',
        scores: { COWARD: 2, SLACKER: 1 },
      },
      {
        text: '遗憾就是这一路太顺了，都没什么故事可以吹',
        scores: { CHOSEN_ONE: 2, YANDERE: 1 },
      },
    ],
  },
  {
    id: 'q9',
    scene: '你在秘境深处发现一把上古灵剑，剑身传来强烈共鸣，但所有人都说这把剑被诅咒过，历代主人皆不得善终',
    options: [
      {
        text: '诅咒？听着就麻烦，还是别碰了',
        scores: { SLACKER: 2, CHOSEN_ONE: 1 },
      },
      {
        text: '管它什么诅咒！我和它有缘，我偏要试试！',
        scores: { HOTBLOOD: 2, UNDERDOG: 1 },
      },
      {
        text: '先研究诅咒的来源，看看能否化解',
        scores: { STRATEGIST: 2, VILLAIN: 1 },
      },
      {
        text: '别人不得善终不代表我也不行，这把剑我要定了',
        scores: { VILLAIN: 2, YANDERE: 1 },
      },
    ],
  },
  {
    id: 'q10',
    scene: '你发现宗门里有人偷偷修炼禁术，你？',
    options: [
      {
        text: '假装没看见，多一事不如少一事',
        scores: { COWARD: 2, SLACKER: 1 },
      },
      {
        text: '私下找那个人，问清楚修炼禁术的原因',
        scores: { UNDERDOG: 2, HOTBLOOD: 1 },
      },
      {
        text: '这个人我盯上了，他的一举一动我都要知道',
        scores: { YANDERE: 2, STRATEGIST: 1 },
      },
      {
        text: '这关我什么事？继续睡我的觉',
        scores: { SLACKER: 2, CHOSEN_ONE: 1 },
      },
    ],
  },
  {
    id: 'q11',
    scene: '你卡在修炼瓶颈已经三百年了，所有同辈都已突破，只有你还停在原地',
    options: [
      {
        text: '也许我天赋到此为止了，安于现状也不错',
        scores: { CHOSEN_ONE: 2, SLACKER: 1 },
      },
      {
        text: '既然正常方法不行，那就走偏门，总有一条路能通',
        scores: { VILLAIN: 2, UNDERDOG: 1 },
      },
      {
        text: '一定有我遗漏的关键，重新审视所有修炼理论',
        scores: { STRATEGIST: 2, VILLAIN: 1 },
      },
      {
        text: '急什么，该突破的时候自然就突破了',
        scores: { COWARD: 2, CHOSEN_ONE: 1 },
      },
    ],
  },
  {
    id: 'q12',
    scene: '有人当众羞辱你，你？',
    options: [
      {
        text: '冷静分析对方的弱点，找最痛的地方回击',
        scores: { STRATEGIST: 2, VILLAIN: 1 },
      },
      {
        text: '君子报仇十年不晚，记下来慢慢算',
        scores: { VILLAIN: 2, YANDERE: 1 },
      },
      {
        text: '无所谓，他说的又不是真的',
        scores: { SLACKER: 2, CHOSEN_ONE: 1 },
      },
      {
        text: '忍一时风平浪静，但暗自发誓要变强',
        scores: { COWARD: 2, HOTBLOOD: 1 },
      },
    ],
  },
  {
    id: 'q13',
    scene: '你被困在一个山洞里，唯一的食物是一只会说话的兔子，你？',
    options: [
      {
        text: '这只兔子和我有缘，谁也不许动它',
        scores: { YANDERE: 2, CHOSEN_ONE: 1 },
      },
      {
        text: '和兔子组队，它找路我保护它，一起出去',
        scores: { UNDERDOG: 2, SLACKER: 1 },
      },
      {
        text: '跟着兔子走，它既然会说话一定知道出路',
        scores: { CHOSEN_ONE: 2, COWARD: 1 },
      },
      {
        text: '问兔子有没有别的吃的，它住这么久肯定有存货',
        scores: { STRATEGIST: 2, HOTBLOOD: 1 },
      },
    ],
  },
  {
    id: 'q14',
    scene: '你发现自己修炼的功法是别人改过的，你？',
    options: [
      {
        text: '赶紧换功法，这太危险了',
        scores: { COWARD: 2, SLACKER: 1 },
      },
      {
        text: '谁敢动我修炼的东西？我一定要找到他',
        scores: { HOTBLOOD: 2, YANDERE: 1 },
      },
      {
        text: '也许改过的版本反而更好？先试试再说',
        scores: { CHOSEN_ONE: 2, YANDERE: 1 },
      },
      {
        text: '研究功法漏洞，反推原版',
        scores: { STRATEGIST: 2, VILLAIN: 1 },
      },
    ],
  },
  {
    id: 'q15',
    scene: '你的好友要去挑战一个几乎不可能战胜的敌人，你？',
    options: [
      {
        text: '不让他去，他要是出事我怎么办',
        scores: { YANDERE: 2, COWARD: 1 },
      },
      {
        text: '跟他去！兄弟同生共死！',
        scores: { HOTBLOOD: 2, UNDERDOG: 1 },
      },
      {
        text: '帮他找到敌人的致命弱点，一击必杀',
        scores: { VILLAIN: 2, STRATEGIST: 1 },
      },
      {
        text: '帮他安排好后路，万一失败也有退路',
        scores: { SLACKER: 2, UNDERDOG: 1 },
      },
    ],
  },
]
