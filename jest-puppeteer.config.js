const DEBUG_MODE = process.argv.includes(`--debug`);

const debugLaunchOptions = DEBUG_MODE
    ? {
          headless: false,
          slowMo: 100,
      }
    : {};

module.exports = {
    launch: {
        args: [
            // Required for Docker version of Puppeteer.
            `--no-sandbox`,
            `--disable-setuid-sandbox`,
            `--disable-dev-shm-usage`,
        ],
        ...debugLaunchOptions,
    },
};
