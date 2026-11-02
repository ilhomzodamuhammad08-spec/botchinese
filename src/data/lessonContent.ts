export interface GrammarNote { tg: string; en: string; zh: string }

/** Short grammar note per lesson (index = lesson id). Fuller grammar course comes in Part 4. */
export const LESSON_GRAMMAR: Record<number, GrammarNote> = {
  1: { zh: '谢谢！— 不客气。', tg: 'Ҷавоби «谢谢» одатан «不客气» аст, ҷавоби «对不起» — «没关系». Ин ибораҳо ҷуфт-ҷуфт истифода мешаванд.', en: 'The usual reply to 谢谢 is 不客气, and the reply to 对不起 is 没关系. These expressions come in pairs.' },
  2: { zh: '我的朋友', tg: 'Ҳиссачаи 的 тааллуқро нишон медиҳад: 我的朋友 — дӯсти ман. «Мо» бо калимаи алоҳидаи 我们 ифода мешавад.', en: 'The particle 的 shows possession: 我的朋友 means “my friend”. “We” is the separate word 我们.' },
  3: { zh: '十一', tg: 'Рақамҳо аз 1 то 10: 一 … 十. Барои 11–19 «十 + рақам» мегӯянд: 十一 — 11.', en: 'Numbers 1–10 are 一 … 十. For 11–19 say “十 + digit”: 十一 is 11.' },
  4: { zh: '我明天去学校。', tg: 'Вақт пеш аз феъл меояд: 我明天去学校. Соат: «рақам + 点»: 三点. Сана: сол → моҳ → рӯз.', en: 'Time words come before the verb: 我明天去学校. Clock time is “number + 点”: 三点. Dates go year → month → day.' },
  5: { zh: '我女儿三岁。', tg: 'Синну сол бо «шумора + 岁» ифода мешавад: 三岁. Савол: 你几岁？', en: 'Age is “number + 岁”: 三岁. The question is 你几岁？' },
  6: { zh: '我会说汉语。你能来吗？', tg: '会 — донистани малака (омӯхта шудааст), 能 — тавоноӣ ё иҷозат.', en: '会 means you have learned how to do something; 能 means ability or permission.' },
  7: { zh: '三本书', tg: 'Байни шумора ва исм калимаи ҳисобӣ меояд: «шумора + 本 + исм» — 三本书.', en: 'A measure word goes between number and noun: “number + 本 + noun”, e.g. 三本书.' },
  8: { zh: '他在医院工作。', tg: 'Ҷой пеш аз феъл меояд: «在 + ҷой + феъл» — 他在医院工作.', en: 'Place comes before the verb: “在 + place + verb”, e.g. 他在医院工作.' },
  9: { zh: '我想喝水。我喜欢吃水果。', tg: '想 ва 喜欢 пеш аз феъл меоянд: 想喝水 (мехоҳам нӯшам), 喜欢吃水果 (хӯрдани меваро дӯст медорам).', en: '想 and 喜欢 go before another verb: 想喝水 (want to drink water), 喜欢吃水果 (like eating fruit).' },
  10: { zh: '这个多少钱？三块。', tg: 'Нархро бо 多少钱 мепурсанд. Ҷавоб: «шумора + 块».', en: 'Ask the price with 多少钱. Answer with “number + 块”.' },
  11: { zh: '商店在学校前面。', tg: 'Ҷойгиршавӣ: «X + 在 + Y + 前面/后面/上» — X дар пеш/паси/рӯи Y аст.', en: 'Location: “X + 在 + Y + 前面/后面/上” — X is in front of / behind / on Y.' },
  12: { zh: '他是医生。我有书。', tg: '是 — «будан» (шахс ё чиз кист), 有 — «доштан». Инкор: 不是, 没有.', en: '是 means “to be” (identity), 有 means “to have”. Negatives: 不是, 没有.' },
  13: { zh: '她很漂亮。我不是老师。', tg: 'Сифат одатан бо 很 меояд: 她很漂亮. Бо феъли 是 инкор: 不是.', en: 'An adjective usually takes 很: 她很漂亮. Negate 是 with 不: 不是.' },
  14: { zh: '你是学生吗？', tg: 'Ҳиссачаи 吗 дар охири ҷумла саволи «ҳа/не» месозад. Калимаи савол (什么, 哪儿) ҷои ҷавобро мегирад.', en: '吗 at the end makes a yes/no question. A question word (什么, 哪儿) takes the place of the answer.' },
  15: { zh: '我吃了米饭。我们都是学生。', tg: '了 анҷоми амалро нишон медиҳад. 都 («ҳама») пеш аз феъл меояд: 我们都是学生.', en: '了 marks a completed action. 都 (“all”) goes before the verb: 我们都是学生.' }
}
