export type Ex = readonly [zh: string, pinyin: string, en: string, tg: string]
export type Bi = readonly [tg: string, en: string]

export interface GrammarPractice {
  q: string                 // Chinese prompt, "＿＿" marks the blank
  hint?: Bi                 // meaning of the intended sentence (tg, en)
  options: readonly string[]
  answer: string
  why: Bi
}

/** core = basic HSK 1 level; mixed = core plus some supplementary detail; extra = supplementary. */
export type GrammarLevel = 'core' | 'mixed' | 'extra'

export interface GrammarTopic {
  id: number
  zh: string
  title: Bi
  level: GrammarLevel
  explain: Bi
  note?: Bi
  ex: Ex[]
  practice: [GrammarPractice, GrammarPractice]
}

export const GRAMMAR: GrammarTopic[] = [
  { id: 1, zh: '主语 + 动词 + 宾语', title: ['Сохти асосии ҷумла', 'Basic sentence structure'], level: 'core',
    explain: ['Тартиби асосии ҷумла: Субъект + Феъл + Объект (кӣ + чӣ кор мекунад + чиро). Феъл тағйир намеёбад: барои «ман», «ту», «ӯ» як шакли феъл истифода мешавад.', 'Basic order: Subject + Verb + Object. The verb never changes form: the same verb is used for I, you, he and we.'],
    ex: [["我喝水。","Wǒ hē shuǐ.","I drink water.","Ман об менӯшам."],["他学习汉语。","Tā xuéxí Hànyǔ.","He studies Chinese.","Ӯ забони хитоиро меомӯзад."],["我们看电影。","Wǒmen kàn diànyǐng.","We watch a movie.","Мо филм тамошо мекунем."]],
    practice: [
      { q: "我 ＿＿ 苹果。", hint: ["Ман себ мехӯрам.","I eat an apple."], options: ["吃","很","的","吗"], answer: "吃", why: ["Ҷои холӣ феъл мехоҳад: 我吃苹果.","The blank needs a verb: 我吃苹果."] },
      { q: "Кадом ҷумла дуруст аст? / Which sentence is correct?", options: ["我喝茶。","喝我茶。","茶喝我。","喝茶我。"], answer: "我喝茶。", why: ["Тартиб: Субъект (我) + Феъл (喝) + Объект (茶).","Order: Subject (我) + Verb (喝) + Object (茶)."] }
    ] },
  { id: 2, zh: '是', title: ['Феъли 是 («будан»)', 'The verb 是'], level: 'core',
    explain: ['是 ду исмро мепайвандад: A 是 B (A — ин B аст). Инкор: 不是. Бо сифат одатан 是 намегузоранд, балки 很 истифода мебаранд.', '是 links two nouns: A 是 B (A is B). Negative: 不是. It is normally not used before an adjective; use 很 instead.'],
    ex: [["我是老师。","Wǒ shì lǎoshī.","I am a teacher.","Ман омӯзгорам."],["她不是学生。","Tā bú shì xuésheng.","She is not a student.","Ӯ хонанда (донишҷӯ) нест."],["这是我的书。","Zhè shì wǒ de shū.","This is my book.","Ин китоби ман аст."]],
    practice: [
      { q: "他 ＿＿ 医生。", hint: ["Ӯ табиб аст.","He is a doctor."], options: ["是","有","很","吗"], answer: "是", why: ["«Ӯ табиб аст» — ду исм, бинобар ин 是.","Two nouns are linked, so 是."] },
      { q: "我 ＿＿ 是老师。", hint: ["Ман омӯзгор нестам.","I am not a teacher."], options: ["不","没","吗","了"], answer: "不", why: ["是 бо 不 инкор мешавад: 不是.","是 is negated with 不: 不是."] }
    ] },
  { id: 3, zh: '有', title: ['Феъли 有 («доштан», «ҳаст»)', 'The verb 有'], level: 'core',
    explain: ['有 маънои «доштан» ва «ҳаст» дорад: 我有书; ҷой + 有 + чиз: «дар ин ҷо чизе ҳаст». Инкор танҳо 没有 аст, на 不有.', '有 means “to have” and “there is”: 我有书; place + 有 + thing. Its negative is 没有, never 不有.'],
    ex: [["我有一个朋友。","Wǒ yǒu yí ge péngyou.","I have a friend.","Ман як дӯст дорам."],["桌子上有一本书。","Zhuōzi shàng yǒu yì běn shū.","There is a book on the table.","Рӯи миз як китоб ҳаст."],["我没有钱。","Wǒ méiyǒu qián.","I have no money.","Ман пул надорам."]],
    practice: [
      { q: "我 ＿＿ 电脑。", hint: ["Ман компютер надорам.","I do not have a computer."], options: ["没有","不有","不是","没是"], answer: "没有", why: ["Инкори 有 — 没有.","The negative of 有 is 没有."] },
      { q: "桌子上 ＿＿ 一本书。", hint: ["Рӯи миз як китоб ҳаст.","There is a book on the table."], options: ["有","很","吗","了"], answer: "有", why: ["Ҷой + 有 + чиз.","Place + 有 + thing."] }
    ] },
  { id: 4, zh: '吗', title: ['Ҳиссачаи 吗 (саволи ҳа/не)', 'The particle 吗'], level: 'core',
    explain: ['Ба охири ҷумлаи хабарӣ 吗 илова кунед, то саволи «ҳа/не» ҳосил шавад. Ҷавоб: феълро такрор кунед (是, 有, 喝) ё инкор кунед (不是, 没有).', 'Add 吗 to the end of a statement to make a yes/no question. Answer by repeating the verb (是, 有, 喝) or negating it (不是, 没有).'],
    ex: [["你是学生吗？","Nǐ shì xuésheng ma?","Are you a student?","Ту хонанда (донишҷӯ) ҳастӣ?"],["你喝茶吗？","Nǐ hē chá ma?","Do you drink tea?","Ту чой менӯшӣ?"],["他在家吗？","Tā zài jiā ma?","Is he at home?","Ӯ дар хона аст?"]],
    practice: [
      { q: "你好 ＿＿？", options: ["吗","呢","了","的"], answer: "吗", why: ["你好吗？ — «Ту хубӣ?»","你好吗？ — “How are you?”"] },
      { q: "Кадом ҷумла саволи ҳа/не аст? / Which is a yes/no question?", options: ["你有书吗？","你有什么？","你是谁？","他在哪儿？"], answer: "你有书吗？", why: ["Танҳо ҷумлаи бо 吗 саволи ҳа/не аст.","Only the sentence with 吗 is a yes/no question."] }
    ] },
  { id: 5, zh: '什么', title: ['Калимаи савол 什么 («чӣ»)', 'The question word 什么'], level: 'core',
    explain: ['什么 ҷои ҷавобро дар ҷумла мегирад ва тартиби калимаҳо тағйир намеёбад: 你喝茶 → 你喝什么？', '什么 takes the place of the answer and the word order does not change: 你喝茶 → 你喝什么？'],
    ex: [["这是什么？","Zhè shì shénme?","What is this?","Ин чист?"],["你喝什么？","Nǐ hē shénme?","What do you drink?","Ту чӣ менӯшӣ?"],["你叫什么名字？","Nǐ jiào shénme míngzi?","What is your name?","Номи ту чист?"]],
    practice: [
      { q: "你吃 ＿＿？", hint: ["Ту чӣ мехӯрӣ?","What do you eat?"], options: ["什么","谁","哪儿","几"], answer: "什么", why: ["Пурсиш дар бораи чиз — 什么.","Asking about a thing — 什么."] },
      { q: "«我叫李明。» — Кадом савол мувофиқ аст? / Which question fits this answer?", options: ["你叫什么名字？","你在哪儿？","你几岁？","你有钱吗？"], answer: "你叫什么名字？", why: ["Ҷавоб ном аст.","The answer is a name."] }
    ] },
  { id: 6, zh: '谁', title: ['Калимаи савол 谁 («кӣ»)', 'The question word 谁'], level: 'core',
    explain: ['谁 дар бораи шахс мепурсад ва ҷои ҷавобро мегирад. 谁的 — «аз они кӣ».', '谁 asks about a person and takes the place of the answer. 谁的 means “whose”.'],
    ex: [["他是谁？","Tā shì shéi?","Who is he?","Ӯ кист?"],["谁是老师？","Shéi shì lǎoshī?","Who is the teacher?","Кӣ омӯзгор аст?"],["这是谁的书？","Zhè shì shéi de shū?","Whose book is this?","Ин китоби кист?"]],
    practice: [
      { q: "那个人是 ＿＿？", hint: ["Он одам кист?","Who is that person?"], options: ["谁","哪儿","几","怎么"], answer: "谁", why: ["Дар бораи шахс — 谁.","About a person — 谁."] },
      { q: "＿＿ 是你的老师？", hint: ["Кӣ омӯзгори туст?","Who is your teacher?"], options: ["谁","什么","哪儿","几"], answer: "谁", why: ["Субъекти номаълум — 谁.","An unknown subject — 谁."] }
    ] },
  { id: 7, zh: '哪', title: ['Калимаи савол 哪 («кадом»)', 'The question word 哪'], level: 'core',
    explain: ['哪 танҳо намеояд: ҳамеша бо калимаи ҳисобӣ — 哪个, 哪本 + исм.', '哪 is always followed by a measure word: 哪个, 哪本 + noun.'],
    ex: [["哪个杯子是你的？","Nǎ ge bēizi shì nǐ de?","Which cup is yours?","Кадом пиёла аз они туст?"],["你喜欢哪本书？","Nǐ xǐhuan nǎ běn shū?","Which book do you like?","Ту кадом китобро дӯст медорӣ?"],["你想买哪个？","Nǐ xiǎng mǎi nǎ ge?","Which one do you want to buy?","Ту кадомашро харидан мехоҳӣ?"]],
    practice: [
      { q: "你喜欢 ＿＿ 本书？", hint: ["Ту кадом китобро дӯст медорӣ?","Which book do you like?"], options: ["哪","什么","哪儿","谁"], answer: "哪", why: ["«Кадом» + калимаи ҳисобӣ 本 — 哪本.","“Which” + measure word 本 — 哪本."] },
      { q: "Кадом ҷумла дуруст аст? / Which sentence is correct?", options: ["你喜欢哪个？","你喜欢哪儿个？","你喜欢哪吗？","你哪喜欢个？"], answer: "你喜欢哪个？", why: ["哪 + 个 дар ҷои объект меояд.","哪 + 个 stands in the object position."] }
    ] },
  { id: 8, zh: '哪儿', title: ['Калимаи савол 哪儿 («куҷо»)', 'The question word 哪儿'], level: 'core',
    explain: ['哪儿 дар бораи ҷой мепурсад: 你在哪儿？ 你去哪儿？ Он ҷои ҷавобро мегирад.', '哪儿 asks about a place: 你在哪儿？ 你去哪儿？ It takes the place of the answer.'],
    ex: [["你在哪儿？","Nǐ zài nǎr?","Where are you?","Ту дар куҷо ҳастӣ?"],["你去哪儿？","Nǐ qù nǎr?","Where are you going?","Ту ба куҷо меравӣ?"],["你家在哪儿？","Nǐ jiā zài nǎr?","Where is your home?","Хонаи ту дар куҷост?"]],
    practice: [
      { q: "你去 ＿＿？", hint: ["Ту ба куҷо меравӣ?","Where are you going?"], options: ["哪儿","谁","什么","几"], answer: "哪儿", why: ["Пурсиш дар бораи ҷой — 哪儿.","Asking about a place — 哪儿."] },
      { q: "商店在 ＿＿？", hint: ["Мағоза дар куҷост?","Where is the shop?"], options: ["哪儿","哪","什么","谁"], answer: "哪儿", why: ["哪 танҳо намеистад; 哪儿 — «куҷо».","哪 cannot stand alone; 哪儿 means “where”."] }
    ] },
  { id: 9, zh: '几', title: ['Калимаи савол 几 («чанд»)', 'The question word 几'], level: 'core',
    explain: ['几 барои шумораҳои хурд (одатан то 10) аст ва пеш аз калимаи ҳисобӣ меояд: 几个人, 几点, 星期几, 几岁.', '几 is for small numbers (usually under ten) and comes before a measure word: 几个人, 几点, 星期几, 几岁.'],
    ex: [["你几岁？","Nǐ jǐ suì?","How old are you?","Ту чандсолаӣ?"],["现在几点？","Xiànzài jǐ diǎn?","What time is it now?","Ҳозир соат чанд аст?"],["你有几本书？","Nǐ yǒu jǐ běn shū?","How many books do you have?","Ту чанд китоб дорӣ?"]],
    practice: [
      { q: "今天星期 ＿＿？", hint: ["Имрӯз кадом рӯзи ҳафта аст?","What day of the week is it today?"], options: ["几","什么","谁","哪"], answer: "几", why: ["Рӯзи ҳафта: 星期几？","Weekday question: 星期几？"] },
      { q: "你家有 ＿＿ 个人？", hint: ["Дар оилаи ту чанд нафар ҳаст?","How many people are in your family?"], options: ["几","哪","谁","吗"], answer: "几", why: ["Шумораи хурд — 几 + 个.","Small number — 几 + 个."] }
    ] },
  { id: 10, zh: '多少', title: ['Калимаи савол 多少 («чанд», «чӣ қадар»)', 'The question word 多少'], level: 'core',
    explain: ['多少 барои шумораҳои калон ё номуайян аст; калимаи ҳисобӣ шарт нест: 多少钱, 多少学生. 几 барои шумораи хурд, 多少 — барои ҳар шумора.', '多少 is for large or unknown quantities; a measure word is optional: 多少钱, 多少学生. 几 is for small numbers, 多少 works for any number.'],
    ex: [["这个多少钱？","Zhège duōshao qián?","How much is this?","Ин чанд пул аст?"],["你的学校有多少学生？","Nǐ de xuéxiào yǒu duōshao xuésheng?","How many students are in your school?","Дар мактаби ту чанд хонанда ҳаст?"],["一个苹果多少钱？","Yí ge píngguǒ duōshao qián?","How much is one apple?","Як себ чанд пул аст?"]],
    practice: [
      { q: "这本书 ＿＿ 钱？", hint: ["Ин китоб чанд пул аст?","How much is this book?"], options: ["多少","什么","谁","哪"], answer: "多少", why: ["Нарх — 多少钱.","Price — 多少钱."] },
      { q: "Барои шумораи калон (масалан 100) кадом калимаро мегиранд? / Which word suits a large number?", options: ["多少","几","哪","谁"], answer: "多少", why: ["几 барои шумораи хурд аст.","几 is for small numbers."] }
    ] },
  { id: 11, zh: '怎么', title: ['Калимаи савол 怎么 («чӣ тавр»)', 'The question word 怎么'], level: 'core',
    explain: ['怎么 пеш аз феъл меояд ва усули амалро мепурсад: 怎么读, 怎么写, 怎么去.', '怎么 comes before a verb and asks how something is done: 怎么读, 怎么写, 怎么去.'],
    ex: [["这个字怎么写？","Zhège zì zěnme xiě?","How do you write this character?","Ин иероглиф чӣ тавр навишта мешавад?"],["你怎么去学校？","Nǐ zěnme qù xuéxiào?","How do you get to school?","Ту чӣ тавр ба мактаб меравӣ?"],["这个字怎么读？","Zhège zì zěnme dú?","How is this character read?","Ин иероглиф чӣ тавр хонда мешавад?"]],
    practice: [
      { q: "这个字 ＿＿ 读？", options: ["怎么","怎么样","什么","哪儿"], answer: "怎么", why: ["Усули амал: 怎么 + феъл.","Method of an action: 怎么 + verb."] },
      { q: "你 ＿＿ 去学校？", hint: ["Ту чӣ тавр ба мактаб меравӣ?","How do you go to school?"], options: ["怎么","怎么样","什么","吗"], answer: "怎么", why: ["怎么 пеш аз феъл 去.","怎么 stands before the verb 去."] }
    ] },
  { id: 12, zh: '怎么样', title: ['Калимаи савол 怎么样 («чӣ хел»)', 'The question word 怎么样'], level: 'core',
    explain: ['怎么样 ҳолат ё фикрро мепурсад ва одатан дар охири ҷумла меояд: 今天天气怎么样？', '怎么样 asks about a state or opinion and usually comes at the end: 今天天气怎么样？'],
    ex: [["今天天气怎么样？","Jīntiān tiānqì zěnmeyàng?","How is the weather today?","Имрӯз ҳаво чӣ хел аст?"],["你的汉语怎么样？","Nǐ de Hànyǔ zěnmeyàng?","How is your Chinese?","Забони хитоии ту чӣ хел аст?"],["这个苹果怎么样？","Zhège píngguǒ zěnmeyàng?","How is this apple?","Ин себ чӣ хел аст?"]],
    practice: [
      { q: "你的学校 ＿＿？", hint: ["Мактаби ту чӣ хел аст?","How is your school?"], options: ["怎么样","怎么","什么","几"], answer: "怎么样", why: ["Пурсиши ҳолат — 怎么样.","Asking about a state — 怎么样."] },
      { q: "«今天天气怎么样？» — Кадом ҷавоб мувофиқ аст? / Which answer fits?", options: ["今天很冷。","我在家。","我是学生。","三块钱。"], answer: "今天很冷。", why: ["Ҷавоб ҳолати ҳаворо тавсиф мекунад.","The answer describes the weather."] }
    ] },
  { id: 13, zh: '的', title: ['Ҳиссачаи 的 (тааллуқ)', 'The particle 的'], level: 'core',
    explain: ['的 байни соҳиб ва чиз меояд: 我的书 (китоби ман). Бо наздикон ва оила 的 одатан партофта мешавад: 我妈妈, 我家.', '的 goes between owner and thing: 我的书 (my book). With close relations 的 is usually dropped: 我妈妈, 我家.'],
    ex: [["我的书","wǒ de shū","my book","китоби ман"],["老师的杯子","lǎoshī de bēizi","the teacher's cup","пиёлаи омӯзгор"],["我妈妈是医生。","Wǒ māma shì yīshēng.","My mother is a doctor.","Модари ман табиб аст."]],
    practice: [
      { q: "这是 ＿＿ 书。", hint: ["Ин китоби ман аст.","This is my book."], options: ["我的","我吗","我了","我不"], answer: "我的", why: ["Тааллуқ: 我 + 的 + исм.","Possession: 我 + 的 + noun."] },
      { q: "老师 ＿＿ 杯子在桌子上。", hint: ["Пиёлаи омӯзгор рӯи миз аст.","The teacher's cup is on the table."], options: ["的","吗","了","不"], answer: "的", why: ["Исм + 的 + исм.","Noun + 的 + noun."] }
    ] },
  { id: 14, zh: '不', title: ['Инкор бо 不', 'Negation with 不'], level: 'core',
    explain: ['不 феъл ва сифатро инкор мекунад (одат, ҳозира, хоҳиш): 不是, 不喝, 不冷. Пеш аз тони чорум 不 ҳамчун bú хонда мешавад: 不是 bú shì.', '不 negates verbs and adjectives (habits, present, wishes): 不是, 不喝, 不冷. Before a fourth tone 不 is read bú: 不是 bú shì.'],
    ex: [["我不是学生。","Wǒ bú shì xuésheng.","I am not a student.","Ман донишҷӯ (хонанда) нестам."],["他不喝茶。","Tā bù hē chá.","He does not drink tea.","Ӯ чой наменӯшад."],["今天不冷。","Jīntiān bù lěng.","It is not cold today.","Имрӯз хунук нест."]],
    practice: [
      { q: "我 ＿＿ 喝茶。", hint: ["Ман чой наменӯшам.","I do not drink tea."], options: ["不","没","吗","了"], answer: "不", why: ["Одат ё хоҳиш — 不.","A habit or wish — 不."] },
      { q: "今天 ＿＿ 热。", hint: ["Имрӯз гарм нест.","It is not hot today."], options: ["不","没有","了","吗"], answer: "不", why: ["Сифат бо 不 инкор мешавад.","Adjectives are negated with 不."] }
    ] },
  { id: 15, zh: '没', title: ['Инкор бо 没', 'Negation with 没'], level: 'core',
    explain: ['没 «надоштан» (没有) ва амали гузаштаро инкор мекунад: 没去 (нарафт), 没吃 (нахӯрд). Дар ин ҳолат 了 истифода намешавад.', '没 negates “have” (没有) and past actions: 没去 (did not go), 没吃 (did not eat). 了 is not used then.'],
    ex: [["我没有钱。","Wǒ méiyǒu qián.","I have no money.","Ман пул надорам."],["我昨天没去学校。","Wǒ zuótiān méi qù xuéxiào.","I did not go to school yesterday.","Дирӯз ман ба мактаб нарафтам."],["他没吃米饭。","Tā méi chī mǐfàn.","He did not eat rice.","Ӯ биринҷи пухтаро нахӯрд."]],
    practice: [
      { q: "我昨天 ＿＿ 去学校。", hint: ["Дирӯз ман ба мактаб нарафтам.","I did not go to school yesterday."], options: ["没","不","吗","的"], answer: "没", why: ["Амали гузашта — 没.","A past action — 没."] },
      { q: "我 ＿＿ 杯子。", hint: ["Ман пиёла надорам.","I do not have a cup."], options: ["没有","不有","没是","不没"], answer: "没有", why: ["Инкори 有 — 没有.","The negative of 有 is 没有."] }
    ] },
  { id: 16, zh: '了', title: ['Ҳиссачаи 了 дар сатҳи асосӣ', 'The particle 了 (basic use)'], level: 'mixed',
    explain: ['Пас аз феъл 了 анҷоми амалро нишон медиҳад: 我吃了米饭. Дар охири ҷумла 了 вазъи навро ифода мекунад: 八点了.', 'After a verb, 了 shows a completed action: 我吃了米饭. At the end of a sentence it shows a new situation: 八点了.'],
    note: ['Истифодаи аввал (амали анҷомёфта) барои сатҳи асосӣ аст; истифодаи дуюм (тағйири вазъият) тавзеҳи иловагист.', 'The first use (completed action) is basic; the second use (change of situation) is a supplementary explanation.'],
    ex: [["我吃了米饭。","Wǒ chī le mǐfàn.","I ate rice.","Ман биринҷи пухта хӯрдам."],["他买了三个苹果。","Tā mǎi le sān ge píngguǒ.","He bought three apples.","Ӯ се себ харид."],["现在八点了。","Xiànzài bā diǎn le.","It is eight o'clock now.","Ҳозир соати ҳашт шуд."]],
    practice: [
      { q: "我吃 ＿＿ 米饭。", hint: ["Ман биринҷи пухта хӯрдам.","I ate rice."], options: ["了","吗","的","不"], answer: "了", why: ["Амали анҷомёфта: феъл + 了.","Completed action: verb + 了."] },
      { q: "Кадом ҷумла амали анҷомёфтаро нишон медиҳад? / Which sentence shows a completed action?", options: ["我看了电影。","我喜欢电影。","我想看电影。","我不看电影。"], answer: "我看了电影。", why: ["Танҳо дар ҷумлаи аввал 了 пас аз феъл омадааст.","Only the first sentence has 了 after the verb."] }
    ] },
  { id: 17, zh: '个 / 本 / 块', title: ['Калимаҳои ҳисобӣ (аз ҷумла 个)', 'Measure words, especially 个'], level: 'core',
    explain: ['Байни шумора ва исм калимаи ҳисобӣ меояд: шумора + калимаи ҳисобӣ + исм. 个 — калимаи умумӣ; 本 — барои китоб; 块 — барои пул (юан).', 'A measure word goes between number and noun: number + measure word + noun. 个 is the general one; 本 is for books; 块 is for money (yuan).'],
    ex: [["一个朋友","yí ge péngyou","one friend","як дӯст"],["三本书","sān běn shū","three books","се китоб"],["五块钱","wǔ kuài qián","five yuan","панҷ юан"]],
    practice: [
      { q: "我有三 ＿＿ 书。", options: ["本","个","块","岁"], answer: "本", why: ["Барои китоб калимаи ҳисобии 本 истифода мешавад.","Books take the measure word 本."] },
      { q: "这个苹果三 ＿＿ 钱。", options: ["块","本","岁","点"], answer: "块", why: ["Барои пул 块 истифода мешавад.","Money uses 块."] }
    ] },
  { id: 18, zh: '时间', title: ['Ибораҳои вақт', 'Basic time expressions'], level: 'core',
    explain: ['Калимаҳои вақт (现在, 今天, 明天, 上午) пеш аз феъл ё дар аввали ҷумла меоянд: 我明天去学校. Соат: шумора + 点; давомнокӣ: шумора + 分钟.', 'Time words (现在, 今天, 明天, 上午) come before the verb or at the start: 我明天去学校. Clock time: number + 点; duration: number + 分钟.'],
    ex: [["现在三点。","Xiànzài sān diǎn.","It is three o'clock now.","Ҳозир соати се аст."],["我上午学习汉语。","Wǒ shàngwǔ xuéxí Hànyǔ.","I study Chinese in the morning.","Ман пешин забони хитоӣ меомӯзам."],["我学习十分钟。","Wǒ xuéxí shí fēnzhōng.","I study for ten minutes.","Ман даҳ дақиқа дарс мехонам."]],
    practice: [
      { q: "我 ＿＿ 去学校。", hint: ["Ман фардо ба мактаб меравам.","I am going to school tomorrow."], options: ["明天","昨天","不","吗"], answer: "明天", why: ["«Фардо» — 明天.","“Tomorrow” — 明天."] },
      { q: "Кадом ҷумла дуруст аст? / Which sentence is correct?", options: ["我下午去商店。","我去下午商店。","去我下午商店。","我去商店下午。"], answer: "我下午去商店。", why: ["Вақт пеш аз феъл меояд.","The time word goes before the verb."] }
    ] },
  { id: 19, zh: '日期 / 星期', title: ['Сана ва рӯзҳои ҳафта', 'Dates and days of the week'], level: 'core',
    explain: ['Моҳ = шумора + 月, рӯзи моҳ = шумора + 号. Рӯзи ҳафта: 星期 + шумора: 星期一 — душанбе, 星期二 — сешанбе, 星期三 — чоршанбе, 星期四 — панҷшанбе, 星期五 — ҷумъа, 星期六 — шанбе. Якшанбе: 星期天/星期日.', 'Month = number + 月, day = number + 号. Weekday: 星期 + number: 星期一 Monday … 星期六 Saturday. Sunday is 星期天/星期日.'],
    note: ['Калимаи 天 дар 星期天 аз рӯйхати калимаҳои HSK 1 берун аст (иловагӣ).', 'The character 天 in 星期天 is outside the HSK 1 word list (supplementary).'],
    ex: [["今天十月三号。","Jīntiān shí yuè sān hào.","Today is October 3.","Имрӯз 3-юми октябр аст."],["明天星期一。","Míngtiān xīngqī yī.","Tomorrow is Monday.","Фардо душанбе аст."],["星期六我不工作。","Xīngqī liù wǒ bù gōngzuò.","I do not work on Saturday.","Рӯзи шанбе ман кор намекунам."]],
    practice: [
      { q: "Душанбе / Monday = ＿＿", options: ["星期一","星期二","星期五","星期六"], answer: "星期一", why: ["星期 + 一 = душанбе.","星期 + 一 = Monday."] },
      { q: "今天 ＿＿ 月五号。", hint: ["Имрӯз 5-уми июл аст.","Today is July 5."], options: ["七","九","二","八"], answer: "七", why: ["Июл — 七月.","July is 七月."] }
    ] },
  { id: 20, zh: '数字', title: ['Рақамҳо ва шумурдан', 'Basic numbers and counting'], level: 'core',
    explain: ['1–10: 一二三四五六七八九十. 11–19: 十 + рақам (十五 = 15). 20, 30…: рақам + 十 (二十 = 20, 三十 = 30). 21 = 二十一.', '1–10: 一二三四五六七八九十. 11–19: 十 + digit (十五 = 15). 20, 30…: digit + 十 (二十 = 20, 三十 = 30). 21 = 二十一.'],
    ex: [["十二","shí'èr","12","дувоздаҳ"],["二十","èrshí","20","бист"],["三十五","sānshíwǔ","35","си ва панҷ"]],
    practice: [
      { q: "15 = 十 ＿＿", options: ["五","二","八","一"], answer: "五", why: ["15 = 十 + 五.","15 = 十 + 五."] },
      { q: "20 = ＿＿ 十", options: ["二","三","一","五"], answer: "二", why: ["20 = 二 + 十.","20 = 二 + 十."] }
    ] },
  { id: 21, zh: '喜欢', title: ['Ифодаи «дӯст доштан» бо 喜欢', 'Expressing likes with 喜欢'], level: 'core',
    explain: ['喜欢 + исм ё феъл: 我喜欢茶, 我喜欢看电影. Инкор: 不喜欢. Бо 很 меояд: 我很喜欢.', '喜欢 + noun or verb: 我喜欢茶, 我喜欢看电影. Negative: 不喜欢. It can take 很: 我很喜欢.'],
    ex: [["我喜欢茶。","Wǒ xǐhuan chá.","I like tea.","Ман чойро дӯст медорам."],["我喜欢看电影。","Wǒ xǐhuan kàn diànyǐng.","I like watching movies.","Ман дидани филмро дӯст медорам."],["她喜欢吃苹果。","Tā xǐhuan chī píngguǒ.","She likes eating apples.","Ӯ хӯрдани себро дӯст медорад."]],
    practice: [
      { q: "我 ＿＿ 看电影。", hint: ["Ман дидани филмро дӯст медорам.","I like watching movies."], options: ["喜欢","是","有","在"], answer: "喜欢", why: ["«Дӯст доштан» — 喜欢.","“To like” — 喜欢."] },
      { q: "他不 ＿＿ 喝茶。", hint: ["Ӯ нӯшидани чойро дӯст намедорад.","He does not like drinking tea."], options: ["喜欢","了","吗","的"], answer: "喜欢", why: ["不 + 喜欢 + феъл.","不 + 喜欢 + verb."] }
    ] },
  { id: 22, zh: '会 / 能', title: ['Феълҳои модалӣ 会 ва 能', 'Modal verbs 会 and 能'], level: 'mixed',
    explain: ['会 — донистани малака (омӯхта шудааст): 我会说汉语. 能 — тавоноӣ ё имкон: 你能来吗？ Инкор: 不会, 不能.', '会 means you have learned how to do something: 我会说汉语. 能 means ability or possibility: 你能来吗？ Negatives: 不会, 不能.'],
    note: ['Фарқи нозуки 会 ва 能 (масалан иҷозат) тавзеҳи иловагист.', 'The finer difference between 会 and 能 (for example permission) is a supplementary explanation.'],
    ex: [["我会说汉语。","Wǒ huì shuō Hànyǔ.","I can speak Chinese.","Ман бо забони хитоӣ гап зада метавонам."],["你能来吗？","Nǐ néng lái ma?","Can you come?","Ту омада метавонӣ?"],["我不会写这个字。","Wǒ bú huì xiě zhège zì.","I cannot write this character.","Ман ин иероглифро навишта наметавонам (намедонам)."]],
    practice: [
      { q: "我 ＿＿ 说汉语。", hint: ["Ман хитоӣ гап задан медонам (омӯхтаам).","I know how to speak Chinese (I learned it)."], options: ["会","是","有","在"], answer: "会", why: ["Малакаи омӯхташуда — 会.","A learned skill — 会."] },
      { q: "你 ＿＿ 来我家吗？", hint: ["Ту ба хонаи ман омада метавонӣ?","Can you come to my home?"], options: ["能","没","了","的"], answer: "能", why: ["Имкон — 能.","Possibility — 能."] }
    ] },
  { id: 23, zh: '在', title: ['Ҷумлаҳои ҷойгиршавӣ', 'Basic location sentences'], level: 'core',
    explain: ['A 在 B — «A дар B аст». Бо калимаҳои ҷой: A 在 B 上/里/前面/后面. Ҷой бо 在 пеш аз феъл меояд: 我在家看电视.', 'A 在 B means “A is at B”. With position words: A 在 B 上/里/前面/后面. A place with 在 goes before the verb: 我在家看电视.'],
    ex: [["我在家。","Wǒ zài jiā.","I am at home.","Ман дар хона ҳастам."],["书在桌子上。","Shū zài zhuōzi shàng.","The book is on the table.","Китоб рӯи миз аст."],["商店在学校前面。","Shāngdiàn zài xuéxiào qiánmian.","The shop is in front of the school.","Мағоза дар назди мактаб аст."]],
    practice: [
      { q: "我 ＿＿ 家。", hint: ["Ман дар хона ҳастам.","I am at home."], options: ["在","有","吗","了"], answer: "在", why: ["Ҷойгиршавӣ — 在.","Location — 在."] },
      { q: "杯子在桌子 ＿＿。", hint: ["Пиёла рӯи миз аст.","The cup is on the table."], options: ["上","里","后面","前面"], answer: "上", why: ["«Рӯи миз» — 桌子上.","“On the table” — 桌子上."] }
    ] },
  { id: 24, zh: '常用句型', title: ['Қолибҳои маъмули муошират', 'Common sentence patterns'], level: 'extra',
    explain: ['Қолибҳои ҳаррӯза: 我想 + феъл (мехоҳам…), 请 + феъл (лутфан…), 我叫 + ном, 你好吗？— 我很好, A 和 B.', 'Everyday patterns: 我想 + verb (I want to…), 请 + verb (please…), 我叫 + name, 你好吗？— 我很好, A 和 B.'],
    note: ['Ин бахш ҷамъбасти иловагӣ аст, на мавзӯи алоҳидаи грамматикӣ.', 'This section is a supplementary summary, not a separate grammar point.'],
    ex: [["我想喝水。","Wǒ xiǎng hē shuǐ.","I want to drink water.","Ман мехоҳам об нӯшам."],["请坐。","Qǐng zuò.","Please sit down.","Лутфан, шинед."],["我和你是朋友。","Wǒ hé nǐ shì péngyou.","You and I are friends.","Ману ту дӯстем."]],
    practice: [
      { q: "请 ＿＿。", hint: ["Лутфан, шинед.","Please sit down."], options: ["坐","吗","的","了"], answer: "坐", why: ["请 + феъл.","请 + verb."] },
      { q: "我 ＿＿ 去北京。", hint: ["Ман мехоҳам ба Пекин равам.","I want to go to Beijing."], options: ["想","是","有","了"], answer: "想", why: ["想 + феъл — «хостан».","想 + verb — “to want”."] }
    ] }
]
