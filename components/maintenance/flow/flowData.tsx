import type { ReactNode } from "react";

export type FlowStepData = {
  id: number;
  title: string;
  description: ReactNode;
  isLongDescription?: boolean;
};

export type FlowPhoto = {
  id: string;
  src: string;
  top: string;
  left: string;
  rotation: number;
  width: string;
  imageWidth: number;
  imageHeight: number;
  alt: string;
};

export const flowSteps: FlowStepData[] = [
  {
    id: 1,
    title: "①企画案",
    description: (
      <>
        企画責任、演出、舞台監督(通称、三役)が中心となり会場選定やチケット料金設定など演劇をするにあたって必要となる事柄を決定します。
        <br />
        ※企画責任…企画の全体進行を監督します。公演会計を兼任することが多いです。
        <br />
        ※演出…稽古場において役者に稽古をつけたり、部署に公演で伝えたい事柄のイメージを伝えます。オーケストラにおける指揮者のような立場です。
        <br />
        ※舞台監督…各部署同士の干渉をサポートしたり、会場設営の指揮を執る役職です。
      </>
    ),
    isLongDescription: true,
  },
  {
    id: 2,
    title: "②企画審議",
    description: (
      <span className="wf-flow-step-line">
        例会にて企画が審議されます。企画案をブラッシュアップした後にいよいよ企画始動となります。
      </span>
    ),
  },
  {
    id: 3,
    title: "③面談・オーディション",
    description: (
      <>
        企画参加者全員が三役と面談を行うことでポジションが決定されます。
        <br />
        役者はオーディションによって選ばれます。
      </>
    ),
    isLongDescription: true,
  },
  {
    id: 4,
    title: "④稽古",
    description: (
      <>
        企画始動後、例会がある水曜日を除き、稽古が行われます。
        <br />
        理解を深めるため、脚本解釈会なども行われます。
      </>
    ),
    isLongDescription: true,
  },
  {
    id: 5,
    title: "⑤スタッフワーク",
    description: (
      <span className="wf-flow-step-line">
        部署紹介にもある通り、多くの部署が存在します。演出からイメージを聞き取った後、会議を重ね具体的にプランを立てていきます。
      </span>
    ),
    isLongDescription: true,
  },
  {
    id: 6,
    title: "⑥仕込み",
    description: (
      <span className="wf-flow-step-line">
        会場に入り、客席作りや幕吊り、照明吊り込みなどの舞台設営を行います。
        普段は話す機会があまりない他部署の人や<br />先輩と仲良くなります!
        <br />
        本番1日前にはゲネプロと呼ばれる
        <br />
        リハーサルを行うことが多いです。
      </span>
    ),
    isLongDescription: true,
  },
  {
    id: 7,
    title: "⑦本番",
    description: (
      <>
        約3～5ステージほど
        <br />
        千秋楽の後には座組全員で記念撮影を行います！
      </>
    ),
    isLongDescription: true,
  },
  {
    id: 8,
    title: "⑧バラシ",
    description: (
      <span className="wf-flow-step-line">本番が終了した後は会場を元の状態に戻します。</span>
    ),
    isLongDescription: true,
  },
];

export const flowFrameSources = [
  "/images/image1.PNG",
  "/images/image2.PNG",
  "/images/image3.PNG",
  "/images/image4.PNG",
  "/images/image5.PNG",
] as const;

export const flowPhotos: readonly FlowPhoto[] = [
  {
    id: "keikoba1",
    src: "/images/flow/keikoba1.jpg",
    top: "30%",
    left: "12%",
    rotation: -8,
    width: "clamp(286px, 26vw, 390px)",
    imageWidth: 1587,
    imageHeight: 2046,
    alt: "稽古の様子 1",
  },
  {
    id: "keikoba2",
    src: "/images/flow/keikoba2.jpg",
    top: "37%",
    left: "37%",
    rotation: 8,
    width: "clamp(364px, 33.8vw, 494px)",
    imageWidth: 1792,
    imageHeight: 1053,
    alt: "稽古の様子 2",
  },
  {
    id: "staff1",
    src: "/images/flow/staff1.jpg",
    top: "47%",
    left: "12%",
    rotation: -7,
    width: "clamp(338px, 31.2vw, 468px)",
    imageWidth: 1913,
    imageHeight: 1331,
    alt: "スタッフワークの様子 1",
  },
  {
    id: "staff2",
    src: "/images/flow/staff2.jpg",
    top: "43%",
    left: "68%",
    rotation: 10,
    width: "clamp(286px, 26vw, 390px)",
    imageWidth: 1806,
    imageHeight: 1740,
    alt: "スタッフワークの様子 2",
  },
  {
    id: "sikomi1",
    src: "/images/flow/sikomi1.jpg",
    top: "53%",
    left: "11%",
    rotation: -6,
    width: "clamp(351px, 31.2vw, 468px)",
    imageWidth: 1779,
    imageHeight: 1376,
    alt: "仕込みの様子 1",
  },
  {
    id: "sikomi2",
    src: "/images/flow/sikomi2.jpg",
    top: "59%",
    left: "60%",
    rotation: 8,
    width: "clamp(325px, 29.9vw, 442px)",
    imageWidth: 1870,
    imageHeight: 1455,
    alt: "仕込みの様子 2",
  },
  {
    id: "honban1",
    src: "/images/flow/honban1.jpg",
    top: "68%",
    left: "10%",
    rotation: -12,
    width: "clamp(325px, 28.6vw, 429px)",
    imageWidth: 1794,
    imageHeight: 1214,
    alt: "本番の様子 1",
  },
  {
    id: "honban2",
    src: "/images/flow/honban2.jpg",
    top: "64%",
    left: "65%",
    rotation: 7,
    width: "clamp(325px, 29.9vw, 442px)",
    imageWidth: 1847,
    imageHeight: 1406,
    alt: "本番の様子 2",
  },
  {
    id: "honban3",
    src: "/images/flow/honban3.jpg",
    top: "70%",
    left: "59%",
    rotation: 5,
    width: "clamp(286px, 26vw, 390px)",
    imageWidth: 1753,
    imageHeight: 1316,
    alt: "本番の様子 3",
  },
  {
    id: "barasi1",
    src: "/images/flow/barasi1.jpg",
    top: "76%",
    left: "10%",
    rotation: -8,
    width: "clamp(325px, 29.9vw, 442px)",
    imageWidth: 1854,
    imageHeight: 1424,
    alt: "バラシの様子 1",
  },
  {
    id: "barasi2",
    src: "/images/flow/barasi2.jpg",
    top: "80%",
    left: "60%",
    rotation: 10,
    width: "clamp(338px, 31.2vw, 455px)",
    imageWidth: 1686,
    imageHeight: 1296,
    alt: "バラシの様子 2",
  },
];

export function getFlowTriggerStart(index: number) {
  switch (index) {
    case 7:
      return "top 80%";
    default:
      return "top 70%";
  }
}
