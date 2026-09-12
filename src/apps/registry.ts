import type { ComponentType } from 'react';
import type { AppId } from '../store/useOSStore';
import { MoonPhase } from '../components/moon/MoonPhase';
import { IconContact, IconGrimoire, IconShapeshifter, IconWildCard } from '../components/icons';
import { WildCardApp } from './wildcard/WildcardApp';
import { GrimoireApp } from './grimoire/GrimoireApp';
import { ShapeshifterApp } from './shapeshifter/ShapeshifterApp';
import { ContactApp } from './contact/ContactApp';

export interface AppDefinition {
  id: AppId;
  theme: AppId;
  Icon: ComponentType<{ size?: number; color?: string }>;
  selectionMoonPhase: MoonPhase;
  accent: string;
  titleKey: string;
  subKey: string;
  navKey: string;
  Component: ComponentType;
}

export const APP_REGISTRY: Record<AppId, AppDefinition> = {
  shapeshifter: {
    id: 'shapeshifter',
    theme: 'shapeshifter',
    Icon: IconShapeshifter,
    selectionMoonPhase: MoonPhase.Full,
    accent: '#7DEFFF',
    titleKey: 'home.shapeshifterTitle',
    subKey: 'home.shapeshifterSub',
    navKey: 'nav.shapeshifter',
    Component: ShapeshifterApp,
  },
  wildcard: {
    id: 'wildcard',
    theme: 'wildcard',
    Icon: IconWildCard,
    selectionMoonPhase: MoonPhase.WaxingCrescent,
    accent: '#DABFFF',
    titleKey: 'home.wildcardTitle',
    subKey: 'home.wildcardSub',
    navKey: 'nav.wildcard',
    Component: WildCardApp,
  },
  grimoire: {
    id: 'grimoire',
    theme: 'grimoire',
    Icon: IconGrimoire,
    selectionMoonPhase: MoonPhase.WaxingGibbous,
    accent: '#D2A8FF',
    titleKey: 'home.grimoireTitle',
    subKey: 'home.grimoireSub',
    navKey: 'nav.grimoire',
    Component: GrimoireApp,
  },
  contact: {
    id: 'contact',
    theme: 'contact',
    Icon: IconContact,
    selectionMoonPhase: MoonPhase.New,
    accent: '#86A88E',
    titleKey: 'home.contactTitle',
    subKey: 'home.contactSub',
    navKey: 'nav.contact',
    Component: ContactApp,
  },
};

export const APP_RAIL: AppId[] = ['shapeshifter', 'wildcard', 'grimoire', 'contact'];
