import type { ReactNode } from "react";
import { socialLinks } from "@/components/maintenance/socialLinkData";

export const openingFrameSources = [
  "/images/title1.png",
  "/images/title2.png",
  "/images/title3.png",
  "/images/title4.png",
  "/images/title5.png",
] as const;

export const snsFrameSources = ["/images/sns1.png", "/images/sns2.png", "/images/sns3.png", "/images/sns4.png"] as const;

export const aboutImg1FrameSources = ["/images/i1_1.PNG", "/images/i1_2.PNG", "/images/i1_3.PNG", "/images/i1.PNG"] as const;
export const aboutCommonAnimFrameSources = [
  "/images/image1.PNG",
  "/images/image2.PNG",
  "/images/image3.PNG",
  "/images/image4.PNG",
] as const;
export const aboutImg2FrameSources = [...aboutCommonAnimFrameSources, "/images/i2.PNG"] as const;
export const aboutImg3FrameSources = [...aboutCommonAnimFrameSources, "/images/i3.PNG"] as const;
export const aboutImg4FrameSources = [...aboutCommonAnimFrameSources, "/images/i4.PNG"] as const;
export const aboutImg5FrameSources = [...aboutCommonAnimFrameSources, "/images/i5.PNG"] as const;
export const aboutImgSinzinFrameSources = [...aboutCommonAnimFrameSources, "/images/sinzin.PNG"] as const;
export const aboutImgFuneFrameSources = [...aboutCommonAnimFrameSources, "/images/fune.PNG"] as const;
export const aboutImgPichiFrameSources = [...aboutCommonAnimFrameSources, "/images/pichi.PNG"] as const;

export const aboutSectionRows = [
  { key: "about-1", imageLeft: false },
  { key: "about-2", imageLeft: true },
  { key: "about-3", imageLeft: false },
  { key: "about-4", imageLeft: true },
] as const;

const aboutChunkStyle = { display: "inline-block" } as const;

export const aboutCampusText = (
  <div className="js-about-text-container wf-about-text-container">
    <h3 className="wf-about-subheading">さまざまな大学の学生が集まる<wbr />インカレサークル</h3>
    <p className="js-about-text wf-about-text">
      <span style={aboutChunkStyle}>団員は現在80名ほど(2026年現在)。</span>
      <wbr />
      <span style={aboutChunkStyle}>京都大学だけでなく、</span>
      <wbr />
      <span style={aboutChunkStyle}>京都芸術大学、</span>
      <wbr />
      <span style={aboutChunkStyle}>同志社大学、</span>
      <wbr />
      <span style={aboutChunkStyle}>立命館大学、</span>
      <wbr />
      <span style={aboutChunkStyle}>京都産業大学、</span>
      <wbr />
      <span style={aboutChunkStyle}>京都工芸繊維大学、</span>
      <wbr />
      <span style={aboutChunkStyle}>龍谷大学、</span>
      <wbr />
      <span style={aboutChunkStyle}>大谷大学など、</span>
      <wbr />
      <span style={aboutChunkStyle}>演劇を愛する学生が</span>
      <wbr />
      <span style={aboutChunkStyle}>さまざまな大学から</span>
      <wbr />
      <span style={aboutChunkStyle}>集まっています。</span>
    </p>
  </div>
);

export const aboutProduceText = (
  <div className="js-about-text-container wf-about-text-container">
    <h3 className="wf-about-subheading">プロデュース制</h3>
    <p className="js-about-text wf-about-text">
      <span style={aboutChunkStyle}>劇団ケッペキの最大の特徴は、</span>
      <wbr />
      <span style={aboutChunkStyle}>定期公演制ではなく、</span>
      <wbr />
      <span style={aboutChunkStyle}>全ての団員が公演を企画することができる</span>
      <wbr />
      <span style={aboutChunkStyle}>プロデュース制を採用していることです。</span>
      <wbr />
      <span style={aboutChunkStyle}>座長をおかないことで、</span>
      <wbr />
      <span style={aboutChunkStyle}>団員一人一人の</span>
      <wbr />
      <span style={aboutChunkStyle}>「芝居を創りたい」という想いを</span>
      <wbr />
      <span style={aboutChunkStyle}>最大限に尊重しています。</span>
      <wbr />
      <span style={aboutChunkStyle}>これは様々な劇団が存在する</span>
      <wbr />
      <span style={aboutChunkStyle}>京都の学生演劇界においても</span>
      <wbr />
      <span style={aboutChunkStyle}>珍しい制度です。</span>
      <wbr />
      <span style={aboutChunkStyle}>また団全体としてではなく、</span>
      <wbr />
      <span style={aboutChunkStyle}>団員が集まり結成したユニットによる</span>
      <wbr />
      <span style={aboutChunkStyle}>「ユニット公演」も年に数回あり、</span>
      <wbr />
      <span style={aboutChunkStyle}>かなり自由度の高い演劇活動が</span>
      <wbr />
      <span style={aboutChunkStyle}>可能となっています。</span>
    </p>
  </div>
);

export const aboutYearRoundText = (
  <div className="js-about-text-container wf-about-text-container">
    <h3 className="wf-about-subheading">年間を通して活動</h3>
    <p className="js-about-text wf-about-text">
      <span style={aboutChunkStyle}>ケッペキでは</span>
      <wbr />
      <span style={aboutChunkStyle}>規模も形態も多様な公演を</span>
      <wbr />
      <span style={aboutChunkStyle}>例年5～10本行ってきました。</span>
      <wbr />
      <span style={aboutChunkStyle}>新型コロナウイルス感染症の</span>
      <wbr />
      <span style={aboutChunkStyle}>流行を受け</span>
      <wbr />
      <span style={aboutChunkStyle}>2020年、2021年と</span>
      <wbr />
      <span style={aboutChunkStyle}>対面形式の公演を</span>
      <wbr />
      <span style={aboutChunkStyle}>打てずにいましたが、</span>
      <wbr />
      <span style={aboutChunkStyle}>2022年12月</span>
      <wbr />
      <span style={aboutChunkStyle}>「来るもの拒まずおかえり公演　『無差別』」の</span>
      <wbr />
      <span style={aboutChunkStyle}>上演を皮切りに</span>
      <wbr />
      <span style={aboutChunkStyle}>対面での活動を解禁し、</span>
      <wbr />
      <span style={aboutChunkStyle}>2025年も</span>
      <wbr />
      <span style={aboutChunkStyle}>新人公演、</span>
      <wbr />
      <span style={aboutChunkStyle}>卒業公演、</span>
      <wbr />
      <span style={aboutChunkStyle}>新歓公演や夏公演など、</span>
      <wbr />
      <span style={aboutChunkStyle}>活発に公演しています。</span>
    </p>
  </div>
);

export const aboutRowParagraphs: ReadonlyArray<ReadonlyArray<ReactNode>> = [
  [
    <>
      <span style={aboutChunkStyle}>劇団鞠小路、</span>
      <wbr />
      <span style={aboutChunkStyle}>VOL.0を経て、</span>
      <wbr />
      <span style={aboutChunkStyle}>1993年に</span>
      <wbr />
      <span style={aboutChunkStyle}>京都大学学生部公認サークルとして</span>
      <wbr />
      <span style={aboutChunkStyle}>総合芸術集団潔癖青年文化団が</span>
      <wbr />
      <span style={aboutChunkStyle}>結成されました。</span>
    </>,
    <>
      <span style={aboutChunkStyle}>1995年には</span>
      <wbr />
      <span style={aboutChunkStyle}>劇団ケッペキと改称し、</span>
      <wbr />
      <span style={aboutChunkStyle}>京都大学公認の</span>
      <wbr />
      <span style={aboutChunkStyle}>演劇サークルとして</span>
      <wbr />
      <span style={aboutChunkStyle}>現在で</span>
      <wbr />
      <span style={aboutChunkStyle}>結成34年目となります。</span>
    </>,
  ],
  ["テキストが入ります", "テキストが入ります", "テキストが入ります", "テキストが入ります"],
  ["テキストが入ります", "テキストが入ります", "テキストが入ります", "テキストが入ります"],
  ["テキストが入ります", "テキストが入ります", "テキストが入ります", "テキストが入ります"],
];

const snsBlockOrder = ["hp", "x", "instagram", "note", "youtube"] as const;

export const snsBlockLinks = snsBlockOrder
  .map((id) => socialLinks.find((item) => item.id === id))
  .filter((item): item is (typeof socialLinks)[number] => Boolean(item));
