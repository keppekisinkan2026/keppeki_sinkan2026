import type { ReactNode } from "react";

export type FlowStepLayout = {
  contentMarginTop?: string;
  contentMarginLeft?: string;
  contentInsetTop?: string;
  contentInsetRight?: string;
  contentInsetBottom?: string;
  contentInsetLeft?: string;
  overlap?: string;
  arrowShiftX?: string;
  arrowShiftY?: string;
  triggerStart?: string;
  minHeight?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cardWidth?: string;
  longCardWidth?: string;
  longCardMaxWidth?: string;
  arrowTop?: string;
  arrowLeft?: string;
  arrowWidth?: string;
  arrowHeight?: string;
  arrowOffsetX?: string;
  arrowOffsetY?: string;
};

export type FlowStepData = {
  id: number;
  title: string;
  description: ReactNode;
  isLongDescription?: boolean;
  mobileTitleLines?: readonly string[];
  mobileDescriptionLines?: readonly string[];
  layout?: {
    desktop?: FlowStepLayout;
    mobile?: FlowStepLayout;
  };
};

export type FlowPhotoLayout = {
  top: string;
  left: string;
  rotation: number;
  width: string;
  offsetX?: string;
  offsetY?: string;
  scale?: number;
  zIndex?: number;
};

export type FlowPhoto = {
  id: string;
  src: string;
  imageWidth: number;
  imageHeight: number;
  alt: string;
  layout: {
    desktop: FlowPhotoLayout;
    mobile?: Partial<FlowPhotoLayout>;
  };
};

const DEFAULT_FLOW_TRIGGER_START_DESKTOP = "top 72%";
const DEFAULT_FLOW_TRIGGER_START_MOBILE = "top 84%";
const defaultFlowPhonePhotoLayout = {
  offsetX: "0px",
  offsetY: "0px",
  scale: 1.5,
} as const;

const defaultFlowPhoneStepLayout: FlowStepLayout = {
  minHeight: "clamp(340px, 62svh, 500px)",
  paddingTop: "clamp(56px, 12vw, 96px)",
  paddingBottom: "168px",
  contentInsetRight: "0px",
  contentInsetBottom: "0px",
  contentInsetLeft: "0px",
  cardWidth: "min(100%, 420px)",
  longCardWidth: "min(100%, 520px)",
  longCardMaxWidth: "520px",
  arrowTop: "calc(100% - 20px)",
  arrowLeft: "50%",
  arrowWidth: "min(24vw, 84px)",
  arrowHeight: "clamp(150px, 30vw, 210px)",
  arrowOffsetX: "0px",
  arrowOffsetY: "0px",
  triggerStart: DEFAULT_FLOW_TRIGGER_START_MOBILE,
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
    mobileDescriptionLines: [
      "企画責任、演出、舞台監督(通称、三役)が中心となり",
      "会場選定やチケット料金設定など",
      "演劇をするにあたって必要となる事柄を決定します。",
      "※企画責任…企画の全体進行を監督します。",
      "公演会計を兼任することが多いです。",
      "※演出…稽古場において役者に稽古をつけたり、",
      "部署に公演で伝えたい事柄のイメージを伝えます。",
      "オーケストラにおける指揮者のような立場です。",
      "※舞台監督…各部署同士の干渉をサポートしたり、",
      "会場設営の指揮を執る役職です。",
    ],
    layout: {
      desktop: {
        contentMarginTop: "190px",
        contentMarginLeft: "0px",
        arrowShiftX: "70px",
        arrowShiftY: "360px",
      },
      mobile: {
        ...defaultFlowPhoneStepLayout,
        contentInsetTop: "120px",
        contentInsetBottom: "230px",
        triggerStart: "top 100%",
        arrowTop: "calc(100% - 200px)",
        arrowLeft: "50%",
      },
    },
  },
  {
    id: 2,
    title: "②企画審議",
    description: (
      <span className="wf-flow-step-line">
        例会にて企画が審議されます。企画案をブラッシュアップした後にいよいよ企画始動となります。
      </span>
    ),
    mobileDescriptionLines: [
      "例会にて企画が審議されます。",
      "企画案をブラッシュアップした後に",
      "いよいよ企画始動となります。",
    ],
    layout: {
      desktop: {
        contentMarginTop: "170px",
        contentMarginLeft: "0px",
        overlap: "-470px",
        arrowShiftX: "-90px",
        arrowShiftY: "380px",
      },
      mobile: {
        ...defaultFlowPhoneStepLayout,
        contentInsetTop: "120px",
        arrowTop: "calc(100% - 200px)",
        arrowLeft: "50%",
      },
    },
  },
  {
    id: 3,
    title: "③面談・オーディション",
    mobileTitleLines: ["③面談・", "　　オーディション"],
    description: (
      <>
        企画参加者全員が三役と面談を行うことでポジションが決定されます。
        <br />
        役者はオーディションによって選ばれます。
      </>
    ),
    isLongDescription: true,
    mobileDescriptionLines: [
      "企画参加者全員が三役と面談を行うことで",
      "ポジションが決定されます。",
      "役者はオーディションによって選ばれます。",
    ],
    layout: {
      desktop: {
        contentMarginTop: "200px",
        contentMarginLeft: "0px",
        overlap: "-430px",
        arrowShiftX: "30px",
        arrowShiftY: "400px",
      },
      mobile: {
        ...defaultFlowPhoneStepLayout,
        contentInsetTop: "120px",
        arrowTop: "calc(100% - 200px)",
        arrowLeft: "50%",
      },
    },
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
    mobileDescriptionLines: [
      "企画始動後、例会がある水曜日を除き、",
      "稽古が行われます。",
      "理解を深めるため、",
      "脚本解釈会なども行われます。",
    ],
    layout: {
      desktop: {
        contentMarginTop: "200px",
        contentMarginLeft: "0px",
        overlap: "-300px",
        arrowShiftX: "-40px",
        arrowShiftY: "420px",
      },
      mobile: {
        ...defaultFlowPhoneStepLayout,
        contentInsetTop: "120px",
        arrowTop: "calc(100% - 200px)",
        arrowLeft: "50%",
      },
    },
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
    mobileDescriptionLines: [
      "部署紹介にもある通り、多くの部署が存在します。",
      "演出からイメージを聞き取った後、",
      "会議を重ね具体的にプランを立てていきます。",
    ],
    layout: {
      desktop: {
        contentMarginTop: "200px",
        contentMarginLeft: "0px",
        overlap: "-200px",
        arrowShiftX: "40px",
        arrowShiftY: "440px",
      },
      mobile: {
        ...defaultFlowPhoneStepLayout,
        contentInsetTop: "110px",
        arrowTop: "calc(100% - 200px)",
        arrowLeft: "50%",
      },
    },
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
    mobileDescriptionLines: [
      "会場に入り、客席作りや幕吊り、",
      "照明吊り込みなどの舞台設営を行います。",
      "普段は話す機会があまりない",
      "他部署の人や先輩と仲良くなります!",
      "本番1日前にはゲネプロと呼ばれる",
      "リハーサルを行うことが多いです。",
    ],
    layout: {
      desktop: {
        contentMarginTop: "200px",
        contentMarginLeft: "0px",
        overlap: "-150px",
        arrowShiftX: "-30px",
        arrowShiftY: "450px",
      },
      mobile: {
        ...defaultFlowPhoneStepLayout,
        contentInsetTop: "100px",
        arrowTop: "calc(100% - 200px)",
        arrowLeft: "50%",
      },
    },
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
    mobileDescriptionLines: [
      "約3～5ステージほど",
      "千秋楽の後には",
      "座組全員で記念撮影を行います！",
    ],
    layout: {
      desktop: {
        contentMarginTop: "200px",
        contentMarginLeft: "0px",
        overlap: "-250px",
        arrowShiftY: "400px",
      },
      mobile: {
        ...defaultFlowPhoneStepLayout,
        contentInsetTop: "120px",
        arrowTop: "calc(100% - 200px)",
        arrowLeft: "50%",
      },
    },
  },
  {
    id: 8,
    title: "⑧バラシ",
    description: (
      <span className="wf-flow-step-line">本番が終了した後は会場を元の状態に戻します。</span>
    ),
    isLongDescription: true,
    mobileDescriptionLines: [
      "本番が終了した後は",
      "会場を元の状態に戻します。",
    ],
    layout: {
      desktop: {
        contentMarginTop: "200px",
        contentMarginLeft: "0px",
        overlap: "-100px",
        triggerStart: "top 78%",
      },
      mobile: {
        ...defaultFlowPhoneStepLayout,
        contentInsetTop: "120px",
        paddingBottom: "108px",
        triggerStart: "top 88%",
      },
    },
  },
];

export const flowFrameSources = [
  "/images/image1.PNG",
  "/images/image2.PNG",
  "/images/image3.PNG",
  "/images/image4.PNG",
  "/images/image5.PNG",
] as const;

/* Phone-specific photo tuning lives in the `mobile` blocks below. */
export const flowPhotos: readonly FlowPhoto[] = [
  {
    id: "keikoba1",
    src: "/images/flow/keikoba1.jpg",
    imageWidth: 1587,
    imageHeight: 2046,
    alt: "稽古の様子 1",
    layout: {
      desktop: {
        top: "30%",
        left: "12%",
        rotation: -8,
        width: "clamp(286px, 26vw, 390px)",
        zIndex: 1,
      },
      mobile: {
        ...defaultFlowPhonePhotoLayout,
        top: "40%",
        left: "-2%",
        width: "min(40vw, 140px)",
      },
    },
  },
  {
    id: "keikoba2",
    src: "/images/flow/keikoba2.jpg",
    imageWidth: 1792,
    imageHeight: 1053,
    alt: "稽古の様子 2",
    layout: {
      desktop: {
        top: "37%",
        left: "37%",
        rotation: 8,
        width: "clamp(364px, 33.8vw, 494px)",
        zIndex: 1,
      },
      mobile: {
        ...defaultFlowPhonePhotoLayout,
        top: "47%",
        left: "20%",
        width: "min(52vw, 220px)",
      },
    },
  },
  {
    id: "staff1",
    src: "/images/flow/staff1.jpg",
    imageWidth: 1913,
    imageHeight: 1331,
    alt: "スタッフワークの様子 1",
    layout: {
      desktop: {
        top: "47%",
        left: "12%",
        rotation: -7,
        width: "clamp(338px, 31.2vw, 468px)",
        zIndex: 1,
      },
      mobile: {
        ...defaultFlowPhonePhotoLayout,
        top: "52.5%",
        left: "0%",
        width: "min(48vw, 206px)",
      },
    },
  },
  {
    id: "staff2",
    src: "/images/flow/staff2.jpg",
    imageWidth: 1806,
    imageHeight: 1740,
    alt: "スタッフワークの様子 2",
    layout: {
      desktop: {
        top: "43%",
        left: "68%",
        rotation: 10,
        width: "clamp(286px, 26vw, 390px)",
        zIndex: 1,
      },
      mobile: {
        ...defaultFlowPhonePhotoLayout,
        top: "58%",
        left: "35%",
        width: "min(42vw, 180px)",
      },
    },
  },
  {
    id: "sikomi1",
    src: "/images/flow/sikomi1.jpg",
    imageWidth: 1779,
    imageHeight: 1376,
    alt: "仕込みの様子 1",
    layout: {
      desktop: {
        top: "53%",
        left: "11%",
        rotation: -6,
        width: "clamp(351px, 31.2vw, 468px)",
        zIndex: 1,
      },
      mobile: {
        ...defaultFlowPhonePhotoLayout,
        top: "64%",
        left: "-3%",
        width: "min(48vw, 206px)",
      },
    },
  },
  {
    id: "sikomi2",
    src: "/images/flow/sikomi2.jpg",
    imageWidth: 1870,
    imageHeight: 1455,
    alt: "仕込みの様子 2",
    layout: {
      desktop: {
        top: "59%",
        left: "60%",
        rotation: 8,
        width: "clamp(325px, 29.9vw, 442px)",
        zIndex: 1,
      },
      mobile: {
        ...defaultFlowPhonePhotoLayout,
        top: "70%",
        left: "30%",
        width: "min(44vw, 190px)",
      },
    },
  },
  {
    id: "honban1",
    src: "/images/flow/honban1.jpg",
    imageWidth: 1794,
    imageHeight: 1214,
    alt: "本番の様子 1",
    layout: {
      desktop: {
        top: "68%",
        left: "10%",
        rotation: -12,
        width: "clamp(325px, 28.6vw, 429px)",
        zIndex: 1,
      },
      mobile: {
        ...defaultFlowPhonePhotoLayout,
        top: "76%",
        left: "40%",
        width: "min(44vw, 186px)",
      },
    },
  },
  {
    id: "honban2",
    src: "/images/flow/honban2.jpg",
    imageWidth: 1847,
    imageHeight: 1406,
    alt: "本番の様子 2",
    layout: {
      desktop: {
        top: "64%",
        left: "65%",
        rotation: 7,
        width: "clamp(325px, 29.9vw, 442px)",
        zIndex: 1,
      },
      mobile: {
        ...defaultFlowPhonePhotoLayout,
        top: "76.5%",
        left: "-15%",
        width: "min(44vw, 190px)",
      },
    },
  },
  {
    id: "honban3",
    src: "/images/flow/honban3.jpg",
    imageWidth: 1753,
    imageHeight: 1316,
    alt: "本番の様子 3",
    layout: {
      desktop: {
        top: "70%",
        left: "59%",
        rotation: 5,
        width: "clamp(286px, 26vw, 390px)",
        zIndex: 1,
      },
      mobile: {
        ...defaultFlowPhonePhotoLayout,
        top: "82%",
        left: "0%",
        width: "min(40vw, 168px)",
      },
    },
  },
  {
    id: "barasi1",
    src: "/images/flow/barasi1.jpg",
    imageWidth: 1854,
    imageHeight: 1424,
    alt: "バラシの様子 1",
    layout: {
      desktop: {
        top: "76%",
        left: "10%",
        rotation: -8,
        width: "clamp(325px, 29.9vw, 442px)",
        zIndex: 1,
      },
      mobile: {
        ...defaultFlowPhonePhotoLayout,
        top: "87.5%",
        left: "30%",
        width: "min(44vw, 190px)",
      },
    },
  },
  {
    id: "barasi2",
    src: "/images/flow/barasi2.jpg",
    imageWidth: 1686,
    imageHeight: 1296,
    alt: "バラシの様子 2",
    layout: {
      desktop: {
        top: "80%",
        left: "60%",
        rotation: 10,
        width: "clamp(338px, 31.2vw, 455px)",
        zIndex: 1,
      },
      mobile: {
        ...defaultFlowPhonePhotoLayout,
        top: "94%",
        left: "0%",
        width: "min(46vw, 196px)",
      },
    },
  },
];

export function getFlowStepLayout(step: FlowStepData, isMobileLayout: boolean) {
  const desktopLayout = step.layout?.desktop ?? {};
  const mobileLayout = isMobileLayout ? step.layout?.mobile ?? {} : {};

  return {
    ...desktopLayout,
    ...mobileLayout,
  };
}

export function getFlowTriggerStart(step: FlowStepData, isMobileLayout: boolean) {
  const layout = getFlowStepLayout(step, isMobileLayout);

  return layout.triggerStart ?? (isMobileLayout ? DEFAULT_FLOW_TRIGGER_START_MOBILE : DEFAULT_FLOW_TRIGGER_START_DESKTOP);
}

export function getFlowPhotoLayout(photo: FlowPhoto, isMobileLayout: boolean): FlowPhotoLayout {
  if (!isMobileLayout) {
    return photo.layout.desktop;
  }

  return {
    ...photo.layout.desktop,
    ...photo.layout.mobile,
  };
}
