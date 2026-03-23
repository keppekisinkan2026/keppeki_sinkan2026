import type { ReactNode } from "react";

export type DepartmentConfig = {
  name: string;
  isLeftLeaf: boolean;
  description: ReactNode;
  sidePhotos?: readonly DepartmentSidePhoto[];
};

export type DepartmentSidePhoto = {
  id: string;
  label: string;
  width: number;
  height: number;
  src?: string;
  offsetX?: number;
  offsetY?: number;
  rotation?: number;
};

export const leafFrameSources = ["/images/leaf.PNG", "/images/leaf2.PNG", "/images/leaf3.PNG", "/images/leaf4.PNG"] as const;

const departmentTextSegmenter =
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? new Intl.Segmenter("ja", { granularity: "word" })
    : null;

const prohibitedLineStartPattern = /^[、。。，．・：；！？!?」』）】〕〉》]+$/;

function segmentDepartmentText(text: string) {
  if (!departmentTextSegmenter) {
    return Array.from(text);
  }

  return Array.from(departmentTextSegmenter.segment(text), ({ segment }) => segment);
}

function wrapDepartmentParagraph(text: string, maxChars = 30) {
  const segments = segmentDepartmentText(text.trim());
  const lines: string[] = [];
  let currentLine = "";

  segments.forEach((segment) => {
    if (!segment) {
      return;
    }

    if (!currentLine) {
      currentLine = segment;
      return;
    }

    if (currentLine.length + segment.length <= maxChars || prohibitedLineStartPattern.test(segment)) {
      currentLine += segment;
      return;
    }

    lines.push(currentLine);
    currentLine = segment;
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.join("\n");
}

function formatDepartmentDescription(...paragraphs: string[]) {
  return paragraphs.map((paragraph) => wrapDepartmentParagraph(paragraph)).join("\n");
}

const departmentSidePhotoMap = {
  keikoba1: {
    id: "keikoba1",
    label: "keikoba1",
    src: "/images/busyo/keikoba1.jpg",
    width: 1587,
    height: 2046,
    offsetX: -8,
    offsetY: -14,
    rotation: -4,
  },
  keikoba2: {
    id: "keikoba2",
    label: "keikoba2",
    src: "/images/busyo/keikoba2.jpg",
    width: 2011,
    height: 1533,
    offsetX: 12,
    offsetY: 12,
    rotation: 5,
  },
  butai1: {
    id: "butai1",
    label: "butai1",
    src: "/images/busyo/butai1.jpg",
    width: 1556,
    height: 2032,
    offsetX: -10,
    offsetY: -18,
    rotation: -5,
  },
  butai2: {
    id: "butai2",
    label: "butai2",
    src: "/images/busyo/butai2.jpg",
    width: 1516,
    height: 2008,
    offsetX: 14,
    offsetY: 10,
    rotation: 6,
  },
  syomei1: {
    id: "syomei1",
    label: "syomei1",
    src: "/images/busyo/syomei1.jpg",
    width: 1962,
    height: 1489,
    offsetX: -12,
    offsetY: -8,
    rotation: -3,
  },
  syomei2: {
    id: "syomei2",
    label: "syomei2",
    src: "/images/busyo/syomei2.jpg",
    width: 1938,
    height: 1490,
    offsetX: 16,
    offsetY: 14,
    rotation: 5,
  },
  onkyo1: {
    id: "onkyo1",
    label: "onkyo1",
    src: "/images/busyo/onkyo1.PNG",
    width: 2048,
    height: 2048,
    offsetX: -8,
    offsetY: -10,
    rotation: -4,
  },
  onkyo2: {
    id: "onkyo2",
    label: "onkyo2",
    src: "/images/busyo/onkuo2.jpg",
    width: 1792,
    height: 1393,
    offsetX: 12,
    offsetY: 10,
    rotation: 6,
  },
  eizou1: {
    id: "eizou1",
    label: "eizou1",
    src: "/images/busyo/eizou1.jpg",
    width: 1471,
    height: 1951,
    offsetX: -14,
    offsetY: -12,
    rotation: -5,
  },
  eizou2: {
    id: "eizou2",
    label: "eizou2",
    src: "/images/busyo/eizou2.jpg",
    width: 2002,
    height: 1369,
    offsetX: 12,
    offsetY: 14,
    rotation: 4,
  },
  iko1: {
    id: "iko1",
    label: "iko1",
    src: "/images/busyo/iko1.jpg",
    width: 2002,
    height: 1530,
    offsetX: -8,
    offsetY: -10,
    rotation: -4,
  },
  iko2: {
    id: "iko2",
    label: "iko2",
    src: "/images/busyo/iko2.jpg",
    width: 1198,
    height: 2019,
    offsetX: 16,
    offsetY: 12,
    rotation: 6,
  },
  seisaku1: {
    id: "seisaku1",
    label: "seisaku1",
    src: "/images/busyo/seisaku1.jpg",
    width: 1814,
    height: 1334,
    offsetX: 12,
    offsetY: 8,
    rotation: 5,
  },
  seisaku2: {
    id: "seisaku2",
    label: "seisaku2",
    src: "/images/busyo/seisaku2.jpg",
    width: 2048,
    height: 1576,
    offsetX: -12,
    offsetY: -8,
    rotation: -4,
  },
  senden1: {
    id: "senden1",
    label: "senden1",
    src: "/images/busyo/senden1.jpg",
    width: 2048,
    height: 1541,
    offsetX: -10,
    offsetY: -12,
    rotation: -3,
  },
  senden2: {
    id: "senden2",
    label: "senden2",
    src: "/images/busyo/senden2.PNG",
    width: 2048,
    height: 2048,
    offsetX: 14,
    offsetY: 14,
    rotation: 5,
  },
} as const satisfies Record<string, DepartmentSidePhoto>;

export const departmentsData: DepartmentConfig[] = [
  {
    name: "脚本",
    isLeftLeaf: true,
    description:
      "台詞として立ち上がった言葉が、舞台の上で他者の身体を通して発\n" +
      "せられたとき、それがお客さんに届いたとき、自分ひとりでは辿り\n" +
      "着けなかった意味が生まれることがあります。\n" +
      "それが、演劇の脚本家だけが味わうことができる楽しさです。\n" +
      "私にとって脚本を書くことは、自分の中や自分の外にある言葉を掴\n" +
      "もうとする営みです。他者と分かり合えない痛みや、それでも通じ\n" +
      "たいという願いを抱えながら、言葉にならないものを言葉にし\n" +
      "続けること、自分の言葉をあきらめないということ。\n" +
      "それが、私にとって脚本を書くということです。",
  },
  {
    name: "稽古場",
    isLeftLeaf: false,
    sidePhotos: [departmentSidePhotoMap.keikoba1, departmentSidePhotoMap.keikoba2],
    description: formatDepartmentDescription(
      "役者として、舞台に立つ。その為に練習する部署です。人前に立ったり、演じるということに慣れてないそこのあなたでも大丈夫！！あなたの中の様々な経験が演技や作劇の糧になります。",
      "稽古場の魅力は、脚本に深く触れ、その面白さを体験することにあります。さらに、最も多くの部署に触れる部署でもあります。様々な部署の力を借りて、その作品の世界に存在する高揚をお楽しみください。",
    ),
  },
  {
    name: "舞台",
    isLeftLeaf: true,
    sidePhotos: [departmentSidePhotoMap.butai1, departmentSidePhotoMap.butai2],
    description:
      "舞台班は、舞台上の空間、大道具をデザインして制作する部署です。\n" +
      "ケッペキは規模の大きい劇団なので、大きな舞台でも実現可能！\n" +
      "演技を生かす抽象的な空間、質感までも細かく再現した大道具など\n" +
      "あなたのセンスを自由に表現できるし、\n" +
      "工具を扱って物を作るのは楽しいんです。\n" +
      "なによりも、舞台班ってかっこいいんです！",
  },
  {
    name: "音響",
    isLeftLeaf: false,
    sidePhotos: [departmentSidePhotoMap.onkyo1, departmentSidePhotoMap.onkyo2],
    description: formatDepartmentDescription(
      "効果音や音楽を探して、作って、流して。声に調和し、空間に馴染む、あるいは際立った存在感を放つ。音という1つの情報から大きな世界を創造する、職人たちが集まる部署です。",
    ),
  },
  {
    name: "照明",
    isLeftLeaf: true,
    sidePhotos: [departmentSidePhotoMap.syomei1, departmentSidePhotoMap.syomei2],
    description: formatDepartmentDescription(
      "照明班は、脚本から舞台の照明を考え、実際に灯体を配置、操作を行います。ただ、舞台や役者を照らすだけでなく、舞台上の雰囲気や場所、時間などを様々な方法を使って表現します。たくさんの灯体を使って、大きな舞台を明るく照らすことができるところが照明の魅力です。自分たちで考えた照明を実際に舞台上で見た時はいつも感動します。",
    ),
  },
  {
    name: "映像",
    isLeftLeaf: false,
    sidePhotos: [departmentSidePhotoMap.eizou1, departmentSidePhotoMap.eizou2],
    description:
      "一見、演劇とは関係なさそう？映像というとこういうイメージが\n" +
      "ある。確かに、演劇は「人」の瞬間、予測不能の「現在」、\n" +
      "とはいえ、その瞬間と現在に彩りを添え、\n" +
      "表現をさらに豊かにしてくれるのが映像です。\n" +
      "撮影、編集、投影、デジタルで舞台を盛り上げて演劇の魅力を\n" +
      "引き出すしてみませんか？編集ソフトの使い方分からない？\n" +
      "カメラを使ったこともない？全然大丈夫！\n" +
      "映像は自由、カメラやソフトを使わなくても創作はできます！\n" +
      "想像力でみんな一緒に演劇を作りましょう！",
  },
  {
    name: "衣装・小道具",
    isLeftLeaf: true,
    sidePhotos: [departmentSidePhotoMap.iko1, departmentSidePhotoMap.iko2],
    description:
      "衣装小道具部署の役割は、演出との綿密な打ち合わせを経て衣装や\n" +
      "小道具のプランを立てたり、それを実際に買ったり作ったり、\n" +
      "本番期間は役者のヘアメイクを担当したりと多岐に渡ります。\n" +
      "作品の世界観に対する深い理解をもって、ひとりの役者を物語の\n" +
      "一部に仕上げる魔法をかけるようなお仕事です！\n" +
      "工作が好きな人、お洋服やヘアメイクが好きな人、\n" +
      "こだわりが強い人、大活躍間違いなし！",
  },
  {
    name: "制作",
    isLeftLeaf: false,
    sidePhotos: [departmentSidePhotoMap.seisaku2, departmentSidePhotoMap.seisaku1],
    description:
      "制作はより多くの人に「見に行きたい！」と思ってもらえるように、\n" +
      "SNSでの発信やビラの店置き、タテカンづくりなど\n" +
      "会議を重ねながら様々な宣伝を行います。\n" +
      "また本番に来てくださった方の思い出に残るようにパンフレットを\n" +
      "作成したり、ときにはグッズを販売することもあります。\n" +
      "舞台上に私たちの仕事が残ることはありませんが、一番近くで\n" +
      "お客様の笑顔やわくわくを感じることが出来ます。",
  },
  {
    name: "宣伝美術",
    isLeftLeaf: true,
    sidePhotos: [departmentSidePhotoMap.senden1, departmentSidePhotoMap.senden2],
    description:
      "宣伝美術はビラ、パンフレット、タテカンなどを作り、\n" +
      "劇団ケッペキとその公演の魅力を伝える部署です。\n" +
      "制作部署と一緒に作業を進めます。\n" +
      "会議やLINEで演出や制作部署と擦り合わせをして方向性を決め\n" +
      "ていきます。会議では色、匂い、風景、時間帯、客層、一番伝え\n" +
      "たいこと、紙のサイズや質感などを決め、LINEでは演出からの\n" +
      "フィードバックをもらったり、誤字脱字がないかQRコードが意図\n" +
      "したサイトに飛ぶか他の人にチェックしてもらいます。\n" +
      "宣伝美術の魅力は制作したもの(紙媒体)が観劇した方の手元に\n" +
      "公演が終わった後も形として残ることです。",
  },
];
