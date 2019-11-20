import { Optional } from "../types";

class AffiliateUnit {
  campaign: string = '';
  category: string = '';
  image: string = '';
  heading: string = '';
  subheading: string = '';
  link: string = '';
  isBig?: boolean;
  tagline?: string;
  isExternal?: boolean;
  launchOn?: string;

  priority: number = 1;
  disableOnSearch: boolean = false;
  disableOnPage: boolean = false;
  country?: string[];
  preferredIndex?: number = 0;
  onlyOnAndroid: boolean = false;
  onlyOnIOS: boolean = false;

  isValid(): boolean {
    return !!this.category && !!this.campaign && !!this.image && !!this.heading && !!this.subheading && !!this.link;
  }

  static empty(): AffiliateUnit {
    return new AffiliateUnit();
  }

  static load(u: any): Optional<AffiliateUnit> {
    const unit = AffiliateUnit.empty();

    if (typeof u.campaign === 'string') unit.campaign = u.campaign;
    if (typeof u.category === 'string') unit.category = u.category;
    if (typeof u.image === 'string') unit.image = u.image;
    if (typeof u.heading === 'string') unit.heading = u.heading;
    if (typeof u.subheading === 'string') unit.subheading = u.subheading;
    if (typeof u.link === 'string') unit.link = u.link;
    if (typeof u.isBig !==  'undefined') unit.isBig = !!u.isBig;
    if (typeof u.tagline === 'string') unit.tagline = u.tagline;
    if (typeof u.isExternal !== 'undefined') unit.isExternal = !!u.isExternal;
    if (typeof u.launchOn === 'string') unit.launchOn = u.launchOn;
    if (typeof u.priority === 'number') unit.priority = u.priority;
    if (typeof u.disableOnSearch !== 'undefined') unit.disableOnSearch = !!u.disableOnSearch;
    if (typeof u.disableOnPage !== 'undefined') unit.disableOnPage = !!u.disableOnPage;
    if (Array.isArray(u.country)) unit.country = u.country;
    if (typeof u.preferredIndex === 'number') unit.preferredIndex = u.preferredIndex;
    if (typeof u.onlyOnAndroid !== 'undefined') unit.onlyOnAndroid = !!u.onlyOnAndroid;
    if (typeof u.onlyOnIOS !== 'undefined') unit.onlyOnIOS = !!u.onlyOnIOS;

    // validate data
    return unit.isValid() ? unit : undefined;
  }
}

export default AffiliateUnit;
