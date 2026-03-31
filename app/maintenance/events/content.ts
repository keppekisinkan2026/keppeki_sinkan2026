import type { ReactNode } from "react";

export type WelcomeEventPhoneModalLayout = {
  paperTop?: string;
  paperRight?: string;
  paperBottom?: string;
  paperLeft?: string;
  contentPadding?: string;
  contentGap?: string;
  titleFontSize?: string;
  titleLineHeight?: string;
  titleMarginBottom?: string;
  textPadding?: string;
  textFontSize?: string;
  textLineHeight?: string;
  textMaxChars?: number;
  textMinChars?: number;
};

export type WelcomeEvent = {
  id: string;
  date: string;
  title: string;
  description: ReactNode;
  shape?: "circle" | "capsule";
  position: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
};

const defaultWelcomeEventPhoneModalLayout: WelcomeEventPhoneModalLayout = {
  paperTop: "39.5%",
  paperRight: "8.2%",
  paperBottom: "23.5%",
  paperLeft: "8.2%",
  contentPadding: "16px 16px 14px",
  contentGap: "10px",
  titleFontSize: "clamp(20px, 5.8vw, 30px)",
  titleLineHeight: "1.25",
  titleMarginBottom: "0px",
  textPadding: "2px 6px 2px 2px",
  textFontSize: "clamp(12px, 3.9vw, 16px)",
  textLineHeight: "1.82",
  textMaxChars: 17,
  textMinChars: 5,
};

export const welcomeEventPhoneModalLayoutOverrides: Partial<Record<string, WelcomeEventPhoneModalLayout>> = {};

export function getWelcomeEventPhoneModalLayout(event: WelcomeEvent): WelcomeEventPhoneModalLayout {
  return {
    ...defaultWelcomeEventPhoneModalLayout,
    ...(welcomeEventPhoneModalLayoutOverrides[event.id] ?? {}),
  };
}

export const EVENT_CALENDAR_IMAGE = {
  src: "/images/calendar.JPG",
  width: 1034,
  height: 1582,
} as const;

export const welcomeEventFrameSources = [
  "/images/image1.PNG",
  "/images/image2.PNG",
  "/images/image3.PNG",
  "/images/image4.PNG",
  "/images/image5.PNG",
] as const;

export const welcomeEvents: WelcomeEvent[] = [
  { id: "ev1", date: "3/28", title: "立て看イベント", description: "京都大学といえば立て看板！入試会場に貼られているモノが有名ですが、サークルごとの宣伝物として作ることもあります。そんな宣伝立て看板を一緒に作ってみよう！という企画です。板にガッツリペンキでイラストを描くというのはなかなか無い体験です。一回生に体験しておくべき新歓イベントとしては、演劇関係なくかなりおすすめです。", position: { top: "24.5%", left: "76.4%", width: "12.0%", height: "12.0%" } },
  { id: "ev2", date: "3/29", title: "役者体験会", description: "団員の指導のもと、短めの台本を用いて、読み合わせ、演出づけ、本番までを追体験できます。初めて演じてみるという方も、高校演劇に浸ってきたという子も、役に向かい合う一歩目として、是非皆さんに体験してほしいです！", position: { top: "23.3%", left: "89%", width: "12.0%", height: "12.0%" } },
  { id: "ev3", date: "4/2~4/3", title: "お花見", description: "紅萌祭の裏で河川敷にてお花見をします！演劇興味あるけどいきなり役者体験はちょっと....という方！まずは団員とゆる〜く桜を愛でましょう。", shape: "capsule", position: { top: "35.6%", left: "56%", width: "26%", height: "8%" } },
  { id: "ev4", date: "4/4", title: "大規模上映会", description: "劇団ケッペキの過去公演を上演します！「劇団ケッペキってどんな舞台を作るんだろう.....?」「今までどんな演目を上演したんだろう」と気になっているそこのアナタ。タダで観劇できるチャンスです。", position: { top: "35.5%", left: "75%", width: "12.0%", height: "12.0%" } },
  { id: "ev5", date: "4/5", title: "衣装小道具イベント", description: "用意した衣装と過去の台本を使って、自分なりの『ソフトプラン』を立ててみよう！『このキャラならこんな服着そうじゃない？』なんてワイワイ言いながら、キャラクターを形にする楽しさを体験しに来てください！", position: { top: "33.5%", left: "87%", width: "12.0%", height: "12.0%" } },
  { id: "ev6", date: "4/5", title: "役者体験会", description: "団員の指導のもと、短めの台本を用いて、読み合わせ、演出づけ、本番までを追体験できます。初めて演じてみるという方も、高校演劇に浸ってきたという子も、役に向かい合う一歩目として、是非皆さんに体験してほしいです！", position: { top: "38%", left: "89.5%", width: "12.0%", height: "12.0%" } },
  { id: "ev7", date: "4/6", title: "宣伝美術イベント", description: "京阪七条の周辺をぶらっと散策して写真をパシャリ。それを加工して、公演の顔となる宣伝美術を作ってみましょう。スマホ一台あればOK。貴方のセンスを爆発させましょう。", position: { top: "44%", left: "14%", width: "12.0%", height: "12.0%" } },
  { id: "ev8", date: "4/6", title: "舞台イベント", description: "実際の工具を使って、椅子作りに挑戦！インパクトドライバーとか触ったことない……って人でも大丈夫。先輩がサポートするので、舞台を支えるモノづくりの面白さを肌で感じてみてください！", position: { top: "48%", left: "12%", width: "12.0%", height: "12.0%" } },
  { id: "ev9", date: "4/7", title: "メイク実験見学", description: "メイク実験とは、衣装小道具班が役者の本番メイクをどのようにするか実験することです。どんな雰囲気でメイクが決められていくのか見てみよう！", position: { top: "46.6%", left: "25%", width: "12.0%", height: "12.0%" } },
  { id: "ev10", date: "4/8", title: "映像イベント", description: "自分で映像を作って、実際にスクリーンに流してみよう！編集から放映まで、舞台を彩る映像演出の裏側をまるっと体験できちゃいます。", position: { top: "46.4%", left: "37.5%", width: "12.0%", height: "12.0%" } },
  { id: "ev11", date: "4/9", title: "照明イベント", description: "実際の台本を使って、一場面を演じる役者さんをライトで照らしてみよう！『このシーンなら、どんな色の光が合うかな？』なんて考えながら、舞台の空気をガラッと変える照明の魔法を体験しに来てください！", position: { top: "47.0%", left: "51.0%", width: "12.0%", height: "12.0%" } },
  { id: "ev12", date: "4/11", title: "流しそうめんイベント", description: "ただ流して食べるだけじゃない！一からそうめんを流す土台を作ります。達成感を味わいながらそうめんを流しましょう！", position: { top: "46.7%", left: "75.5%", width: "12.0%", height: "12.0%" } },
  { id: "ev13", date: "4/12", title: "音響イベント", description: "台本を読んだり演出の話を聞きながら、シーンにぴったりの効果音や音楽を探してみよう。「ここで雨の音が聞こえたら……」「このタイミングで盛り上げたい！」なんて想像を膨らませて、音で舞台の世界観を彩る楽しさを体験しに来てください！", position: { top: "47%", left: "88%", width: "12.0%", height: "12.0%" } },
  { id: "ev14", date: "4/13", title: "上映会", description: "劇団ケッペキの過去公演を上演します！「劇団ケッペキってどんな舞台を作るんだろう.....?」「今までどんな演目を上演したんだろう」と気になっているそこのアナタ。タダで観劇できるチャンスです。", position: { top: "58.5%", left: "13%", width: "12.0%", height: "12.0%" } },
  { id: "ev15", date: "4/14", title: "役者体験会", description: "団員の指導のもと、短めの台本を用いて、読み合わせ、演出づけ、本番までを追体験できます。初めて演じてみるという方も、高校演劇に浸ってきたという子も、役に向かい合う一歩目として、是非皆さんに体験してほしいです！", position: { top: "58%", left: "25%", width: "12.0%", height: "12.0%" } },
  { id: "ev16", date: "4/16", title: "稽古場見学", description: "新歓公演「海まで100年」の稽古場を覗き見！『普段どんな雰囲気で練習してるの？』『役者さんってどうやって台詞を覚えるの？』なんて疑問を解消するチャンスです。真剣な眼差しも、休憩中の和気あいあいとした空気も、まるごと体感しに来ちゃってください！", position: { top: "58.8%", left: "50.5%", width: "12.0%", height: "12.0%" } },
  { id: "ev17", date: "4/17", title: "上映会", description: "劇団ケッペキの過去公演を上演します！「劇団ケッペキってどんな舞台を作るんだろう.....?」「今までどんな演目を上演したんだろう」と気になっているそこのアナタ。タダで観劇できるチャンスです。", position: { top: "59%", left: "63%", width: "12.0%", height: "12.0%" } },
  { id: "ev18", date: "4/18", title: "役者体験会", description: "団員の指導のもと、短めの台本を用いて、読み合わせ、演出づけ、本番までを追体験できます。初めて演じてみるという方も、高校演劇に浸ってきたという子も、役に向かい合う一歩目として、是非皆さんに体験してほしいです！", position: { top: "58.5%", left: "75.5%", width: "12.0%", height: "12.0%" } },
  { id: "ev19", date: "4/19", title: "1daylabソフト体験会", description: "役者体験会、部署イベントを全て一日にまとめた欲張りなイベントです。今年の新歓公演「海まで100年」の実際の制作スタッフが総動員し、皆さんと共に一つの作品を作り上げます。", position: { top: "57.5%", left: "88%", width: "12.0%", height: "12.0%" } },
  { id: "ev20", date: "4/21", title: "上映会", description: "劇団ケッペキの過去公演を上演します！「劇団ケッペキってどんな舞台を作るんだろう.....?」「今までどんな演目を上演したんだろう」と気になっているそこのアナタ。タダで観劇できるチャンスです。", position: { top: "70%", left: "25.5%", width: "12.0%", height: "12.0%" } },
  { id: "ev21", date: "4/23", title: "役者体験会", description: "団員の指導のもと、短めの台本を用いて、読み合わせ、演出づけ、本番までを追体験できます。初めて演じてみるという方も、高校演劇に浸ってきたという子も、役に向かい合う一歩目として、是非皆さんに体験してほしいです！", position: { top: "69.5%", left: "50%", width: "12.0%", height: "12.0%" } },
  { id: "ev22", date: "4/25,26", title: "新歓公演", description: "関西最大級の学生劇団、劇団ケッペキによる、THEATRE E9 KYOTOでの五度目の公演。「『私の海』は、いったいどこのことだろう。」第69回岸田國士戯曲賞受賞作『海まで100年』にひとりひとりの切実さを重ね、演劇がたずさえる私的な体験を探る。", shape: "capsule", position: { top: "67.5%", left: "79.9%", width: "24%", height: "4%" } },
  { id: "ev23", date: "4/25,26", title: "感想戦ラジオ", description: "新入生歓迎公演『海まで100年』の感想を募るラジオを2日間かけて行います。観劇の感動をぜひラジオにぶつけてください！", shape: "capsule", position: { top: "71%", left: "81.0%", width: "24%", height: "5%" } },
  { id: "ev24", date: "4/27", title: "入団説明会", description: "入団方法や入団後の流れなどをケッペキ団員が説明し、質疑応答を行います。", position: { top: "81%", left: "13%", width: "12.0%", height: "12.0%" } },
  { id: "ev25", date: "4/28", title: "役者体験会", description: "団員の指導のもと、短めの台本を用いて、読み合わせ、演出づけ、本番までを追体験できます。初めて演じてみるという方も、高校演劇に浸ってきたという子も、役に向かい合う一歩目として、是非皆さんに体験してほしいです！", position: { top: "81%", left: "38%", width: "12.0%", height: "12.0%" } },
  { id: "ev26", date: "4/30", title: "入団説明会", description: "入団方法や入団後の流れなどをケッペキ団員が説明し、質疑応答を行います。", position: { top: "81%", left: "51%", width: "12.0%", height: "12.0%" } },
  { id: "ev27", date: "5/9", title: "役者体験会", description: "団員の指導のもと、短めの台本を用いて、読み合わせ、演出づけ、本番までを追体験できます。初めて演じてみるという方も、高校演劇に浸ってきたという子も、役に向かい合う一歩目として、是非皆さんに体験してほしいです！", position: { top: "92%", left: "75.5%", width: "12.0%", height: "12.0%" } },
  { id: "ev28", date: "5/10", title: "入団説明会", description: "入団方法や入団後の流れなどをケッペキ団員が説明し、質疑応答を行います。", position: { top: "91%", left: "89.5%", width: "12.0%", height: "12.0%" } },
];
