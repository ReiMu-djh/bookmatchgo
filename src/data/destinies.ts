export type DestinyKey = 'STRATEGIST' | 'HOTBLOOD' | 'COWARD' | 'UNDERDOG' | 'SLACKER' | 'YANDERE' | 'CHOSEN_ONE' | 'VILLAIN'

export interface Protagonist {
  name: string
  source: string
  quote: string
  category: 'webnovel' | 'classic' | 'anime' | 'game'
}

export interface BookRecommendation {
  title: string
  author: string
  angle: string
  reason: string
}

export interface Destiny {
  key: DestinyKey
  name: string
  title: string
  icon: string
  description: string
  verdict: string
  quote: string
  poem: string
  tags: string[]
  cpDestinyKey: DestinyKey
  primaryColor: string
  secondaryColor: string
  backgroundStyle: string
  stats: { attack: number; defense: number; luck: number; charm: number; sanity: number }
  protagonists: Protagonist[]
  books: BookRecommendation[]
}

export const destinies: Destiny[] = [
  {
    key: 'STRATEGIST',
    name: '权谋型',
    title: '棋局执手',
    icon: '筹',
    description: '别人还在第一层，你已经在第五层了，但第五层只有你一个人，因为朋友都被你算没了。',
    verdict: '算尽天下人心，唯独算不出孤独',
    quote: '"你以为你在选，其实你的每一步都在我棋盘上。"',
    poem: '千机算尽无人知\n独坐深宫对残棋',
    tags: ['#第五层算无遗策', '#棋盘上的孤王', '#朋友是什么'],
    cpDestinyKey: 'HOTBLOOD',
    primaryColor: '#1a1a2e',
    secondaryColor: '#c9a96e',
    backgroundStyle: 'dark_palace',
    stats: { attack: 6, defense: 9, luck: 5, charm: 7, sanity: 3 },
    protagonists: [
      { name: '梅长苏', source: '《琅琊榜》', quote: '算尽天下人心，唯独算不出自己的命', category: 'classic' },
      { name: '克莱恩·莫雷蒂', source: '《诡秘之主》', quote: '永远在暗处观察，从不第一个出手，但每一步都在算', category: 'webnovel' },
      { name: '夜神月', source: '《死亡笔记》', quote: '我要成为新世界的神', category: 'anime' },
    ],
    books: [
      { title: '诡秘之主', author: '爱潜水的乌贼', angle: '最像你', reason: '一个在暗处操控一切的人，和你一样孤独而清醒' },
      { title: '琅琊榜', author: '海宴', angle: '你最需要', reason: '算尽天下的人，也需要一个值得托付后背的人' },
      { title: '三体', author: '刘慈欣', angle: '你会意外喜欢', reason: '宇宙级的博弈，满足你对"大局"的终极想象' },
    ],
  },
  {
    key: 'HOTBLOOD',
    name: '热血型',
    title: '烈焰先锋',
    icon: '烈',
    description: '脑子说等等，拳头已经出去了。每次闯完祸都说下次一定冷静，下次依然不冷静。',
    verdict: '冲动是魔鬼，但你是天使',
    quote: '"我可能不是最强的，但我一定是最先上的！"',
    poem: '一拳既出无悔意\n热血燃尽亦不熄',
    tags: ['#先打再说', '#冷静是什么', '#热血永动机'],
    cpDestinyKey: 'COWARD',
    primaryColor: '#d32f2f',
    secondaryColor: '#ff8f00',
    backgroundStyle: 'battlefield',
    stats: { attack: 10, defense: 3, luck: 6, charm: 8, sanity: 2 },
    protagonists: [
      { name: '路飞', source: '《海贼王》', quote: '我是要成为海贼王的男人！', category: 'anime' },
      { name: '叶修', source: '《全职高手》', quote: '荣耀不是一个人的游戏，但我一个人就够了', category: 'webnovel' },
      { name: '哪吒', source: '《哪吒之魔童降世》', quote: '我命由我不由天！', category: 'anime' },
    ],
    books: [
      { title: '全职高手', author: '蝴蝶蓝', angle: '最像你', reason: '热血不是冲动，是明知不可为而为之的执着' },
      { title: '斗破苍穹', author: '天蚕土豆', angle: '你最需要', reason: '有时候光有热血不够，你还需要一点策略' },
      { title: '悟空传', author: '今何在', angle: '你会意外喜欢', reason: '你以为你在反抗命运，其实你就是命运本身' },
    ],
  },
  {
    key: 'COWARD',
    name: '苟道型',
    title: '深渊隐者',
    icon: '隐',
    description: '活着就是胜利，出风头是别人的事，你在角落默默捡装备，等所有人打完再出来收尸。',
    verdict: '苟到最后，应有尽有',
    quote: '"不是我怂，是我在等你们先死。"',
    poem: '深藏若虚无人识\n笑到最后才是赢',
    tags: ['#苟道大师', '#活着就是胜利', '#捡漏之王'],
    cpDestinyKey: 'HOTBLOOD',
    primaryColor: '#2e4a3e',
    secondaryColor: '#8fa89a',
    backgroundStyle: 'misty_forest',
    stats: { attack: 3, defense: 10, luck: 8, charm: 4, sanity: 9 },
    protagonists: [
      { name: '韩立', source: '《凡人修仙传》', quote: '活着才是最大的本事', category: 'webnovel' },
      { name: '漩涡鸣人(仙人模式前)', source: '《火影忍者》', quote: '等等，这个我打不过...先跑为敬', category: 'anime' },
      { name: '伊泽瑞尔', source: '《英雄联盟》', quote: '在别的探险家死掉的地方，我活下来了', category: 'game' },
    ],
    books: [
      { title: '凡人修仙传', author: '忘语', angle: '最像你', reason: '一个凡人的修仙路，靠的不是天赋，是活得够久' },
      { title: '诡秘之主', author: '爱潜水的乌贼', angle: '你最需要', reason: '苟也需要技巧，这本书教你高级苟术' },
      { title: '活着', author: '余华', angle: '你会意外喜欢', reason: '活着本身就是最大的胜利，你比谁都懂' },
    ],
  },
  {
    key: 'UNDERDOG',
    name: '逆袭型',
    title: '蛰伏者',
    icon: '逆',
    description: '前期谁都能踩你一脚，后期谁都不敢看你一眼。你的口头禅是"三十年河东三十年河西"，但通常不用等三十年。',
    verdict: '今日你对我爱搭不理，明日我让你高攀不起',
    quote: '"踩我？行，你记住了。"',
    poem: '蛰伏泥中无人问\n一朝惊雷动九天',
    tags: ['#扮猪吃虎', '#三十年河东', '#打脸专业户'],
    cpDestinyKey: 'VILLAIN',
    primaryColor: '#0d1b2a',
    secondaryColor: '#ffd700',
    backgroundStyle: 'dawn_break',
    stats: { attack: 8, defense: 5, luck: 4, charm: 6, sanity: 7 },
    protagonists: [
      { name: '萧炎', source: '《斗破苍穹》', quote: '三十年河东三十年河西，莫欺少年穷！', category: 'webnovel' },
      { name: '克里斯蒂安·格雷', source: '《基督山伯爵》', quote: '等待与希望，这就是我全部的武器', category: 'classic' },
      { name: '绿谷出久', source: '《我的英雄学院》', quote: '从零开始的英雄之路', category: 'anime' },
    ],
    books: [
      { title: '斗破苍穹', author: '天蚕土豆', angle: '最像你', reason: '从废柴到巅峰，你的人生就是一部逆袭史' },
      { title: '基督山伯爵', author: '大仲马', angle: '你最需要', reason: '复仇需要耐心，你需要学会蛰伏的艺术' },
      { title: '平凡的世界', author: '路遥', angle: '你会意外喜欢', reason: '不是所有逆袭都要惊天动地，平凡中的坚韧更动人' },
    ],
  },
  {
    key: 'SLACKER',
    name: '摆烂型',
    title: '逍遥散人',
    icon: '逸',
    description: '你以为他废，其实他只是懒得动。一旦认真起来，全天下都要后悔当初为什么招惹他——但他不会认真的，因为太累了。',
    verdict: '认真是不可能认真的，但赢了就是赢了',
    quote: '"努力？不存在的。运气好怪我咯？"',
    poem: '卧看云起笑众生\n懒出境界自成神',
    tags: ['#摆烂天花板', '#认真是不可能认真的', '#懒出境界'],
    cpDestinyKey: 'CHOSEN_ONE',
    primaryColor: '#4a3f6b',
    secondaryColor: '#e8d5f5',
    backgroundStyle: 'cloud_nap',
    stats: { attack: 2, defense: 7, luck: 10, charm: 5, sanity: 8 },
    protagonists: [
      { name: '坂田银时', source: '《银魂》', quote: '糖分是生命的意义，认真就输了', category: 'anime' },
      { name: '宋书航', source: '《修真聊天群》', quote: '认真是不可能认真的，但运气好怪我咯', category: 'webnovel' },
      { name: '猪八戒', source: '《西游记》', quote: '能躺着绝不坐着，能坐着绝不站着', category: 'classic' },
    ],
    books: [
      { title: '修真聊天群', author: '圣骑士的传说', angle: '最像你', reason: '一个被拉进修仙群的普通人，摆烂也能成仙' },
      { title: '人间失格', author: '太宰治', angle: '你最需要', reason: '偶尔也需要直面内心，不是所有事都能摆过去' },
      { title: '小王子', author: '圣埃克苏佩里', angle: '你会意外喜欢', reason: '用孩子的眼睛看世界，你会发现"懒"其实是一种纯粹' },
    ],
  },
  {
    key: 'YANDERE',
    name: '病娇型',
    title: '执念化身',
    icon: '执',
    description: '"我可以为你放弃全世界，但你不能看别人一眼。"你的爱比恨可怕，你的温柔比刀锋利。',
    verdict: '爱到极致即是劫，温柔刀下无全尸',
    quote: '"你不用喜欢我，你只要看着我一个人就够了。"',
    poem: '执念成魔心自知\n温柔一念化修罗',
    tags: ['#偏执即正义', '#你只能看我', '#温柔刀刀刀致命'],
    cpDestinyKey: 'STRATEGIST',
    primaryColor: '#8b0000',
    secondaryColor: '#ff69b4',
    backgroundStyle: 'rose_thorns',
    stats: { attack: 9, defense: 4, luck: 3, charm: 10, sanity: 1 },
    protagonists: [
      { name: '我妻由乃', source: '《未来日记》', quote: '你不用喜欢我，你只要看着我一个人就够了', category: 'anime' },
      { name: '金木研', source: '《东京喰种》', quote: '这个世界是错的，错的是不让我拥有你', category: 'anime' },
      { name: '希斯克利夫', source: '《呼啸山庄》', quote: '不管我们的灵魂是什么做的，他的和我的是完全一样的', category: 'classic' },
    ],
    books: [
      { title: '未来日记', author: 'えすのサカエ', angle: '最像你', reason: '极致的爱与执念，你会在由乃身上看到自己' },
      { title: '呼啸山庄', author: '艾米莉·勃朗特', angle: '你最需要', reason: '执念太深会吞噬自己，你需要学会放手' },
      { title: '挪威的森林', author: '村上春树', angle: '你会意外喜欢', reason: '在爱与失去之间，有一种温柔不需要占有' },
    ],
  },
  {
    key: 'CHOSEN_ONE',
    name: '天命型',
    title: '天选之人',
    icon: '命',
    description: '别人苦修三十年，你掉个悬崖就突破了。你也不知道为什么好事总找你，可能上辈子拯救了银河系。',
    verdict: '运气也是实力，不服你也掉个崖试试',
    quote: '"我也不知道为什么，它自己就成功了。"',
    poem: '天命所归非人力\n一坠悬崖即化龙',
    tags: ['#天选之子', '#掉崖必得秘籍', '#运气即实力'],
    cpDestinyKey: 'SLACKER',
    primaryColor: '#0a1628',
    secondaryColor: '#ffd700',
    backgroundStyle: 'star_river',
    stats: { attack: 5, defense: 6, luck: 10, charm: 7, sanity: 6 },
    protagonists: [
      { name: '唐三', source: '《斗罗大陆》', quote: '天赋加努力等于无敌，但主要是天赋', category: 'webnovel' },
      { name: '哈利·波特', source: '《哈利·波特》', quote: '被选中的人，不需要理由', category: 'classic' },
      { name: '桐谷和人', source: '《刀剑神域》', quote: '掉线也能赢，这就是天命', category: 'anime' },
    ],
    books: [
      { title: '斗罗大陆', author: '唐家三少', angle: '最像你', reason: '天赋异禀的主角，像你一样不需要太多努力' },
      { title: '苏菲的世界', author: '乔斯坦·贾德', angle: '你最需要', reason: '天命也需要思考"我是谁"，别被运气定义' },
      { title: '月亮与六便士', author: '毛姆', angle: '你会意外喜欢', reason: '拥有了一切之后，你会开始寻找真正的意义' },
    ],
  },
  {
    key: 'VILLAIN',
    name: '反派型',
    title: '规则粉碎者',
    icon: '枭',
    description: '规则是给主角定的，你只负责打破。别人在纠结对错，你已经在算利益了。你不是坏，你只是太清醒。',
    verdict: '清醒到孤独，才是真正的反派',
    quote: '"你们管这叫邪恶，我管这叫效率。"',
    poem: '世人皆醉我独醒\n踏碎规则自成王',
    tags: ['#规则粉碎机', '#清醒到可怕', '#反派不解释'],
    cpDestinyKey: 'UNDERDOG',
    primaryColor: '#2d1b4e',
    secondaryColor: '#ff1744',
    backgroundStyle: 'abyss_throne',
    stats: { attack: 8, defense: 7, luck: 4, charm: 8, sanity: 4 },
    protagonists: [
      { name: '魏无羡', source: '《魔道祖师》', quote: '是非在己，毁誉由人，得失不论', category: 'webnovel' },
      { name: '洛基', source: '《漫威》', quote: '我才是应该坐在王座上的人', category: 'anime' },
      { name: '汉尼拔', source: '《沉默的羔羊》', quote: '优雅地吃掉你的灵魂', category: 'classic' },
    ],
    books: [
      { title: '魔道祖师', author: '墨香铜臭', angle: '最像你', reason: '被世人误解又如何？你只走自己的路' },
      { title: '君主论', author: '马基雅维利', angle: '你最需要', reason: '理解规则才能打破规则，这是你的教科书' },
      { title: '局外人', author: '加缪', angle: '你会意外喜欢', reason: '清醒到极致的人，和这个世界格格不入' },
    ],
  },
]

export const destinyMap = Object.fromEntries(
  destinies.map((d) => [d.key, d])
) as Record<DestinyKey, Destiny>
