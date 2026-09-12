import { useI18nStore } from '../store/useI18nStore';
import { resume } from '../content/resume/resume';
import './ProfileCard.css';

export function ProfileCard() {
  const t = useI18nStore((s) => s.t);

  return (
    <aside className="profile-card" aria-label={t('nav.profile')}>
      <div className="profile-card__slot">{t('profile.saveSlot')}</div>
      <div className="profile-card__header">
        <span className="profile-card__alias">{resume.alias}</span>
      </div>
      <div className="profile-card__row">
        <span className="profile-card__label">LV.</span>
        <span className="profile-card__value">{resume.level}</span>
      </div>
      <div className="profile-card__role">{t('profile.role')}</div>
      <div className="profile-card__location">{t('profile.location')}</div>
      <div className="profile-card__divider" />
      <div className="profile-card__quest-label">{t('profile.currentQuest')}</div>
      <div className="profile-card__quest-name">{t('profile.questName')}</div>
      <div className="profile-card__quest-period">{t('profile.questPeriod')}</div>
    </aside>
  );
}
