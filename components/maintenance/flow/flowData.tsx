import type { ReactNode } from "react";

export type FlowStepData = {
  id: number;
  title: string;
  description: ReactNode;
  isLongDescription?: boolean;
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
        会場に入り、客席作りや幕吊り、照明吊り込みなどの舞台設営を行います。普段は話す機会があまりない他部署の人や先輩と仲良くなります!本番1日前にはゲネプロと呼ばれるリハーサルを行うことが多いです。
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

export function getFlowTriggerStart(index: number) {
  switch (index) {
    case 0:
      return "top 70%";
    case 1:
      return "top-=470px 70%";
    case 2:
      return "top-=900px 70%";
    case 3:
      return "top-=1200px 70%";
    case 4:
      return "top-=1400px 70%";
    case 5:
      return "top-=1550px 70%";
    case 6:
      return "top-=1800px 70%";
    case 7:
      return "top 80%";
    default:
      return "top 90%";
  }
}
