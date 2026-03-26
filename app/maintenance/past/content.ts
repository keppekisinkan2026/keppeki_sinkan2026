import { createElement } from "react";
import {
  pastGalleryImageSources,
  pastPosterImageSources,
  type PastPerformance,
} from "@/components/maintenance/past/pastShared";

const sinkanTitle = [
  "劇団ケッペキ2025年度新入生歓迎企画",
  createElement("br", { key: "sinkan-title-break-1" }),
  "ピチピチパチパチプラタナス公演",
  createElement("br", { key: "sinkan-title-break-2" }),
  "『いつだって今だもん』",
];

const midhiTitle = [
  "劇団ケッペキ2025年度新入生育成企画",
  createElement("br", { key: "midhi-title-break-1" }),
  "日々語尾飛び交うミディアム公演",
  createElement("br", { key: "midhi-title-break-2" }),
  "『六畳半の水槽』『白い旅人』",
  createElement("br", { key: "midhi-title-break-3" }),
  "『いつわりの崩壊』『雨露聊かも』",
];

const natuTitle = [
  "劇団ケッペキ",
  createElement("br", { key: "natu-title-break-1" }),
  "まだノリノリのナツナツフリーライド公演",
  createElement("br", { key: "natu-title-break-2" }),
  "『まだ始まらぬ葬儀』",
];

const nfTitle = [
  "劇団ケッペキ",
  createElement("br", { key: "nf-title-break-1" }),
  "足を遊ばせる波打ちkiwakiwa公演",
  createElement("br", { key: "nf-title-break-2" }),
  "『赤鬼』",
];

const huyuTitle = [
  "劇団ケッペキ",
  createElement("br", { key: "huyu-title-break-1" }),
  "地を駆ける郡鳥の越冬公演",
  createElement("br", { key: "huyu-title-break-2" }),
  "『舟の箱』",
];

const sinzinTitle = [
  "劇団ケッペキ",
  createElement("br", { key: "sinzin-title-break-1" }),
  "いの一番の春一番！サンサン新人公演",
  createElement("br", { key: "sinzin-title-break-2" }),
  "『あかるい夜にくらい朝がくる。』",
];

const sotuTitle = [
  "劇団ケッペキ",
  createElement("br", { key: "sotu-title-break-1" }),
  "卒業ユニット公演",
  createElement("br", { key: "sotu-title-break-2" }),
  "『天使ちゃんたち』",
];

type ScatterOffset = NonNullable<PastPerformance["scatterOffsets"]>[number];

function createScatterOffsets(count: number, offsets: readonly ScatterOffset[]) {
  return Array.from({ length: count }, (_, index) => offsets[index] ?? { x: 0, y: 0, rotation: 0 });
}

const sinkanScatterOffsets = createScatterOffsets(pastGalleryImageSources.sinkan.length, [
  { x: 100, y: -18, rotation: -14 },
  { x: -100, y: -12, rotation: 11 },
  { x: -30, y: -260, rotation: 16 },
  { x: -16, y: -300, rotation: -12 },
  { x: -286, y: -500, rotation: -14 },
  { x: 274, y: -500, rotation: 13 },
]);

const midhiScatterOffsets = createScatterOffsets(pastGalleryImageSources.midhi.length, [
  { x: 100, y: -22, rotation: -12 },
  { x: -500, y: -40, rotation: 14 },
  { x: -100, y: -500, rotation: -30 },
  { x: -30, y: -300, rotation: -10 },
  { x: -292, y: -500, rotation: 12 },
  { x: 300, y: -500, rotation: -5 },
  { x: 400, y: -800, rotation: 6 },
  { x: 0, y: -500, rotation: -20 },
]);

const natuScatterOffsets = createScatterOffsets(pastGalleryImageSources.natu.length, [
  { x: 100, y: 50, rotation: -15 },
  { x: -400, y: -50, rotation: 12 },
  { x: -50, y: -300, rotation: -30 },
  { x: 100, y: -200, rotation: 15 },
]);

const nfScatterOffsets = createScatterOffsets(pastGalleryImageSources.nf.length, [
  { x: 100, y: 300, rotation: -15 },
  { x: -400, y: -50, rotation: 12 },
  { x: -200, y: -50, rotation: -30 },
  { x: 300, y: -100, rotation: 15 },
]);

const huyuScatterOffsets = createScatterOffsets(pastGalleryImageSources.huyu.length, [
  { x: 100, y: 300, rotation: -15 },
  { x: -400, y: -50, rotation: 12 },
  { x: -200, y: -50, rotation: -30 },
  { x: 300, y: -100, rotation: 15 },
]);

const sinzinScatterOffsets = createScatterOffsets(pastGalleryImageSources.sinzin.length, [
  { x: 100, y: 50, rotation: -15 },
  { x: -400, y: -50, rotation: 12 },
  { x: -50, y: -300, rotation: -30 },
  { x: 100, y: -200, rotation: 15 },
]);

const sotuScatterOffsets = createScatterOffsets(pastGalleryImageSources.sotu.length, [
  { x: 100, y: 300, rotation: -15 },
  { x: -400, y: -50, rotation: 12 },
  { x: -200, y: -50, rotation: -30 },
  { x: 300, y: -100, rotation: 15 },
]);

export const pastPerformances: PastPerformance[] = [
  {
    id: 1,
    key: "sinkan",
    title: sinkanTitle,
    synopsis:
      "THEATRE E9 KYOTOでの新歓公演。「二十億光年の孤独」で知られる詩人、谷川俊太郎による豊かな言葉に満ちた脚本を、演劇のあらゆる要素を掛け合わすことを意識し、劇場空間に立ち上げました。２ヶ月間、座組をあげて、時空と向き合って出来上がった作品は、懐かしい過去で、輝かしい未来の姿となって現れました。そして、E9に立ち現れた空間は、私たちを「今」に導くようでした。",
    galleryImageSources: pastGalleryImageSources.sinkan,
    posterImageSource: pastPosterImageSources.sinkan,
    scatterOffsets: sinkanScatterOffsets,
  },
  {
    id: 2,
    key: "midhi",
    title: midhiTitle,
    synopsis:
      "５月に入団した新入団員が初めて参加した公演です。25年度は4班に分かれてそれぞれ30-40分ほどの作品を作りあげました。上回生のサポートを受けながら参加できるので、演劇が初めての方も安心です！先輩や同期とも仲良くなれます♪",
    galleryImageSources: pastGalleryImageSources.midhi,
    posterImageSource: pastPosterImageSources.midhi,
    scatterOffsets: midhiScatterOffsets,
  },
  {
    id: 3,
    key: "natu",
    title: natuTitle,
    synopsis:
      "大学内の学生集会所という体育館のような場所を団員の手で劇場に作り変えて行った公演です。この劇は、愛、欲望、嫉妬、そして身体をめぐる、触れたい、奪いたい、わかりたい、そんな人間のやっかいな衝動を写真、歌、祈り、そして言葉で立ち上げてみます。きれいごとでは終わらない、痛くて、美しくて、どこか可笑しい恋と執着の劇ですが、夏の唯一無二の思い出になります。夏休みをまるまる使って惜しみなくかけた手間暇が作品から伝わってきます。",
    galleryImageSources: pastGalleryImageSources.natu,
    posterImageSource: pastPosterImageSources.natu,
    scatterOffsets: natuScatterOffsets,
  },
  {
    id: 4,
    key: "nf",
    title: nfTitle,
    synopsis:
      "11月祭では1996年に初演された『赤鬼』（作：野田秀樹）を上演しました。技術を先輩から継承し脂の乗った2、3回生（当時）が野田秀樹特有のセリフ回しや世界観に挑戦しました。11月祭での公演はコンパクトな舞台でありながら、たくさんの方が見に来きていただきました。学生演劇を見たことがない方にもケッペキを知ってもらえるいい機会になりました。",
    galleryImageSources: pastGalleryImageSources.nf,
    posterImageSource: pastPosterImageSources.nf,
    scatterOffsets: nfScatterOffsets,
  },
  {
    id: 5,
    key: "huyu",
    title: huyuTitle,
    synopsis:
      "京大構内に位置する西部講堂という大きな劇場で、コロナ禍を経て、およそ5年ぶりに打たれた本公演。団員の多くが初めて利用する劇場の、安全で円滑な使い方を皆で足並みを揃えて学び、継承していきました。暗中模索の中から現れた劇空間は、舞台と光、音、そして身体とが混じり合った、重厚な幻への入り口に姿を変えました。冷え込んだ京都で、皆でお鍋を突きながら挑戦を繰り返した経験は、学生ならではの掛け替えのないものでした。",
    galleryImageSources: pastGalleryImageSources.huyu,
    posterImageSource: pastPosterImageSources.huyu,
    scatterOffsets: huyuScatterOffsets,
  },
  {
    id: 6,
    key: "sinzin",
    title: sinzinTitle,
    synopsis:
      "2025年5月に入団した33期による新人公演。 オリジナル脚本の執筆から運営に至る全てを一回生の手で取り仕切りました。大胆な曲線と影絵の演出が目を引く、モノクロームの舞台。音響・照明・衣装・役者が共鳴し、多彩な空間が立ち上がるのが見所です。各々が表現を模索し、作品は最後まで生き物のように変化し続けていく。その不自由で、どうしようもなく自由なうねりに巻き込まれること。 それこそが、劇団員の醍醐味なのかもしれないと思わされました。",
    galleryImageSources: pastGalleryImageSources.sinzin,
    posterImageSource: pastPosterImageSources.sinzin,
    scatterOffsets: sinzinScatterOffsets,
  },
  {
    id: 7,
    key: "sotu",
    title: sotuTitle,
    synopsis:
      "昨年度卒団した30期生の卒業公演です。舞台は真っ白でふわふわな天上界。そこに集まった天使ちゃんたちは、各々の時間を好き勝手に過ごします。私たちみんなが持つ息や骨、身近な存在への愛、あるもののために自分が出来ることとは何なのか？30期生の新たなお引越しに向け、これまでの全てを詰め込みました。",
    galleryImageSources: pastGalleryImageSources.sotu,
    posterImageSource: pastPosterImageSources.sotu,
    scatterOffsets: sotuScatterOffsets,
  },
];
