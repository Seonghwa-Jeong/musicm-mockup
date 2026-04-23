// Amplitude Unified SDK — client-side only.
// Loaded as type="module"; runs once per page lifecycle.
// The app has no bundler, so we pull @amplitude/unified as ESM via esm.sh.
import * as amplitude from 'https://esm.sh/@amplitude/unified?bundle';

// Public SDK key (browser-embedded by design) is set on window via amplitude-config.js.
const API_KEY = window.AMPLITUDE_KEY;

try {
  const r = amplitude.initAll(API_KEY, {
    analytics: {
      autocapture: {
        attribution: true,
        pageViews: true,
        sessions: true,
        formInteractions: true,
        fileDownloads: true,
        elementInteractions: true,
        networkTracking: true,
        webVitals: true,
        frustrationInteractions: true,
      },
    },
    sessionReplay: { sampleRate: 1 },
    experiment: {},
    engagement: {},
  });
  if (r && typeof r.promise?.then === 'function') {
    await r.promise;
  } else if (typeof r?.then === 'function') {
    await r;
  }
  // Fetch experiment variants on app load
  doFetchExperiment();
} catch (e) {
  console.warn('[Amplitude] initAll failed', e);
}

function doIdentify(userId, traits) {
  try {
    if (userId) amplitude.setUserId(userId);
    if (traits && amplitude.Identify) {
      const id = new amplitude.Identify();
      Object.entries(traits).forEach(([k, v]) => id.set(k, v));
      amplitude.identify(id);
    }
  } catch (e) { console.warn('[Amplitude] identify failed', e); }
}

function doFetchExperiment() {
  try {
    if (amplitude.experiment?.fetch) {
      amplitude.experiment.fetch();
    } else if (typeof amplitude.experimentFetch === 'function') {
      amplitude.experimentFetch();
    } else if (typeof amplitude.getExperiment === 'function') {
      const exp = amplitude.getExperiment();
      if (exp?.fetch) exp.fetch();
    }
  } catch (e) { console.warn('[Amplitude] experiment.fetch failed', e); }
}

const realAMP = {
  track(name, props) {
    try { amplitude.track(name, props || {}); }
    catch (e) { console.warn('[Amplitude] track failed', e); }
  },
  identify: doIdentify,
  reset() {
    try { amplitude.reset(); }
    catch (e) { console.warn('[Amplitude] reset failed', e); }
  },
  fetchExperiment: doFetchExperiment,
};

if (window.AMP && typeof window.AMP._setReal === 'function') {
  window.AMP._setReal(realAMP);
} else {
  window.AMP = realAMP;
}

// On-load user/session sync:
// - new or changed user → identify + fetchExperiment
// - previously had user, now gone (logout elsewhere / session expired) → reset + fetchExperiment
// - same user across tabs → re-identify
try {
  const user = JSON.parse(localStorage.getItem('musicm_user') || 'null');
  const lastUid = sessionStorage.getItem('musicm_amp_last_uid');
  if (user?.email && user.email !== lastUid) {
    doIdentify(user.email, { email: user.email, name: user.name });
    doFetchExperiment();
    sessionStorage.setItem('musicm_amp_last_uid', user.email);
  } else if (!user && lastUid) {
    amplitude.reset();
    doFetchExperiment();
    sessionStorage.removeItem('musicm_amp_last_uid');
  } else if (user?.email) {
    doIdentify(user.email, { email: user.email, name: user.name });
  }
} catch (e) { console.warn('[Amplitude] session sync failed', e); }
