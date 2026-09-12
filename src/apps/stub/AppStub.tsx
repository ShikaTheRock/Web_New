import type { AppId } from '../../store/useOSStore';
import { useI18nStore } from '../../store/useI18nStore';
import './AppStub.css';

interface AppStubProps {
  theme: AppId;
  titleKey: string;
}

export function AppStub({ theme, titleKey }: AppStubProps) {
  const t = useI18nStore((s) => s.t);

  return (
    <div className="app-stub" data-theme={theme}>
      <p className="app-stub__kicker">{t('os.systemName')}</p>
      <h1 className="app-stub__title">{t(titleKey)}</h1>
      <p className="app-stub__status">{t('os.loading')}</p>
    </div>
  );
}
