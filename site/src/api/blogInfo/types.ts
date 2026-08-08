export interface SiteConfig {
  siteName: string;
  siteAddress: string;
  siteIntro: string;
  siteNotice: string;
  createSiteTime: string;
  recordNumber: string;
  authorAvatar: string;
  siteAuthor: string;
  aboutMe: string;
  github: string;
  gitee: string;
  bilibili: string;
  qq: string;
  socialList: string;
}

export interface BlogInfo {
  articleCount: number;
  categoryCount: number;
  tagCount: number;
  viewCount: number;
  siteConfig: SiteConfig;
}
