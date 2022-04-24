import tracker from 'shadow-tracker';
import fingerprintJS from '@fingerprintjs/fingerprintjs';
import { http } from '../service/http';

export const initTracker = async () => {
  const fingerprint = await fingerprintJS.load({ monitoring: false });
  const result = await fingerprint.get();

  tracker.init({
    sessionId: `${result.visitorId}${Date.now()}`,
    userId: result.visitorId,
    captureEvent: true,
    captureJsError: false,
    captureXMLHttpRequest: false
  });
  tracker.getDeviceInfo();
  tracker.getPerformanceInfo();

  window.addEventListener('beforeunload', async (e) => {
    e.preventDefault();
    await sendUserActionLog();
  });
};

let logReportTimer = null;

export const setLogReportTimer = () => {
  if (!logReportTimer) {
    logReportTimer = setInterval(sendUserActionLog, 30 * 1000);
  }
};

const sendUserActionLog = async () => {
  if (
    !window.tracker?.logList ||
    window.tracker.logList.length === 0 ||
    !window.tracker?.sessionId
  ) {
    return;
  }

  try {
    const data = {
      sessionId: window.tracker.sessionId,
      logList: JSON.stringify(window.tracker.logList)
    };
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(data)], {
        type: 'application/json'
      });
      navigator.sendBeacon('/api/actions', blob);
    } else {
      console.debug('fall back to xml http request');
      await http.post('/api/actions', data);
    }
    window.tracker.setLogList([]);
  } catch (error) {
    console.debug('send log failed!', error);
  }
};
