"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.push = exports.init = void 0;
const router_1 = __importDefault(require("next/router"));
const isExcludedUrl = (url, patterns) => {
    let excluded = false;
    patterns.forEach((pattern) => {
        if (pattern.exec(url)) {
            excluded = true;
        }
    });
    return excluded;
};
// initialize the tracker
function init({ url, siteId, jsTrackerFile = 'matomo.js', phpTrackerFile = 'matomo.php', excludeUrlsPatterns = [], }) {
    window._paq = window._paq || [];
    if (!url) {
        console.warn('[MATOMO][DISABLED] Please provide a valid Matomo url.');
        return;
    }
    let previousPath = '';
    // order is important -_- so campaign are detected
    const excludedUrl = typeof window !== 'undefined' &&
        isExcludedUrl(window.location.pathname, excludeUrlsPatterns);
    if (excludedUrl) {
        if (typeof window !== 'undefined') {
            console.info(`[MATOMO][EXCLUDE]: ${window.location.pathname}`);
        }
    }
    else {
        push(['trackPageView']);
    }
    push(['enableLinkTracking']);
    push(['setTrackerUrl', `${url}/${phpTrackerFile}`]);
    push(['setSiteId', siteId]);
    /**
     * for initial loading we use the location.pathname
     * as the first url visited.
     * Once user navigate across the site,
     * we rely on Router.pathname
     */
    const scriptElement = document.createElement('script');
    const refElement = document.getElementsByTagName('script')[0];
    scriptElement.type = 'text/javascript';
    scriptElement.async = true;
    scriptElement.defer = true;
    scriptElement.src = `${url}/${jsTrackerFile}`;
    refElement.parentNode.insertBefore(scriptElement, refElement);
    previousPath = location.pathname;
    router_1.default.events.on('routeChangeComplete', (path) => {
        const excludedUrl = isExcludedUrl(path, excludeUrlsPatterns);
        if (excludedUrl) {
            console.info(`[MATOMO][EXCLUDE]: ${path}`);
            return;
        }
        // We use only the part of the url without the querystring to ensure piwik is happy
        // It seems that piwik doesn't track well page with querystring
        const [pathname] = path.split('?');
        // In order to ensure that the page title had been updated,
        // we delayed pushing the tracking to the next tick.
        setTimeout(() => {
            const { q } = router_1.default.query;
            if (previousPath) {
                push(['setReferrerUrl', `${previousPath}`]);
            }
            push(['setCustomUrl', pathname]);
            push(['setDocumentTitle', document.title]);
            push(['deleteCustomVariables', 'page']);
            push(['setGenerationTimeMs', 0]);
            if (/^\/suche/.test(pathname) || /^\/recherche/.test(pathname) || /^\/search/.test(pathname)) {
                push(['trackSiteSearch', q]);
            }
            else {
                push(['trackPageView']);
            }
            previousPath = pathname;
        }, 0);
    });
}
exports.init = init;
// Use the "push" function to track custom events
function push(args) {
    window._paq = window._paq || [];
    window._paq.push(args);
}
exports.push = push;
exports.default = init;
//# sourceMappingURL=index.js.map