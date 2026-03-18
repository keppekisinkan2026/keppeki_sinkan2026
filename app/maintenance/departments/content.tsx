import type { ReactNode } from "react";

export type DepartmentConfig = {
  name: string;
  isLeftLeaf: boolean;
  tapes: readonly { src: keyof typeof tapeAssetMap; pos: string }[];
  description: ReactNode;
  isLongText?: boolean;
};

export const leafFrameSources = ["/images/leaf.PNG", "/images/leaf2.PNG", "/images/leaf3.PNG", "/images/leaf4.PNG"] as const;

export const departmentsData: DepartmentConfig[] = [
  {
    name: "脚本",
    isLeftLeaf: true,
    tapes: [{ src: "y_tape.png", pos: "top-center" }],
    isLongText: true,
    description: (
      <>
        台詞として立ち上がった言葉が、舞台の上で他者の身体を通して発せられたとき、それがお客さんに届いたとき、自分ひとりでは辿り着けなかった意味が生まれることがあります。それが、演劇の脚本家だけが味わうことができる楽しさです。
        <br />
        私にとって脚本を書くことは、自分の中や自分の外にある言葉を掴もうとする営みです。他者と分かり合えない痛みや、それでも通じたいという願いを抱えながら、言葉にならないものを言葉にし続けること、自分の言葉をあきらめないということ。それが、私にとって脚本を書くということです。
      </>
    ),
  },
  {
    name: "稽古場",
    isLeftLeaf: false,
    tapes: [{ src: "red_tape.png", pos: "left-vertical" }],
    isLongText: true,
    description: (
      <>
        役者として、舞台に立つ。その為に練習する部署です。人前に立ったり、演じるということに慣れてないそこのあなたでも大丈夫！！あなたの中の様々な経験が演技や作劇の糧になります。
        <br />
        稽古場の魅力は、脚本に深く触れ、その面白さを体験することにあります。さらに、最も多くの部署に触れる部署でもあります。様々な部署の力を借りて、その作品の世界に存在する高揚をお楽しみください。
      </>
    ),
  },
  {
    name: "舞台",
    isLeftLeaf: true,
    tapes: [{ src: "y_tape.png", pos: "top-left" }, { src: "y_tape.png", pos: "bottom-left" }],
    isLongText: true,
    description: (
      <>
        舞台班は、舞台上の空間、大道具をデザインして制作する部署です。ケッペキは規模の大きい劇団なので、大きな舞台でも実現可能！
        <br />
        演技を生かす抽象的な空間、質感までも細かく再現した大道具などあなたのセンスを自由に表現できるし、工具を扱って物を作るのは楽しいんです。
        <br />
        なによりも、舞台班ってかっこいいんです！
      </>
    ),
  },
  {
    name: "音響",
    isLeftLeaf: false,
    tapes: [{ src: "red_tape.png", pos: "top-left" }],
    isLongText: true,
    description: (
      <>
        効果音や音楽を探して、作って、流して。声に調和し、空間に馴染む、あるいは際立った存在感を放つ。音という1つの情報から大きな世界を創造する、職人たちが集まる部署です。
      </>
    ),
  },
  {
    name: "照明",
    isLeftLeaf: true,
    tapes: [{ src: "blue_tape.png", pos: "top-center" }],
    isLongText: true,
    description: (
      <>
        照明班は、脚本から舞台の照明を考え、実際に灯体を配置、操作を行います。ただ、舞台や役者を照らすだけでなく、舞台上の雰囲気や場所、時間などを様々な方法を使って表現します。たくさんの灯体を使って、大きな舞台を明るく照らすことができるところが照明の魅力です。自分たちで考えた照明を実際に舞台上で見た時はいつも感動します。
      </>
    ),
  },
  {
    name: "映像",
    isLeftLeaf: false,
    tapes: [{ src: "y_tape.png", pos: "top-left" }, { src: "y_tape.png", pos: "top-right" }],
    isLongText: true,
    description: (
      <>
        一見、演劇とは関係なさそう？映像というとこういうイメージがある。確かに、演劇は「人」の瞬間、予測不能の「現在」、とはいえ、その瞬間と現在に彩りを添え、表現をさらに豊かにしてくれるのが映像です。
        <br />
        撮影、編集、投影、デジタルで舞台を盛り上げて演劇の魅力を引き出すしてみませんか？編集ソフトの使い方分からない？カメラを使ったこともない？全然大丈夫！
        <br />
        映像は自由、カメラやソフトを使わなくても創作はできます！想像力でみんな一緒に演劇を作りましょう！
      </>
    ),
  },
  {
    name: "衣装・小道具",
    isLeftLeaf: true,
    tapes: [{ src: "red_tape.png", pos: "top-left" }, { src: "red_tape.png", pos: "top-right" }],
    isLongText: true,
    description: (
      <>
        衣装小道具部署の役割は、演出との綿密な打ち合わせを経て衣装や小道具のプランを立てたり、それを実際に買ったり作ったり、本番期間は役者のヘアメイクを担当したりと多岐に渡ります。
        <br />
        作品の世界観に対する深い理解をもって、ひとりの役者を物語の一部に仕上げる魔法をかけるようなお仕事です！
        <br />
        工作が好きな人、お洋服やヘアメイクが好きな人、こだわりが強い人、大活躍間違いなし！
      </>
    ),
  },
  {
    name: "制作",
    isLeftLeaf: false,
    tapes: [{ src: "blue_tape.png", pos: "bottom-right" }],
    isLongText: true,
    description: (
      <>
        制作はより多くの人に「見に行きたい！」と思ってもらえるように、SNSでの発信やビラの店置き、タテカンづくりなど会議を重ねながら様々な宣伝を行います。
        <br />
        また本番に来てくださった方の思い出に残るようにパンフレットを作成したり、ときにはグッズを販売することもあります。
        <br />
        舞台上に私たちの仕事が残ることはありませんが、一番近くでお客様の笑顔やわくわくを感じることが出来ます。
      </>
    ),
  },
  {
    name: "宣伝美術",
    isLeftLeaf: true,
    tapes: [{ src: "blue_tape.png", pos: "top-right" }],
    isLongText: true,
    description: (
      <>
        宣伝美術はビラ、パンフレット、タテカンなどを作り、劇団ケッペキとその公演の魅力を伝える部署です。制作部署と一緒に作業を進めます。
        <br />
        会議やLINEで演出や制作部署と擦り合わせをして方向性を決めていきます。会議では色、匂い、風景、時間帯、客層、一番伝えたいこと、紙のサイズや質感などを決め、LINEでは演出からのフィードバックをもらったり、誤字脱字がないかQRコードが意図したサイトに飛ぶか他の人にチェックしてもらいます。
        <br />
        宣伝美術の魅力は制作したもの(紙媒体)が観劇した方の手元に公演が終わった後も形として残ることです。
      </>
    ),
  },
];

export const tapeAssetMap = {
  "red_tape.png": "/images/red_tape.png.png",
  "blue_tape.png": "/images/blue_tape.png.png",
  "y_tape.png": "/images/y_tape.png.png",
} as const;
