export interface Locale {
  os: {
    systemName: string;
    menuLabel: string;
    back: string;
    enter: string;
    navigate: string;
    loading: string;
    songOfDay: string;
    paused: string;
    resumeApp: string;
    version: string;
  };
  nav: {
    home: string;
    wildcard: string;
    grimoire: string;
    shapeshifter: string;
    contact: string;
    settings: string;
    audio: string;
    language: string;
    profile: string;
  };
  profile: {
    alias: string;
    role: string;
    location: string;
    currentQuest: string;
    questName: string;
    questPeriod: string;
    saveSlot: string;
  };
  home: {
    wildcardTitle: string;
    wildcardSub: string;
    grimoireTitle: string;
    grimoireSub: string;
    shapeshifterTitle: string;
    shapeshifterSub: string;
    contactTitle: string;
    contactSub: string;
    confirmHint: string;
  };
  wildcard: {
    appTitle: string;
    appSub: string;
    attributes: string;
    skills: string;
    questLog: string;
    equipment: string;
    stats: string;
    experience: string;
    education: string;
    languages: string;
    certifications: string;
    levelingUp: string;
    classLabel: string;
    attrStudent: string;
    attrStudentNote: string;
    attrTechnician: string;
    attrTechnicianNote: string;
    attrLearner: string;
    attrLearnerNote: string;
  };
  grimoire: {
    appTitle: string;
    appSub: string;
    spellbookLabel: string;
    selectSpell: string;
    school: string;
    status: {
      cast: string;
      scribing: string;
      conceived: string;
    };
    tech: string;
    viewSource: string;
    pageOf: string;
  };
  shapeshifter: {
    appTitle: string;
    appSub: string;
    issue: string;
    headline: string;
    lead: string;
    cutoutMagic: string;
    cutoutGames: string;
    cutoutSound: string;
    cutoutMachines: string;
    noteMoon: string;
    noteLevel: string;
    masthead: string;
  };
  contact: {
    appTitle: string;
    appSub: string;
    githubLabel: string;
    emailLabel: string;
    prompt: string;
    githubHint: string;
    noEmail: string;
  };
  controls: {
    arrowsNavigate: string;
    enterConfirm: string;
    escBack: string;
    clickSelect: string;
    tapAgain: string;
  };
  audio: {
    nowPlaying: string;
    play: string;
    pause: string;
    next: string;
    prev: string;
    volume: string;
    noTrack: string;
    unavailable: string;
  };
}
